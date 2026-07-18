import { forwardRef } from 'react';
import MuiSnackbar, {
  type SnackbarProps as MuiSnackbarProps,
} from '@mui/material/Snackbar';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';

export { 
  snackbarClasses,
  type SnackbarClasses as TSnackbarClasses,
  type SnackbarClassKey as TSnackbarClassKey,
  type SnackbarOrigin as TSnackbarOrigin,
  type SnackbarCloseReason as TSnackbarCloseReason
} from '@mui/material/Snackbar';

export interface TSnackbarProps extends MuiSnackbarProps {
  /** When true, auto-hides after 4 seconds. Default: false */
  autoHide?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Snackbar' })(
  (theme: TTheme) => ({
    root: {
      boxShadow: theme.elevation.overlay,
      ...theme.border.radius.medium,
      backgroundColor: theme.palette.background.snackbar,
      color: theme.palette.content.standard,
    } as CSSObject,
  }),
);

function SnackbarWithRef(
  {
    ContentProps,
    autoHide = false,
    anchorOrigin,
    className,
    classes,
    ...otherProps
  }: TSnackbarProps, 
  ref: React.Ref<HTMLDivElement>
) {
  // Styles are applied to SnackbarContent, not to the positioning wrapper
  const { classes: contentClasses, cx } = useStyles(undefined, {
    props: { classes: ContentProps?.classes },
  });

  return (
    <MuiSnackbar
      {...otherProps}
      classes={{ ...classes, root: cx(classes?.root, className) }}
      ref={ref}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left', ...anchorOrigin }}
      autoHideDuration={autoHide ? 4000 : null}
      ContentProps={{ classes: contentClasses }}
    />
  );
}

SnackbarWithRef.displayName = 'SnackbarWithRef';

const Snackbar = forwardRef<HTMLDivElement, TSnackbarProps>(SnackbarWithRef);

export default Snackbar;