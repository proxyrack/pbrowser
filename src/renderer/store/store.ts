import { BrowserProfile } from 'main/browser-profile/browser-profile';
import { makeAutoObservable, runInAction } from 'mobx';
import { GeneralSettings } from 'shared/models/renderer-data-schema';

class Store {
  profiles: BrowserProfile[] = [];

  editedProfile: { general?: GeneralSettings } = {};

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

  setGeneralSettings(data: GeneralSettings) {
    this.editedProfile.general = data;
  }

  finishEditing() {
    this.editedProfile = {};
  }
}

export default Store;
