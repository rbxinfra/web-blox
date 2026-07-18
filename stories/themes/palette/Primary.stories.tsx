import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Primary'
};

const getPrimaryData = (
  primary: TDefaultColor,
  statePrimary: TStateColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Main color used by most components',
      color: primary.main
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: primary.light
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: primary.dark
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. color',
      color: primary.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'Fill background color for contained variant components in hover state (Button, FAB, etc)',
      color: statePrimary.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      border: true,
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: statePrimary.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      desc: 'Used for outlined variant components in resting state (Button, Chip, etc)',
      color: statePrimary.outlinedRestingBorder
    }
  ];

export const Primary: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { primary, statePrimary } = theme.palette;

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
        {getPrimaryData(primary, statePrimary).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Primary ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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
