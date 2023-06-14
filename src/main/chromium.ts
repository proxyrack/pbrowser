import { ChildProcess, spawn, spawnSync } from 'child_process';
import { closeSync, openSync } from 'fs';
import { isWindows } from './util';

const CHROMIUM_PATH =
  process.platform === 'darwin'
    ? '/Applications/Chromium.app/Contents/MacOS/Chromium'
    : 'C:\\chromium\\chrome.exe';
const STARTING_URL = 'http://ip-api.com/json/';

export class Chromium {
  profileId: string;
  userDataDir: string;
  process?: ChildProcess;
  outFile?: number;
  errFile?: number;

  constructor(id: string, userDataDir: string) {
    if (!id) throw new Error('id is empty');
    if (!userDataDir) throw new Error('userDataDir is empty');

    this.profileId = id;
    this.userDataDir = userDataDir;
  }

  start() {
    this.outFile = openSync(`${this.userDataDir}/chrome-out.log`, 'a');
    this.errFile = openSync(`${this.userDataDir}/chrome-err.log`, 'a');
    const args = [`--user-data-dir=${this.userDataDir}`, STARTING_URL];
    this.process = spawn(CHROMIUM_PATH, args, {
      stdio: ['ignore', this.outFile, this.errFile],
      detached: !isWindows(),
    });

    this.process.on('close', () => {
      this.cleanup();
    });

    this.process.on('error', (err) => {
      console.error(err);
    });
  }

  kill() {
    if (!this.process || !this.process.pid) return;

    if (isWindows()) {
      const taskkillProc = spawnSync(`taskkill /pid ${this.process.pid} /T /F`, {
        shell: true,
        encoding: 'utf-8',
      });
      const { stderr } = taskkillProc;
      if (stderr) {
        this.process?.kill();
      }
    } else if (this.process.pid) {
      process.kill(-this.process.pid, 'SIGKILL');
    }
  }

  private cleanup() {
    if (this.outFile) {
      closeSync(this.outFile);
      delete this.outFile;
    }
    if (this.errFile) {
      closeSync(this.errFile);
      delete this.errFile;
    }
  }
}
