import { forwardRef } from 'react';
import type { CSSObject } from 'tss-react';
import MuiListSubheader, {
  type ListSubheaderProps as MuiListSubheaderProps,
} from '@mui/material/ListSubheader';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  listSubheaderClasses,
  type ListSubheaderProps as TListSubheaderProps,
  type ListSubheaderClasses as TListSubheaderClasses,
  type ListSubheaderClassKey as TListSubheaderClassKey
} from '@mui/material/ListSubheader';

const useStyles = makeStyles({ name: 'ListSubheader' })(
  (theme: TTheme) => ({
    root: {
      ...theme.typography.overline,
      color:           theme.palette.content.muted,
      backgroundColor: 'transparent',
      paddingBottom:   8,
    } as CSSObject,
  }),
);

function ListSubheaderWithRef({ classes, children, className, ...otherProps }: MuiListSubheaderProps, ref: React.Ref<HTMLLIElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiListSubheader {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiListSubheader>
  );
}

ListSubheaderWithRef.displayName = 'ListSubheaderWithRef';

const ListSubheader = forwardRef<HTMLLIElement, MuiListSubheaderProps>(ListSubheaderWithRef);

export default ListSubheader;