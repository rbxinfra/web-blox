import React from 'react';
import { Alert, AlertTitle, CloseIcon, TAlertProps, Button, IconButton } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Alert](https://v5.mui.com/api/alert/) and 
[Alert Title](https://v5.mui.com/api/alert-title/).`;

const alertContent =
  'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=162%3A8080'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TAlertProps, 'variant' | 'severity'>> = ({ variant, severity }) => {
  return (
    <Alert
      severity={severity}
      variant={variant}
      action={
        <Button color='inherit' size='small'>
          UNDO
        </Button>
      }>
      <AlertTitle>Alert Title</AlertTitle>
      {alertContent}
    </Alert>
  );
};

configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'standard', [
    'filled',
    'outlined',
    'standard'
  ]),
  severity: createEnumControl(
    'Defines the severity of the alert. This changes the alert color and icon.',
    'success',
    ['error', 'info', 'success', 'warning']
  )
});

export const DoubleActionAlert = () => {
  return (
    <Alert
      action={[
        <Button key='button' color='inherit' size='small'>
          UNDO
        </Button>,
        <IconButton aria-label='Close' key='iconButton' size='small' color='inherit'>
          <CloseIcon fontSize='small' />
        </IconButton>
      ]}>
      <AlertTitle>Alert Title</AlertTitle>
      {alertContent}
    </Alert>
  );
};
