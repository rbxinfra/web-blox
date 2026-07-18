import { StoryFn, Meta } from '@storybook/react';
import { Paper, makeStyles, TPaperProps } from '@rbx/ui';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Paper](https://v5.mui.com/components/paper/).`;

export default {
  title: 'Components/Paper',
  component: Paper,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3586%3A46'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TPaperProps, 'square' | 'variant'>> = ({ square, variant }) => {
  const {
    classes: { paper }
  } = makeStyles()({
    paper: {
      width: 400,
      height: 400
    }
  })();
  return <Paper classes={{ root: paper }} square={square} variant={variant} />;
};
configureArgs(Base, {
  square: createBooleanControl('Defines if the paper shape should be square', false),
  variant: createEnumControl('Defines variant type of the paper', 'filled', ['filled', 'outlined'])
});
