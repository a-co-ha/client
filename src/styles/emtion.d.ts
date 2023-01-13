import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
    };
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

export default Theme;
