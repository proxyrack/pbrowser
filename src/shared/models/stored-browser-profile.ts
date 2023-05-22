export interface StoredBrowserProfile {
  id: string;
  name: string;
  description: string;
  lastEditDate: string;
  os: 'macos';
  browser: 'chrome';
  fillBasedOnExternalIp: boolean;
  lastLaunchDate?: string;
  proxy?: any;
  timezone?: any;
  webRtc?: any;
  geolocation?: any;
  navigator?: any;
  fonts?: any;
  mediaDevices?: any;
  hardware?: any;
}
