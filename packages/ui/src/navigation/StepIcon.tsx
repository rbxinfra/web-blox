import { forwardRef } from 'react';
import MuiStepIcon, {
  type StepIconProps as MuiStepIconProps,
} from '@mui/material/StepIcon';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  stepIconClasses,
  type StepIconProps as TStepIconProps,
  type StepIconClasses as TStepIconClasses,
  type StepIconClassKey as TStepIconClassKey
} from '@mui/material/StepIcon';

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'StepIcon' })(
  (theme: TTheme) => ({
    text: {
      fill: theme.palette.content.inverse
    } 
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function StepIconWithRef(
  {
    classes,
    className,
    ...otherProps
  }: MuiStepIconProps, 
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    undefined,
    { props: { classes: combineOverrides(classes, className) } },
  );

  return <MuiStepIcon {...otherProps} classes={mergedClasses} ref={ref} />;
}

StepIconWithRef.displayName = 'StepIconWithRef';

const StepIcon = forwardRef<HTMLDivElement, MuiStepIconProps>(StepIconWithRef);

export default StepIcon;