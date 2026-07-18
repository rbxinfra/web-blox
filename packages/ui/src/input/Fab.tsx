import { forwardRef } from 'react';
import MuiFab, {
  type FabProps as MuiFabProps,
} from '@mui/material/Fab';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  fabClasses,
  type FabProps as TFabProps,
  type FabClasses as TFabClasses,
  type FabClassKey as TFabClassKey
} from '@mui/material/Fab';

export type TFabVariant = MuiFabProps['variant'];
export type TFabColor = MuiFabProps['color'];

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Fab' })(
  (theme: TTheme) => ({
    root: {
      boxShadow: theme.elevation.overlay,
      color: theme.palette.content.inverse
    },
    primary: {
      color: theme.palette.content.static.light,
      backgroundColor: theme.palette.actionV2.primaryBrand.fill,
      '&:hover': {
        backgroundColor: theme.palette.actionV2.primaryBrand.containedHoverFocus
      }
    },
    secondary: {
      backgroundColor: theme.palette.actionV2.primary.fill,
      '&:hover': {
        backgroundColor: theme.palette.actionV2.primary.containedHoverFocus
      }
    },
    disabled: {
      backgroundColor: theme.palette.states.disabledBackground
    },
    extended: {
      textTransform: 'none'
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function FabWithRef(
  {
    classes,
    children,
    variant = 'circular',
    color = 'primary',
    className,
    ...otherProps
  }: MuiFabProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    undefined,
    {
      props: {
        classes: combineOverrides(classes, className)
      }
    }
  );

  return (
    <MuiFab
      {...otherProps}
      ref={ref}
      classes={mergedClasses}
      variant={variant}
      color={color}>
      {children}
    </MuiFab>
  )
}

FabWithRef.displayName = 'FabWithRef';

const Fab = forwardRef<HTMLButtonElement, MuiFabProps>(FabWithRef);

export default Fab;