import { StoredBrowserProfile } from './stored-browser-profile';

export interface BrowserProfile
  extends Omit<StoredBrowserProfile, 'id' | 'lastLaunchDate'> {
  id: string | null;
  lastLaunchDate?: Date;
}
