import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TTableCellProps,
  TTableProps,
  TTableRowProps
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Table](https://v5.mui.com/api/table/#table-api), [TableBody](https://v5.mui.com/api/table-body/#tablebody-api),
[TableCell](https://v5.mui.com/api/table-cell/#tablecell-api), [TableContainer](https://v5.mui.com/api/table-container/#tablecontainer-api),
[TableFooter](https://v5.mui.com/api/table-footer/#tablefooter-api), [TableHead](https://v5.mui.com/api/table-head/#tablehead-api),
[TablePagination](https://v5.mui.com/api/table-pagination/#tablepagination-api), [TableRow](https://v5.mui.com/api/table-row/#tablerow-api) and
[TableSortLabel](https://v5.mui.com/api/table-sort-label/#tablesortlabel-api).`;

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gKvhpvi2PGHT76Q6uZTkG9/Design-Staging-v2?node-id=1%3A12722'
    }
  }
} as Meta;

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0)
];

export const Base: StoryFn<
  Pick<TTableProps, 'padding' | 'size' | 'stickyHeader'> & {
    checkboxSize: 'small' | 'medium';
  }
> = ({ padding, size, stickyHeader, checkboxSize }) => {
  return (
    <TableContainer style={{ maxHeight: 450 }}>
      <Table size={size} padding={padding} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow style={{ backgroundColor: '#121212' }}>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='left'>Calories</TableCell>
            <TableCell align='left'>Fat (g)</TableCell>
            <TableCell align='left'>Carbs (g)</TableCell>
            <TableCell align='left'>Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align='left'>
                <Checkbox color='secondary' size={checkboxSize} />
                {row.calories}
              </TableCell>
              <TableCell align='left'>
                <Checkbox color='secondary' size={checkboxSize} />
                {row.fat}
              </TableCell>
              <TableCell align='left'>
                <Checkbox color='secondary' size={checkboxSize} />
                {row.carbs}
              </TableCell>
              <TableCell align='left'>
                <Checkbox color='secondary' size={checkboxSize} />
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

configureArgs(Base, {
  padding: createEnumControl('Defines the padding of the table cells.', 'normal', [
    'normal',
    'checkbox',
    'none'
  ]),
  size: createEnumControl('Defines the size of the table cells.', 'medium', ['small', 'medium']),
  stickyHeader: createBooleanControl(
    "Defines if the table header should be sticky. It doesn't work with IE11.",
    false
  ),
  checkboxSize: createEnumControl('Defines the size of the checkbox', 'small', ['small', 'medium'])
});

export const TableCellConfig: StoryFn<
  Pick<
    TTableCellProps,
    'size' | 'disableBorder' | 'hover' | 'selected' | 'align' | 'padding' | 'highlighted'
  > & {
    enableCheckbox: boolean;
  }
> = ({ size, disableBorder, hover, selected, highlighted, align, padding, enableCheckbox }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              style={{ width: 250 }}
              size={size}
              align={align}
              disableBorder={disableBorder}
              hover={hover}
              selected={selected}
              highlighted={highlighted}
              padding={padding}>
              {enableCheckbox && <Checkbox color='secondary' />}
              Table Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

configureArgs(TableCellConfig, {
  size: createEnumControl('Defines the size of the table cell.', 'medium', ['small', 'medium']),
  disableBorder: createBooleanControl('Defines if the bottom border should be disabled.', false),
  hover: createBooleanControl('Defines if the table cell will shade on hover.', false),
  selected: createBooleanControl(
    'Defines if the table cell will have selected shading. It overwrites the highlighted shading.',
    false
  ),
  highlighted: createBooleanControl(
    'Defines if the table cell will have highlighted shading.',
    false
  ),
  align: createEnumControl(
    'Defines the text-align on the table cell content. Monetary or generally number fields should be right aligned as that allows you to add them up quickly in your head without having to worry about decimals.',
    'center',
    ['center', 'justify', 'left', 'right']
  ),
  padding: createEnumControl('Defines the padding of the table cell.', 'normal', [
    'normal',
    'normal',
    'checkbox',
    'none'
  ]),
  enableCheckbox: createBooleanControl('Defines if a checkbox is enabled.', false)
});

export const TableRowConfig: StoryFn<Pick<TTableRowProps, 'hover' | 'selected'>> = ({
  hover,
  selected
}) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow hover={hover} selected={selected}>
            <TableCell>Table cell</TableCell>
            <TableCell>Table cell</TableCell>
            <TableCell>Table cell</TableCell>
            <TableCell>Table cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

configureArgs(TableRowConfig, {
  hover: createBooleanControl('Defines if the table row will shade on hover.', false),
  selected: createBooleanControl('Defines if the table row will have selected shading.', false)
});

export const PaginatedTable: StoryFn = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat (g)</TableCell>
            <TableCell align='right'>Carbs (g)</TableCell>
            <TableCell align='right'>Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.name}>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              style={{ borderBottom: 'none' }}
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export const SortableTable: StoryFn = () => {
  const headCells = [
    { id: 'name', label: 'Dessert (100g serving)' },
    { id: 'calories', label: 'Calories' },
    { id: 'fat', label: 'Fat (g)' },
    { id: 'carbs', label: 'Carbs (g)' },
    { id: 'protein', label: 'Protein (g)' }
  ];

  type Order = 'asc' | 'desc';

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof Record<string, string>>(
    order: Order,
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(row => (
              <TableCell align='right' key={row.id}>
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={orderBy === row.id ? order : 'asc'}
                  onClick={() => handleRequestSort(row.id)}>
                  {row.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map(row => (
            <TableRow key={row.name}>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
