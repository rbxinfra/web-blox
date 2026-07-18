import { forwardRef } from 'react';
import MuiListItemIcon, {
  type ListItemIconProps as MuiListItemIconProps,
} from '@mui/material/ListItemIcon';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  listItemIconClasses,
  type ListItemIconProps as TListItemIconProps,
  type ListItemIconClasses as TListItemIconClasses,
  type ListItemIconClassKey as TListItemIconClassKey
} from '@mui/material/ListItemIcon';

const useStyles = makeStyles({ name: 'ListItemIcon' })(
  () => ({
    root: { minWidth: 40 },
  }),
);

function ListItemIconWithRef({ classes, className, ...otherProps }: MuiListItemIconProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiListItemIcon {...otherProps} classes={mergedClasses} ref={ref} />;
}

ListItemIconWithRef.displayName = 'ListItemIconWithRef';

const ListItemIcon = forwardRef<HTMLDivElement, MuiListItemIconProps>(ListItemIconWithRef);

export default ListItemIcon;