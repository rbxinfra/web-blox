import { forwardRef } from 'react';
import MuiAlert, {
  alertClasses,
  type AlertProps as MuiAlertProps,
} from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  alertClasses,
  type AlertProps as TAlertProps,
  type AlertClasses as TAlertClasses,
  type AlertClassKey as TAlertClassKey,
  type AlertColor as TAlertColor
} from '@mui/material/Alert';

export type TAlertVariant = MuiAlertProps['variant'];

const useStyles = makeStyles({ name: 'Alert' })(
  (theme: TTheme) => ({
    root: {
      ...theme.typography.smallLabel1,
      ...theme.border.radius.medium,
      '& a': { color: 'inherit', textDecoration: 'underline' },
      '& [class*="InlineCode-root"]': {
        color: 'inherit',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    } as CSSObject,

    action: {
      alignItems: 'flex-start',
      marginRight: 0,
      paddingTop: 6,
      '& > a:hover': { color: 'inherit' },
    },

    // Standard severity variants
    standardSuccess: {
      backgroundColor: theme.palette.components.alert.activeFill,
      color: theme.palette.components.alert.activeContent,
      [`& .${alertClasses.icon}`]: {
        color: theme.palette.components.alert.activeContent,
      },
    } as CSSObject,

    standardInfo: {
      backgroundColor: theme.palette.components.alert.informFill,
      color: theme.palette.components.alert.informContent,
      [`& .${alertClasses.icon}`]: {
        color: theme.palette.components.alert.informContent,
      },
    } as CSSObject,

    standardError: {
      backgroundColor: theme.palette.components.alert.importantFill,
      color: theme.palette.components.alert.importantContent,
      [`& .${alertClasses.icon}`]: {
        color: theme.palette.components.alert.importantContent,
      },
    } as CSSObject,

    standardWarning: {
      backgroundColor: theme.palette.components.alert.noticeFill,
      color: theme.palette.components.alert.noticeContent,
      [`& .${alertClasses.icon}`]: {
        color: theme.palette.components.alert.noticeContent,
      },
    } as CSSObject,

    // Outlined variants
    outlinedError: {
      borderColor: theme.palette.surface.outline,
      color: theme.palette.content.standard,
      padding: '5px 15px',
    },
    outlinedSuccess: {
      borderColor: theme.palette.surface.outline,
      color: theme.palette.content.standard,
      padding: '5px 15px',
    },
    outlinedInfo: {
      borderColor: theme.palette.surface.outline,
      color: theme.palette.content.standard,
      padding: '5px 15px',
    },
    outlinedWarning: {
      borderColor: theme.palette.surface.outline,
      color: theme.palette.content.standard,
      padding: '5px 15px',
    },

    // Filled variants
    filledSuccess: {
      backgroundColor: theme.palette.actionV2.active.fill,
      color: theme.palette.content.static.dark,
    },
    filledInfo: {
      backgroundColor: theme.palette.actionV2.primaryBrand.fill,
      color: theme.palette.content.static.light,
    },
    filledError: {
      backgroundColor: theme.palette.actionV2.important.fill,
      color: theme.palette.content.static.light,
    },
    filledWarning: {
      backgroundColor: theme.palette.actionV2.notice.fill,
      color: theme.palette.content.static.dark,
    },
  }),
);

function AlertWithRef(
  {
    severity = 'success',
    icon,
    classes,
    className,
    children,
    ...otherProps
  }: MuiAlertProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Replace default success icon with CheckCircleOutline
  const resolvedIcon =
    severity === 'success' && icon === undefined
      ? (<CheckCircleOutlineIcon fontSize="inherit" />)
      : icon;

  return (
    <MuiAlert
      {...otherProps}
      classes={mergedClasses}
      icon={resolvedIcon}
      ref={ref}
      severity={severity}
    >
      {children}
    </MuiAlert>
  );
}

AlertWithRef.displayName = 'AlertWithRef';

const Alert = forwardRef<HTMLDivElement, MuiAlertProps>(AlertWithRef);

export default Alert;