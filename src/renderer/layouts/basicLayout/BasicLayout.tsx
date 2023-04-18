import Menu from '../../components/Menu';
import { MenuBox, ContentBox, LayoutBox } from './styles';

interface IBasicLayout {
  children: JSX.Element;
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
