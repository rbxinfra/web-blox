import type { ReactNode } from 'react';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';

import Button from '../button/Button';
import type { TButtonColor } from '../input/ButtonGroup';

export interface TDialogTemplateProps {
  id?:          string;
  title?:       ReactNode;
  content?:     ReactNode;
  confirmText?: string;
  cancelText?:  string;
  onConfirm?:   () => void;
  onCancel?:    () => void;
  loading?:     boolean;
  color?:       TButtonColor;
}

function DialogTemplate({
  id,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  loading  = false,
  color    = 'primaryBrand',
}: TDialogTemplateProps) {
  return (
    <div>
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-content-text-describe-id">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          variant="outlined"
          aria-label={cancelText}
          color="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          size="large"
          variant="contained"
          loading={loading}
          aria-label={confirmText}
          color={color}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </div>
  );
}

DialogTemplate.displayName = 'DialogTemplate';

export default DialogTemplate;