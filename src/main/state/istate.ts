import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import { Chromium } from 'main/chromium';
import { IStore } from './istore';

export interface IState {
  mainWindow: BrowserWindow | null;
  store: Store<IStore>;
  activeBrowserWindows: Map<string, Chromium>;
  appCloseConfirmed: boolean;
  killAllBrowserWindows(): void;
}
