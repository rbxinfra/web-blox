import { forwardRef } from 'react';
import MuiToggleButton, {
  toggleButtonClasses,
  type ToggleButtonProps as MuiToggleButtonProps
} from '@mui/material/ToggleButton';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  toggleButtonClasses,
  type ToggleButtonOwnProps as TToggleButtonOwnProps,
  type ToggleButtonClasses as TToggleButtonClasses,
  type ToggleButtonClassKey as TToggleButtonClassKey
} from '@mui/material/ToggleButton';

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'toggleButton' })(
  (theme: TTheme) => ({
    root: {
      [`&.${toggleButtonClasses.selected}`]: {
        backgroundColor: theme.palette.states.selected
      },
      ...theme.border.radius.medium
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function ToggleButtonWithRef(
  {
    children,
    classes,
    className,
    ...otherProps
  }: MuiToggleButtonProps, 
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiToggleButton
      {...otherProps}
      ref={ref}
      classes={mergedClasses}
    >
      {children}
    </MuiToggleButton>
  );
}

ToggleButtonWithRef.displayName = 'ToggleButtonWithRef';

const ToggleButton = forwardRef<HTMLButtonElement, MuiToggleButtonProps>(ToggleButtonWithRef);

export default ToggleButton;