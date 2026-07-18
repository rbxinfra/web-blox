import { forwardRef } from 'react';
import MuiDialog, { type DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  dialogClasses,
  type DialogClasses as TDialogClasses,
  type DialogClassKey as TDialogClassKey
} from '@mui/material/Dialog';

export interface TDialogProps extends Omit<MuiDialogProps, 'fullScreen'> {
  // fullScreen is intentionally omitted — Dialog always renders non-fullscreen
}

const useStyles = makeStyles({ name: 'Dialog' })(
  (theme: TTheme) => ({
    paper: {
      boxShadow: theme.elevation.overlay,
      backgroundColor: theme.palette.surface[300],
      ...theme.border.radius.large,
    } as CSSObject,
    // Placeholder for XSmall maxWidth override (mapped to Small internally)
    xsmallBreakpointWidthOverride: {} as CSSObject,
  }),
);

function DialogWithRef({ classes, children, className, maxWidth, ...otherProps }: TDialogProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // uiblox maps 'XSmall' to 'Small' since MUI doesn't have an XSmall breakpoint
  const resolvedMaxWidth = maxWidth === ('XSmall' as MuiDialogProps['maxWidth'])
    ? 'sm'
    : maxWidth;

  return (
    <MuiDialog
      {...otherProps}
      fullScreen={false}
      classes={mergedClasses}
      maxWidth={resolvedMaxWidth}
      ref={ref}
    >
      {children}
    </MuiDialog>
  );
}

DialogWithRef.displayName = 'DialogWithRef';

const Dialog = forwardRef<HTMLDivElement, TDialogProps>(DialogWithRef);

export default Dialog;