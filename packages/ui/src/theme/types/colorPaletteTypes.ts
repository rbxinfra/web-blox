/* Deprecated Palette */

export interface TDefaultColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
};

export interface TStateColor {
  containedHoverBackground: string;
  outlinedHoverBackground: string;
  outlinedRestingBorder: string;
};

export interface TAlertColor {
  content: string;
  background: string;
};

export interface TTextColor {
  primary: string;
  secondary: string;
  disabled: string;
};

export interface TActionColor {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
};

export interface TBackgroundColor {
  default: string;
  tooltips: string;
  media: string;
  snackbar: string;
  paper: string;
};

export interface TForeGroundColor {
  main: string;
  secondary: string;
  paper: string;
};

export interface TMediaColor {
  secondaryBackground: string;
  toolbar: string;
  divider: string;
  bottomOverlay: string;
  topOverlay: string;
  inlineCodeBackground: string;
};

export interface TLayoutColor {
  divider: string;
};

export interface TStickyFooterColor {
  defaultFill: string;
};

export interface TDeprecatedPalette {
  primary: TDefaultColor;
  statePrimary: TStateColor;

  secondary: TDefaultColor;
  stateSecondary: TStateColor;

  error: TDefaultColor;
  stateError: TStateColor;
  alertError: TAlertColor;

  info: TDefaultColor;
  stateInfo: TStateColor;
  alertInfo: TAlertColor;

  warning: TDefaultColor;
  stateWarning: TStateColor;
  alertWarning: TAlertColor;

  success: TDefaultColor;
  stateSuccess: TStateColor;
  alertSuccess: TAlertColor;

  text: TTextColor;
  action: TActionColor;
  background: TBackgroundColor;
  foreground: TForeGroundColor;
  media: TMediaColor;
  layout: TLayoutColor;
  stickyFooter: TStickyFooterColor;

  divider: string;
  outlineBorder: string;
  standardInputLine: string;
  backdropOverlay: string;
  activeRating: string;
  filledInputBackground: string;
};

/* Extended Palette */

export interface TStatesColor {
  active: string;
  disabled: string;
  dragged: string;
  disabledBackground: string;
  focusVisible: string;
  focus: string;
  selected: string;
  hover: string;
};

export type TSurfaceColor = Record<number, string> & { outline: string };

export interface TDefaultActionV2Color {
  fill: string;
  containedHoverFocus: string;
};

export interface TActionV2Color {
  primaryBrand: TDefaultActionV2Color;
  primary: TDefaultActionV2Color;
  secondary: TDefaultActionV2Color;
  important: TDefaultActionV2Color;
  notice: TDefaultActionV2Color;
  active: TDefaultActionV2Color;
};

export interface TContentStaticColor {
  light: string;
  dark: string;
};

export interface TContentAlertColor {
  inform: string;
  important: string;
  active: string;
  notice: string;
};

export interface TContentColor {
  standard: string;
  muted: string;
  disabled: string;
  inverse: string;
  action: string;

  static: TContentStaticColor;
  alert: TContentAlertColor;
};

/* Extended Palette for Components */

/* Input */

export interface TInputComponentFilledColor {
  enableFill: string;
  hoverFill: string;
};

export interface TInputComponentOutlinedColor {
  enabledBorder: string;
  hoverBorder: string;
  focusBorder: string;
  errorBorder: string;
};

export interface TInputComponentColor {
  filled: TInputComponentFilledColor;
  outlined: TInputComponentOutlinedColor;
};

/* Alert */

export interface TAlertComponentColor {
  importantContent: string;
  importantFill: string;

  noticeContent: string;
  noticeFill: string;

  informContent: string;
  informFill: string;

  activeContent: string;
  activeFill: string;
};

/* Backdrop */

export interface TBackdropComponentColor {
  fill: string;
};

/* Button */

export interface TButtonComponentColor {
  disabled: string;
};

/* Label */

export interface TLabelComponentColor {
  warningText: string;

  importantContent: string;
  importantFill: string;

  noticeContent: string;
  noticeFill: string;

  informContent: string;
  informFill: string;

  activeContent: string;
  activeFill: string;
};

/* Rating */

export interface TRatingComponentColor {
  enabledBorder: string;
  activeFill: string;
};

/* StickyFooter */

export interface TStickyFooterComponentColor {
  fill: string;
};

/* Media */

export interface TMediaComponentColor {
  fill: string;
  toolbar: string;
  overlay: string;
};

export interface TMediaButtonComponentOnMediaColor {
  fill: string;
  hover: string;
  focus: string;
};

export interface TMediaButtonComponentOutlinedColor {
  enabledBorder: string;
  hoverBorder: string;
  focusBorder: string;
  errorBorder: string;
};

export interface TMediaButtonComponentColor {
  onMediaLight: TMediaButtonComponentOnMediaColor;
  onMediaDark: TMediaButtonComponentOnMediaColor;
  outlined: TMediaButtonComponentOutlinedColor;
};

/* Avatar */

export interface TAvatarComponentColor {
  fill: string;
};

/* Switch */

export interface TSwitchComponentColor {
  slideFill: string;
  knobFill: string;
  disabledKnob: string;
};

/* InlineCode */

export interface TInlineCodeComponentAsColor {
  fill: string;
  color: string;
};

export interface TInlineCodeComponentColor {
  asText: TInlineCodeComponentAsColor;
  asLink: TInlineCodeComponentAsColor;
};

/* LinearProgress */

export interface TLinearProgressComponentColor {
  backgroundSecondary: string;
};

export interface TComponentsColor {
  divider: string;
  input: TInputComponentColor;
  alert: TAlertComponentColor;
  backdrop: TBackdropComponentColor;
  button: TButtonComponentColor;
  label: TLabelComponentColor;
  rating: TRatingComponentColor;
  stickyFooter: TStickyFooterComponentColor;
  media: TMediaComponentColor;
  mediaButtons: TMediaButtonComponentColor;
  avatar: TAvatarComponentColor;
  switch: TSwitchComponentColor;
  inlineCode: TInlineCodeComponentColor;
  linearProgress: TLinearProgressComponentColor;
};

export interface TNavigationColor {
  global: string;
  default: string;
};

export interface TCommonColor {
  black: string;
  white: string;
};

export type TPaletteMode = 'light' | 'dark';

export interface TExtendedPalette {
  mode: TPaletteMode;
  common: TCommonColor;
  actionV2: TActionV2Color;
  content: TContentColor;
  states: TStatesColor;
  surface: TSurfaceColor;
  navigation: TNavigationColor;
  components: TComponentsColor;
};

export type TPalette = TExtendedPalette & TDeprecatedPalette;