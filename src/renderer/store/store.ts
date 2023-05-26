/* eslint-disable class-methods-use-this */
import { StoredBrowserProfile } from 'shared/models/stored-browser-profile';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { MainResponse } from 'shared/ipc';
import { toast } from 'react-toastify';
import { orderBy } from 'lodash';
import {
  BrowserStatus,
  BrowserStatusDto,
  GeneralSettings,
  ManageBrowserProfileDto,
} from 'shared/models';
import { confirm } from 'renderer/components/ui/confirm-dialog';

class Store {
  private storedProfiles: StoredBrowserProfile[] = [];
  editedProfileId: string | null = null;
  editedProfile: ManageBrowserProfileDto | null = null;
  profileDeletionResult: MainResponse<StoredBrowserProfile> | null = null;
  profileSaveResult: MainResponse<StoredBrowserProfile> | null = null;
  statuses: Map<string, BrowserStatusDto> = new Map<string, BrowserStatusDto>();

  private profilesFetched: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get editedProfileUnmodified(): ManageBrowserProfileDto | null {
    if (!this.editedProfileId) return null;

    const profile = this.storedProfiles.find((p) => p.id === this.editedProfileId);
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

  get profiles() {
    const profilesWithStatus = this.storedProfiles.map((p) => {
      const status = this.statuses.get(p.id)?.status || BrowserStatus.Inactive;
      return {
        ...p,
        status,
      };
    });

    return orderBy(
      profilesWithStatus,
      [
        (p) => p.status === BrowserStatus.Active,
        (p) => p.lastLaunchDate || '1970-01-01T00:00:00.000Z',
        (p) => p.name,
      ],
      ['desc', 'desc', 'asc']
    );
  }

  async fetchProfiles(force: boolean = false) {
    if (!this.profilesFetched || force) {
      const allProfiles = await window.electron.api.getProfiles();

      runInAction(() => {
        this.storedProfiles = allProfiles;
        this.profilesFetched = true;
      });
    }
  }

  async fetchStatuses() {
    const statuses: Array<BrowserStatusDto> =
      await window.electron.api.getActiveBrowserWindows();

    runInAction(() => {
      statuses.forEach((s) => this.updateStatus(s));
    });
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

  async startBrowser(profileId: string) {
    const response = await window.electron.api.startBrowser(profileId);
    if (response.success) {
      await this.fetchProfiles(true);
    }
  }

  async stopBrowser(profileId: string) {
    await window.electron.api.stopBrowser(profileId);
  }

  startCreation() {
    this.editedProfile = <any>{ id: null };
  }

  startEditing(id: string) {
    const exists = this.storedProfiles.some((p) => p.id === id);
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

  updateStatus(status: BrowserStatusDto) {
    this.statuses.set(status.profileId, status);
  }

  async confirmAppClose() {
    const exitConfirmed = await confirm(`Are you sure you want to close the application?
    All active sessions will be automatically closed.`);
    if (exitConfirmed) {
      await window.electron.api.closeApp();
    }
  }

  async deleteSession(id: string) {
    const response: MainResponse = await window.electron.api.deleteSession(id);
    if (response.success) {
      toast.success('The session data is successfully deleted.');
    }
  }
}

export default Store;
