import { createGlobalStyle } from 'styled-components';
import Theme from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    background-color: ${Theme.layout.backgroundColor};
    color: #ffffff;
    scroll-behavior: smooth;
    border-width: 4px;
    border-style: solid;
    border-image-slice: 1;
    border-image-source: ${Theme.gradients.primary};
    width: 100% !important;
    height: 100vh !important;
  }
  body {
    font-family: ${Theme.fonts.base};
    line-height: 1.1rem;
  }
  * {
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    outline: none;
    ::selection {
      background: ${Theme.layout.primaryColor}; /* WebKit/Blink Browsers */
      color: #ffffff;
    }
    ::-moz-selection {
      background: ${Theme.layout.primaryColor}; /* Gecko Browsers */
      color: #ffffff;
    }
  }
  a {
    color: #ffffff;
    text-decoration: none;
    transition: all 0.18s linear;
    .grow:hover {
      cursor: pointer;
    }
  }
  span {
    transition: all 0.18s linear;
  }
  button {
    font-family: ${Theme.fonts.base};
    border: none;
    transition: all 0.18s linear;
    &:hover {
      cursor: pointer;
    }
  }
  body::-webkit-scrollbar {
    width: 4rem;
  }
   
  body::-webkit-scrollbar-track {
    background-color: transparent;
  }
   
  body::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: 1px solid #111;
  }
`

export default GlobalStyle;