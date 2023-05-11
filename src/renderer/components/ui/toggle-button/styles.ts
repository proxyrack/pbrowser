import { formControlBaseCss } from 'renderer/styles/sharedStyles';
import styled from 'styled-components';

export const ButtonBox = styled.label`
  position: relative;
  display: inline-block;
  height: 43px;
`;

export const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  :checked + span {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #c5b5ff;
  }
`;

export const Button = styled.span<{ isToggled: boolean }>`
  ${formControlBaseCss};
  position: absolute;
  left: 0;
  width: max-content;
  cursor: pointer;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.fontSecondary};
`;
