import React, { useCallback, useRef, useState } from 'react';
import { Snackbar, Button, IconButton, CloseIcon, SnackbarProvider, useSnackbar } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Snackbar](https://v5.mui.com/api/snackbar/).`;

export default {
  title: 'Components/Snackbar',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=376%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<{
  anchorVertical: 'bottom' | 'top';
  anchorHorizontal: 'center' | 'left' | 'right';
  showAction: boolean;
  autoHide: boolean;
}> = ({ anchorVertical, anchorHorizontal, showAction, autoHide }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
      <Snackbar
        autoHide={autoHide}
        anchorOrigin={{ vertical: anchorVertical, horizontal: anchorHorizontal }}
        open={open}
        onClose={() => setOpen(false)}
        message='Snackbar Message'
        action={
          showAction && (
            <div>
              <Button size='small' color='inherit' onClick={() => setOpen(false)}>
                UNDO
              </Button>
              <IconButton
                aria-label='Close'
                size='small'
                color='inherit'
                onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          )
        }
      />
    </React.Fragment>
  );
};
configureArgs(Base, {
  anchorVertical: createEnumControl('Defines vertical anchor positon of the snackbar. ', 'bottom', [
    'bottom',
    'top'
  ]),
  anchorHorizontal: createEnumControl(
    'Defines horizontal anchor positon of the snackbar.',
    'center',
    ['center', 'left', 'right']
  ),
  autoHide: createBooleanControl(
    'Defines if the snackbar should auto hide. The duration is fixed to 4 seconds.',
    false
  ),
  showAction: createBooleanControl(
    'Defines if the snackbar should show a close action via `action` prop.',
    false
  )
});

export const SnackbarWithProvider: StoryFn = () => {
  const SnackbarComponent = () => {
    const { enqueue, close } = useSnackbar();
    const [number, setNumber] = useState(0);

    return (
      <React.Fragment>
        <Button
          onClick={() => {
            enqueue(
              {
                message: `Snackbar Message ${number + 1}`,
                action: (
                  <IconButton
                    aria-label='Close'
                    size='small'
                    color='inherit'
                    onClick={() => { close(); }}>
                    <CloseIcon />
                  </IconButton>
                )
              },
              reason => reason === undefined
            );
            setNumber(number + 1);
          }}>
          {`Add Snackbar (enqueued ${number})`}
        </Button>
      </React.Fragment>
    );
  };
  return (
    <SnackbarProvider>
      <SnackbarComponent />
    </SnackbarProvider>
  );
};
