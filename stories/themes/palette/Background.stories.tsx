import { TBackgroundColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Background'
};

type TBackgroundKey = keyof TBackgroundColor;
type TBackgroundData = {
  [k in TBackgroundKey]: {
    description: string;
    border?: boolean;
  };
};

const BackgroundData: TBackgroundData = {
  default: {
    description: 'Background of paper component',
    border: true
  },
  tooltips: {
    description: 'Used for tooltip background',
    border: true
  },
  media: {
    description: 'Backdrop for primary content (code & charts)',
    border: true
  },
  snackbar: {
    description: 'Snackbar background',
    border: true
  },
  paper: {
    description: 'Paper background',
    border: true
  }
} as const;

export const Background: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { background } = theme.palette;
  
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
        {Object.entries(BackgroundData).map(([key, { border, description }]) => (
          <TableRow key={key}>
            <TableCell className={cellName}>{`Background ${key.charAt(0).toUpperCase() + key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: border })}
                style={{
                  backgroundColor: background[key as TBackgroundKey]
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