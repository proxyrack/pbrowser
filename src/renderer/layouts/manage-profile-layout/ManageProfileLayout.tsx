import { Outlet } from 'react-router-dom';
import Logo from 'renderer/components/ui/logo';
import * as S from '../styles';
import ManageProfileMenu from './manage-profile-menu';

const ManageProfileLayout = () => {
  return (
    <S.LayoutBox>
      <S.SidebarBox>
        <Logo />
        <ManageProfileMenu />
      </S.SidebarBox>
      <S.ContentBox>
        <Outlet />
      </S.ContentBox>
    </S.LayoutBox>
  );
};

export default ManageProfileLayout;
