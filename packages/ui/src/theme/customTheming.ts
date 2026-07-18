import { createTheme } from '@mui/material/styles';
import type { TTheme } from './theme';

// Registry of custom themes registered via registerCustomTheme().
// UIThemeProvider falls back to darkTheme if the key isn't found.
export const customThemes: Record<string, TTheme> = {};

/**
 * Register a custom theme under a named key.
 * Pass the key as `theme` prop to UIThemeProvider to activate it.
 *
 * @example
 * registerCustomTheme('my-brand', createTheme({ ... }));
 * <UIThemeProvider theme="my-brand">...</UIThemeProvider>
 */
export default function registerCustomTheme(
  key: string,
  ...args: Parameters<typeof createTheme>
): void {
  customThemes[key] = createTheme(...args);
}