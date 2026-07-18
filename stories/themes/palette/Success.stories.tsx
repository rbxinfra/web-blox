import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TAlertColor, TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Success'
};

const getSuccessData = (
  success: TDefaultColor,
  stateSuccess: TStateColor,
  alertSuccess: TAlertColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Used for alert component',
      color: success.main
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: success.dark
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: success.light
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. cr',
      color: success.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'New color/No token. Fill background color for contained variant components in hover state (Button, FAB, etc)',
      color: stateSuccess.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      border: true,
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: stateSuccess.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: stateSuccess.outlinedRestingBorder
    },
    {
      key: 'alert/content',
      desc: 'Text color for the info Alert component',
      color: alertSuccess.content
    },
    {
      key: 'alert/background',
      border: true,
      desc: 'Background color for the info Alert component',
      color: alertSuccess.background
    }
  ];

export const Success: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { success, stateSuccess, alertSuccess } = theme.palette;

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
        {getSuccessData(success, stateSuccess, alertSuccess).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Success ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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
