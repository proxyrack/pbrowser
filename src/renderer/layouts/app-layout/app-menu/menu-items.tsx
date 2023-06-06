import { User, Settings, Info } from 'react-feather';

export const menuItems = [
  {
    key: 'allprofiles',
    name: 'All Profiles',
    path: '/',
    icon: () => <User size={20} />,
  },
  {
    key: 'systemsettings',
    name: 'System Settings',
    path: '/settings',
    icon: () => <Settings size={20} />,
  },
  {
    key: 'supportcenter',
    name: 'Support Center',
    path: '/support',
    icon: () => <Info size={20} />,
  },
];
