import { Grid, Divider, TDividerProps, Typography, makeStyles } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Divider](https://v5.mui.com/api/divider/).`;

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=788%3A1548'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TDividerProps, 'variant' | 'size'>> = ({ variant, size }) => {
  const {
    classes: { divider }
  } = makeStyles()({
    divider: {
      margin: 5
    }
  })();
  return (
    <Grid container direction='column'>
      <Typography>Top Content</Typography>
      <Divider classes={{ root: divider }} orientation='horizontal' variant={variant} size={size} />
      <Typography>Bottom Content</Typography>
    </Grid>
  );
};

configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'fullWidth', [
    'fullWidth',
    'inset',
    'middle'
  ]),
  size: createEnumControl('Defines the size of the divider.', 'medium', ['medium', 'small'])
});

// variant props is not applicable when orientation = vertical
export const VerticalDivider: StoryFn = () => {
  const {
    classes: { divider }
  } = makeStyles()({
    divider: {
      margin: 5
    }
  })();
  return (
    <Grid container direction='row'>
      <Typography>Left Content</Typography>
      <Divider classes={{ root: divider }} orientation='vertical' flexItem />
      <Typography>Right Content</Typography>
    </Grid>
  );
};
VerticalDivider.parameters = {
  docs: {
    description: {
      story: `\`variant\` props is not applicable when variant is vertical.`
    }
  }
};
