import AppMenu from 'renderer/layouts/app-layout/app-menu';
import Logo from 'renderer/components/ui/logo';
import { Outlet } from 'react-router-dom';
import * as S from '../styles';

const AppLayout = (): JSX.Element => {
  return (
    <S.LayoutBox>
      <S.SidebarBox>
        <Logo />
        <AppMenu />
      </S.SidebarBox>
      <S.ContentBox>
        <Outlet />
      </S.ContentBox>
    </S.LayoutBox>
  );
};

export default AppLayout;
