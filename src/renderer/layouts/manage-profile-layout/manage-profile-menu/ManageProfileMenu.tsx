import { Disc, User } from 'react-feather';
import * as S from './styles';
import { menuItems } from './menu-items';

const ManageProfileMenu = () => {
  return (
    <>
      <S.Divider />
      <S.MenuBox>
        <S.MenuItemBox>
          <S.Title>
            <S.MenuIcon className="title-icon">
              <User size={20} />
            </S.MenuIcon>
            New Browser Profile
          </S.Title>
        </S.MenuItemBox>
        {menuItems.map((item) => (
          <S.MenuItemBox key={item.key}>
            <S.MenuLink to={item.path}>
              <S.MenuIcon className="nav-icon">
                <Disc size={20} />
              </S.MenuIcon>
              {item.name}
            </S.MenuLink>
          </S.MenuItemBox>
        ))}
      </S.MenuBox>
    </>
  );
};

export default ManageProfileMenu;
