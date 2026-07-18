import { forwardRef, useContext, useMemo } from 'react';
import {
  Button as MuiButton,
  CircularProgress,
  type ButtonProps as MuiButtonProps,
} from '@mui/material';
import { UIBloxDark } from '@rbx/design-foundations';

import { ButtonGroupContext, type TButtonColor, type TButtonSize } from '../input/ButtonGroup';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  buttonClasses,
  type ButtonClasses as TButtonClasses,
  type ButtonClassKey as TButtonClassKey
} from '@mui/material/Button';

export {
  buttonBaseClasses,
  touchRippleClasses,
  type ButtonBaseClasses as TButtonBaseClasses,
  type ButtonBaseClassKey as TButtonBaseClassKey,
  type TouchRippleClasses as TTouchRippleClasses,
  type TouchRippleClassKey as TTouchRippleClassKey
} from '@mui/material/ButtonBase';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TButtonProps
  extends Omit<MuiButtonProps, 'color' | 'size' | 'variant'> {
  color?: TButtonColor;
  size?: TButtonSize;
  variant?: 'contained' | 'outlined' | 'text';
  loading?: boolean;
}

interface TButtonStyleParams {
  color?: TButtonColor;
  size?: TButtonSize;
  variant?: 'contained' | 'outlined' | 'text';
}

// ── Color map ─────────────────────────────────────────────────────────────────
// Maps uiblox color names to MUI color names for the underlying MUI Button.
// Style overrides then restyle each variant using Roblox design tokens.

const muiColorMap: Record<TButtonColor, MuiButtonProps['color']> = {
  primaryBrand: 'primary',
  primary: 'secondary',
  secondary: 'secondary',
  destructive: 'error',
  inherit: 'inherit',
};

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TButtonStyleParams>({ name: 'Button' })(
  (theme: TTheme, { variant, size, color }: TButtonStyleParams) => {
    // ── Size tokens ────────────────────────────────────────────────────────
    let sizeStyles = {};
    let iconStyles = {};

    if (size === 'large') {
      sizeStyles = {
        ...theme.typography.buttonLarge,
        ...theme.border.radius.medium,
        padding: '13px 22px',
        minHeight: 50,
      };
      iconStyles = { '&>*:nth-of-type(1)': { fontSize: 24 } };
    } else if (size === 'small') {
      sizeStyles = {
        ...theme.typography.buttonSmall,
        ...theme.border.radius.medium,
        padding: '8px 10px',
        minHeight: 34,
      };
      iconStyles = { '&>*:nth-of-type(1)': { fontSize: 16 } };
    } else {
      // medium (default)
      sizeStyles = {
        ...theme.typography.buttonMedium,
        ...theme.border.radius.medium,
        padding: '10px 16px',
        minHeight: 40,
      };
      iconStyles = { '&>*:nth-of-type(1)': { fontSize: 20 } };
    }

    // Outlined buttons get 1px less vertical padding to account for the border
    if (variant === 'outlined') {
      if (size === 'large') {
        sizeStyles = { ...sizeStyles, padding: '12px 22px' };
      } else if (size === 'medium') {
        sizeStyles = { ...sizeStyles, padding: '9px 15px' };
      } else if (size === 'small') {
        sizeStyles = { ...sizeStyles, padding: '7px 9px' };
      }
    }

    // ── Color tokens ───────────────────────────────────────────────────────
    let containedStyles = {};
    let outlinedStyles = {};
    let textStyles = {};

    if (color === 'destructive') {
      containedStyles = {
        boxShadow: 'none',
        color: UIBloxDark.Color.Content.Emphasis,
        backgroundColor: theme.palette.actionV2.important.fill,
        '&:hover': {
          backgroundColor: theme.palette.actionV2.important.containedHoverFocus,
          '@media (hover: none)': { backgroundColor: theme.palette.actionV2.important.fill },
        },
      };
      outlinedStyles = {
        color: theme.palette.actionV2.important.fill,
        border: `1px solid ${theme.palette.surface.outline}`,
        '&:hover': {
          borderColor: theme.palette.surface.outline,
          backgroundColor: theme.palette.states.hover,
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
      };
      textStyles = {
        color: theme.palette.actionV2.important.fill,
        '&:hover': {
          backgroundColor: theme.palette.states.hover,
          '@media (hover: none)': { backgroundColor: 'transparent' },
        },
      };
    } else if (color === 'primaryBrand') {
      containedStyles = {
        boxShadow: 'none',
        color: theme.palette.content.static.light,
        backgroundColor: theme.palette.actionV2.primaryBrand.fill,
        '&:hover': {
          backgroundColor: theme.palette.actionV2.primaryBrand.containedHoverFocus,
        },
      };
      outlinedStyles = {
        border: `1px solid ${theme.palette.surface.outline}`,
        color: theme.palette.content.action,
        '&:hover': {
          borderColor: theme.palette.surface.outline,
          backgroundColor: theme.palette.states.hover,
        },
      };
      textStyles = {
        color: theme.palette.content.action,
        '&:hover': { backgroundColor: theme.palette.states.hover },
      };
    } else if (color === 'secondary') {
      containedStyles = {
        boxShadow: 'none',
        color: theme.palette.content.standard,
        backgroundColor: theme.palette.actionV2.secondary.fill,
        '&:hover': {
          backgroundColor: theme.palette.actionV2.secondary.containedHoverFocus,
        },
      };
      outlinedStyles = {
        border: `1px solid ${theme.palette.surface.outline}`,
        '&:hover': {
          borderColor: theme.palette.surface.outline,
          backgroundColor: theme.palette.states.hover,
        },
      };
    } else {
      // primary (default)
      containedStyles = {
        boxShadow: 'none',
        color: theme.palette.content.inverse,
        backgroundColor: theme.palette.actionV2.primary.fill,
        '&:hover': {
          backgroundColor: theme.palette.actionV2.primary.containedHoverFocus,
        },
      };
      outlinedStyles = {
        border: `1px solid ${theme.palette.surface.outline}`,
        '&:hover': {
          borderColor: theme.palette.surface.outline,
          backgroundColor: theme.palette.states.hover,
        },
      };
      textStyles = {
        '&:hover': { backgroundColor: theme.palette.states.hover },
      };
    }

    return {
      root: {
        ...sizeStyles,
        textTransform: 'none',
        '&.Mui-disabled': {
          color: theme.palette.components.button.disabled,
        },
      },
      contained: containedStyles,
      outlined: outlinedStyles,
      text: textStyles,
      // Wraps children so loading spinner doesn't shift layout
      textContainer: {
        display: 'inherit',
        alignItems: 'inherit',
        alignContent: 'inherit',
        justifyItems: 'inherit',
        justifyContent: 'inherit',
      },
      buttonProgress: { color: theme.palette.states.disabled },
      startIcon: iconStyles,
      endIcon: iconStyles,
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function ButtonWithRef(
  {
    children,
    classes,
    className,
    color: colorProp,
    size: sizeProp,
    loading = false,
    disabled,
    startIcon,
    ...otherProps
  }: TButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {

  // Inherit size/color from ButtonGroup if not explicitly set
  const ctx = useContext(ButtonGroupContext);
  const color: TButtonColor = colorProp ?? ctx.color ?? 'primaryBrand';
  const size: TButtonSize = sizeProp ?? ctx.size ?? 'medium';

  const { classes: mergedClasses } = useStyles(
    { ...otherProps, size, color },
    { props: { classes: combineOverrides(classes, className) } },
  );

  const { buttonProgress, textContainer, ...buttonClasses } = mergedClasses;

  const progressSize = useMemo(() => {
    if (size === 'large') return 24;
    if (size === 'medium') return 20;
    return 16;
  }, [size]);

  return (
    <MuiButton
      {...otherProps}
      ref={ref}
      classes={buttonClasses}
      color={muiColorMap[color]}
      size={size}
      disabled={disabled || loading}
      startIcon={
        loading
          ? <CircularProgress size={progressSize} classes={{ root: buttonProgress }} />
          : startIcon
      }
    >
      <span className={textContainer}>{children}</span>
    </MuiButton>
  );
};

ButtonWithRef.displayName = 'ButtonWithRef';

const Button = forwardRef<HTMLButtonElement, TButtonProps>(ButtonWithRef);

export default Button;