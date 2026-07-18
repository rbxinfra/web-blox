import { createTheme } from '@mui/material/styles';
import type { Palette, ThemeOptions } from '@mui/material/styles';

import { paperClasses } from '@mui/material/Paper';
import { menuItemClasses } from '@mui/material/MenuItem';

import typography, { fontFaces } from './typography';
import shadows from './shadows';
import { parseFontFaces, bodyOverride, joinStringOverrides } from './typographyHelpers';

import border from './border';
import { darkElevation, lightElevation } from './elevation';

import darkPalette from './darkPalette';
import lightPalette from './lightPalette';

import type { TElevation } from './types/elevationTypes';
import type { TTheme } from './types/themeTypes';
import type { TBorder } from './types/borderTypes';
import type { TPalette } from './types/colorPaletteTypes';

// ── MUI module augmentation ───────────────────────────────────────────────────

declare module '@mui/material/styles' {
  // Change Theme to be TTheme
  interface Theme {
    elevation: TElevation;
    border: TBorder;
    palette: TPalette & Palette;
  }

  interface ThemeOptions {
    elevation?: TElevation;
    border?: TBorder;
  }

  interface TypeBackground {
    tooltips: string;
    media: string;
    snackbar: string;
  }

  interface BreakpointOverrides {
    // Disable standard MUI breakpoints
    xs: true;  // kept for MUI internals compatibility
    sm: true;
    md: true;
    lg: true;
    xl: true;
    // Roblox breakpoints

    XSmall: true;
    Small: true;
    Medium: true;
    Large: true;
    XLarge: true;
    XXLarge: true;
  }

  // Override the returnType of createTheme to be TTheme
  function createTheme(options?: ThemeOptions): TTheme;
};

// ── Theme factory ─────────────────────────────────────────────────────────────

function buildThemeOptions(
  palette: typeof darkPalette | typeof lightPalette,
  elevation: TElevation,
): ThemeOptions {
  return {
    typography,
    palette,
    shadows,
    elevation,
    border,
    breakpoints: {
      values: {
        // MUI standard (kept for internal compatibility)
        xs: 0,
        sm: 601,
        md: 1141,
        lg: 1521,
        xl: 1921,
        // Roblox named breakpoints
        XSmall: 0,
        Small: 361,
        Medium: 601,
        Large: 1141,
        XLarge: 1521,
        XXLarge: 1921,
      },
    },
    components: {
      MuiSvgIcon: {
        variants: [
          { props: { fontSize: 'large' as const }, style: { fontSize: 24 } },
          { props: { fontSize: 'medium' as const }, style: { fontSize: 20 } },
          { props: { fontSize: 'small' as const }, style: { fontSize: 16 } },
        ],
      },
      MuiCssBaseline: {
        styleOverrides: joinStringOverrides(
          parseFontFaces(fontFaces),
          bodyOverride(typography.body2),
        ),
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            [`&.${menuItemClasses.selected}`]: {
              backgroundColor: palette.action.selected,
              [`&.${menuItemClasses.focusVisible}`]: { backgroundColor: palette.action.selected },
              [`&:hover`]: { backgroundColor: palette.action.selected },
            },
          },
        },
      },
      MuiPopper: {
        defaultProps: { sx: { ...border.radius.large } },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiPickersPopper-paper': { ...border.radius.large },
            [`&.${paperClasses.elevation}`]: { backgroundImage: 'none' },
          },
        },
      },
    },
  };
}

export const darkTheme: TTheme = createTheme(buildThemeOptions(darkPalette, darkElevation));
export const lightTheme: TTheme = createTheme(buildThemeOptions(lightPalette, lightElevation));

export type { TTheme };