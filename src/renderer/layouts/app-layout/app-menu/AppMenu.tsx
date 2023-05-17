import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { menuItems } from './menu-items';

const AppMenu = () => {
  const navigate = useNavigate();
  const handleCreateProfile = () => {
    navigate('/profiles/new/overview');
  };

  return (
    <>
      <S.MenuButton color="primaryLight" fullWidth onClick={handleCreateProfile}>
        Create Profile
      </S.MenuButton>
      <S.Divider />
      <S.MenuBox>
        {menuItems.map((item) => (
          <S.MenuItemBox key={item.key}>
            <S.MenuLink to={item.path}>
              <S.MenuIcon className="nav-icon">
                <item.icon />
              </S.MenuIcon>
              {item.name}
            </S.MenuLink>
          </S.MenuItemBox>
        ))}
      </S.MenuBox>
    </>
  );
};

export default AppMenu;
