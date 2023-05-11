import 'styled-components';

declare module 'styled-components' {
  export interface DefaultThemeColors {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    secondary: string;
    backgroundMain: string;
    backgroundAside: string;
    asideItemActive: string;
    fontLight: string;
    fontDark: string;
    fontSecondary: string;
    success: string;
    danger: string;
    disabledDark: string;
  }
  export interface DefaultTheme {
    colors: DefaultThemeColors;
  }
}
