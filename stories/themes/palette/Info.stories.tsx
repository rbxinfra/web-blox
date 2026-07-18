import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TAlertColor, TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Info'
};

const getInfoData = (
  info: TDefaultColor,
  stateInfo: TStateColor,
  alertInfo: TAlertColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Used for alert component',
      color: info.main
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: info.dark
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: info.light
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. color',
      color: info.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'New color/new token. Fill background color for contained variant components in hover state (Button, FAB, etc)',
      color: stateInfo.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: stateInfo.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      border: true,
      desc: 'Used for outlined variant components in resting state (Button, Chip, etc)',
      color: stateInfo.outlinedRestingBorder
    },
    {
      key: 'alert/content',
      desc: 'Text color for the info Alert component',
      color: alertInfo.content
    },
    {
      key: 'alert/background',
      border: true,
      desc: 'Background color for the info Alert component',
      color: alertInfo.background
    }
  ];

export const Info: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { info, stateInfo, alertInfo } = theme.palette;

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
        {getInfoData(info, stateInfo, alertInfo).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Info ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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