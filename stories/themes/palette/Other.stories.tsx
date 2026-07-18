import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TPalette } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Other'
};

const getOtherData = (
  palette: TPalette
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'divider',
      desc: 'Divider fill color',
      color: palette.divider
    },
    {
      key: 'outlineBorder',
      desc:
        'Border style for outlined variant components in resting state (Text Field, Select, Chips, etc)',
      color: palette.outlineBorder
    },
    {
      key: 'standardInputLine',
      desc: 'Border style for standard variant Text Field & Select',
      color: palette.standardInputLine
    },
    {
      key: 'backdropOverlay',
      border: true,
      desc: 'Backdrop overlay style',
      color: palette.backdropOverlay
    },
    {
      key: 'activeRating',
      desc: 'Active state color for Rating component',
      color: palette.activeRating
    },
    {
      key: 'snackbar',
      border: true,
      desc: 'Snackbar background',
      color: palette.background.snackbar
    }
  ];

export const Other: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { palette } = theme;

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
        {getOtherData(palette).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Other ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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