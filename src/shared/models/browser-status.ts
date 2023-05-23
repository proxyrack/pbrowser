export enum BrowserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Error = 'ERROR',
}

export class BrowserStatusDto {
  profileId: string;
  status: BrowserStatus;

  constructor(id: string, status: BrowserStatus) {
    this.profileId = id;
    this.status = status;
  }
}
