import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  TDialogProps,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTemplate,
  TDialogTemplateProps,
  DialogProvider,
  TDialogContext,
  useDialog
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Dialog](https://v5.mui.com/api/dialog/); See design system 
component in [Figma](https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=788%3A48)`;
const content =
  'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TDialogProps, 'maxWidth'> & Pick<TDialogTemplateProps, 'loading' | 'color'>
> = ({ maxWidth, color, loading }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Open Dialog</Button>
      <Dialog maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTemplate
          color={color}
          loading={loading}
          title='Dialog Title'
          content={content}
          cancelText='Cancel'
          confirmText='Confirm'
          onCancel={handleClose}
          onConfirm={handleClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

configureArgs(Base, {
  color: createEnumControl('Defines the color of the primary button', 'primaryBrand', [
    'primaryBrand',
    'destructive'
  ]),
  loading: createBooleanControl('Defines if the primary button should be loading', false),
  maxWidth: createEnumControl('Defines the max-width of the dialog', 'sm', [
    'xs',
    'sm',
    'md',
    'lg',
    false
  ])
});

export const CustomDialog: StoryFn = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Open Dialog</Button>
      <Dialog maxWidth='sm' open={open} onClose={handleClose}>
        <DialogTitle id=''>Dialog Title</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const DialogWithProvider: StoryFn = () => {
  const CloseDialog = ({ configure, close }: Pick<TDialogContext, 'close' | 'configure'>) => (
    <DialogTemplate
      color='destructive'
      title=' Destructive Dialog'
      content={content}
      cancelText='Cancel'
      confirmText='Update To Configure'
      onConfirm={() => {
        
        configure(<ConfirmDialog configure={configure} close={close} />);
      }}
      onCancel={close}
    />
  );

  const ConfirmDialog = ({ configure, close }: Pick<TDialogContext, 'close' | 'configure'>) => (
    <DialogTemplate
      color='primaryBrand'
      title='Confirm Dialog'
      content={content}
      cancelText='Cancel'
      confirmText='Update To Destructive'
      onConfirm={() => {
        configure(<CloseDialog configure={configure} close={close} />);
      }}
      onCancel={close}
    />
  );
  const DialogComponent = () => {
    const { open, close, configure } = useDialog();

    useEffect(() => {
      configure(<ConfirmDialog configure={configure} close={close} />);
      // NOTE(jcountryman,06/22/22): Use mounted effect (triggers once on
      // component mount)
      
    }, []);

    return <Button onClick={open}>Open Dialog</Button>;
  };

  return (
    <DialogProvider>
      <DialogComponent />
    </DialogProvider>
  );
};
