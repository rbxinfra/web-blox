import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TAlertColor, TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Warning'
};

const getWarningData = (
  warning: TDefaultColor,
  stateWarning: TStateColor,
  alertWarning: TAlertColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Used for alert component',
      color: warning.main
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: warning.dark
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: warning.light
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. color',
      color: warning.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'New color/No token. Fill background color for contained variant components in hover state (Button, FAB, etc)',
      color: stateWarning.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      border: true,
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: stateWarning.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      desc: 'Used for outlined variant components in resting state (Button, Chip, etc) ',
      color: stateWarning.outlinedRestingBorder
    },
    {
      key: 'alert/content',
      desc: 'Text color for the error Alert component',
      color: alertWarning.content
    },
    {
      key: 'alert/background',
      border: true,
      desc: 'Background color for the error Alert component',
      color: alertWarning.background
    }
  ];

export const Warning: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { warning, stateWarning, alertWarning } = theme.palette;

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
        {getWarningData(warning, stateWarning, alertWarning).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Warning ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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
