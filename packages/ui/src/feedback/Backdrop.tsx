import { forwardRef } from 'react';
import MuiBackdrop, { type BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  backdropClasses,
  type BackdropProps as TBackdropProps,
  type BackdropClasses as TBackdropClasses,
  type BackdropClassKey as TBackdropClassKey
} from '@mui/material/Backdrop';

const useStyles = makeStyles({ name: 'Backdrop' })(
  (theme: TTheme) => ({
    root: {
      backgroundColor: theme.palette.components.backdrop.fill,
    }
  }),
);

function BackdropWithRef(
  { classes, children, className, ...otherProps }: MuiBackdropProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiBackdrop {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiBackdrop>
  );
}

BackdropWithRef.displayName = 'BackdropWithRef';

const Backdrop = forwardRef<HTMLDivElement, MuiBackdropProps>(BackdropWithRef);

export default Backdrop;