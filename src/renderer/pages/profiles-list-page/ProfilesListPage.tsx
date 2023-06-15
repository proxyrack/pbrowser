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
import { StoredBrowserProfile, BrowserStatus } from 'shared/models';
import StatusLabel from 'renderer/components/status-label';
import * as S from './styles';

const NOT_EDITABLE_STATUSES = [
  BrowserStatus.Active,
  BrowserStatus.PendingActive,
  BrowserStatus.PendingInactive,
];

const ConfirmDeletionMsg = ({ name }: { name: string }) => (
  <>
    Are you sure you want to delete the <strong>{name}</strong>
    &nbsp;browser profile?
  </>
);

const ProfilesListPage = observer(() => {
  const {
    profiles,
    startEditing,
    fetchProfiles,
    fetchStatuses,
    deleteProfile,
    startBrowser,
    stopBrowser,
    deleteSession,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

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

  const handleSessionDelete = async (id: string, name: string) => {
    const confirmed = await confirm(
      <span>
        Are you sure you want to delete the <strong>{name}</strong> session data?
      </span>
    );
    if (confirmed) {
      deleteSession(id);
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
              <th className="status-col">Status</th>
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
                <td>
                  <StatusLabel status={profile.status} />
                </td>
                <td>
                  <RelativeDate datetime={profile.lastLaunchDate} />
                </td>
                <td>
                  <S.Actions>
                    {(profile.status === BrowserStatus.Inactive ||
                      profile.status === BrowserStatus.PendingActive ||
                      profile.status === BrowserStatus.StartError) && (
                      <Button
                        type="button"
                        color="primary"
                        size="s"
                        disabled={profile.status === BrowserStatus.PendingActive}
                        onClick={() => startBrowser(profile.id!)}
                      >
                        Start
                      </Button>
                    )}
                    {(profile.status === BrowserStatus.Active ||
                      profile.status === BrowserStatus.PendingInactive ||
                      profile.status === BrowserStatus.StopError) && (
                      <Button
                        type="button"
                        color="danger"
                        size="s"
                        disabled={profile.status === BrowserStatus.PendingInactive}
                        onClick={() => stopBrowser(profile.id!)}
                      >
                        Stop
                      </Button>
                    )}
                    <Dropdown
                      position="left"
                      trigger={
                        <S.MoreButton>
                          <MoreVertical />
                        </S.MoreButton>
                      }
                      menu={[
                        <button
                          type="button"
                          disabled={NOT_EDITABLE_STATUSES.includes(profile.status)}
                          onClick={() => handleEdit(profile.id!)}
                        >
                          Edit Profile
                        </button>,
                        <button
                          type="button"
                          disabled={NOT_EDITABLE_STATUSES.includes(profile.status)}
                          onClick={() => handleDelete(profile)}
                        >
                          Delete Profile
                        </button>,
                        <button
                          type="button"
                          disabled={NOT_EDITABLE_STATUSES.includes(profile.status)}
                          onClick={() => handleSessionDelete(profile.id!, profile.name)}
                        >
                          Delete Sessions Data
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
