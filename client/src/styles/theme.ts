import { BaseTheme } from "./base-theme";

const Theme: BaseTheme = {
  layout: {
    backgroundColor: `#151325`,
    primaryColor: `#ffffff`,
    linkColor: `#5E42D6`,
  },
  breakpoints: {
    xs: `425px`,
    sm: `576px`,
    md: `768px`,
    lg: `892px`,
    xl: `1000px`,
  },
  fonts: {
    base: `IBM Plex Mono, monospace`,
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primaryTransparent: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(17,17,17,0.5) 100%)'
  },
  palette: {
    info: '#cdcdcd',
    warning: '#ffdd00',
    error: '#ed1c24',
    success: '#0abf53'
  }
};

export default Theme;