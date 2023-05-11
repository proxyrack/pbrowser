export interface StoredBrowserProfile {
  id: string;
  name: string;
  description?: string;
  lastLaunchDate?: string;
  os: 'macos' | 'windows';
  proxy?: any;
  fillBasedOnExternalIp: boolean;
  timezone?: any;
  webRtc?: any;
  geolocation?: any;
  navigator?: any;
  fonts?: any;
  mediaDevices?: any;
  hardware?: any;
}
