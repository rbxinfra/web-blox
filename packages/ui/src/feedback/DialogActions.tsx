import { forwardRef } from 'react';
import MuiDialogActions, {
  type DialogActionsProps as MuiDialogActionsProps,
} from '@mui/material/DialogActions';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  dialogActionsClasses,
  type DialogActionsProps as TDialogActionsProps,
  type DialogActionsClasses as TDialogActionsClasses,
  type DialogActionsClassKey as TDialogActionsClassKey
} from '@mui/material/DialogActions';

const useStyles = makeStyles({ name: 'DialogActions' })({
  root: { justifyContent: 'flex-end', padding: 20 },
});

function DialogActionsWithRef({ classes, children, className, ...otherProps }: MuiDialogActionsProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiDialogActions {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiDialogActions>
  );
}

DialogActionsWithRef.displayName = 'DialogActionsWithRef';

const DialogActions = forwardRef<HTMLDivElement, MuiDialogActionsProps>(DialogActionsWithRef);

export default DialogActions;