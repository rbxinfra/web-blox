import React from 'react';
import {
  BottomNavigation,
  TBottomNavigationProps,
  BottomNavigationAction,
  FavoriteIcon,
  RestoreIcon,
  LocationOnIcon
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [BottomNavigation](https://v5.mui.com/api/bottom-navigation/) 
and [BottomNavigationAction](https://v5.mui.com/api/bottom-navigation-action/).`;

export default {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=184%3A8851'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TBottomNavigationProps, 'showLabels'>> = ({ showLabels }) => {
  const [value, setValue] = React.useState('recents');
  const handleValueChange = (_: React.ChangeEvent<{}>, newValue: string): void => {
    setValue(newValue);
  };

  return (
    <BottomNavigation showLabels={showLabels} value={value} onChange={handleValueChange}>
      <BottomNavigationAction label='Recents' value='recents' icon={<RestoreIcon />} />
      <BottomNavigationAction label='Favorites' value='favorites' icon={<FavoriteIcon />} />
      <BottomNavigationAction label='Nearby' value='nearby' icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};

configureArgs(Base, {
  showLabels: createBooleanControl(
    'Defines if labels on bottom navigation actions should be shown',
    false
  )
});
