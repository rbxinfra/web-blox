import { forwardRef } from 'react';
import MuiListItemButton, {
  listItemButtonClasses,
  type ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material/ListItemButton';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  listItemButtonClasses,
  type ListItemButtonProps as TListItemButtonProps,
  type ListItemButtonClasses as TListItemButtonClasses,
  type ListItemButtonClassKey as TListItemButtonClassKey
} from '@mui/material/ListItemButton';

const useStyles = makeStyles({ name: 'ListItemButton' })(
  (theme: TTheme) => ({
    root: {
      ...theme.border.radius.medium,
      [`& .${listItemTextClasses.primary}, & .${listItemIconClasses.root}`]: {
        color: theme.palette.content.muted,
      },
      '&:hover': {
        backgroundColor: theme.palette.states.hover,
        [`& .${listItemTextClasses.primary}, & .${listItemIconClasses.root}`]: {
          color: theme.palette.content.standard,
        },
      },
      [`&.${listItemButtonClasses.selected}, &.${listItemButtonClasses.selected}:hover`]: {
        backgroundColor: theme.palette.action.selected,
        [`& .${listItemTextClasses.primary}`]: {
          fontWeight: theme.typography.fontWeightMedium,
        },
        [`& .${listItemTextClasses.primary}, & .${listItemIconClasses.root}`]: {
          color: theme.palette.content.standard,
        },
      },
    } as CSSObject,
    dense: {
      [`& .${listItemTextClasses.primary}, & .${listItemTextClasses.secondary}`]: {
        ...theme.typography.body2,
      },
    } as CSSObject,
  }),
);

function ListItemButtonWithRef({ classes, className, ...otherProps }: MuiListItemButtonProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiListItemButton {...otherProps} classes={mergedClasses} ref={ref} />
  );
}

ListItemButtonWithRef.displayName = 'ListItemButtonWithRef';

const ListItemButton = forwardRef<HTMLDivElement, MuiListItemButtonProps>(ListItemButtonWithRef);

export default ListItemButton;