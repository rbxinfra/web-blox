import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  TListProps,
  ListItemIcon,
  StarIcon,
  ListItemSecondaryAction,
  IconButton,
  CloseIcon,
  ListSubheader
} from '@rbx/ui';
import { createBooleanControl, createStringControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [List](https://v5.mui.com/api/list/), [List Subheader](https://v5.mui.com/api/list-subheader/),
[List Item](https://v5.mui.com/api/list-item/), [List Item Text](https://v5.mui.com/api/list-item-text/), 
[List Item Avatar](https://v5.mui.com/api/list-item-avatar/), [List Item Icon](https://v5.mui.com/api/list-item-icon/) 
and [List Item Secondary Action](https://v5.mui.com/api/list-item-secondary-action/).`;

export default {
  title: 'Components/List',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=284%3A219'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TListProps, 'dense'> & {
    button: boolean;
    selected: boolean;
    showSubheader: boolean;
    showListIcon: boolean;
    showListAvatar: boolean;
    showListSecondaryAction: boolean;
    listItemText: string;
    listItemSecondaryText: string;
  }
> = ({
  dense,
  button,
  selected,
  showSubheader,
  showListIcon,
  showListAvatar,
  showListSecondaryAction,
  listItemText,
  listItemSecondaryText
}) => {
    const numListItems = 3;
    const listItemContent = (
      <React.Fragment>
        {showListIcon && (
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
        )}
        {showListAvatar && (
          <ListItemAvatar>
            <Avatar alt='DO'>DO</Avatar>
          </ListItemAvatar>
        )}
        <ListItemText primary={listItemText} secondary={listItemSecondaryText} />
        {showListSecondaryAction && (
          <ListItemSecondaryAction>
            <IconButton aria-label='Close' color='secondary'>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </React.Fragment>
    );

    const listItem = button ? (
      <ListItemButton selected={selected}>{listItemContent}</ListItemButton>
    ) : (
      <ListItem>{listItemContent}</ListItem>
    );

    return (
      <List
        dense={dense}
        subheader={showSubheader ? <ListSubheader>List Subheader Text</ListSubheader> : undefined}>
        {[...Array(numListItems)].map(() => listItem)}
      </List>
    );
  };
configureArgs(Base, {
  dense: createBooleanControl(
    'Defines if compact vertical padding should be used for the list and list items.',
    false
  ),
  button: createBooleanControl('Defines if list items should be buttons.', false),
  selected: createBooleanControl('Defines if list items are selected.', false),
  showSubheader: createBooleanControl(
    'Defines if the list subheader should show via `subheader` prop. This can take in React children if additional customization is required.',
    false
  ),
  showListIcon: createBooleanControl(
    'Defines if the list icon should show via the `<ListItemIcon>` component. This can take in React children if additional customization is required.',
    false
  ),
  showListAvatar: createBooleanControl(
    'Defines if the list avatar should show via the `<ListItemAvatar>` component. This can take in React children if additional customization is required.',
    false
  ),
  showListSecondaryAction: createBooleanControl(
    'Defines if the list secondary action should show via the `<ListItemSecondaryAction>` component. This can take in React children if additional customization is required.',
    false
  ),
  listItemText: createStringControl(
    'Defines list item primary text. This can take in React children if additional customization is required.',
    'List Item Primary Text'
  ),
  listItemSecondaryText: createStringControl(
    'Defines list item secondary text. This can take in React children if additional customization is required.',
    'List Item Secondary Text'
  )
});
