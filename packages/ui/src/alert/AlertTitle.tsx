import { forwardRef } from 'react';
import MuiAlertTitle, {
  type AlertTitleProps as MuiAlertTitleProps,
} from '@mui/material/AlertTitle';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  alertTitleClasses, 
  type AlertTitleProps as TAlertTitleProps,
  type AlertTitleClasses as TAlertTitleClasses,
  type AlertTitleClassKey as TAlertTitleClassKey
} from '@mui/material/AlertTitle';

const useStyles = makeStyles({ name: 'AlertTitle' })(
  (theme: TTheme) => ({
    root: {
      ...theme.typography.alertTitle,
      margin: '-1px 0',
    } as CSSObject,
  }),
);

function AlertTitleWithRef({ classes, className, ...otherProps }: MuiAlertTitleProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiAlertTitle {...otherProps} classes={mergedClasses} ref={ref} />;
}

AlertTitleWithRef.displayName = 'AlertTitleWithRef';

const AlertTitle = forwardRef<HTMLDivElement, MuiAlertTitleProps>(AlertTitleWithRef);

export default AlertTitle;