import { TAlertColor, TDefaultColor, TStateColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Error'
};

const getErrorData = (
  error: TDefaultColor,
  alertError: TAlertColor,
  stateError: TStateColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'main',
      desc: 'Used for alert component',
      color: error.main
    },
    {
      key: 'dark',
      desc: 'Alternative dark shade',
      color: error.dark
    },
    {
      key: 'light',
      desc: 'Alternative light shade',
      color: error.light
    },
    {
      key: 'contrastText',
      border: true,
      desc: 'Color that keeps a contrast ratio above AA when XX.main is used as a bg. Color',
      color: error.contrastText
    },
    {
      key: 'state/containedHoverBackground',
      desc:
        'New color/not a token. Fill background color for contained variant components in hover state (Button, FAB, etc)',
      color: stateError.containedHoverBackground
    },
    {
      key: 'state/outlinedHoverBackground',
      border: true,
      desc:
        'Fill background color for outlined & text variant components in hover state (Button, etc)',
      color: stateError.outlinedHoverBackground
    },
    {
      key: 'state/outlinedRestingBorder',
      desc: 'Used for outlined variant components in resting state (Button, Chip, etc)',
      color: stateError.outlinedRestingBorder
    },
    {
      key: 'alert/content',
      desc: 'Text color for the error Alert component',
      color: alertError.content
    },
    {
      key: 'alert/background',
      border: true,
      desc: 'Background color for Alert component',
      color: alertError.background
    }
  ];

export const Error: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();
  const theme = useTheme();
  const { error, alertError, stateError } = theme.palette;

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
        {getErrorData(error, alertError, stateError).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Error ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
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