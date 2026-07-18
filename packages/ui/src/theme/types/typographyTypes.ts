export type TBodyStyles = Record<string, string | number>;
export type TTypographyProperties = TBodyStyles;

export interface TTypographyStylesType {
  Display: { Large: TTypographyProperties, Medium: TTypographyProperties, Small: TTypographyProperties };
  Heading: { Large: TTypographyProperties, Medium: TTypographyProperties, Small: TTypographyProperties };
  Title: { Large: TTypographyProperties, Medium: TTypographyProperties, Small: TTypographyProperties };
  Label: { ExtraLarge: TTypographyProperties, Large: TTypographyProperties, Medium: TTypographyProperties, Small: TTypographyProperties };
  Body: { Large: TTypographyProperties, Medium: TTypographyProperties, Small: TTypographyProperties };
  Caption: { Large: TTypographyProperties, Small: TTypographyProperties };
  Hero: { Large: TTypographyProperties };
};

export type TCategory = keyof TTypographyStylesType;
export type TVariant<C extends TCategory> = keyof TTypographyStylesType[C];

export interface TExtraTypography {
  captionHeader: TTypographyProperties;
  captionBody: TTypographyProperties;
  captionSmall: TTypographyProperties;

  footer: TTypographyProperties;

  code: TTypographyProperties;
  codeDense: TTypographyProperties;

  chip: TTypographyProperties;

  largeLabel1: TTypographyProperties;
  largeLabel2: TTypographyProperties;

  legalDisclaimer: TTypographyProperties;

  smallLabel1: TTypographyProperties;
  smallLabel2: TTypographyProperties;

  buttonLarge: TTypographyProperties;
  buttonMedium: TTypographyProperties;
  buttonSmall: TTypographyProperties;

  tooltip: TTypographyProperties;
  alertTitle: TTypographyProperties;
  tableHead: TTypographyProperties;
  avatarLetter: TTypographyProperties;
  hero: TTypographyProperties;
};

export interface TMuiTypography {
  h1: TTypographyProperties;
  h2: TTypographyProperties;
  h3: TTypographyProperties;
  h4: TTypographyProperties;
  h5: TTypographyProperties;
  h6: TTypographyProperties;

  subtitle1: TTypographyProperties;
  subtitle2: TTypographyProperties;

  body1: TTypographyProperties;
  body2: TTypographyProperties;

  caption: TTypographyProperties;
  overline: TTypographyProperties;
  button: TTypographyProperties;

  fontWeightBold: number;
  fontWeightLight: number;
  fontWeightMedium: number;
  fontWeightRegular: number;

  htmlFontSize: number;
  fontFamily: string;
};

export type TTypography = TMuiTypography & TExtraTypography;