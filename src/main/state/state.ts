import { BrowserWindow, app, shell } from 'electron';
import Store from 'electron-store';
import path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { Chromium } from 'main/chromium';
import { Channel } from 'shared/ipc';
import startIpc from '../ipc/ipc';
import { resolveHtmlPath } from '../util';
import MenuBuilder from '../menu';
import { IState } from './istate';
import { IStore } from './istore';

export default class State implements IState {
  mainWindow: BrowserWindow | null = null;
  store: Store<IStore>;
  activeBrowserWindows: Map<string, Chromium>;
  appCloseConfirmed: boolean = false;

  constructor() {
    this.store = new Store<IStore>({ cwd: app.isPackaged ? undefined : 'pbrowser' });
    this.activeBrowserWindows = new Map<string, Chromium>();
  }

  static async installExtensions() {
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    return installExtension(REACT_DEVELOPER_TOOLS, { forceDownload }).catch(console.log);
  }

  async createMainWindow() {
    // currently react dev tools are not working because of this issue https://github.com/electron/electron/issues/36545
    // the code will be uncommented as soon as it resolved
    // if (isDebug()) {
    //   await State.installExtensions();
    // }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    this.mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../../.erb/dll/preload.js'),
      },
    });

    this.mainWindow.loadURL(resolveHtmlPath('index.html'));

    this.mainWindow.on('ready-to-show', () => {
      if (!this.mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.mainWindow.minimize();
      } else {
        this.mainWindow.show();
      }
    });

    this.mainWindow.on('close', (event) => {
      if (this.appCloseConfirmed || this.activeBrowserWindows.size === 0) return;

      event.preventDefault();
      this.mainWindow?.webContents.send(Channel.AppCloseAttempt);
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(this.mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    this.mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    startIpc(this);

    return this.mainWindow;
  }
}
