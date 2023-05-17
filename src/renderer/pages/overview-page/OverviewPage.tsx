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
import { useState } from 'react';
import { toast } from 'react-toastify';
import Form, { CustomFormError } from '../../components/ui/form';
import Input from '../../components/ui/input';
import Label from '../../components/ui/label';
import * as S from './styles';
import Textarea from '../../components/ui/textarea';
import Button from '../../components/ui/button';
import Switch from '../../components/ui/switch';
import SettingsList from '../../components/settings-list';

const PROFILE_CREATION_INFO = {
  EXPANDED_P1:
    'To create a basic browser profile, simply enter the profile name, select the operating system, and the browser. If you need to use a proxy, you can also set this up at this point. Other fingerprint parameters will be added automatically.',
  EXPANDED_P2:
    'However, if you want to have more control over your fingerprint parameters, you can click the Advanced Settings button. This will allow you to configure all the fingerprint parameters according to your preferences.',
  COLLAPSED: 'Learn more about Profile Creation.',
};
const OSS = [{ id: 'ov-os-mac', value: 'macos', text: 'masOs' }];
const BROWSERS = [{ id: 'ov-br-chrome', value: 'chrome', text: 'Chrome' }];

const OverviewPage = () => {
  const navigate = useNavigate();
  const { setGeneralSettings, finishEditing } = useStore();
  const [apiError, setApiError] = useState<Array<CustomFormError<GeneralSettings>>>([]);

  const resetAndRedirectHome = () => {
    finishEditing();
    navigate('/');
  };

  const showConfirm = (): Promise<boolean> => {
    return confirm(
      'Are you sure you want to cancel? The browser profile will not be saved.',
      {
        ok: { label: 'Yes', color: 'danger' },
        cancel: { label: 'No', color: 'secondary' },
      }
    );
  };

  const handleCancel = async () => {
    const confirmed = await showConfirm();
    if (confirmed) {
      resetAndRedirectHome();
    }
  };

  const handleSubmit = async (data: GeneralSettings) => {
    const response = await window.electron.api.saveProfile(data);
    if (typeof response?.error === 'undefined') {
      toast.success(
        <>
          The profile <strong>${data.name}</strong> is successfully created.
        </>
      );
      resetAndRedirectHome();
      return;
    }

    if (response.error.reason === ErrorReason.NotUnique) {
      setApiError([
        {
          name: 'name',
          error: { type: 'api_error', message: 'The profile name already exists.' },
          shouldFocus: true,
        },
      ]);
    }
  };

  const handleBlur = (data: GeneralSettings) => {
    setGeneralSettings(data);
  };

  const handleProxyEdit = () => {};
  const handleGetNewFingerprint = () => {};

  return (
    <>
      <PageTitle>Overview</PageTitle>
      <CollapsibleAlert
        expandedText={
          <>
            {PROFILE_CREATION_INFO.EXPANDED_P1} <br /> {PROFILE_CREATION_INFO.EXPANDED_P2}
          </>
        }
        collapsedText={PROFILE_CREATION_INFO.COLLAPSED}
        collapsedInitially={false}
      />
      <S.Spacer height="2rem" />
      <Form<GeneralSettings>
        schema={generalSettingsSchema}
        initialData={generalSettingsDefaults}
        customErrors={apiError}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <>
          <S.Row>
            <div>
              <Label htmlFor="ov-profile-name">Browser profile name*:</Label>
              <Input
                id="ov-profile-name"
                name="name"
                maxlength={64}
                type="text"
                placeholder="Browser profile name"
                fullWidth
              />
              <FormError name="name" />
            </div>
          </S.Row>
          <S.Divider />

          <Label htmlFor="ov-description">Description:</Label>
          <Textarea
            id="ov-description"
            name="description"
            placeholder="Enter profile description"
            maxlength={1000}
          />
          <FormError name="description" />
          <S.Divider />

          <Label>Operating system:</Label>
          <ToggleButtonsGroup name="os" options={OSS} />
          <FormError name="os" />
          <S.Divider />

          <Label>Browser:</Label>
          <ToggleButtonsGroup name="browser" options={BROWSERS} />
          <FormError name="browser" />
          <S.Divider />

          <Label>Proxy Settings:</Label>
          <Button color="primary" onClick={handleProxyEdit}>
            Edit Proxy settings
          </Button>
          <S.Divider />

          <Label htmlFor="ov-fill-based-on-ip">Timezone, WebRTC, Geolocation:</Label>
          <Switch id="ov-fill-based-on-ip" name="fillBasedOnExternalIp">
            Fill Timezone, WebRTC, and Geolocation fingerprints based on the external IP
          </Switch>
          <S.Spacer height="1rem" />
          <S.Card>
            <SettingsList />
          </S.Card>
          <S.Spacer height="1rem" />
          <Button color="primary" onClick={handleGetNewFingerprint}>
            Get new fingerprint
          </Button>
          <S.Divider />

          <S.Actions>
            <Button type="button" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create Basic Profile
            </Button>
          </S.Actions>
        </>
      </Form>
    </>
  );
};

export default OverviewPage;
