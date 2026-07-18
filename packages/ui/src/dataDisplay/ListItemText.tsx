import { forwardRef } from 'react';
import type { CSSObject } from 'tss-react';
import MuiListItemText, {
  type ListItemTextProps as MuiListItemTextProps,
} from '@mui/material/ListItemText';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  listItemTextClasses,
  type ListItemTextProps as TListItemTextProps,
  type ListItemTextClasses as TListItemTextClasses,
  type ListItemTextClassKey as TListItemTextClassKey
} from '@mui/material/ListItemText';

const useStyles = makeStyles({ name: 'ListItemText' })(
  (theme: TTheme) => ({
    primary: {
      ...theme.typography.body1,
      color: theme.palette.content.standard,
    } as CSSObject,
    secondary: {
      ...theme.typography.body2,
      color: theme.palette.content.muted,
    } as CSSObject,
  }),
);

function ListItemTextWithRef({ classes, className, ...otherProps }: MuiListItemTextProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiListItemText {...otherProps} classes={mergedClasses} ref={ref} />;
}

ListItemTextWithRef.displayName = 'ListItemTextWithRef';

const ListItemText = forwardRef<HTMLDivElement, MuiListItemTextProps>(ListItemTextWithRef);

export default ListItemText;