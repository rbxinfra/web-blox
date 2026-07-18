import { forwardRef } from 'react';
import MuiBottomNavigationAction, {
  type BottomNavigationActionProps as MuiBottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  bottomNavigationActionClasses,
  type BottomNavigationActionProps as TBottomNavigationActionProps,
  type BottomNavigationActionClasses as TBottomNavigationActionClasses,
  type BottomNavigationActionClassKey as TBottomNavigationActionClassKey
} from '@mui/material/BottomNavigationAction';

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'BottomNavigationAction' })(
  (theme: TTheme) => ({
    root: { color: theme.palette.states.active }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function BottomNavigationActionWithRef(
  {
    classes,
    className,
    ...otherProps
  }: MuiBottomNavigationActionProps, 
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiBottomNavigationAction
      {...otherProps}
      classes={mergedClasses}
      ref={ref}
    />
  );
}

BottomNavigationActionWithRef.displayName = 'BottomNavigationActionWithRef';

const BottomNavigationAction = forwardRef<HTMLButtonElement, MuiBottomNavigationActionProps>(BottomNavigationActionWithRef);

export default BottomNavigationAction;