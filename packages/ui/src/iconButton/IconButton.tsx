import { forwardRef } from 'react';
import MuiIconButton, {
  iconButtonClasses,
  type IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import { buttonBaseClasses, touchRippleClasses } from '@mui/material/ButtonBase';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  iconButtonClasses,
  type IconButtonClasses as TIconButtonClasses,
  type IconButtonClassKey as TIconButtonClassKey
} from '@mui/material/IconButton';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TIconButtonColor =
  MuiIconButtonProps['color']
  | 'primary'       // content.standard
  | 'secondary'     // content.standard (alias)
  | 'primaryBrand'  // actionV2.primaryBrand
  | 'destructive'   // content.alert.important
  | 'default'       // states.active
  | 'onMediaLight'  // blur backdrop, white icon
  | 'onMediaDark';  // blur backdrop, white icon

export type TIconButtonVariant = 'default' | 'contained' | 'outlined';

export interface TIconButtonProps
  extends Omit<MuiIconButtonProps, 'color'> {
  color?: TIconButtonColor;
  variant?: TIconButtonVariant;
}

interface TIconButtonStyleParams {
  color?: TIconButtonColor;
  variant?: TIconButtonVariant;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TIconButtonStyleParams>({ name: 'IconButton' })(
  (
    theme: TTheme,
    {
      color = 'primary',
      variant = 'default',
    }: TIconButtonStyleParams,
  ) => {
    // Base colour styles for each rbx color
    let primaryBrandStyles: CSSObject = { color: theme.palette.actionV2.primaryBrand.fill };
    let primaryStyles: CSSObject = { color: theme.palette.content.standard };
    let destructiveStyles: CSSObject = { color: theme.palette.content.alert.important };

    // Contained modifier upgrades each colour with bg + hover
    if (variant === 'contained') {
      primaryBrandStyles = {
        ...primaryBrandStyles,
        color: theme.palette.content.static.light,
        backgroundColor: theme.palette.actionV2.primaryBrand.fill,
        [`&:hover, &.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
          backgroundColor: theme.palette.actionV2.primaryBrand.containedHoverFocus,
        },
      } as CSSObject;

      primaryStyles = {
        ...primaryStyles,
        color: theme.palette.content.inverse,
        backgroundColor: theme.palette.actionV2.primary.fill,
        [`&:hover, &.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
          backgroundColor: theme.palette.actionV2.primary.containedHoverFocus,
        },
      } as CSSObject;

      destructiveStyles = {
        ...destructiveStyles,
        color: theme.palette.content.static.light,
        backgroundColor: theme.palette.actionV2.important.fill,
        [`&:hover, &.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
          backgroundColor: theme.palette.actionV2.important.containedHoverFocus,
        },
      } as CSSObject;
    }

    // Build root styles depending on color group
    let root: CSSObject;

    if (color === 'onMediaLight' || color === 'onMediaDark') {
      const mediaKey = color;
      root = {
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        color: theme.palette.content.static.light,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.components.mediaButtons[mediaKey].hover,
        },
        [`&.${buttonBaseClasses.focusVisible}`]: {
          zIndex: 0,
          backgroundColor: theme.palette.components.mediaButtons[mediaKey].focus,
        },
        [`&.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
          zIndex: -1,
          color: theme.palette.components.mediaButtons[mediaKey].focus,
        },
        [`&.${iconButtonClasses.disabled}`]: {
          color: theme.palette.states.disabled,
        },
        // contained + onMedia: add fill bg, keep disabled override
        ...(variant === 'contained' ? {
          backgroundColor: theme.palette.components.mediaButtons[mediaKey].fill,
          [`&.${iconButtonClasses.disabled}`]: {
            color: theme.palette.states.disabled,
            backgroundColor: theme.palette.components.mediaButtons[mediaKey].fill,
          },
        } : {}),
      } as CSSObject;
    } else {
      root = {
        [`&.${buttonBaseClasses.focusVisible}`]: { zIndex: 0 },
        [`&.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: { zIndex: -1 },
        [`&.${iconButtonClasses.disabled}`]: { color: theme.palette.states.disabled },

        // default color specific
        ...(color === 'default' ? {
          color: theme.palette.states.active,
          '&:hover': {
            color: theme.palette.content.standard,
            backgroundColor: theme.palette.states.hover,
          },
          [`&.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
            color: theme.palette.content.standard,
            backgroundColor: theme.palette.states.focus,
          },
        } : {}),

        // contained: secondary bg + hover
        ...(variant === 'contained' ? {
          backgroundColor: theme.palette.actionV2.secondary.fill,
          '&:hover': {
            backgroundColor: theme.palette.actionV2.secondary.containedHoverFocus,
          },
          [`&.${iconButtonClasses.disabled}`]: {
            color: theme.palette.states.disabled,
            backgroundColor: theme.palette.states.disabledBackground,
          },
        } : {}),

        // outlined: circle border + hover
        ...(variant === 'outlined' ? {
          ...theme.border.radius.circle,
          border: `1px solid ${theme.palette.surface.outline}`,
          '&:hover': {
            backgroundColor: theme.palette.states.hover,
          },
          [`&.${buttonBaseClasses.focusVisible} .${touchRippleClasses.root}`]: {
            backgroundColor: theme.palette.states.focus,
          },
        } : {}),
      } as CSSObject;
    }

    return {
      root,
      colorPrimary: primaryBrandStyles,
      colorSecondary: primaryStyles,
      colorError: destructiveStyles,
      sizeSmall: { padding: 4 },
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function IconButtonWithRef(
  {
    children,
    classes,
    className,
    color = 'primary',
    variant = 'default',
    ...otherProps
  }: TIconButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    { color, variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  // onMedia variants pass 'default' to MUI so it doesn't apply its own colour
  const processedColor = (color === 'onMediaLight' || color === 'onMediaDark') ? 'default' : color as MuiIconButtonProps['color'];

  return (
    <MuiIconButton
      {...otherProps}
      classes={mergedClasses}
      color={processedColor}
      ref={ref}
    >
      {children}
    </MuiIconButton>
  );
}

IconButtonWithRef.displayName = 'IconButtonWithRef';

const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(IconButtonWithRef);

export default IconButton;