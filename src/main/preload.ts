import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { ManageBrowserProfileDto } from 'shared/models/renderer-data-schema';
import { Channel } from 'shared/ipc';
import { BrowserStatusDto } from 'shared/models';

const electronHandler = {
  api: {
    saveProfile: (model: ManageBrowserProfileDto) =>
      ipcRenderer.invoke(Channel.SaveProfile, model),
    launchProfile: (id: string) => ipcRenderer.invoke(Channel.LaunchProfile, id),
    getProfiles: () => ipcRenderer.invoke(Channel.GetProfiles),
    deleteProfile: (id: string) => ipcRenderer.invoke(Channel.DeleteProfile, id),
    handleStatusChange: (
      callback: (event: IpcRendererEvent, status: BrowserStatusDto) => void
    ) => ipcRenderer.on(Channel.ProfileStatusChange, callback),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
