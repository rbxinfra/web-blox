import { StoryFn } from '@storybook/react';
import { Table, TableBody, TableCell, TableRow, gray, makeStyles, useTheme } from '@rbx/ui';
import type { TElevation } from '@rbx/ui/theme/types/elevationTypes';

export default {
  title: "Theme/Elevation"
};

const getElevationData = (
  elevation: TElevation
): { key: string, desc: string; shadow: string; }[] => [
    {
      key: 'outlined',
      desc:
        'The outlined style is paired with Surface 0 to slightly foreground containers within a page, e.g. a container or page section',
      shadow: elevation.outlined
    },
    {
      key: 'subtle',
      desc:
        'The subtle style is paired with fine details to create depth, e.g. the knob of a switch or slider',
      shadow: elevation.subtle
    },
    {
      key: 'overlay',
      desc:
        'The overlay style is paired with Surface 300 or 400 to foreground containers overlaid on the UI, e.g. dialogs, snack bars, or pop-over menus',
      shadow: elevation.overlay
    }

  ];

export const Base: StoryFn = (_args, { globals }) => {
  const isDarkMode = globals.theme === 'dark';

  const {
    classes: { container, shadowCard }
  } = makeStyles()(theme => ({
    container: {
      backgroundColor: isDarkMode ? theme.palette.surface[200] : '#FFF'
    },
    shadowCard: {
      backgroundColor: isDarkMode ? theme.palette.surface[300] : gray[100], // Changed to gray_100 because Surface_0 is just #ffffff
      width: 100,
      height: 100
    }
  }))();

  const theme = useTheme();

  const { elevation } = theme;

  return (
    <div className={container}>
      <Table>
        <TableBody>
          {getElevationData(elevation).map(({ key, desc, shadow }) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                <div
                  className={shadowCard}
                  style={{
                    boxShadow: shadow
                  }}
                />
              </TableCell>
              <TableCell>{desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

Base.parameters = {
  backgrounds: {
    options: {
      transparent: {
        name: 'transparent',
        value: 'transparent'
      }
    }
  }
};

Base.globals = {
  backgrounds: {
    value: 'transparent'
  }
}