import styled from 'styled-components';
import * as LayoutStyles from '../../styles';

export const { Divider, MenuBox, MenuItemBox } = LayoutStyles;

export const MenuLink = styled(LayoutStyles.MenuLink)`
  &.active {
    background-color: ${({ theme }) => theme.colors.asideItemActive};
    font-weight: 700;
  }
  &.active > .nav-icon {
    color: #997fff;
  }
`;

export const MenuIcon = styled(LayoutStyles.MenuIcon)`
  background-color: unset;
  color: transparent;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  line-height: initial;
  padding: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 1rem;

  & > .title-icon {
    color: #fff;
    background-color: ${({ theme }) => `${theme.colors.primaryLighter}`};
  }
`;
