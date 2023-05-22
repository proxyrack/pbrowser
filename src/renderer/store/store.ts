import { StoredBrowserProfile } from 'shared/models/stored-browser-profile';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { MainResponse } from 'shared/ipc';
import {
  GeneralSettings,
  ManageBrowserProfileDto,
} from 'shared/models/renderer-data-schema';
import { toast } from 'react-toastify';

class Store {
  profiles: StoredBrowserProfile[] = [];
  editedProfileId: string | null = null;
  editedProfile: ManageBrowserProfileDto | null = null;
  profileDeletionResult: MainResponse<StoredBrowserProfile> | null = null;
  profileSaveResult: MainResponse<StoredBrowserProfile> | null = null;

  private profilesFetched: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get editedProfileUnmodified(): ManageBrowserProfileDto | null {
    if (!this.editedProfileId) return null;

    const profile = this.profiles.find((p) => p.id === this.editedProfileId);
    if (!profile) return null;

    return {
      id: profile.id,
      general: {
        name: profile.name,
        description: profile.description,
        browser: profile.browser,
        os: profile.os,
        fillBasedOnExternalIp: profile.fillBasedOnExternalIp,
      },
    };
  }

  get profileIsEdited(): boolean {
    return this.editedProfileId !== null;
  }

  async fetchProfiles(force: boolean = false) {
    if (!this.profilesFetched || force) {
      const allProfiles = await window.electron.api.getProfiles();

      runInAction(() => {
        this.profiles = allProfiles;
        this.profilesFetched = true;
      });
    }
  }

  async deleteProfile(id: string) {
    const response: MainResponse<StoredBrowserProfile> =
      await window.electron.api.deleteProfile(id);

    if (response.success) {
      toast.success(`The ${response.data?.name} profile is successfully deleted.`);
      await this.fetchProfiles(true);
    } else {
      toast.error('Error occurred during the attempt to delete profile.');
    }
  }

  async saveProfile() {
    if (this.editedProfile === null) throw new Error('Nothing to save');
    const response: MainResponse<StoredBrowserProfile> =
      await window.electron.api.saveProfile(toJS(this.editedProfile));
    runInAction(() => {
      this.profileSaveResult = response;
    });

    if (response.success) {
      await this.fetchProfiles(true);
    }
  }

  startCreation() {
    this.editedProfile = <any>{ id: null };
  }

  startEditing(id: string) {
    const exists = this.profiles.some((p) => p.id === id);
    if (!exists) throw new Error('Profile was not found in store');

    this.editedProfileId = id;
    this.editedProfile = <any>{ id };
  }

  setGeneralSettings(data: GeneralSettings) {
    if (this.editedProfile === null) throw new Error('Profile is not currently edited');
    this.editedProfile.general = data;
  }

  finishEditing() {
    this.editedProfileId = null;
    this.editedProfile = null;
    this.profileSaveResult = null;
  }
}

export default Store;
