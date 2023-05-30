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
import { useNavigate } from 'react-router-dom';
import { StoredBrowserProfile } from 'shared/models/stored-browser-profile';
import * as S from './styles';

const ConfirmDeletionMsg = ({ name }: { name: string }) => (
  <>
    Are you sure you want to delete the <strong>{name}</strong>
    &nbsp;browser profile?
  </>
);

const ProfilesListPage = observer(() => {
  const { profiles, startEditing, fetchProfiles, deleteProfile } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const launchProfile = async (id: string) => {
    await window.electron.api.launchProfile(id);
  };

  const handleEdit = (id: string) => {
    startEditing(id);
    navigate(`/profiles/${id}/edit/overview`);
  };

  const handleDelete = async (profile: StoredBrowserProfile) => {
    const confirmed = await confirm(<ConfirmDeletionMsg name={profile.name} />);
    if (confirmed) {
      deleteProfile(profile.id!);
    }
  };

  return (
    <>
      <PageTitle>Browser Profile List</PageTitle>
      <S.Card>
        <S.Table>
          <thead>
            <tr>
              <th className="name-col">Name</th>
              <th className="description-col">Description</th>
              <th>Status</th>
              <th className="last-launch-col">Last Launch</th>
              <th className="actions-col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td className="break-word">{profile.name}</td>
                <td className="break-word">
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
                        <button type="button" onClick={() => handleEdit(profile.id!)}>
                          Edit Profile
                        </button>,
                        <button type="button" onClick={() => handleDelete(profile)}>
                          Delete Profile
                        </button>,
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
