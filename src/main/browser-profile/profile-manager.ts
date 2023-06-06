import { IStore } from 'main/state/istore';
import Store from 'electron-store';
import {
  ErrorReason,
  ProfileNotFoundError,
  BadRequestError,
  ProfileNameNotUniqueError,
} from 'shared/errors';
import { randomUUID } from 'crypto';
import { ManageBrowserProfileDto, StoredBrowserProfile } from 'shared/models';

export class ProfileManager {
  private store: Store<IStore>;
  private profiles: Array<StoredBrowserProfile> | null;

  constructor(store: Store<IStore>) {
    this.store = store;
    this.profiles = null;
  }

  private get allProfiles() {
    return this.profiles === null ? this.fetchAll() : this.profiles;
  }

  private set allProfiles(profiles: Array<StoredBrowserProfile>) {
    this.store.set('profiles', profiles);
    this.profiles = this.fetchAll();
  }

  private fetchAll() {
    return this.store.get('profiles') || [];
  }

  get(id: string | null) {
    if (id === null)
      throw new BadRequestError('Id is null', ErrorReason.NotSpecified, 'id');

    const profileIndex = this.allProfiles.findIndex((p) => p.id === id);
    if (profileIndex === -1) throw new ProfileNotFoundError();

    return this.allProfiles[profileIndex];
  }

  getAll() {
    return this.allProfiles;
  }

  create(profile: ManageBrowserProfileDto) {
    const notUnique = this.allProfiles.some(
      (p) => p.name === profile.general.name.trim()
    );
    if (notUnique) throw new ProfileNameNotUniqueError();

    const newProfile: StoredBrowserProfile = {
      id: randomUUID(),
      name: profile.general.name.trim(),
      description: profile.general.description,
      os: profile.general.os,
      browser: profile.general.browser,
      fillBasedOnExternalIp: profile.general.fillBasedOnExternalIp,
      lastEditDate: new Date().toISOString(),
    };
    this.allProfiles = [...this.allProfiles, newProfile];

    return newProfile;
  }

  edit(profile: ManageBrowserProfileDto) {
    const existingProfile = this.get(profile.id);
    const notUnique = this.allProfiles.some(
      (p) => p.name === profile.general.name.trim() && p.id !== profile.id
    );
    if (notUnique) throw new ProfileNameNotUniqueError();

    const newProfile: StoredBrowserProfile = {
      ...existingProfile,
      name: profile.general.name.trim(),
      description: profile.general.description,
      fillBasedOnExternalIp: profile.general.fillBasedOnExternalIp,
      lastEditDate: new Date().toISOString(),
    };
    this.allProfiles = this.allProfiles.map((p) => {
      if (p.id === newProfile.id) return newProfile;

      return p;
    });

    return newProfile;
  }

  delete(id: string) {
    const profile = this.get(id);
    this.allProfiles = this.allProfiles.filter((p) => p.id !== id);

    return profile;
  }

  updateLaunchDate(id: string) {
    this.allProfiles = this.allProfiles.map((p) => {
      if (p.id === id) {
        return { ...p, lastLaunchDate: new Date().toISOString() };
      }

      return p;
    });
  }
}
