export interface BaseTheme {
  layout: {
    backgroundColor: string;
    primaryColor: string;
    linkColor: string;
  };
  fonts: {
    base: string;
    button: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  gradients: {
    primary: string;
    primaryTransparent: string;
  };
  palette: {
    info: string;
    warning: string;
    error: string;
    success: string;
  }
}