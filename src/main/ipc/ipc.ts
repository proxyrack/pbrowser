import { ipcMain } from 'electron';
import { FingerprintGenerator } from 'fingerprint-generator';
import { ProfileManager } from 'main/browser-profile/profile-manager';
import Store from 'electron-store';
import path from 'path';
import { orderBy } from 'lodash';
import { ManageBrowserProfileDto, BrowserStatusDto, BrowserStatus } from 'shared/models';
import { MainResponse, Channel } from 'shared/ipc';
import { Chromium } from 'main/chromium';
import { IState } from '../state/istate';

const startIpc = (state: IState): void => {
  const profileManager = new ProfileManager(state.store);
  const mainWindowContents = state.mainWindow!.webContents;

  const browserStatusChanged = (status: BrowserStatusDto) => {
    mainWindowContents.send(Channel.ProfileStatusChange, status);
  };

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
    try {
      const removed = profileManager.delete(id);
      return MainResponse.success(removed);
    } catch (error: any) {
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.LaunchProfile, async (event, id: string) => {
    try {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Pending));

      const profile = profileManager.get(id);
      const generator = new FingerprintGenerator({
        operatingSystems: [profile.os],
        browsers: ['chrome'],
        devices: ['desktop'],
      });
      const fingerprintWHeaders = generator.getFingerprint();
      const browserProfilePath = path.join(
        path.dirname(state.store.path),
        'browser-profiles',
        id
      );
      const fingerprintStore = new Store({
        cwd: browserProfilePath,
        name: 'fingerprint',
      });
      fingerprintStore.set('fingerprint', fingerprintWHeaders.fingerprint);

      const chromium = new Chromium(id, browserProfilePath);
      chromium.start();

      chromium.process?.once('spawn', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Active));
      });
      chromium.process?.once('close', (code) => {
        // handle only normal close, other cases are handled on 'error'
        if (code !== 0) return;
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Inactive));
      });
      chromium.process?.once('error', () => {
        browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Error));
      });

      return MainResponse.success();
    } catch (error: any) {
      browserStatusChanged(new BrowserStatusDto(id, BrowserStatus.Error));
      return MainResponse.error(error);
    }
  });

  ipcMain.handle(Channel.GetProfiles, async () => {
    const allProfiles = profileManager.getAll();
    const orderedProfiles = orderBy(
      allProfiles,
      [(p) => p.lastLaunchDate || '1970-01-01T00:00:00.000Z', (p) => p.name],
      ['desc', 'asc']
    );

    return orderedProfiles;
  });
};

export default startIpc;
