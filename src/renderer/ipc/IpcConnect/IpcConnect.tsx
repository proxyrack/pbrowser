import { useEffect } from 'react';
import { useStore } from 'renderer/store';

interface IConnect {
  children: JSX.Element;
}

function IpcConnect({ children }: IConnect) {
  const store = useStore();

  useEffect(() => {
    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once('ipc-example', (arg) => {
      // eslint-disable-next-line no-console
      console.log('backend listener', arg);

      // TODO - listed main process actions to pass in on frontend here. Move changes to store and than render data from store in components
      store.increaseTimer();
    });
  }, [store]);

  return children;
}

export default IpcConnect;
