import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const SidebarBox = styled.aside`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 300px;
  min-width: 300px;
  height: 100vh;
  padding: 1.5rem;
  overflow: auto;
  position: fixed;
`;
export const ContentBox = styled.main`
  width: 100%;
  padding: 1.5rem 2.5rem;
  margin-left: 300px;
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
  transition-property: ${({ theme }) => theme.transitions.defaultProperty};
  transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
  transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};

  &:hover {
    background-color: ${({ theme }) => theme.colors.asideItemActive};
  }
`;
