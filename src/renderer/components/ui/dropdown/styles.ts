import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Menu = styled.ul<{ position: string }>`
  position: absolute;
  ${({ position }) => position === 'left' && 'right: 0'};
  list-style-type: none;
  margin: 5px 0;
  padding: 0.25rem 0;
  border-radius: 5px;
  width: 180px;
  box-shadow: 0px 0px 16px rgba(69, 74, 79, 0.16);
  z-index: 1;
  background-color: #fff;

  &.drop-up {
    top: auto;
    bottom: 100%;
  }
`;

export const MenuItem = styled.li`
  margin: 0;
  background-color: white;
  font-size: 0.75rem;

  & button {
    width: 100%;
    height: 100%;
    text-align: left;
    background: none;
    color: inherit;
    border: none;
    padding: 0.5rem 1rem;
  }
  & button:disabled {
    color: ${({ theme }) => theme.colors.fontSecondary};
  }
  & button:not(:disabled) {
    cursor: pointer;
  }
  & button:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.fontLight};
    font-weight: 500;
  }
`;
