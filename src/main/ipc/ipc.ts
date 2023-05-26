import { ipcMain } from 'electron';
import { FingerprintGenerator } from 'fingerprint-generator';
import { ProfileManager } from 'main/browser-profile/profile-manager';
import Store from 'electron-store';
import path from 'path';
import { ManageBrowserProfileDto, BrowserStatusDto, BrowserStatus } from 'shared/models';
import { MainResponse, Channel } from 'shared/ipc';
import { Chromium } from 'main/chromium';
import { rmSync } from 'fs';
import { IState } from '../state/istate';

const startIpc = (state: IState): void => {
  const profileManager = new ProfileManager(state.store);
  const mainWindowWeb = state.mainWindow!.webContents;

  const getProfileDir = (profileId: string) => {
    return path.join(path.dirname(state.store.path), 'browser-profiles', profileId);
  };

  const deleteProfileDir = (profileId: string) => {
    const browserProfilePath = getProfileDir(profileId);
    rmSync(browserProfilePath, { recursive: true, force: true, maxRetries: 5 });
  };

  const browserStatusChanged = (status: BrowserStatusDto) => {
    mainWindowWeb.send(Channel.ProfileStatusChange, status);
  };

  ipcMain.handle(Channel.CloseApp, async () => {
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
      const generator = new FingerprintGenerator({
        operatingSystems: [profile.os],
        browsers: ['chrome'],
        devices: ['desktop'],
      });
      const fingerprintWHeaders = generator.getFingerprint();
      const browserProfilePath = getProfileDir(id);
      const fingerprintStore = new Store({
        cwd: browserProfilePath,
        name: 'fingerprint',
      });
      fingerprintStore.set('fingerprint', fingerprintWHeaders.fingerprint);

      const instance = new Chromium(id, browserProfilePath);
      state.activeBrowserWindows.set(id, instance);
      instance.start();

      instance.process?.once('spawn', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Active));
      });
      instance.process?.once('close', (code) => {
        state.activeBrowserWindows.delete(id);
        // set Inactive status only if closed normally or killed, otherwise set Error
        if (code === 0 || code === null) {
          browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Inactive));
        }
      });
      instance.process?.once('error', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Error));
      });

      return MainResponse.success();
    } catch (error: any) {
      state.activeBrowserWindows.delete(id);
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Error));
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.StopBrowser, async (event, id: string) => {
    if (!state.activeBrowserWindows.has(id))
      return MainResponse.error(new Error('Browser with this profile is not running'));

    try {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.PendingInactive));
      const instance = state.activeBrowserWindows.get(id);
      instance?.kill();

      return MainResponse.success();
    } catch (error: any) {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Error));
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

export default startIpc;
