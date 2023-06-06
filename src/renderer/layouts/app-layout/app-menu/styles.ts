import styled from 'styled-components';
import Button from 'renderer/components/ui/button';
import * as LayoutStyles from '../../styles';

export const { Divider, MenuBox, MenuItemBox, MenuIcon } = LayoutStyles;

export const MenuLink = styled(LayoutStyles.MenuLink)`
  text-transform: uppercase;
  &.active > .nav-icon {
    color: #fff;
    background-color: ${({ theme }) => `${theme.colors.primaryLighter}`};
  }
`;

export const MenuButton = styled(Button)`
  font-size: 1rem;
`;
