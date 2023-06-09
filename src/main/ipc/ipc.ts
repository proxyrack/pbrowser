import { ipcMain } from 'electron';
import { ProfileManager } from 'main/browser-profile/profile-manager';
import Store from 'electron-store';
import path from 'path';
import { ManageBrowserProfileDto, BrowserStatusDto, BrowserStatus } from 'shared/models';
import { MainResponse, Channel } from 'shared/ipc';
import { Chromium } from 'main/chromium';
import { rmSync } from 'fs';
import { IState } from '../state/istate';

export const registerIpcHandlers = (state: IState): void => {
  const profileManager = new ProfileManager(state.store);

  const getProfileDir = (profileId: string) => {
    return path.join(path.dirname(state.store.path), 'browser-profiles', profileId);
  };

  const deleteProfileDir = (profileId: string) => {
    const browserProfilePath = getProfileDir(profileId);
    rmSync(browserProfilePath, { recursive: true, force: true, maxRetries: 5 });
  };

  const browserStatusChanged = (status: BrowserStatusDto) => {
    if (state.mainWindow === null) return;

    state.mainWindow.webContents.send(Channel.ProfileStatusChange, status);
  };

  ipcMain.handle(Channel.CloseApp, async () => {
    state.killAllBrowserWindows();
    state.appCloseConfirmed = true;
    state.mainWindow?.close();
  });

  ipcMain.handle(Channel.SaveProfile, async (event, profile: ManageBrowserProfileDto) => {
    let savedProfile = null;

    try {
      if (profile.id === null) {
        savedProfile = profileManager.create(profile);
      } else {
        savedProfile = profileManager.edit(profile);
      }
      return MainResponse.success(savedProfile);
    } catch (error: any) {
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.DeleteProfile, async (event, id: string) => {
    if (state.activeBrowserWindows.has(id)) {
      return MainResponse.error(
        new Error('Profile is being used. Stop the session first')
      );
    }

    try {
      deleteProfileDir(id);
      const removed = profileManager.delete(id);
      return MainResponse.success(removed);
    } catch (error: any) {
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.StartBrowser, async (event, id: string) => {
    if (state.activeBrowserWindows.has(id)) {
      return MainResponse.error(
        new Error('Browser with this profile is already running')
      );
    }

    try {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.PendingActive));
      profileManager.updateLaunchDate(id);

      const profile = profileManager.get(id);
      const browserProfilePath = getProfileDir(id);
      const fingerprintStore = new Store({
        cwd: browserProfilePath,
        name: 'fingerprint',
      });
      fingerprintStore.set('fingerprint', profile);

      const instance = new Chromium(id, browserProfilePath);
      state.activeBrowserWindows.set(id, instance);
      instance.start();

      instance.process?.once('spawn', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Active));
      });
      instance.process?.once('exit', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.PendingInactive));
      });
      instance.process?.once('close', (code) => {
        state.activeBrowserWindows.delete(id);
        // set Inactive status only if closed normally or killed, otherwise set Error
        if (code === 0 || code === 1 || code === null) {
          browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Inactive));
        }
      });
      instance.process?.once('error', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.StartError));
      });

      return MainResponse.success();
    } catch (error: any) {
      state.activeBrowserWindows.delete(id);
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.StartError));
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.StopBrowser, async (event, id: string) => {
    if (!state.activeBrowserWindows.has(id))
      return MainResponse.error(new Error('Browser with this profile is not running'));

    try {
      const instance = state.activeBrowserWindows.get(id);
      instance?.kill();

      return MainResponse.success();
    } catch (error: any) {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.StopError));
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.GetProfiles, async () => {
    const allProfiles = profileManager.getAll();

    return allProfiles;
  });

  ipcMain.handle(Channel.GetActiveBrowserWindows, async () => {
    return Array.from(state.activeBrowserWindows.keys()).map((id) => ({
      profileId: id,
      status: BrowserStatus.Active,
    }));
  });

  ipcMain.handle(Channel.DeleteSession, async (event, profileId: string) => {
    if (state.activeBrowserWindows.has(profileId)) {
      return MainResponse.error(
        new Error('Profile is being used. Stop the session first')
      );
    }

    try {
      deleteProfileDir(profileId);

      return MainResponse.success();
    } catch (error: any) {
      return MainResponse.error(error);
    }
  });
};

export const deregisterIpcHandlers = () => {
  Object.values(Channel).forEach((channel) => {
    ipcMain.removeHandler(channel);
  });
};
