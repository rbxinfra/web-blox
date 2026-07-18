import React, { FunctionComponent } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, classNames, useTheme } from '@rbx/ui';
import { TBackgroundColor, TMediaColor } from '@rbx/ui/theme/types/colorPaletteTypes';
import useColorStyles from './Colors.styles';

export default {
  title: 'Theme/Palette/Media'
};

const getMediaData = (
  background: TBackgroundColor,
  media: TMediaColor
): { key: string; desc: string; border?: boolean; color: string }[] => [
    {
      key: 'background',
      border: true,
      desc: 'Backdrop for primary content (code & charts)',
      color: background.media
    },
    {
      key: 'secondaryBackground',
      border: true,
      desc: 'Backdrop for supporting content (line numbers, chart key)',
      color: media.secondaryBackground
    },
    {
      key: 'toolbar',
      border: true,
      desc: 'Backdrop for toolbar, actions, button groups on code, charts & media',
      color: media.toolbar
    },
    {
      key: 'divider',
      desc: 'Divider fill color',
      color: media.divider
    },
    {
      key: 'topOverlay',
      border: true,
      desc: 'Background for header content overlaid on media',
      color: media.topOverlay
    },
    {
      key: 'bottomOverlay',
      border: true,
      desc: 'Background for footer content overlaid on media',
      color: media.bottomOverlay
    }
  ];

export const Media: FunctionComponent = () => {
  const { classes: { cellName, cellColor, colorCircle, colorCircleBorder } } = useColorStyles();

  const theme = useTheme();
  const { background, media } = theme.palette;

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
        {getMediaData(background, media).map(row => (
          <TableRow key={row.key}>
            <TableCell className={cellName}>{`Media ${row.key.charAt(0).toUpperCase() + row.key.slice(1)
              }`}</TableCell>
            <TableCell className={cellColor}>
              <div
                className={classNames(colorCircle, { [colorCircleBorder]: row.border })}
                style={{
                  background: row.color
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