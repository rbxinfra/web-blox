import React from 'react';
import {
  Avatar,
  Badge,
  AvatarGroup,
  TAvatarGroupProps,
  TAvatarProps,
  StarIcon,
  makeStyles
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createNumberControl, configureArgs } from './utils/controlUtils';
import avatar from '../static/avatar_sample.jpg';

const notes = `Built over MUI v5 [Avatar](https://v5.mui.com/api/avatar/) and [Avatar Group](https://v5.mui.com/api/avatar-group/).

### 🔄 Changelog
1. [Avatar] \`variant\` prop does not support \`circle\` as value. The default value is \`circular\`.`;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=170%3A8765'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TAvatarProps, 'variant'> & Pick<TAvatarGroupProps, 'max' | 'spacing'>
> = ({ variant, max, spacing }) => {
  return (
    <AvatarGroup max={max} spacing={spacing}>
      <Avatar alt='Remy Sharp' src={avatar} variant={variant} />
      <Avatar alt='Travis Howard' src={avatar} variant={variant} />
      <Avatar alt='Cindy Baker' src={avatar} variant={variant} />
      <Avatar alt='Agnes Walker' src={avatar} variant={variant} />
      <Avatar alt='Trevor Henderson' src={avatar} variant={variant} />
    </AvatarGroup>
  );
};

configureArgs(Base, {
  variant: createEnumControl('Defines the shape of each avatar.', 'circular', [
    'circular',
    'rounded',
    'square'
  ]),
  spacing: createEnumControl(
    'Defines the spacing between avatars. This can take in numbers if additional customization is required.',
    'medium',
    ['medium', 'small']
  ),
  max: createNumberControl(
    'Defines the max avatars to display before truncation occurs.',
    4,
    2,
    5,
    1
  )
});

export const NamedAvatar = () => {
  return <Avatar alt='DO'>DO</Avatar>;
};

export const IconAvatar = () => {
  return (
    <Avatar alt='Star Icon'>
      <StarIcon />
    </Avatar>
  );
};

export const BadgedAvatar: StoryFn = () => {
  const { classes } = makeStyles()(theme => ({
    badge: {
      backgroundColor: theme.palette.actionV2.active.fill,
      boxShadow: `0 0 0 2px ${theme.palette.surface[200]}`
    }
  }))();

  return (
    <Badge
      variant='dot'
      overlap='circular'
      classes={classes}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
      <Avatar alt='Avatar Image' src={avatar} />
    </Badge>
  );
};
