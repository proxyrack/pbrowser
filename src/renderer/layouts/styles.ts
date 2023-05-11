import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;
export const SidebarBox = styled.aside`
  background-color: ${({ theme }) => theme.colors.backgroundAside};
  width: 300px;
  min-width: 300px;
  padding: 1.5rem;
  overflow: hidden;
`;
export const ContentBox = styled.main`
  background-color: ${({ theme }) => theme.colors.backgroundMain};
  width: 100%;
  padding: 1.5rem 2.5rem;
  overflow-y: scroll;
`;
export const Divider = styled.hr`
  border-color: ${({ theme }) => theme.colors.asideItemActive};
  margin: 1.5rem 0;
`;
export const MenuBox = styled.ul`
  width: 100%;
`;
export const MenuItemBox = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;
`;
export const MenuIcon = styled.div`
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.primaryLighter}22`};
  padding: 0.375rem;
  margin-right: 1rem;
  color: #b4a0ff;

  & > svg {
    display: block;
  }
`;
export const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  line-height: initial;
  padding: 0.25rem 0.5rem;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.asideItemActive};
  }
`;
