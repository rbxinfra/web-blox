import { forwardRef } from 'react';
import MuiListItem, { type ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import { listItemTextClasses } from '@mui/material/ListItemText';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  listItemClasses,
  type ListItemProps as TListItemProps,
  type ListItemClasses as TListItemClasses,
  type ListItemClassKey as TListItemClassKey
} from '@mui/material/ListItem';
  
const useStyles = makeStyles({ name: 'ListItem' })(
  (theme: TTheme) => ({
    dense: {
      [`& .${listItemTextClasses.primary}, & .${listItemTextClasses.secondary}`]: {
        ...theme.typography.body2,
      },
    } as CSSObject,
  }),
);

function ListItemWithRef({ classes, className, ...otherProps }: MuiListItemProps, ref: React.Ref<HTMLLIElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiListItem {...otherProps} classes={mergedClasses} ref={ref} />;
}

ListItemWithRef.displayName = 'ListItemWithRef';

const ListItem = forwardRef<HTMLLIElement, MuiListItemProps>(ListItemWithRef);

export default ListItem;