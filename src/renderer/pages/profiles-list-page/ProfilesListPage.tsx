import { useEffect } from 'react';
import { useStore } from 'renderer/store';
import Button from 'renderer/components/ui/button';
import Dropdown from 'renderer/components/ui/dropdown';
import { MoreVertical } from 'react-feather';
import CollapsibleParagraph from 'renderer/components/ui/collapsible-paragraph';
import RelativeDate from 'renderer/components/ui/relative-date';
import { confirm } from 'renderer/components/ui/confirm-dialog';
import { observer } from 'mobx-react-lite';
import PageTitle from 'renderer/components/ui/page-title';
import { toast } from 'react-toastify';
import { BrowserProfile } from 'main/browser-profile/browser-profile';
import * as S from './styles';

const ProfilesListPage = observer(() => {
  const { profiles, fetchProfiles, deleteProfile, profileDeletionResult } = useStore();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    if (profileDeletionResult === null) return;
    if (profileDeletionResult.success) {
      toast.success(
        `The ${profileDeletionResult.data?.name} profile is successfully deleted.`
      );
    } else {
      toast.error('Error occurred during the attempt to delete profile.');
    }
  }, [profileDeletionResult]);

  const launchProfile = async (id: string) => {
    await window.electron.api.launchProfile(id);
  };

  const handleEdit = () => {};

  const handleDelete = async (profile: BrowserProfile) => {
    const confirmed = await confirm(
      `Are you sure you want to delete the ${profile.name} browser profile?`,
      {
        ok: { label: 'Yes', color: 'danger' },
        cancel: { label: 'No', color: 'secondary' },
      }
    );
    if (confirmed) {
      deleteProfile(profile.id!);
    }
  };

  return (
    <>
      <PageTitle>Browser profile list</PageTitle>
      <S.Card>
        <S.Table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="description-col">Description</th>
              <th>Status</th>
              <th>Last launched</th>
              <th className="actions-col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>
                  <CollapsibleParagraph text={profile.description} />
                </td>
                <td />
                <td>
                  <RelativeDate datetime={profile.lastLaunchDate} />
                </td>
                <td>
                  <S.Actions>
                    <Button
                      type="button"
                      color="primary"
                      size="s"
                      onClick={() => launchProfile(profile.id!)}
                    >
                      Start
                    </Button>
                    <Dropdown
                      position="left"
                      trigger={
                        <S.MoreButton>
                          <MoreVertical />
                        </S.MoreButton>
                      }
                      menu={[
                        <button type="button" onClick={handleEdit}>
                          Edit Profile
                        </button>,
                        <button type="button" onClick={() => handleDelete(profile)}>
                          Delete Profile
                        </button>,
                        <button type="button">Profile Summary</button>,
                      ]}
                    />
                  </S.Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.Card>
    </>
  );
});

export default ProfilesListPage;
