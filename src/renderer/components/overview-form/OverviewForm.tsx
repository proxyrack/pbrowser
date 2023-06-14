import { OSS, BROWSERS } from 'renderer/constants';
import * as S from './styles';
import SettingsList from '../settings-list';
import Button from '../ui/button';
import CollapsibleAlert from '../ui/collapsible-alert';
import FormError from '../ui/form-error';
import Input from '../ui/input';
import Label from '../ui/label';
import Switch from '../ui/switch';
import Textarea from '../ui/textarea';
import ToggleButtonsGroup from '../ui/toggle-buttons-group';

const PROFILE_CREATION_INFO = {
  EXPANDED_P1:
    'To create a basic browser profile, simply enter the profile name, select the operating system, and the browser. If you need to use a proxy, you can also set this up at this point. Other fingerprint parameters will be added automatically.',
  EXPANDED_P2:
    'However, if you want to have more control over your fingerprint parameters, you can click the Advanced Settings button. This will allow you to configure all the fingerprint parameters according to your preferences.',
  COLLAPSED: 'Learn more about Profile Creation.',
};

type OverviewFormProps = {
  isEdit: boolean;
};

const OverviewForm = ({ isEdit }: OverviewFormProps) => {
  const handleProxyEdit = () => {};
  const handleGetNewFingerprint = () => {};

  return (
    <>
      {!isEdit && (
        <div>
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
          <S.Spacer height="2rem" />
        </div>
      )}
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
    </>
  );
};

export default OverviewForm;
