import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { ManageBrowserProfileDto } from 'shared/models/renderer-data-schema';
import { Channel } from 'shared/ipc';
import { BrowserStatusDto } from 'shared/models';

const electronHandler = {
  api: {
    saveProfile: (model: ManageBrowserProfileDto) =>
      ipcRenderer.invoke(Channel.SaveProfile, model),
    startBrowser: (profileId: string) =>
      ipcRenderer.invoke(Channel.StartBrowser, profileId),
    stopBrowser: (profileId: string) =>
      ipcRenderer.invoke(Channel.StopBrowser, profileId),
    getProfiles: () => ipcRenderer.invoke(Channel.GetProfiles),
    deleteProfile: (id: string) => ipcRenderer.invoke(Channel.DeleteProfile, id),
    getActiveBrowserWindows: () => ipcRenderer.invoke(Channel.GetActiveBrowserWindows),
    closeApp: () => ipcRenderer.invoke(Channel.CloseApp),
    deleteSession: (profileId: string) =>
      ipcRenderer.invoke(Channel.DeleteSession, profileId),
    handleStatusChange: (
      callback: (event: IpcRendererEvent, status: BrowserStatusDto) => void
    ) => ipcRenderer.on(Channel.ProfileStatusChange, callback),
    handleAppCloseAttempt: (callback: (event: IpcRendererEvent) => void) =>
      ipcRenderer.on(Channel.AppCloseAttempt, callback),
    removeAllListeners: () => {
      ipcRenderer.removeAllListeners(Channel.ProfileStatusChange);
      ipcRenderer.removeAllListeners(Channel.AppCloseAttempt);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
