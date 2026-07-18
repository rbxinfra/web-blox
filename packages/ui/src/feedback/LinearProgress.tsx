import { forwardRef } from 'react';
import MuiLinearProgress, {
  type LinearProgressProps as MuiLinearProgressProps,
} from '@mui/material/LinearProgress';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  linearProgressClasses,
  type LinearProgressProps as TLinearProgressProps,
  type LinearProgressClasses as TLinearProgressClasses,
  type LinearProgressClassKey as TLinearProgressClassKey
} from '@mui/material/LinearProgress';

const useStyles = makeStyles({ name: 'LinearProgress' })(
  (theme: TTheme) => {
    const divider = theme.palette.components.divider;
    const brandFill = theme.palette.actionV2.primaryBrand.fill;

    return {
      // Track colour for primary variant (the "empty" background bar)
      colorPrimary: {
        backgroundColor: theme.palette.components.linearProgress.backgroundSecondary,
      },
      // Track colour for secondary variant
      colorSecondary: {
        backgroundColor: divider,
      },
      // Buffer variant: transparent track so only the dashes show
      buffer: {
        backgroundColor: 'transparent',
      },
      // Dashed overlay for secondary buffer
      dashedColorSecondary: {
        backgroundImage: `linear-gradient(to right, ${divider}, ${divider} 50%, transparent 50%, transparent 100%)`,
      },
      // Dashed overlay for primary buffer
      dashedColorPrimary: {
        backgroundImage: `linear-gradient(to right, ${brandFill}, ${brandFill} 50%, transparent 50%, transparent 100%)`,
      },
    };
  },
);

function LinearProgressWithRef({ classes, className, ...otherProps }: MuiLinearProgressProps, ref: React.Ref<HTMLSpanElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiLinearProgress {...otherProps} classes={mergedClasses} ref={ref} />
  );
}

LinearProgressWithRef.displayName = 'LinearProgressWithRef';

const LinearProgress = forwardRef<HTMLSpanElement, MuiLinearProgressProps>(LinearProgressWithRef);

export default LinearProgress;