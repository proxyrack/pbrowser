import { ManageBrowserProfileDto, StoredBrowserProfile } from 'shared/models';
import Dialog from '../ui/dialog';
import ProfileSummary from '../profile-summary/ProfileSummary';
import Button from '../ui/button';

type ProfileSummaryDialogProps = {
  show: boolean;
  profile: StoredBrowserProfile;
  onDismiss: () => void;
  afterClose: () => void;
};

const ProfileSummaryDialog = ({
  show,
  profile,
  onDismiss,
  afterClose,
}: ProfileSummaryDialogProps) => {
  const map = (storedProfile: StoredBrowserProfile): ManageBrowserProfileDto => {
    return {
      id: null,
      general: {
        browser: storedProfile.browser,
        name: storedProfile.name,
        description: storedProfile.description,
        os: storedProfile.os,
        fillBasedOnExternalIp: storedProfile.fillBasedOnExternalIp,
      },
    };
  };

  return (
    <Dialog
      show={show}
      size="lg"
      contentScrollbar
      onEscapeKeydown={onDismiss}
      onXClick={onDismiss}
      afterClose={afterClose}
      title="Profile Summary"
      body={profile && <ProfileSummary profile={map(profile)} />}
      footer={
        <Button color="secondary" type="button" onClick={onDismiss}>
          Close
        </Button>
      }
    />
  );
};

export default ProfileSummaryDialog;
