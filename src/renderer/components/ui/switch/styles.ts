import styled from 'styled-components';

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Checkbox = styled.input`
  height: 1.5rem;
  width: 2.8rem;
  appearance: none;
  margin: 0;
  background-color: #d5d2dc;
  transition-property: ${({ theme }) => theme.transitions.defaultProperty};
  transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
  transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};
  border-radius: 1.5rem;

  &:hover {
    cursor: pointer;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
  :checked:before {
    transform: translateX(1.3rem);
  }

  &::before {
    position: absolute;
    content: '';
    height: 1.15rem;
    width: 1.15rem;
    left: 0.175rem;
    bottom: calc(50% - 0.56rem);
    background-color: #fff;
    border-radius: 50%;
    transition-property: ${({ theme }) => theme.transitions.defaultProperty};
    transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
    transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};
  }
`;

export const Label = styled.label`
  flex: 1;
  line-height: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.fontDark};
`;
