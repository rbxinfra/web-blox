import { forwardRef } from 'react';
import MuiChip, {
  chipClasses,
  type ChipProps as MuiChipProps,
} from '@mui/material/Chip';
import { UIBloxLight } from '@rbx/design-foundations';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  chipClasses,
  type ChipClasses as TChipClasses,
  type ChipClassKey as TChipClassKey
} from '@mui/material/Chip';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TChipColor =
  | 'primaryBrand'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success';

export type TChipVariant = 'filled' | 'outlined';

export interface TChipProps
  extends Omit<MuiChipProps, 'color' | 'variant' | 'size'> {
  color?:   TChipColor;
  variant?: TChipVariant;
  /** When true, renders a larger 40px chip */
  size?: 'small' | 'medium' | 'large';
}

interface TChipStyleParams {
  color?:   TChipColor;
  variant?: TChipVariant;
  large?:   boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getOutlinedAvatarBgColor(theme: TTheme, color: TChipColor): string {
  switch (color) {
    case 'primaryBrand': return theme.palette.content.action;
    case 'primary':      return theme.palette.actionV2.primary.fill;
    case 'secondary':    return theme.palette.actionV2.secondary.fill;
    case 'error':        return theme.palette.content.alert.important;
    case 'warning':      return theme.palette.actionV2.notice.fill;
    case 'success':      return theme.palette.content.alert.active;
    default:             return '';
  }
}

// ── Styles ────────────────────────────────────────────────────────────────────

export const useStyles = makeStyles<TChipStyleParams>({ name: 'Chip' })(
  (
    theme: TTheme,
    {
      variant = 'filled',
      large = false,
      color = 'secondary',
    }: TChipStyleParams,
  ) => {
    // Large size override
    const sizeOverride = large
      ? { height: 40, borderRadius: 40, padding: '0 4px' }
      : {};

    // Compute text color, action palette, and delete-icon color
    let textColor     = variant === 'filled'
      ? theme.palette.content.inverse
      : theme.palette.content.standard;
    let actionPalette = theme.palette.actionV2.primary;
    let staticDark    = theme.palette.content.static.dark;

    if (color === 'primaryBrand') {
      textColor     = variant === 'filled'
        ? theme.palette.content.static.light
        : theme.palette.content.action;
      actionPalette = theme.palette.actionV2.primaryBrand;
      staticDark    = theme.palette.content.static.dark;
    } else if (color === 'secondary') {
      textColor     = theme.palette.content.standard;
      actionPalette = theme.palette.actionV2.secondary;
      staticDark    = theme.palette.states.active;
    } else if (color === 'error') {
      textColor     = variant === 'filled'
        ? theme.palette.content.inverse
        : theme.palette.content.alert.important;
      actionPalette = theme.palette.actionV2.important;
      staticDark    = theme.palette.content.static.dark;
    } else if (color === 'success') {
      textColor     = variant === 'filled'
        ? theme.palette.content.inverse
        : theme.palette.content.alert.active;
      actionPalette = theme.palette.actionV2.active;
      staticDark    = theme.palette.content.static.dark;
    } else if (color === 'warning') {
      textColor     = variant === 'filled'
        ? UIBloxLight.Color.Content.Emphasis
        : theme.palette.content.alert.notice;
      actionPalette = theme.palette.actionV2.notice;
      staticDark    = theme.palette.content.static.dark;
    }

    const iconColor = 'inherit';

    return {
      root: {
        ...theme.typography.chip,
        ...sizeOverride,
      },
      filled: {
        color:           textColor,
        backgroundColor: actionPalette.fill,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: actionPalette.containedHoverFocus,
        },
        [`& .${chipClasses.icon}`]:   { color: iconColor },
        [`& .${chipClasses.avatar}`]: color === 'primary' || color === 'secondary'
          ? {
              color:           theme.palette.content.standard,
              backgroundColor: theme.palette.content.inverse,
            }
          : {
              color:           theme.palette.content.static.light,
              backgroundColor: theme.palette.content.static.dark,
            },
        [`& .${chipClasses.deleteIcon}`]: { color: staticDark },
      },
      outlined: {
        color:       textColor,
        borderColor: theme.palette.surface.outline,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: theme.palette.states.hover,
        },
        [`& .${chipClasses.icon}`]:   { color: iconColor },
        [`& .${chipClasses.avatar}`]: {
          color: color === 'secondary'
            ? theme.palette.content.standard
            : theme.palette.content.inverse,
          backgroundColor: getOutlinedAvatarBgColor(theme, color),
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: color === 'secondary'
            ? theme.palette.content.standard
            : actionPalette.fill,
        },
      },
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function ChipWithRef(props: TChipProps, ref: React.Ref<HTMLDivElement>) {
  const {
    classes,
    size,
    variant  = 'filled',
    color    = 'primaryBrand',
    className,
    ...otherProps
  } = props;

  const large  = size === 'large';
  const muiSize = large ? undefined : size;

  const { classes: mergedClasses } = useStyles(
    { large, color, variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiChip
      {...otherProps}
      size={muiSize}
      classes={mergedClasses}
      ref={ref}
      variant={variant}
    />
  );
}

ChipWithRef.displayName = 'ChipWithRef';

const Chip = forwardRef<HTMLDivElement, TChipProps>(ChipWithRef);

export default Chip;