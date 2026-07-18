import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TNavigationColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Navigation'
};

type TNavigationKey = keyof TNavigationColor;
type TNavigationData = {
  [k in TNavigationKey]: {
    description: string;
    border?: boolean;
  };
};

const NavigationData: TNavigationData = {
  global: {
    border: true,
    description: 'Global color for navigation elements'
  },
  default: {
    border: true,
    description: 'Default color for navigation elements'
  }
} as const;

export const Navigation: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();
  const theme = useTheme();
  const { navigation } = theme.palette;

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
        {Object.entries(NavigationData).map(([key, { border, description }]) => (
          <TableRow key={key}>
            <TableCell className={cellName}>{`Navigation ${key.charAt(0).toUpperCase() + key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: border })}
                style={{
                  backgroundColor: navigation[key as TNavigationKey]
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