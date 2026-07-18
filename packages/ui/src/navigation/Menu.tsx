import { forwardRef } from 'react';
import MuiMenu, { type MenuProps as MuiMenuProps } from '@mui/material/Menu';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  menuClasses,
  type MenuClasses as TMenuClasses,
  type MenuClassKey as TMenuClassKey
} from '@mui/material/Menu';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TMenuVariant = 'menu' | 'modal';

export interface TMenuProps extends Omit<MuiMenuProps, 'variant'> {
  variant?: TMenuVariant;
}

interface TMenuStyleParams {
  variant?: TMenuVariant;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TMenuStyleParams>({ name: 'Menu' })(
  (theme: TTheme, { variant }: TMenuStyleParams) => ({
    paper: {
      ...theme.border.radius.medium,
      boxShadow:  theme.elevation.overlay,
      background: theme.palette.surface[200],
      color:
        variant === 'modal'
          ? theme.palette.content.inverse
          : theme.palette.content.standard,
    } as CSSObject,
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function MenuWithRef(
  {
    children,
    classes,
    className,
    variant       = 'menu',
    anchorOrigin  = { vertical: 'bottom', horizontal: 'center' },
    transformOrigin = { vertical: 'top', horizontal: 'center' },
    ...otherProps
  }: TMenuProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    { variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiMenu
      {...otherProps}
      classes={mergedClasses}
      ref={ref}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      // 'modal' maps to MUI's 'selectedMenu' variant
      variant={variant === 'modal' ? 'selectedMenu' : variant}
    >
      {children}
    </MuiMenu>
  );
}

MenuWithRef.displayName = 'MenuWithRef';

const Menu = forwardRef<HTMLDivElement, TMenuProps>(MenuWithRef);

export default Menu;