import styled, { DefaultThemeColors } from 'styled-components';
import { ButtonColor } from './button-colors';

const backgroudColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primary',
  primaryLight: 'primaryLight',
  secondary: 'secondary',
  invert: 'backgroundMain',
  danger: 'dangerLighter',
  outlined: 'backgroundMain',
};
const fontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontSecondary',
  invert: 'primaryLighter',
  danger: 'fontLight',
  outlined: 'primary',
};
const hoverBackgroudColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primaryLight',
  primaryLight: 'primaryLight',
  secondary: 'primary',
  invert: 'secondary',
  danger: 'danger',
  outlined: 'primaryLight',
};
const hoverFontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontLight',
  invert: 'primaryLight',
  danger: 'fontLight',
  outlined: 'fontLight',
};
const activeBackgroundColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'primary',
  primaryLight: 'primaryLight',
  secondary: 'primary',
  invert: 'primary',
  danger: 'danger',
  outlined: 'primary',
};
const disabledBackgroundColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'disabledDark',
  primaryLight: 'disabledDark',
  secondary: 'disabledDark',
  invert: 'secondary',
  danger: 'disabledDark',
  outlined: 'backgroundMain',
};
const disabledFontColor: Record<ButtonColor, keyof DefaultThemeColors> = {
  primary: 'fontLight',
  primaryLight: 'fontLight',
  secondary: 'fontLight',
  invert: 'disabledDark',
  danger: 'fontLight',
  outlined: 'disabledDark',
};

export const Button = styled.button.attrs((props) => ({ type: props.type }))<{
  fullWidth: boolean;
  size: string;
  color: ButtonColor;
}>`
  font-size: 0.875rem;
  font-weight: 700;
  border-style: ${({ color }) => (color === 'outlined' ? 'solid' : 'unset')};
  border-width: 1px;
  border-color: inherit;
  border-radius: 4px;
  ${({ size }) => size === 'm' && 'padding: 0.625rem 2rem'};
  ${({ size }) => size === 's' && 'padding: 0.5rem 1.5rem'};
  ${(props) => props.fullWidth && `width: 100%`};
  color: ${({ theme, color }) => theme.colors[fontColor[color]]};
  background-color: ${({ theme, color }) => theme.colors[backgroudColor[color]]};
  transition-property: ${({ theme }) => theme.transitions.defaultProperty};
  transition-duration: ${({ theme }) => theme.transitions.defaultDuration};
  transition-timing-function: ${({ theme }) => theme.transitions.defaultFunction};

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
