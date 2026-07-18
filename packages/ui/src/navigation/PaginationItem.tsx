import { forwardRef } from 'react';
import MuiPaginationItem, {
    paginationItemClasses,
    type PaginationItemProps as MuiPaginationItemProps
} from '@mui/material/PaginationItem';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  paginationItemClasses,
  type PaginationItemProps as TPaginationItemProps,
  type PaginationItemClasses as TPaginationClasses,
  type PaginationItemClassKey as TPaginationClassKey
} from '@mui/material/PaginationItem';

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles()(
  (theme: TTheme) => ({
    root: { 
        ...theme.typography.largeLabel1,
        color: theme.palette.content.standard
    },
    textPrimary: {
        [`&.${paginationItemClasses.selected}`]: {
            color: theme.palette.content.static.light,
            backgroundColor: theme.palette.actionV2.primaryBrand.fill
        }
    },
    textSecondary: {
        [`&.${paginationItemClasses.selected}`]: {
            color: theme.palette.content.inverse,
        }
    },
    sizeSmall: { ...theme.typography.smallLabel1 },
    outlined: {
        [`&${paginationItemClasses.selected}`]: {
            borderColor: theme.palette.surface.outline,
            backgroundColor: theme.palette.states.hover
        }
    },
    outlinedSecondary: {
        [`&${paginationItemClasses.selected}`]: {
            borderColor: theme.palette.surface.outline,
            backgroundColor: theme.palette.states.hover
        }
    },
    outlinedPrimary: {
        [`&${paginationItemClasses.selected}`]: {
            borderColor: theme.palette.surface.outline,
            backgroundColor: theme.palette.states.hover
        }
    },
    selected: {}
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function PaginationItemWithRef(
  {
    classes,
    className,
    ...otherProps
  }: MuiPaginationItemProps,
  ref: React.ForwardedRef<HTMLDivElement>
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
    <MuiPaginationItem
      {...otherProps}
      classes={mergedClasses}
      ref={ref}
    />
  )
}

PaginationItemWithRef.displayName = 'PaginationItemWithRef';

export const PaginationItem = forwardRef<HTMLDivElement, MuiPaginationItemProps>(PaginationItemWithRef);
