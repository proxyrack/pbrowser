export const pingRequest = () => {
  window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
};

export const requestBrowserStatus = () => {
  window.electron.ipcRenderer.sendMessage('ipc-example', ['browser-status']);
};
