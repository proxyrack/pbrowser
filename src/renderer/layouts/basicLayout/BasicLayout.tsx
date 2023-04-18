import { ReactNode } from 'react';
import Menu from '../../components/menu';
import { MenuBox, ContentBox, LayoutBox } from './styles';

interface IBasicLayout {
  children: ReactNode;
}

function BasicLayout({ children }: IBasicLayout) {
  return (
    <LayoutBox>
      <MenuBox>
        <Menu />
      </MenuBox>
      <ContentBox>{children}</ContentBox>
    </LayoutBox>
  );
}

export default BasicLayout;
