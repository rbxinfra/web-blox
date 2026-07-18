import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TLayoutColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Layout'
};

type TLayoutKey = keyof TLayoutColor;
type TLayoutData = {
  [k in TLayoutKey]: {
    description: string;
    border?: boolean;
  };
};

const LayoutData: TLayoutData = {
  divider: {
    border: true,
    description: 'Black • Divider fill color'
  }
} as const;

export const Layout: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { layout } = theme.palette;

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
        {Object.entries(LayoutData).map(([key, { border, description }]) => (
          <TableRow key={key}>
            <TableCell className={cellName}>{`Layout ${key.charAt(0).toUpperCase() + key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: border })}
                style={{
                  backgroundColor: layout[key as TLayoutKey]
                }}
              />
            </TableCell>
            <TableCell>{description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};