import { useNavigate } from 'react-router-dom';
import { Check, AlertTriangle } from 'react-feather';
import Button from '../ui/button';
import * as S from './styles';

const SettingsList = () => {
  const navigate = useNavigate();
  const automaticSettings = [
    { title: 'Timezone', path: '/create/tz', status: true },
    { title: 'WebRTC', path: '/create/webrtc', status: false },
    { title: 'Geolocation', path: '/create/geolocation', status: true },
  ];

  const handleEdit = (path: string) => {
    navigate(path);
  };

  return (
    <S.SettingsList>
      {automaticSettings.map((setting) => (
        <S.SettingItem key={setting.title}>
          <div>{setting.title}</div>
          <S.Actions>
            <>
              <S.Status>
                {setting.status ? (
                  <S.Circle>
                    <Check size={16} />
                  </S.Circle>
                ) : (
                  <S.Triangle>
                    <AlertTriangle size={20} />
                  </S.Triangle>
                )}
              </S.Status>
              <Button size="s" color="invert" onClick={() => handleEdit(setting.path)}>
                Edit
              </Button>
            </>
          </S.Actions>
        </S.SettingItem>
      ))}
    </S.SettingsList>
  );
};

export default SettingsList;
