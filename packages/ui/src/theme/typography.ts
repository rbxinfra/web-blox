import type { TTypographyStylesType, TTypographyProperties, TCategory, TVariant, TExtraTypography, TTypography } from './types/typographyTypes';

// ── Font CDN URLs ─────────────────────────────────────────────────────────────

const builderSansFontCDNUrl = 'https://cdn.foundation.roblox.com/current/fonts/builder-sans/';
const builderMonoFontCDNUrl = 'https://cdn.foundation.roblox.com/current/fonts/builder-mono/';
const builderExtendedFontCDNUrl = 'https://cdn.foundation.roblox.com/current/fonts/builder-extended/';

// ── Font family strings ───────────────────────────────────────────────────────

const builderSansFont = "'Builder Sans'";
const builderMonoFont = "'Builder Mono'";
const builderExtendedFont = "'Builder Extended'";

const builderSansFontFamily = [builderSansFont, 'Helvetica', 'Arial', 'san-serif'].join(', ');
const builderMonoFontFamily = [builderMonoFont, 'monospace'].join(', ');
const builderExtendedFontFamily = [builderExtendedFont, 'Helvetica', 'Arial', 'san-serif'].join(', ');

// ── Base font descriptors ─────────────────────────────────────────────────────

const builderSansRegular = { fontFamily: builderSansFont, fontWeight: 400, fontStyle: 'normal' } as const;
const builderSansMedium = { fontFamily: builderSansFont, fontWeight: 600, fontStyle: 'normal' } as const;
const builderSansBold = { fontFamily: builderSansFont, fontWeight: 700, fontStyle: 'normal' } as const;
const builderMonoRegular = { fontFamily: builderMonoFont, fontWeight: 400, fontStyle: 'normal' } as const;
const builderExtendedBold = { fontFamily: builderExtendedFont, fontWeight: 700, fontStyle: 'normal' } as const;

// ── @font-face declarations ───────────────────────────────────────────────────

export const fontFaces: TTypographyProperties[] = [
  {
    ...builderSansRegular,
    src: `url(${builderSansFontCDNUrl}BuilderSans-Regular.woff2) format('woff2'), url(${builderSansFontCDNUrl}BuilderSans-Regular.woff) format('woff')`,
    fontDisplay: 'swap',
  },
  {
    ...builderSansMedium,
    src: `url(${builderSansFontCDNUrl}BuilderSans-SemiBold.woff2) format('woff2'), url(${builderSansFontCDNUrl}BuilderSans-SemiBold.woff) format('woff')`,
    fontDisplay: 'swap',
  },
  {
    ...builderSansBold,
    src: `url(${builderSansFontCDNUrl}BuilderSans-Bold.woff2) format('woff2'), url(${builderSansFontCDNUrl}BuilderSans-Bold.woff) format('woff')`,
    fontDisplay: 'swap',
  },
  {
    ...builderMonoRegular,
    src: `url(${builderMonoFontCDNUrl}BuilderMono-Regular.woff2) format('woff2'), url(${builderMonoFontCDNUrl}BuilderMono-Regular.woff) format('woff')`,
    fontDisplay: 'swap',
  },
  {
    ...builderExtendedBold,
    src: `url(${builderExtendedFontCDNUrl}BuilderExtended-Bold.woff2) format('woff2'), url(${builderExtendedFontCDNUrl}BuilderExtended-Bold.woff) format('woff')`,
    fontDisplay: 'swap',
  },
];

// ── Type scale ────────────────────────────────────────────────────────────────

const TypographyScales = {
  100: '8px',
  125: '10px',
  150: '12px',
  175: '14px',
  200: '16px',
  250: '20px',
  300: '24px',
  350: '28px',
  400: '32px',
  500: '40px',
  600: '48px',
  700: '56px',
  800: '64px',
  900: '72px',
  1000: '80px',
  1100: '88px',
  1200: '96px',
} as const;

// ── Named type styles ─────────────────────────────────────────────────────────

export const TypographyStyles: TTypographyStylesType = {
  Display: {
    Large: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[1000], lineHeight: '100%' },
    Medium: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[800], lineHeight: '100%' },
    Small: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[500], lineHeight: '120%' },
  },
  Heading: {
    Large: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[350], lineHeight: '130%' },
    Medium: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[300], lineHeight: '135%' },
    Small: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[250], lineHeight: '120%' },
  },
  Title: {
    Large: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[200], lineHeight: '140%' },
    Medium: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[175], lineHeight: '140%' },
    Small: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[150], lineHeight: '130%' },
  },
  Label: {
    ExtraLarge: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[200], lineHeight: '100%' },
    Large: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[200], lineHeight: '100%' },
    Medium: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[175], lineHeight: '100%' },
    Small: { ...builderSansBold, fontFamily: builderSansFontFamily, fontSize: TypographyScales[150], lineHeight: '100%' },
  },
  Body: {
    Large: { ...builderSansRegular, fontFamily: builderSansFontFamily, fontSize: TypographyScales[200], lineHeight: '140%' },
    Medium: { ...builderSansRegular, fontFamily: builderSansFontFamily, fontSize: TypographyScales[175], lineHeight: '140%' },
    Small: { ...builderSansRegular, fontFamily: builderSansFontFamily, fontSize: TypographyScales[150], lineHeight: '130%' },
  },
  Caption: {
    Large: { ...builderSansMedium, fontFamily: builderSansFontFamily, fontSize: TypographyScales[150], lineHeight: '130%' },
    Small: { ...builderSansMedium, fontFamily: builderSansFontFamily, fontSize: TypographyScales[125], lineHeight: '140%' },
  },
  Hero: {
    Large: { ...builderExtendedBold, fontFamily: builderExtendedFontFamily, fontSize: TypographyScales[800], lineHeight: '120%' },
  },
} as const;

export function getTypographyProperties<C extends TCategory, V extends TVariant<C>>(
  category: C,
  variant: V,
): TTypographyStylesType[C][V] {
  return { ...TypographyStyles[category][variant] };
}

// ── Component-specific typography ─────────────────────────────────────────────

const extraTypography: TExtraTypography = {
  captionHeader: getTypographyProperties('Title', 'Medium'),
  captionBody: getTypographyProperties('Body', 'Medium'),
  captionSmall: getTypographyProperties('Caption', 'Small'),
  footer: getTypographyProperties('Body', 'Medium'),
  code: { ...builderMonoRegular, fontFamily: builderMonoFontFamily, fontSize: TypographyScales[200], lineHeight: '140%' },
  codeDense: { ...builderMonoRegular, fontFamily: builderMonoFontFamily, fontSize: TypographyScales[175], lineHeight: '140%' },
  chip: getTypographyProperties('Label', 'Medium'),
  largeLabel1: getTypographyProperties('Body', 'Large'),
  largeLabel2: getTypographyProperties('Label', 'ExtraLarge'),
  legalDisclaimer: getTypographyProperties('Caption', 'Large'),
  smallLabel1: getTypographyProperties('Body', 'Medium'),
  smallLabel2: getTypographyProperties('Label', 'Medium'),
  buttonLarge: getTypographyProperties('Label', 'ExtraLarge'),
  buttonMedium: getTypographyProperties('Label', 'ExtraLarge'),
  buttonSmall: getTypographyProperties('Label', 'Medium'),
  tooltip: getTypographyProperties('Label', 'Medium'),
  alertTitle: getTypographyProperties('Label', 'ExtraLarge'),
  tableHead: getTypographyProperties('Label', 'Medium'),
  avatarLetter: getTypographyProperties('Heading', 'Small'),
  hero: getTypographyProperties('Hero', 'Large'),
};

// ── MUI typography object ─────────────────────────────────────────────────────

const typography: TTypography = {
  // MUI standard variants
  h1: getTypographyProperties('Heading', 'Large'),
  h2: getTypographyProperties('Heading', 'Medium'),
  h3: getTypographyProperties('Heading', 'Medium'),
  h4: getTypographyProperties('Heading', 'Medium'),
  h5: getTypographyProperties('Heading', 'Small'),
  h6: getTypographyProperties('Title', 'Large'),
  subtitle1: getTypographyProperties('Heading', 'Small'),
  subtitle2: getTypographyProperties('Title', 'Large'),
  body1: getTypographyProperties('Body', 'Large'),
  body2: getTypographyProperties('Body', 'Medium'),
  caption: extraTypography.captionBody,
  overline: getTypographyProperties('Body', 'Medium'),
  button: extraTypography.buttonMedium,

  // Font weights
  fontWeightBold: builderSansBold.fontWeight,
  fontWeightLight: builderSansRegular.fontWeight,
  fontWeightMedium: builderSansMedium.fontWeight,
  fontWeightRegular: builderSansRegular.fontWeight,

  // Base
  htmlFontSize: 16,
  fontFamily: builderSansFontFamily,

  // uiblox custom variants
  ...extraTypography,
};

export default typography;

// ── MUI module augmentation ───────────────────────────────────────────────────

declare module '@mui/material/styles' {
  interface TypographyVariants {
    captionHeader: React.CSSProperties;
    captionBody: React.CSSProperties;
    captionSmall: React.CSSProperties;
    footer: React.CSSProperties;
    code: React.CSSProperties;
    codeDense: React.CSSProperties;
    chip: React.CSSProperties;
    largeLabel1: React.CSSProperties;
    largeLabel2: React.CSSProperties;
    legalDisclaimer: React.CSSProperties;
    smallLabel1: React.CSSProperties;
    smallLabel2: React.CSSProperties;
    buttonLarge: React.CSSProperties;
    buttonMedium: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    tooltip: React.CSSProperties;
    alertTitle: React.CSSProperties;
    tableHead: React.CSSProperties;
    avatarLetter: React.CSSProperties;
    hero: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    captionHeader?: React.CSSProperties;
    captionBody?: React.CSSProperties;
    captionSmall?: React.CSSProperties;
    footer?: React.CSSProperties;
    code?: React.CSSProperties;
    codeDense?: React.CSSProperties;
    chip?: React.CSSProperties;
    largeLabel1?: React.CSSProperties;
    largeLabel2?: React.CSSProperties;
    legalDisclaimer?: React.CSSProperties;
    smallLabel1?: React.CSSProperties;
    smallLabel2?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    tooltip?: React.CSSProperties;
    alertTitle?: React.CSSProperties;
    tableHead?: React.CSSProperties;
    avatarLetter?: React.CSSProperties;
    hero?: React.CSSProperties;
  }
}