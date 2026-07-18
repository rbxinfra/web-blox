import { forwardRef } from 'react';
import MuiMenuItem, {
  menuItemClasses,
  type MenuItemProps as MuiMenuItemProps,
} from '@mui/material/MenuItem';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { checkboxClasses } from '../input/Checkbox';
import { listItemIconClasses } from '../dataDisplay/ListItemIcon';

export {
  menuItemClasses,
  type MenuItemClasses as TMenuItemClasses,
  type MenuItemClassKey as TMenuItemClassKey
} from '@mui/material/MenuItem';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TMenuItemVariant = 'standardMenu' | 'modal';

export interface TMenuItemProps extends MuiMenuItemProps {
  variant?: TMenuItemVariant;
}

// Selects the icon/checkbox colour class string — shared across hover and selected
const iconColorSelector = [
  `& .${listItemIconClasses.root}`,
  `& .${checkboxClasses.root}`,
  `& .${checkboxClasses.root}.${checkboxClasses.checked}`,
].join(', ');

interface TMenuItemStyleParams {
  variant?: TMenuItemVariant;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TMenuItemStyleParams>({ name: 'MenuItem' })(
  (theme: TTheme, { variant }: TMenuItemStyleParams) => {
    const hoverStyles: CSSObject = {
      color: theme.palette.content.standard,
      backgroundColor: theme.palette.states.hover,
      [iconColorSelector]: { color: theme.palette.content.standard },
    };

    // Modal variant gets a slightly different hover background
    if (variant === 'modal') {
      hoverStyles.backgroundColor = theme.palette.surface[500 as unknown as keyof typeof theme.palette.surface] ?? theme.palette.states.hover;
    }

    return {
      root: {
        ...theme.border.radius.medium,
        color: theme.palette.content.muted,
        margin: '0 8px',
        padding: 8,

        // Default icon/checkbox colour
        [iconColorSelector]: {
          color: theme.palette.states.active,
          minWidth: 40,
        },

        // Hover state
        '&:hover': hoverStyles,

        // Selected state
        [`&.${menuItemClasses.selected}`]: {
          color: theme.palette.content.standard,
          backgroundColor: theme.palette.action.selected,
          [iconColorSelector]: { color: theme.palette.content.standard },
        } as CSSObject,
      } as CSSObject,
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function MenuItemWithRef(
  {
    children,
    classes,
    className,
    variant = 'standardMenu',
    ...otherProps
  }: TMenuItemProps, 
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const { classes: mergedClasses } = useStyles(
    { variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiMenuItem {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiMenuItem>
  );
}

MenuItemWithRef.displayName = 'MenuItemWithRef';

const MenuItem = forwardRef<HTMLLIElement, TMenuItemProps>(MenuItemWithRef);

export default MenuItem;