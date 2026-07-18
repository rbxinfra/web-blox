import { forwardRef } from 'react';
import MuiDialogTitle, {
  type DialogTitleProps as MuiDialogTitleProps,
} from '@mui/material/DialogTitle';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  dialogTitleClasses,
  type DialogTitleProps as TDialogTitleProps,
  type DialogTitleClasses as TDialogTitleClasses,
  type DialogTitleClassKey as TDialogTitleClassKey
} from '@mui/material/DialogTitle';

const useStyles = makeStyles({ name: 'DialogTitle' })(
  (theme: TTheme) => ({
    root: {
      ...theme.typography.h4,
      textAlign: 'left',
      padding: 20,
      paddingBottom: 8,
    } as CSSObject,
  }),
);

function DialogTitleWithRef({ classes, children, className, ...otherProps }: MuiDialogTitleProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiDialogTitle {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiDialogTitle>
  );
}

DialogTitleWithRef.displayName = 'DialogTitleWithRef';

const DialogTitle = forwardRef<HTMLDivElement, MuiDialogTitleProps>(DialogTitleWithRef);

export default DialogTitle;