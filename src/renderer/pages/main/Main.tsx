import { BrowserProfile } from 'main/browser-profile/browser-profile';
import { useEffect } from 'react';
import PageTitle from 'renderer/components/page-title';
import BasicLayout from 'renderer/layouts/basicLayout';
import { useStore } from 'renderer/store';

const Main = () => {
  const { setPageTitle } = useStore();

  useEffect(() => {
    setPageTitle('Browser profile list');
  }, [setPageTitle]);

  const saveProfile = async () => {
    const profile: BrowserProfile = {
      id: null,
      os: 'windows',
      fillBasedOnExternalIp: false,
    };
    const saveResult = await window.electron.api.saveProfile(profile);
    console.log('profile saved', saveResult);
  };

  const launchProfile = async () => {
    const profileId = '15d68b7c-7c87-4d33-8809-088c785422a2';
    const saveResult = await window.electron.api.launchProfile(profileId);
    console.log('profile launched', saveResult);
  };

  return (
    <BasicLayout>
      <>
        <PageTitle />
        <div>
          <button type="button" onClick={saveProfile}>
            Save Profile
          </button>
          <button type="button" onClick={launchProfile}>
            Launch Profile
          </button>
        </div>
      </>
    </BasicLayout>
  );
};

export default Main;
