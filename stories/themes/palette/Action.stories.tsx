import type { TActionColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import useColorStyles from './Colors.styles';

export default {
  title: "Theme/Palette/Action"
};

const actionData: { key: keyof TActionColor; desc: string; border?: boolean }[] = [
  {
    key: 'active',
    desc: 'Fill color for components in active state (List, Table, etc)'
  },
  {
    key: 'hover',
    border: true,
    desc: 'Fill background for components in hover state (List, Table, etc)'
  },
  {
    key: 'selected',
    border: true,
    desc: 'Fill background for components in selected state (List, Table, etc)'
  },
  {
    key: 'disabled',
    desc: 'Content color for components in disabled state (Button, List, Table, etc)'
  },
  {
    key: 'disabledBackground',
    border: true,
    desc: 'Fill background for components in disabled state (List, Table, etc)'
  },
  {
    key: 'focus',
    border: true,
    desc: 'Fill background for components in focus state (List, Table, etc)'
  }
];

export const Action: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();
  const theme = useTheme();
  const { action } = theme.palette;

  return (
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell className={cellName}>Variable name</TableCell>
          <TableCell className={cellColor}>Sample</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {actionData.map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Action ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: row.border })}
                style={{
                  backgroundColor: action[row.key] as string
                }}
              />
            </TableCell>
            <TableCell>{row.desc}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};