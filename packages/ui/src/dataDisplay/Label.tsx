import { forwardRef, isValidElement, cloneElement } from 'react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TLabelSeverity = 'default' | 'success' | 'info' | 'warning' | 'error';
export type TLabelVariant  = 'contained' | 'text';

export interface TLabelProps {
  labelText:  string;
  icon?:      React.ReactElement;
  severity?:  TLabelSeverity;
  variant?:   TLabelVariant;
  classes?:   Record<string, string>;
  className?: string;
  ref?:       React.Ref<HTMLDivElement>;
}

interface TLabelStyleParams {
  hasIcon?:  boolean;
  severity?: TLabelSeverity;
  variant?:  TLabelVariant;
}

// ── Styles ────────────────────────────────────────────────────────────────────

function getSeverityStyles(
  theme: TTheme,
  severity: TLabelSeverity,
  variant: TLabelVariant,
): Record<string, string> {
  if (variant === 'text') {
    const base: Record<string, string> = { backgroundColor: 'transparent' };
    switch (severity) {
      case 'default': base.color = theme.palette.content.muted;                      break;
      case 'success': base.color = theme.palette.content.alert.active;               break;
      case 'info':    base.color = theme.palette.content.alert.inform;               break;
      case 'warning': base.color = theme.palette.components.label.warningText;       break;
      case 'error':   base.color = theme.palette.content.alert.important;            break;
    }
    return base;
  }

  switch (severity) {
    case 'success':
      return {
        background: theme.palette.components.label.activeFill,
        color:      theme.palette.components.label.activeContent,
      };
    case 'info':
      return {
        background: theme.palette.components.label.informFill,
        color:      theme.palette.components.label.informContent,
      };
    case 'warning':
      return {
        background: theme.palette.components.label.noticeFill,
        color:      theme.palette.components.label.noticeContent,
      };
    case 'error':
      return {
        background: theme.palette.components.label.importantFill,
        color:      theme.palette.components.label.importantContent,
      };
    default:
      return {};
  }
}

const useStyles = makeStyles<TLabelStyleParams>({ name: 'Label' })(
  (
    theme: TTheme,
    {
      hasIcon  = false,
      severity = 'default',
      variant  = 'contained',
    }: TLabelStyleParams,
  ) => {
    const baseStyles = {
      alignItems:     'center',
      backgroundColor: theme.palette.states.selected,
      borderRadius:   4,
      color:          theme.palette.content.standard,
      display:        'inline-flex',
      lineHeight:     '20px',
      paddingLeft:    hasIcon ? 4 : 6,
      paddingRight:   6,
      textTransform:  'none',
    } as const;

    const severityStyles = getSeverityStyles(theme, severity, variant);

    return {
      iconSize: {
        boxSizing:   'content-box',
        height:      12,
        marginRight: 4,
        width:       12,
      },
      root: {
        ...baseStyles,
        ...severityStyles,
      },
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function LabelWithRef(
  {
    icon,
    severity  = 'default',
    variant   = 'contained',
    labelText,
    classes,
    className,
  }: TLabelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const hasIcon = isValidElement(icon);

  const { classes: mergedClasses, cx } = useStyles(
    { hasIcon, severity, variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  const iconEl = hasIcon
    ? cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: cx(
          (icon as React.ReactElement<{ className?: string }>).props.className,
          mergedClasses.iconSize,
        ),
      })
    : null;

  return (
    <div className={mergedClasses.root} ref={ref}>
      {iconEl}
      {labelText}
    </div>
  );
}

LabelWithRef.displayName = 'LabelWithRef';

const Label = forwardRef<HTMLDivElement, TLabelProps>(LabelWithRef);

export default Label;