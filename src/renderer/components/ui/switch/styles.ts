import styled from 'styled-components';

export const SwitchBox = styled.label`
  position: relative;
  display: inline-block;
  height: 1.5rem;
  width: 2.8rem;
`;

export const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  :checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  :checked + span:before {
    transform: translateX(1.3rem);
  }
`;

export const Switch = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d5d2dc;
  transition: 0.3s;
  border-radius: 1.5rem;

  &::before {
    position: absolute;
    content: '';
    height: 1.15rem;
    width: 1.15rem;
    left: 0.175rem;
    bottom: 0.175rem;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
`;

export const Label = styled.span`
  position: absolute;
  left: 100%;
  width: max-content;
  line-height: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.fontDark};
`;
