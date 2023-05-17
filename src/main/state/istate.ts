import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import { IStore } from './istore';

export interface IState {
  mainWindow: BrowserWindow | null;
  store: Store<IStore>;
}
