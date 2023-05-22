import { BrowserProfile } from 'main/browser-profile/browser-profile';
import { StoredBrowserProfile } from 'main/browser-profile/stored-browser-profile';
import { makeAutoObservable, runInAction } from 'mobx';
import { MainResponse } from 'shared/ipc';
import { GeneralSettings } from 'shared/models/renderer-data-schema';

class Store {
  profiles: BrowserProfile[] = [];
  editedProfile: { general?: GeneralSettings } = {};
  profileDeletionResult: MainResponse<StoredBrowserProfile> | null = null;

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

  async deleteProfile(id: string) {
    const response: MainResponse<StoredBrowserProfile> =
      await window.electron.api.deleteProfile(id);
    runInAction(() => {
      this.profileDeletionResult = response;
    });

    if (response.success) {
      await this.fetchProfiles();
    }
  }

  setGeneralSettings(data: GeneralSettings) {
    this.editedProfile.general = data;
  }

  finishEditing() {
    this.editedProfile = {};
  }
}

export default Store;
