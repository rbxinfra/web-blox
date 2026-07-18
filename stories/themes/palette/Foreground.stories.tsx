import { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TForeGroundColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Foreground'
};

type TForegroundKey = keyof TForeGroundColor;
type TForegroundData = {
  [k in TForegroundKey]: {
    description: string;
    border?: boolean;
  };
};

const foregroundData: TForegroundData = {
  main: {
    border: true,
    description: 'Backdrop for surfaces that above paper (e.g. menus on modals)'
  },
  secondary: {
    border: true,
    description: 'Secondary color to highlight objects in contrast to main'
  },
  paper: {
    border: true,
    description: 'Backdrop for surfaces and layout elements that sit above the background'
  }
} as const;

export const Foreground: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { foreground } = theme.palette;

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
        {Object.entries(foregroundData).map(([key, { border, description }]) => (
          <TableRow key={key}>
            <TableCell className={cellName}>{`Foreground ${key.charAt(0).toUpperCase() + key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: border })}
                style={{
                  backgroundColor: foreground[key as TForegroundKey]
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