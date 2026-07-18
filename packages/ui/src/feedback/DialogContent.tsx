import { forwardRef } from 'react';
import MuiDialogContent, {
  type DialogContentProps as MuiDialogContentProps,
} from '@mui/material/DialogContent';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  dialogContentClasses,
  type DialogContentProps as TDialogContentProps,
  type DialogContentClasses as TDialogContentClasses,
  type DialogContentClassKey as TDialogContentClassKey
} from '@mui/material/DialogContent';

const useStyles = makeStyles({ name: 'DialogContent' })({
  root: { paddingLeft: 20, paddingRight: 20, paddingBottom: 12 },
  dividers: { margin: '0 24px', padding: '16px 0' },
});

function DialogContentWithRef({ classes, children, className, ...otherProps }: MuiDialogContentProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiDialogContent {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiDialogContent>
  );
}

DialogContentWithRef.displayName = 'DialogContentWithRef';

const DialogContent = forwardRef<HTMLDivElement, MuiDialogContentProps>(DialogContentWithRef);

export default DialogContent;