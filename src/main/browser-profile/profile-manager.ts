import { IStore } from 'main/state/istore';
import Store from 'electron-store';
import { BadRequestError } from 'shared/errors/bad-request-error';
import { ErrorReason } from 'shared/errors/error-reason';
import { randomUUID } from 'crypto';
import { ManageBrowserProfileDto } from 'shared/models/renderer-data-schema';
import { StoredBrowserProfile } from '../../shared/models/stored-browser-profile';

export class ProfileManager {
  store: Store<IStore>;

  constructor(store: Store<IStore>) {
    this.store = store;
  }

  getAll() {
    return this.store.get('profiles') || [];
  }

  create(profile: ManageBrowserProfileDto) {
    const allProfiles = this.getAll();
    const notUnique = allProfiles.some((p) => p.name === profile.general.name.trim());
    if (notUnique) {
      throw new BadRequestError(
        'Profile name should be unique',
        ErrorReason.NotUnique,
        'name'
      );
    }

    const newProfile: StoredBrowserProfile = {
      id: randomUUID(),
      name: profile.general.name.trim(),
      description: profile.general.description,
      os: profile.general.os,
      browser: profile.general.browser,
      fillBasedOnExternalIp: profile.general.fillBasedOnExternalIp,
      lastEditDate: new Date().toISOString(),
    };

    allProfiles.push(newProfile);
    this.store.set('profiles', allProfiles);
    return newProfile;
  }

  edit(profile: ManageBrowserProfileDto) {
    const allProfiles = this.getAll();
    const profileIndex = allProfiles.findIndex((p) => p.id === profile.id);
    if (profileIndex === -1) {
      throw new BadRequestError('Profile not found', ErrorReason.NotFound, 'id');
    }

    const notUnique = allProfiles.some(
      (p) => p.name === profile.general.name.trim() && p.id !== profile.id
    );
    if (notUnique) {
      throw new BadRequestError(
        'Profile name should be unique',
        ErrorReason.NotUnique,
        'name'
      );
    }

    const newProfile: StoredBrowserProfile = {
      ...allProfiles[profileIndex],
      name: profile.general.name.trim(),
      description: profile.general.description,
      fillBasedOnExternalIp: profile.general.fillBasedOnExternalIp,
      lastEditDate: new Date().toISOString(),
    };

    allProfiles.splice(profileIndex, 1, newProfile);
    this.store.set('profiles', allProfiles);
    return newProfile;
  }

  delete(id: string) {
    const allProfiles = this.getAll();
    const profileIndex = allProfiles.findIndex((p) => p.id === id);
    if (profileIndex === -1) {
      throw new BadRequestError('Profile not found', ErrorReason.NotFound, 'id');
    }

    const removed = allProfiles.splice(profileIndex, 1);
    this.store.set('profiles', allProfiles);

    return removed.pop();
  }
}
