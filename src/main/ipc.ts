import { ipcMain } from 'electron';
import { IState } from './state/istate';

// eslint-disable-next-line no-unused-vars
const startIpc = (state: IState): void => {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });
};

export default startIpc;
