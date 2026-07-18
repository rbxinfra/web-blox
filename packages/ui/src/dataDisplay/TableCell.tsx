import { forwardRef } from 'react';
import MuiTableCell, { type TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
    tableCellClasses,
    type TableCellClasses as TTableCellClasses,
    type TableCellClassKey as TTableCellClassKey
} from '@mui/material/TableCell';

export interface TTableCellProps extends MuiTableCellProps {
    disableBorder?: boolean;
    hover?: boolean;
    selected?: boolean;
    highlighted?: boolean;
}

const useStyles = makeStyles({ name: 'TableCell' })(
  (theme: TTheme) => ({
    root: {
      borderBottom: `1px solid ${theme.palette.components.divider}`,
    },
    hover: {
      '&:hover': {
        backgroundColor: theme.palette.states.hover,
      },
    },
    disabledBorder: {
      borderBottom: 'none',
    },
    selected: {
      backgroundColor: theme.palette.statePrimary.outlinedHoverBackground
    },
    highlighted: {
      backgroundColor: theme.palette.background.media
    }
  }),
);

function TableCellWithRef(
    { 
        children,
        classes,
        disableBorder: muiDisableBorder = false,
        hover: muiHover = false,
        selected: muiSelected = false,
        highlighted: muiHighlighted = false,
        ...otherProps 
    }: TTableCellProps, 
    ref: React.Ref<HTMLTableCellElement>
) {
    const { 
        classes: { root, hover, disabledBorder, selected, highlighted, ...otherClasses },
        cx
    } = useStyles(undefined, {
        props: { classes: combineOverrides(classes, otherProps.className) },
    });

    return (
        <MuiTableCell
            {...otherProps}
            ref={ref}
            classes={{
                root: cx(root, muiDisableBorder && disabledBorder, muiHover && hover, muiSelected && selected, muiHighlighted && highlighted),
                ...otherClasses,
            }}
        >
            {children}
        </MuiTableCell>
    );
}

TableCellWithRef.displayName = 'TableCellWithRef';

const TableCell = forwardRef<HTMLTableCellElement, TTableCellProps>(TableCellWithRef);

export default TableCell;