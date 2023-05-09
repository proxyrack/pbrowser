export interface BrowserProfile {
  id: string | null;
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
