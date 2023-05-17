import { IStore } from 'main/state/istore';
import Store from 'electron-store';
import { BadRequestError } from 'shared/errors/bad-request-error';
import { ErrorReason } from 'shared/errors/error-reason';
import { randomUUID } from 'crypto';
import { GeneralSettings } from 'shared/models/renderer-data-schema';
import { StoredBrowserProfile } from './stored-browser-profile';

export class ProfileManager {
  store: Store<IStore>;

  constructor(store: Store<IStore>) {
    this.store = store;
  }

  getAll() {
    return this.store.get('profiles') || [];
  }

  create(profile: GeneralSettings) {
    const allProfiles = this.getAll();
    const notUnique = allProfiles.some((p) => p.name === profile.name);
    if (notUnique) {
      throw new BadRequestError(
        'Profile name should be unique',
        ErrorReason.NotUnique,
        'name'
      );
    }

    const newProfile: StoredBrowserProfile = {
      id: randomUUID(),
      name: profile.name,
      description: profile.description,
      os: profile.os,
      browser: profile.browser,
      fillBasedOnExternalIp: profile.fillBasedOnExternalIp,
      lastEditDate: new Date().toISOString(),
    };

    allProfiles.push(newProfile);
    this.store.set('profiles', allProfiles);
  }
}
