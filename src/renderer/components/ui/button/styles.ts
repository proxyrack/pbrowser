import styled, { DefaultThemeColors } from 'styled-components';
import { ButtonColor } from './button-colors';

const backgroudColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primary',
  primaryLight: 'primaryLight',
  secondary: 'secondary',
  invert: 'backgroundMain',
};
const fontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontSecondary',
  invert: 'primaryLighter',
};
const hoverBackgroudColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primaryLight',
  primaryLight: 'primaryLight',
  secondary: 'primary',
  invert: 'secondary',
};
const hoverFontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontLight',
  invert: 'primaryLight',
};
const activeBackgroundColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primary',
  primaryLight: 'primaryLight',
  secondary: 'primary',
  invert: 'primary',
};
const disabledBackgroundColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'disabledDark',
  primaryLight: 'disabledDark',
  secondary: 'disabledDark',
  invert: 'secondary',
};
const disabledFontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontLight',
  invert: 'disabledDark',
};

export const Button = styled.button.attrs((props) => ({ type: props.type }))<{
  fullWidth: boolean;
  size: string;
  color: ButtonColor;
}>`
  font-size: 0.875rem;
  font-weight: 700;
  border-style: none;
  border-radius: 4px;
  ${({ size }) => size === 'm' && 'padding: 0.625rem 2rem'};
  ${({ size }) => size === 's' && 'padding: 0.5rem 1.5rem'};
  ${(props) => props.fullWidth && `width: 100%`};
  color: ${({ theme, color }) => theme.colors[fontColor[color]]};
  background-color: ${({ theme, color }) => theme.colors[backgroudColor[color]]};

  &:not(:disabled) {
    cursor: pointer;
  }
  &:hover {
    background-color: ${({ theme, color }) => theme.colors[hoverBackgroudColor[color]]};
    color: ${({ theme, color }) => theme.colors[hoverFontColor[color]]};
  }
  &:active {
    background-color: ${({ theme, color }) => theme.colors[activeBackgroundColor[color]]};
    color: ${({ theme }) => theme.colors.fontLight};
  }
  &:disabled {
    background-color: ${({ theme, color }) =>
      theme.colors[disabledBackgroundColor[color]]};
    color: ${({ theme, color }) => theme.colors[disabledFontColor[color]]};
  }
`;
