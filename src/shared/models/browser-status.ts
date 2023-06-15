export enum BrowserStatus {
  Active = 'ACTIVE',
  PendingActive = 'PENDING_ACTIVE',
  Inactive = 'INACTIVE',
  PendingInactive = 'PENDING_INACTIVE',
  StartError = 'START_ERROR',
  StopError = 'STOP_ERROR',
}

export class BrowserStatusDto {
  profileId: string;
  status: BrowserStatus;

  constructor(id: string, status: BrowserStatus) {
    this.profileId = id;
    this.status = status;
  }
}
