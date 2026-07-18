import { forwardRef } from 'react';
import MuiTableRow, { type TableRowProps as MuiTableRowProps, tableRowClasses } from '@mui/material/TableRow';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  tableRowClasses,
  type TableRowProps as TTableRowProps,
  type TableRowClasses as TTableRowClasses,
  type TableRowClassKey as TTableRowClassKey
} from '@mui/material/TableRow';

const useStyles = makeStyles({ name: 'TableRow' })(
  (theme: TTheme) => ({
    root: {
      [`&.${tableRowClasses.selected}, &.${tableRowClasses.selected}:hover`]: {
        backgroundColor: theme.palette.statePrimary.outlinedHoverBackground
      },
      [`&.${tableRowClasses.hover}:hover`]: {
        backgroundColor: theme.palette.states.hover
      }
    }
  }),
);

function TableRowWithRef(
  { children, classes, className, ...otherProps }: MuiTableRowProps,
  ref: React.Ref<HTMLTableRowElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiTableRow {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiTableRow>
  );
}

TableRowWithRef.displayName = 'TableRowWithRef';

const TableRow = forwardRef<HTMLTableRowElement, MuiTableRowProps>(TableRowWithRef);

export default TableRow;