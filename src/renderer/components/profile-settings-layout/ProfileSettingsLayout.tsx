import { useStore } from 'renderer/store';
import { observer } from 'mobx-react-lite';
import * as S from './styles';
import ProfileSummary from '../profile-summary';
import PageTitle from '../ui/page-title';

type ProfileSettingsLayoutProps = {
  title: string;
  content: JSX.Element;
};

const ProfileSettingsLayout = observer(
  ({ title, content }: ProfileSettingsLayoutProps) => {
    const { editedProfile } = useStore();

    return (
      <>
        <PageTitle>{title}</PageTitle>
        <S.ContentBox2Cols>
          <S.FieldsetContainer>{content}</S.FieldsetContainer>
          <S.SummaryContainer>
            <S.SummaryTitle>Profile Summary</S.SummaryTitle>
            {editedProfile && <ProfileSummary profile={editedProfile} />}
          </S.SummaryContainer>
        </S.ContentBox2Cols>
      </>
    );
  }
);

export default ProfileSettingsLayout;
