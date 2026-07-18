import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme, lightTheme } from './theme';
import { customThemes } from './customTheming';
import { NoSSR } from '../utils/utils';

export interface TUIThemeProviderProps {
  /**
   * Which theme to apply.
   * - `'dark'`  — Roblox dark theme (default)
   * - `'light'` — Roblox light theme
   * - any other string — a custom theme registered with `registerCustomTheme()`
   */
  theme?: 'dark' | 'light' | (string & NonNullable<unknown>);

  /**
   * Controls when MuiCssBaseline is rendered.
   * - `'enabled'`     — render immediately (default)
   * - `'client-only'` — wrap in NoSsr to avoid SSR hydration mismatches
   * - `'disabled'`    — don't render CssBaseline at all
   */
  cssBaselineMode?: 'enabled' | 'client-only' | 'disabled';

  children?: React.ReactNode;
}

function UIThemeProvider({
  theme: themeKey = 'dark',
  cssBaselineMode = 'enabled',
  children,
}: TUIThemeProviderProps): React.ReactElement {
  const resolvedTheme = (() => {
    switch (themeKey) {
      case 'dark':  return darkTheme;
      case 'light': return lightTheme;
      default:      return customThemes[themeKey] ?? darkTheme;
    }
  })();

  const baseline = (() => {
    switch (cssBaselineMode) {
      case 'enabled':
        return <CssBaseline enableColorScheme />;
      case 'client-only':
        return <NoSSR><CssBaseline enableColorScheme /></NoSSR>;
      case 'disabled':
        return null;
    }
  })();

  return (
    <ThemeProvider theme={resolvedTheme}>
      {baseline}
      {children}
    </ThemeProvider>
  );
}

export default UIThemeProvider;