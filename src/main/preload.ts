import { contextBridge, ipcRenderer } from 'electron';
import { GeneralSettings } from 'shared/models/renderer-data-schema';
import Channel from './ipc/channel';

const electronHandler = {
  api: {
    saveProfile: (model: GeneralSettings) =>
      ipcRenderer.invoke(Channel.SaveProfile, model),
    launchProfile: (id: string) => ipcRenderer.invoke(Channel.LaunchProfile, id),
    getProfiles: () => ipcRenderer.invoke(Channel.GetProfiles),
    deleteProfile: (id: string) => ipcRenderer.invoke(Channel.DeleteProfile, id),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
