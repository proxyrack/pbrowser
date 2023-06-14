import { useNavigate } from 'react-router-dom';
import { useStore } from 'renderer/store';
import { confirm } from 'renderer/components/ui/confirm-dialog';
import {
  GeneralSettings,
  generalSettingsDefaults,
  generalSettingsSchema,
} from 'shared/models/renderer-data-schema';
import { ErrorReason } from 'shared/errors/error-reason';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DeepPartialSkipArrayKey } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import Form, { CustomFormError } from 'renderer/components/ui/form';
import Button from 'renderer/components/ui/button';
import ProfileSettingsLayout from 'renderer/components/profile-settings-layout';
import OverviewForm from 'renderer/components/overview-form';
import * as S from './styles';

type ProfileSavedMsgProps = {
  isEdit: boolean;
  name: string;
};
const ProfileSavedMsg = ({ isEdit, name }: ProfileSavedMsgProps) => {
  return (
    <span>
      The profile <strong>{name}</strong> is successfully {isEdit ? 'saved' : 'created'}.
    </span>
  );
};

const OverviewPage = observer(() => {
  const navigate = useNavigate();
  const {
    setGeneralSettings,
    finishEditing,
    saveProfile,
    profileSaveResult,
    editedProfileUnmodified,
    profileIsEdited,
  } = useStore();
  const [apiError, setApiError] = useState<Array<CustomFormError<GeneralSettings>>>([]);

  const resetAndRedirectHome = useCallback(() => {
    finishEditing();
    navigate('/');
  }, [finishEditing, navigate]);

  useEffect(() => {
    if (profileSaveResult === null) return;

    if (profileSaveResult.success) {
      toast.success(
        <ProfileSavedMsg name={profileSaveResult.data!.name} isEdit={profileIsEdited} />
      );
      resetAndRedirectHome();
      return;
    }

    if (profileSaveResult.error!.reason === ErrorReason.NotUnique) {
      setApiError([
        {
          name: 'name',
          error: { type: 'api_error', message: 'The profile name already exists.' },
          shouldFocus: true,
        },
      ]);
    }
  }, [profileSaveResult, profileIsEdited, resetAndRedirectHome]);

  const showConfirm = useCallback((): Promise<boolean> => {
    const msg = profileIsEdited
      ? 'Are you sure you want to cancel? The changes will be lost.'
      : 'Are you sure you want to cancel? The browser profile will not be saved.';
    return confirm(msg, {
      ok: { label: 'Yes', color: 'danger' },
      cancel: { label: 'No', color: 'secondary' },
    });
  }, [profileIsEdited]);

  const handleCancel = async () => {
    const confirmed = await showConfirm();
    if (confirmed) {
      resetAndRedirectHome();
    }
  };

  const handleSubmit = async () => {
    saveProfile();
  };

  const handleValuesChange = (data: DeepPartialSkipArrayKey<GeneralSettings>) => {
    setGeneralSettings(data as GeneralSettings);
  };

  return (
    <Form<GeneralSettings>
      schema={generalSettingsSchema}
      initialData={generalSettingsDefaults}
      data={editedProfileUnmodified?.general}
      customErrors={apiError}
      onSubmit={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <>
        <ProfileSettingsLayout
          title="Overview"
          content={<OverviewForm isEdit={profileIsEdited} />}
        />

        <S.Divider />

        <S.Actions>
          <Button type="button" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" color="outlined">
            Advanced Settings
          </Button>
          <Button type="submit" color="primary">
            {profileIsEdited ? 'Save Profile' : 'Create Basic Profile'}
          </Button>
        </S.Actions>
      </>
    </Form>
  );
});

export default OverviewPage;
