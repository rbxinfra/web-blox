import { forwardRef } from 'react';
import MuiTooltip, { type TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  tooltipClasses,
  type TooltipProps as TTooltipProps,
  type TooltipClasses as TTooltipClasses,
  type TooltipClassKey as TTooltipClassKey
} from '@mui/material/Tooltip';

const useStyles = makeStyles({ name: 'Tooltip' })(
  (theme: TTheme) => ({
    tooltip: {
      color: theme.palette.content.inverse,
      backgroundColor: theme.palette.actionV2.primary.fill,
      ...theme.typography.tooltip
    },
    arrow: {
      color: theme.palette.actionV2.primary.fill
    }
  }),
);

function TooltipWithRef(
  { classes, className, ...otherProps }: MuiTooltipProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiTooltip {...otherProps} classes={mergedClasses} ref={ref} />
  );
}

TooltipWithRef.displayName = 'TooltipWithRef';

const Tooltip = forwardRef<HTMLDivElement, MuiTooltipProps>(TooltipWithRef);

export default Tooltip;