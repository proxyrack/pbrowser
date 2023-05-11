import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import FormError from 'renderer/components/ui/form-error/FormError';
import { BrowserProfile } from 'main/browser-profile/browser-profile';
import PageTitle from 'renderer/components/ui/page-title';
import Form from '../../components/ui/form';
import Input from '../../components/ui/input';
import Label from '../../components/ui/label/Label';
import * as S from './styles';
import Textarea from '../../components/ui/textarea/Textarea';
import ToggleButton from '../../components/ui/toggle-button';
import Button from '../../components/ui/button';
import Switch from '../../components/ui/switch';
import SettingsList from '../../components/settings-list';

const OverviewPage = () => {
  const navigate = useNavigate();

  const formControls = yup
    .object({
      profileName: yup.string().default('').required(),
      description: yup.string().default(''),
      os: yup.bool().default(true).oneOf([true]),
      pbrowser: yup.bool().default(true).oneOf([true]),
      fillBasedOnExternalIp: yup.bool().default(true),
    })
    .required();

  const handleSubmit = async (data: Object) => {
    const profile: BrowserProfile = {
      id: null,
      name: 'test',
      os: 'windows',
      fillBasedOnExternalIp: false,
    };
    const saveResult = await window.electron.api.saveProfile(profile);
    console.log('profile saved', saveResult);
  };
  const handleError = (errors: Object) => {
    console.log('form submission failed:', errors);
  };
  const handleProxyEdit = () => {};
  const handleGetNewFingerprint = () => {};
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <PageTitle>Overview</PageTitle>
      <Form controls={formControls} onSubmit={handleSubmit} onError={handleError}>
        <>
          <S.Row>
            <div>
              <Label htmlFor="ov-profile-name">Browser profile name*:</Label>
              <Input
                id="ov-profile-name"
                name="profileName"
                type="text"
                placeholder="Browser profile name"
                fullWidth
              />
              <FormError name="profileName" />
            </div>
          </S.Row>
          <S.Divider />

          <Label htmlFor="ov-description">Description:</Label>
          <Textarea
            id="ov-description"
            name="description"
            placeholder="Enter profile description"
          />
          <S.Divider />

          <Label htmlFor="ov-os">Operating system:</Label>
          <ToggleButton name="os" id="ov-os">
            macOS
          </ToggleButton>
          <S.Divider />

          <Label htmlFor="ov-pbrowser">Browser:</Label>
          <ToggleButton name="pbrowser" id="ov-pbrowser">
            Pbrowser
          </ToggleButton>
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
          <S.Spacer />
          <S.Card>
            <SettingsList />
          </S.Card>
          <S.Spacer />
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
