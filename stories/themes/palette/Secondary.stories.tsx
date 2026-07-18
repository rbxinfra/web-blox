import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Secondary'
};

const getSecondaryData = (
  secondary: TDefaultColor,
  stateSecondary: TStateColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Main color used by most components',
      color: secondary.main
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: secondary.dark
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: secondary.light
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. color',
      color: secondary.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'New color/not a token. Fill background for contained variant components in hover state (Button, FAB, etc)',
      color: stateSecondary.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      desc: 'Fill background for outlined & text variant components in hover state (Button, etc)',
      color: stateSecondary.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      desc: 'Used for outlined variant components in resting state (Button, Chip, etc)',
      color: stateSecondary.outlinedRestingBorder
    }
  ];

export const Secondary: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { secondary, stateSecondary } = theme.palette;

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
        {getSecondaryData(secondary, stateSecondary).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Secondary ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: row.border })}
                style={{
                  backgroundColor: row.color
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
