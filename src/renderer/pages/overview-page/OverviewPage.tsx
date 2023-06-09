import { useNavigate } from 'react-router-dom';
import FormError from 'renderer/components/ui/form-error';
import PageTitle from 'renderer/components/ui/page-title';
import CollapsibleAlert from 'renderer/components/ui/collapsible-alert';
import { useStore } from 'renderer/store';
import ToggleButtonsGroup from 'renderer/components/ui/toggle-buttons-group';
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
import Input from 'renderer/components/ui/input';
import Label from 'renderer/components/ui/label';
import Textarea from 'renderer/components/ui/textarea';
import Button from 'renderer/components/ui/button';
import Switch from 'renderer/components/ui/switch';
import SettingsList from 'renderer/components/settings-list';
import { OSS, BROWSERS } from 'renderer/constants';
import * as S from './styles';

const PROFILE_CREATION_INFO = {
  EXPANDED_P1:
    'To create a basic browser profile, simply enter the profile name, select the operating system, and the browser. If you need to use a proxy, you can also set this up at this point. Other fingerprint parameters will be added automatically.',
  EXPANDED_P2:
    'However, if you want to have more control over your fingerprint parameters, you can click the Advanced Settings button. This will allow you to configure all the fingerprint parameters according to your preferences.',
  COLLAPSED: 'Learn more about Profile Creation.',
};

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

  const handleProxyEdit = () => {};
  const handleGetNewFingerprint = () => {};

  return (
    <>
      <PageTitle>Overview</PageTitle>
      {!profileIsEdited && (
        <CollapsibleAlert
          expandedText={
            <>
              {PROFILE_CREATION_INFO.EXPANDED_P1} <br />
              {PROFILE_CREATION_INFO.EXPANDED_P2}
            </>
          }
          collapsedText={PROFILE_CREATION_INFO.COLLAPSED}
          collapsedInitially={false}
        />
      )}
      <S.Spacer height="2rem" />
      <Form<GeneralSettings>
        schema={generalSettingsSchema}
        initialData={generalSettingsDefaults}
        data={editedProfileUnmodified?.general}
        customErrors={apiError}
        onSubmit={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <>
          <S.Row>
            <div>
              <Label htmlFor="ov-profile-name">Browser Profile Name</Label>
              <Input
                id="ov-profile-name"
                name="name"
                maxlength={64}
                type="text"
                placeholder="Enter profile name"
                fullWidth
              />
              <FormError name="name" />
            </div>
          </S.Row>
          <S.Divider />

          <Label htmlFor="ov-description">Description</Label>
          <Textarea
            id="ov-description"
            name="description"
            placeholder="Enter profile description"
            maxlength={1000}
          />
          <FormError name="description" />
          <S.Divider />

          <Label>Operating System</Label>
          <ToggleButtonsGroup name="os" options={OSS} />
          <FormError name="os" />
          <S.Divider />

          <Label>Browser</Label>
          <ToggleButtonsGroup name="browser" options={BROWSERS} />
          <FormError name="browser" />
          <S.Divider />

          <Label>Proxy Settings</Label>
          <Button color="primary" onClick={handleProxyEdit}>
            Edit Proxy Settings
          </Button>
          <S.Divider />

          <Label htmlFor="ov-fill-based-on-ip">Timezone, WebRTC, Geolocation</Label>
          <Switch id="ov-fill-based-on-ip" name="fillBasedOnExternalIp">
            Fill Timezone, WebRTC, and Geolocation fingerprints based on the external IP
          </Switch>
          <S.Spacer height="1rem" />
          <S.Card>
            <SettingsList />
          </S.Card>
          <S.Spacer height="1rem" />
          <Button color="primary" onClick={handleGetNewFingerprint}>
            Get New Fingerprint
          </Button>
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
    </>
  );
});

export default OverviewPage;
