import { UIThemeProvider } from '@rbx/ui';
import React, { type FunctionComponent } from 'react';

const ModeResponsiveThemeProvider: FunctionComponent<
  React.PropsWithChildren<{ themeElement?: HTMLElement }>
> = ({ children, themeElement }) => {
  const defaultThemeMode = 'dark'; // hardcoded to dark

  return <UIThemeProvider theme={defaultThemeMode}>{children}</UIThemeProvider>;
};

export default ModeResponsiveThemeProvider;
