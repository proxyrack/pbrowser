// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import Channel from './ipc/channel';
import { BrowserProfile } from './browser-profile/browser-profile';

const electronHandler = {
  api: {
    saveProfile: (model: BrowserProfile) =>
      ipcRenderer.invoke(Channel.SaveProfile, model),
    launchProfile: (id: string) => ipcRenderer.invoke(Channel.LaunchProfile, id),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
