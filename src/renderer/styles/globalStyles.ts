import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html,
  body {
    margin: 0;
  }

  html,
  body,
  #root,
  input,
  textarea {
    font-family: 'Open Sans', sans-serif;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
