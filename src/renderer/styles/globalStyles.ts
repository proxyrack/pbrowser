import { createGlobalStyle } from 'styled-components';
import UbuntuBold500 from '../fonts/ubuntu-v20-latin-500.woff2';
import UbuntuBold700 from '../fonts/ubuntu-v20-latin-700.woff2';
import UbuntuItalic from '../fonts/ubuntu-v20-latin-italic.woff2';
import UbuntuRegular from '../fonts/ubuntu-v20-latin-regular.woff2';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-display: swap;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    src: url(${UbuntuRegular}) format('woff2');
  }

  @font-face {
    font-display: swap;
    font-family: 'Ubuntu';
    font-weight: 500;
    src: url(${UbuntuBold500}) format('woff2');
  }

  @font-face {
    font-display: swap;
    font-family: 'Ubuntu';
    font-weight: 700;
    src: url(${UbuntuBold700}) format('woff2');
  }

  @font-face {
    font-display: swap;
    font-family: 'Ubuntu';
    font-style: italic;
    src: url(${UbuntuItalic}) format('woff2');
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  blockquote,
  ul {
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1rem;
  }

  html,
  body,
  #root,
  input,
  textarea {
    font-family: 'Ubuntu', sans-serif;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    :focus-visible {
      outline: none;
    }
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

`;

export default GlobalStyle;
