import { MenuBox, ItemBox } from './styles';
import { menuItems } from '../../constants';

function Menu() {
  return (
    <MenuBox>
      <ul>
        {menuItems.map((item) => (
          <ItemBox key={item.key}>{item.name}</ItemBox>
        ))}
      </ul>
    </MenuBox>
  );
}

export default Menu;
