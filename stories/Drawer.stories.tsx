import React, { useState } from 'react';
import { Drawer, TDrawerProps, Button, Grid, Typography } from '@rbx/ui';
import { StoryFn } from '@storybook/react';
import { createEnumControl, createStringControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Drawer](https://v5.mui.com/api/drawer/).`;

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=310%3A22523'
    }
  }
};

export const Base: StoryFn<Pick<TDrawerProps, 'anchor' | 'variant'> & { drawerText: string }> = ({
  anchor,
  variant,
  drawerText
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <React.Fragment>
      <Button onClick={() => toggleDrawer(true)}>Open Drawer</Button>
      <Drawer variant={variant} anchor={anchor} open={isOpen} onClose={() => toggleDrawer(false)}>
        <Grid>
          <Typography align='center'>{drawerText}</Typography>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};
configureArgs(Base, {
  anchor: createEnumControl('Defines the side of the screen where the drawer enters.', 'left', [
    'bottom',
    'right',
    'left',
    'top'
  ]),
  variant: createEnumControl('Defines the stylistic variant to use.', 'temporary', [
    'permanent',
    'persistent',
    'temporary'
  ]),
  drawerText: createStringControl(
    'Defines drawer text. This can take in React children if additional customization is required.',
    'Drawer Text'
  )
});
