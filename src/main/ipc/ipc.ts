import { app, ipcMain } from 'electron';
import { FingerprintGenerator } from 'fingerprint-generator';
import { BrowserProfile } from 'main/browser-profile/browser-profile';
import { StoredBrowserProfile } from 'main/browser-profile/stored-browser-profile';
import { randomUUID } from 'crypto';
import Store from 'electron-store';
import path from 'path';
import { spawn } from 'child_process';
import { openSync } from 'fs';
import { orderBy } from 'lodash';
import { IState } from '../state/istate';
import Channel from './channel';

// eslint-disable-next-line no-unused-vars
const startIpc = (state: IState): void => {
  ipcMain.handle(Channel.SaveProfile, async (event, profile: BrowserProfile) => {
    const allProfiles = state.store?.get('profiles') || [];
    profile.id = profile.id || randomUUID();
    allProfiles.push(profile as StoredBrowserProfile);
    state.store?.set('profiles', allProfiles);

    return { status: 'saved', obj: profile };
  });

  ipcMain.handle(Channel.LaunchProfile, (event, id: string) => {
    const allProfiles = state.store?.get('profiles') || [];
    const selectedProfile = allProfiles.find((p) => p.id === id);
    if (selectedProfile === undefined) throw new Error();

    const generator = new FingerprintGenerator({
      operatingSystems: [selectedProfile.os],
      browsers: ['chrome'],
      devices: ['desktop'],
    });
    const fingerprintWHeaders = generator.getFingerprint();
    const profilePath = path.join(
      app.getPath('userData'),
      'pbrowser',
      'browser-profile',
      id
    );
    const fingerprintStore = new Store({
      cwd: profilePath,
      name: 'fingerprint',
    });
    fingerprintStore.set('fingerprint', fingerprintWHeaders.fingerprint);
    const outFile = openSync(`${profilePath}/chrome-out.log`, 'a');
    const errFile = openSync(`${profilePath}/chrome-err.log`, 'a');
    const browserLocation = 'E:\\Downloads\\chromium\\chrome-win\\chrome.exe';
    const args = [`--user-data-dir=${profilePath}`];
    const childProc = spawn(browserLocation, args, {
      stdio: ['ignore', outFile, errFile],
    });
    console.log(`PID is: ${childProc.pid}`);

    childProc.on('close', (code) => {
      console.log(`child process close with code ${code}`);
    });

    childProc.on('error', (err) => {
      console.log(`child process exited with error ${err}`);
      console.log(err);
    });
  });

  ipcMain.handle(Channel.GetProfiles, async (event) => {
    const allProfiles = state.store?.get('profiles') || [];
    const orderedProfiles = orderBy(
      allProfiles,
      [(p) => p.lastLaunchDate || '1970-01-01T00:00:00.000Z', (p) => p.name],
      ['desc', 'asc']
    );

    return orderedProfiles;
  });
};

export default startIpc;
