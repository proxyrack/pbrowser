import { BrowserProfile } from 'main/browser-profile/browser-profile';
import { makeAutoObservable, runInAction } from 'mobx';

class Store {
  profiles: BrowserProfile[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setProfiles(profiles: Array<any>) {
    this.profiles = profiles;
  }

  async fetchProfiles() {
    const allProfiles = await window.electron.api.getProfiles();

    runInAction(() => {
      this.profiles = allProfiles;
    });
  }
}

export default Store;
