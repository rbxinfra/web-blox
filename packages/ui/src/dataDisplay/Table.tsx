import { forwardRef } from 'react';
import MuiTable, { type TableProps as MuiTableProps } from '@mui/material/Table';

export {
  tableClasses,
  type TableProps as TTableProps,
  type TableClasses as TTableClasses,
  type TableClassKey as TTableClassKey
} from '@mui/material/Table';

function TableWithRef({ children, padding, ...otherProps }: MuiTableProps, ref: React.Ref<HTMLTableElement>) {
  const muiPadding = padding === undefined ? 'normal' : padding;

  return (
    <MuiTable {...otherProps} padding={muiPadding} ref={ref}>
      {children}
    </MuiTable>
  );
}

TableWithRef.displayName = 'TableWithRef';

const Table = forwardRef<HTMLTableElement, MuiTableProps>(TableWithRef);

export default Table;