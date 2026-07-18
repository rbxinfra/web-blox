/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */

import { UIBloxDark, UIBloxLight } from '@rbx/design-foundations';

import { alpha as muiAlpha } from '../utils/utils';
import { blue, gray, red, yellow, green, alpha, alert } from './colorScales';

import type { TDeprecatedPalette } from './types/colorPaletteTypes';

export const darkDeprecatedPalettes: TDeprecatedPalette = {
  primary: {
    main: blue[800],
    light: blue[300],
    dark: blue[700],
    contrastText: gray[1200],
  },
  statePrimary: {
    containedHoverBackground: '#3C87B3',
    outlinedHoverBackground: '#292D2F',
    outlinedRestingBorder: '#4E768E',
  },
  secondary: {
    main: gray[300],
    light: gray[100],
    dark: gray[500],
    contrastText: muiAlpha(gray.black, 0.87),
  },
  stateSecondary: {
    containedHoverBackground: '#898989',
    outlinedHoverBackground: muiAlpha(gray[100], 0.16),
    outlinedRestingBorder: gray[600],
  },
  error: {
    main: red[500],
    dark: red[700],
    light: red[300],
    contrastText: gray[1200],
  },
  stateError: {
    containedHoverBackground: '#AB2F26',
    outlinedHoverBackground: muiAlpha('#F44336', 0.08),
    outlinedRestingBorder: muiAlpha('#F44336', 0.5),
  },
  alertError: { content: red[300], background: red[1100] },
  info: {
    main: blue[500],
    dark: blue[700],
    light: blue[300],
    contrastText: gray[1200],
  },
  stateInfo: {
    containedHoverBackground: '#0071B3',
    outlinedHoverBackground: muiAlpha(blue[600], 0.5),
    outlinedRestingBorder: muiAlpha(blue[600], 0.16),
  },
  alertInfo: { content: blue[300], background: blue[1100] },
  warning: {
    main: yellow[500],
    dark: yellow[700],
    light: yellow[300],
    contrastText: muiAlpha(gray[1200], 0.87),
  },
  stateWarning: {
    containedHoverBackground: '#AD8B30',
    outlinedHoverBackground: muiAlpha(yellow[600], 0.5),
    outlinedRestingBorder: muiAlpha(yellow[600], 0.16),
  },
  alertWarning: { content: yellow[300], background: yellow[1100] },
  success: {
    main: green[500],
    dark: green[700],
    light: green[300],
    contrastText: gray[1200],
  },
  stateSuccess: {
    containedHoverBackground: '#008146',
    outlinedHoverBackground: muiAlpha(green[500], 0.5),
    outlinedRestingBorder: muiAlpha(green[500], 0.16),
  },
  alertSuccess: { content: green[300], background: green[1100] },
  text: {
    primary: gray.white,
    secondary: gray[500],
    disabled: gray[600],
  },
  action: {
    active: gray[100],
    hover: alpha.white[100],
    selected: alpha.white[150],
    disabled: gray[600],
    disabledBackground: gray[800],
    focus: muiAlpha(gray.white, 0.12),
  },
  background: {
    default: UIBloxDark.Color.Surface.Surface_0,
    tooltips: gray[700],
    media: gray[900],
    snackbar: gray[900],
    paper: gray[1000],
  },
  foreground: { paper: gray[900], main: gray[700], secondary: gray[600] },
  media: {
    secondaryBackground: gray[1000],
    toolbar: gray[800],
    divider: gray[700],
    bottomOverlay: 'linear-gradient(0deg, rgba(29, 29, 29, 0.6), rgba(29, 29, 29, 0))',
    inlineCodeBackground: gray[800],
    topOverlay: 'linear-gradient(180deg, rgba(29, 29, 29, 0.6), rgba(29, 29, 29, 0))',
  },
  layout: { divider: gray.black },
  stickyFooter: { defaultFill: muiAlpha(gray[1200], 0.8) },
  divider: gray[700],
  outlineBorder: gray[700],
  standardInputLine: muiAlpha(gray.white, 0.42),
  backdropOverlay: muiAlpha(gray[1000], 0.5),
  activeRating: yellow[700],
  filledInputBackground: muiAlpha(gray.white, 0.09),
} as const;

export const lightDeprecatedPalettes: TDeprecatedPalette = {
  primary: {
    main: blue[800],
    light: blue[500],
    dark: blue[700],
    contrastText: gray.white,
  },
  statePrimary: {
    containedHoverBackground: blue[800],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  secondary: {
    main: gray[1200],
    light: gray[100],
    dark: gray[1200],
    contrastText: gray.white,
  },
  stateSecondary: {
    containedHoverBackground: gray[800],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  error: {
    main: alert.red,
    dark: alert.red,
    light: alert.red,
    contrastText: gray.white,
  },
  stateError: {
    containedHoverBackground: red[800],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  alertError: { content: red[1000], background: red[100] },
  info: {
    main: blue[700],
    light: blue[500],
    dark: blue[700],
    contrastText: gray.white,
  },
  stateInfo: {
    containedHoverBackground: blue[800],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  alertInfo: { content: blue[1000], background: blue[100] },
  warning: {
    main: alert.yellow,
    dark: alert.yellow,
    light: alert.yellow,
    contrastText: gray[1200],
  },
  stateWarning: {
    containedHoverBackground: yellow[500],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  alertWarning: { content: yellow[1000], background: yellow[100] },
  success: {
    main: alert.green,
    dark: alert.green,
    light: alert.green,
    contrastText: gray[1200],
  },
  stateSuccess: {
    containedHoverBackground: green[500],
    outlinedHoverBackground: alpha.mutedBlue.dark[75],
    outlinedRestingBorder: alpha.black[150],
  },
  alertSuccess: { content: green[1000], background: green[100] },
  text: {
    primary: gray[1200],
    secondary: gray[700],
    disabled: gray[600],
  },
  action: {
    active: gray[700],
    hover: alpha.mutedBlue.dark[75],
    selected: alpha.mutedBlue.dark[150],
    disabled: gray[600],
    disabledBackground: alpha.mutedBlue.dark[75],
    focus: alpha.mutedBlue.dark[150],
  },
  background: {
    default: UIBloxLight.Color.Surface.Surface_0,
    tooltips: gray[300],
    media: gray[300],
    snackbar: gray.white,
    paper: gray.white,
  },
  foreground: { paper: gray.white, main: gray[200], secondary: gray[300] },
  media: {
    secondaryBackground: gray.white,
    toolbar: gray[300],
    divider: alpha.black[150],
    bottomOverlay: 'linear-gradient(0deg, rgba(29, 29, 29, 0.6), rgba(29, 29, 29, 0))',
    inlineCodeBackground: gray[300],
    topOverlay: 'linear-gradient(180deg, rgba(29, 29, 29, 0.6), rgba(29, 29, 29, 0))',
  },
  layout: { divider: alpha.black[150] },
  stickyFooter: { defaultFill: muiAlpha('#F9F9F9', 0.8) },
  divider: alpha.black[150],
  outlineBorder: alpha.black[150],
  standardInputLine: UIBloxLight.Color.Stroke.Default,
  backdropOverlay: alpha.black[600],
  activeRating: yellow[600],
  filledInputBackground: alpha.mutedBlue.dark[100],
} as const;