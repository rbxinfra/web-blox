import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Container, TContainerProps, makeStyles } from '@rbx/ui';
import { createBooleanControl, createEnumControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Container](https://v5.mui.com/api/container/).`;

export default {
  title: 'Components/Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=6546%3A45426'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TContainerProps, 'fixed' | 'disableGutters' | 'maxWidth'>> = ({
  fixed,
  disableGutters,
  maxWidth
}) => {
  const {
    classes: { foreground }
  } = makeStyles()(theme => ({
    foreground: {
      width: '100%',
      height: 100,
      borderRadius: 5,
      backgroundColor: theme.palette.content.standard
    }
  }))();
  return (
    <React.Fragment>
      <Container
        maxWidth={maxWidth === false ? false : maxWidth}
        fixed={fixed}
        disableGutters={disableGutters}>
        <div className={foreground} />
      </Container>
    </React.Fragment>
  );
};

configureArgs(Base, {
  fixed: createBooleanControl(
    'Defines if the container should be fixed. It requires setting the max-width to match the min-width of the current breakpoint.',
    false
  ),
  disableGutters: createBooleanControl(
    'Defines if container left and right paddings should be removed.',
    false
  ),
  maxWidth: createEnumControl(
    'Defines the max-width of the container. The container width grows with the size of the screen.',
    'lg',
    ['xl', 'lg', 'md', 'sm', 'xs', false]
  )
});
