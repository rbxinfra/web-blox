import { forwardRef } from 'react';
import MuiTypography, {
  type TypographyProps as MuiTypographyProps,
} from '@mui/material/Typography';
import { capitalize } from '@mui/material/utils';
import type { CSSObject } from 'tss-react';
import { UIBloxDark, UIBloxLight } from '@rbx/design-foundations';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

// ── Types ─────────────────────────────────────────────────────────────────────

// All uiblox Typography variants (superset of MUI's)
export type TTypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'captionHeader' | 'captionBody' | 'captionSmall'
  | 'button' | 'overline'
  | 'footer' | 'code' | 'codeDense' | 'chip'
  | 'largeLabel1' | 'largeLabel2'
  | 'legalDisclaimer' | 'smallLabel1' | 'smallLabel2'
  | 'buttonLarge' | 'buttonMedium' | 'buttonSmall'
  | 'tooltip' | 'alertTitle' | 'tableHead' | 'avatarLetter' | 'hero'
  | 'inherit';

// uiblox extends MUI's color prop
export type TTypographyColor =
  | 'primary'     // content.standard
  | 'secondary'   // content.muted
  | 'disabled'    // content.disabled
  | 'error'       // red token (mode-aware)
  | 'info'        // blue token (mode-aware)
  | 'warning'     // yellow token (mode-aware)
  | 'success'     // green token (mode-aware)
  | 'inherit';

export interface TTypographyProps
  extends Omit<MuiTypographyProps, 'variant' | 'color'> {
  variant?: TTypographyVariant;
  color?: TTypographyColor;
  /** Renders text in italic style */
  italics?: boolean;
  /** Renders text with underline */
  underline?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Typography' })(
  (theme: TTheme) => ({
    // Base reset
    root: {
      textDecoration: 'none',
      fontStyle: 'normal',
    } as CSSObject,

    // All uiblox variants — applied to root when variant matches
    h1: theme.typography.h1 as CSSObject,
    h2: theme.typography.h2 as CSSObject,
    h3: theme.typography.h3 as CSSObject,
    h4: theme.typography.h4 as CSSObject,
    h5: theme.typography.h5 as CSSObject,
    h6: theme.typography.h6 as CSSObject,
    subtitle1: theme.typography.subtitle1 as CSSObject,
    subtitle2: theme.typography.subtitle2 as CSSObject,
    body1: theme.typography.body1 as CSSObject,
    body2: theme.typography.body2 as CSSObject,
    caption: theme.typography.caption as CSSObject,
    captionHeader: theme.typography.captionHeader as CSSObject,
    captionBody: theme.typography.captionBody as CSSObject,
    captionSmall: theme.typography.captionSmall as CSSObject,
    button: theme.typography.button as CSSObject,
    overline: theme.typography.overline as CSSObject,
    footer: theme.typography.footer as CSSObject,
    code: theme.typography.code as CSSObject,
    codeDense: theme.typography.codeDense as CSSObject,
    chip: theme.typography.chip as CSSObject,
    largeLabel1: theme.typography.largeLabel1 as CSSObject,
    largeLabel2: theme.typography.largeLabel2 as CSSObject,
    legalDisclaimer: theme.typography.legalDisclaimer as CSSObject,
    smallLabel1: theme.typography.smallLabel1 as CSSObject,
    smallLabel2: theme.typography.smallLabel2 as CSSObject,
    buttonLarge: theme.typography.buttonLarge as CSSObject,
    buttonMedium: theme.typography.buttonMedium as CSSObject,
    buttonSmall: theme.typography.buttonSmall as CSSObject,
    tooltip: theme.typography.tooltip as CSSObject,
    alertTitle: theme.typography.alertTitle as CSSObject,
    tableHead: theme.typography.tableHead as CSSObject,
    avatarLetter: theme.typography.avatarLetter as CSSObject,
    hero: theme.typography.hero as CSSObject,

    // Modifiers
    italics: { fontStyle: 'italic' } as CSSObject,
    underline: { textDecoration: 'underline' } as CSSObject,

    // Colour variants (mode-aware where needed)
    colorPrimary: { color: theme.palette.content.standard } as CSSObject,
    colorSecondary: { color: theme.palette.content.muted } as CSSObject,
    colorDisabled: { color: theme.palette.content.disabled } as CSSObject,

    colorError: {
      color: theme.palette.mode === 'dark'
        ? UIBloxDark.Color.Extended.Red.Red_700
        : theme.palette.content.alert.important,
    } as CSSObject,
    colorInfo: {
      color: theme.palette.mode === 'dark'
        ? UIBloxDark.Color.Extended.Blue.Blue_600
        : UIBloxDark.Color.Extended.Blue.Blue_800,
    } as CSSObject,
    colorWarning: {
      color: theme.palette.mode === 'dark'
        ? theme.palette.actionV2.notice.fill
        : UIBloxLight.Color.Extended.Yellow.Yellow_800,
    } as CSSObject,
    colorSuccess: {
      color: theme.palette.mode === 'dark'
        ? theme.palette.actionV2.active.fill
        : UIBloxLight.Color.Extended.Green.Green_800,
    } as CSSObject,
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function TypographyWithRef(
  {
    classes,
    children,
    paragraph = false,
    component,
    color = 'inherit',
    variant = 'body1',
    italics = false,
    underline = false,
    className,
    ...otherProps
  }: TTypographyProps, 
  ref: React.Ref<HTMLSpanElement>
) {
  const resolvedComponent = component ?? (paragraph ? 'p' : 'span');

  const { classes: typographyClasses, cx } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Compose root class: variant + colour + modifiers + base reset
  const rootClass = cx(
    typographyClasses[variant as keyof typeof typographyClasses],
    typographyClasses[`color${capitalize(color)}` as keyof typeof typographyClasses],
    { [typographyClasses.italics]: italics, [typographyClasses.underline]: underline },
    typographyClasses.root,
  );

  return (
    <MuiTypography
      {...otherProps}
      // Pass variant and color as 'inherit' to MUI so it doesn't
      // apply its own styles — all styling is done via our classes.
      variant="inherit"
      color="inherit"
      component={resolvedComponent}
      paragraph={paragraph}
      classes={{ ...typographyClasses, root: rootClass }}
      ref={ref as React.Ref<HTMLSpanElement>}
    >
      {children}
    </MuiTypography>
  );
}

TypographyWithRef.displayName = 'TypographyWithRef';

const Typography = forwardRef<HTMLElement, TTypographyProps>(TypographyWithRef);

export default Typography;