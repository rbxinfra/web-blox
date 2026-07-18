import { alpha as muiAlpha } from '@mui/material/styles'
import type { TColorScale, TAlphaScale, TAlphaColorScale, TAlertColorScale, TStatusColorScale } from './types/colorScaleTypes';

const black = '#000000';
const white = '#FFFFFF';

const alphaScales: TAlphaScale = {
  1200: 0.96,
  1100: 0.88,
  1000: 0.8,
  900: 0.72,
  800: 0.64,
  700: 0.56,
  600: 0.48,
  500: 0.4,
  400: 0.32,
  300: 0.24,
  250: 0.2,
  200: 0.16,
  150: 0.12,
  125: 0.1,
  100: 0.08,
  75: 0.06,
  50: 0.04,
  0: 0,
};

function generateAlphaColorScales(baseColor: string): TColorScale {
  return Object.fromEntries(
    Object.entries(alphaScales).map(([key, alphaValue]) => [
      key,
      muiAlpha(baseColor, alphaValue),
    ]),
  ) as TColorScale;
}

export const gray: TColorScale & { black: string, white: string } = {
  black,
  1200: '#111216',
  1100: '#18191D',
  1000: '#1F2024',
  900: '#25272C',
  800: '#2B2D33',
  700: '#313339',
  650: '#696A6D',
  600: '#A1A2A5',
  500: '#BBBCBE',
  400: '#D5D5D7',
  300: '#E5E5E6',
  200: '#F2F2F3',
  100: '#F9F9F9',
  white,
} as const;

export const red: TColorScale = {
  1200: '#270402',
  1100: '#3B0703',
  1000: '#580A04',
  900: '#881007',
  800: '#B0140C',
  700: '#D5241A',
  600: '#EF2F25',
  500: '#F45B52',
  400: '#F57E75',
  300: '#F89C95',
  200: '#FAB4AF',
  100: '#FCD0CD',
} as const;

export const orange: TColorScale = {
  1200: '#290E00',
  1100: '#471900',
  1000: '#6B2500',
  900: '#943400',
  800: '#B4480E',
  700: '#E1621E',
  600: '#F87935',
  500: '#FC9855',
  400: '#FAAB73',
  300: '#FABB8E',
  200: '#FBCEAE',
  100: '#FCE0CD'
} as const;

export const yellow: TColorScale = {
  1200: '#291D00',
  1100: '#3D2C00',
  1000: '#634700',
  900: '#946A00',
  800: '#B28410',
  700: '#D4A121',
  600: '#F3BA2B',
  500: '#F5C73D',
  400: '#F7D469',
  300: '#FADE89',
  200: '#FBE6AD',
  100: '#FDF0CE',
} as const;

export const green: TColorScale = {
  1200: '#022716',
  1100: '#02311B',
  1000: '#044E2C',
  900: '#036D3D',
  800: '#06844B',
  700: '#0F995B',
  600: '#0FB369',
  500: '#27C473',
  400: '#44DA87',
  300: '#60E6A1',
  200: '#8FEAB7',
  100: '#C3F4DA',
} as const;

export const turquoise: TColorScale = {
  1200: '#00272E',
  1100: '#00333D',
  1000: '#004451',
  900: '#055A6B',
  800: '#087287',
  700: '#0887A1',
  600: '#059EBD',
  500: '#0AB4D6',
  400: '#0CC3E4',
  300: '#42DAF5',
  200: '#79E8FC',
  100: '#BFF3FD'
} as const;

export const blue: TColorScale = {
  1400: '#00145C',
  1300: '#001B7A',
  1200: '#002299',
  1100: '#0027B8',
  1000: '#002DD6',
  900: '#0035F5',
  800: '#1446FF',
  700: '#335FFF',
  600: '#528BFF',
  500: '#70A0FF',
  400: '#8FB4FF',
  300: '#ADC9FF',
  200: '#CCDDFF',
  100: '#EBF1FF',
} as const;

export const indigo: TColorScale = {
  1200: '#120227',
  1100: '#1B033A',
  1000: '#270453',
  900: '#3C057F',
  800: '#520CA6',
  700: '#6914D2',
  600: '#8832F1',
  500: '#9E58F3',
  400: '#B384FB',
  300: '#C8A0F8',
  200: '#D7BBFB',
  100: '#E6D3FD'
} as const;

export const purple: TColorScale = {
  1200: '#200227',
  1100: '#2C0335',
  1000: '#40044E',
  900: '#600674',
  800: '#820C9D',
  700: '#A61BC6',
  600: '#CA11F3',
  500: '#DA40FC',
  400: '#E26CF4',
  300: '#EA91F8',
  200: '#F0ADFA',
  100: '#F6C9FD'
} as const;

export const magenta: TColorScale = {
  1200: '#2C0211',
  1100: '#3A0317',
  1000: '#520420',
  900: '#6F062B',
  800: '#A20B40',
  700: '#D32260',
  600: '#E8457E',
  500: '#EE588D',
  400: '#F16FA1',
  300: '#F58EBD',
  200: '#F8B4D4',
  100: '#FBCEE1'
} as const;

export const alpha: TAlphaColorScale = {
  black: generateAlphaColorScales(black),
  white: generateAlphaColorScales(white),
  mutedBlue: {
    dark: generateAlphaColorScales('#333B4C'),
    light: generateAlphaColorScales('#BBC2D1'),
  },
} as const;

export const alert: TAlertColorScale = {
  green: '#009E57',
  red: '#CF2017',
  yellow: '#DEA517',
  blue: '#3C64F4',
} as const;

export const status: TStatusColorScale = {
  important: '#CF2017',
  notice: '#DEA517',
  active: '#009E57',
  actionBlue: '#2BB1FF',
} as const;