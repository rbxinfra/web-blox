import React from 'react';
import { makeStyles, Backdrop, TBackdropProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createStringControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Backdrop](https://v5.mui.com/api/backdrop/).`;

export default {
  title: 'Components/Backdrop',
  component: Backdrop,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=788%3A1827'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TBackdropProps, 'open'> & { backdropText: string }> = ({
  open,
  backdropText
}) => {
  const {
    classes: { backdrop }
  } = makeStyles()({
    backdrop: {
      position: 'relative',
      height: 100,
      zIndex: 10
    }
  })();
  return (
    <Backdrop classes={{ root: backdrop }} open={open}>
      {backdropText}
    </Backdrop>
  );
};
configureArgs(Base, {
  open: createBooleanControl('Defines if the backdrop should be shown.', false),
  backdropText: createStringControl(
    'Defines backdrop text. This can take in React children if additional customization is required.',
    'Backdrop Text'
  )
});
