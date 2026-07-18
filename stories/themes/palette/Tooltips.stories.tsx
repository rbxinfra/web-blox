import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TPalette } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Tooltips'
};

const getTooltipsData = (
  palette: TPalette
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'background',
      desc: 'Used for tooltip background',
      color: palette.background.tooltips
    }
  ];

export const Tooltips: FunctionComponent = () => {
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
        {getTooltipsData(palette).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Tooltips
               ${row.key.charAt(0).toUpperCase() + row.key.slice(1)}`}</TableCell>
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
