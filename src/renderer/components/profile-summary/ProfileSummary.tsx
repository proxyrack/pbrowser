import { ManageBrowserProfileDto } from 'shared/models';
import { BROWSERS, OSS } from 'renderer/constants';
import * as S from './styles';

const NOT_SPECIFIED = 'Not specified';

type ProfileSummaryProps = {
  profile: ManageBrowserProfileDto;
};

const ProfileSummary = ({ profile }: ProfileSummaryProps) => {
  return (
    <S.Container>
      <S.Row>
        <S.Label>Profile name:</S.Label>
        <S.Value>{profile.general?.name || NOT_SPECIFIED}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Proxy:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Browser:</S.Label>
        <S.Value>
          {profile.general?.browser
            ? BROWSERS.find((browser) => browser.value === profile.general?.browser)?.text
            : NOT_SPECIFIED}
        </S.Value>
      </S.Row>
      <S.Row>
        <S.Label>OS:</S.Label>
        {profile.general?.os
          ? OSS.find((os) => os.value === profile.general?.os)?.text
          : NOT_SPECIFIED}
      </S.Row>
      <S.Row>
        <S.Label>User-Agent:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Resolution:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Languages:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Platform:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Timezone:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Geolocation:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>WebRTC:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Canvas:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>WebGl metadata:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>WebGl image:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>WebGl vendor:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>WebGl renderer:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>AudioContext:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Fonts:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Media devices:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Local Storage:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>External Storage:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Plugins:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Flash:</S.Label>
        <S.Value>-</S.Value>
      </S.Row>
    </S.Container>
  );
};

export default ProfileSummary;
