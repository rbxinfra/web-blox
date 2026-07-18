import { forwardRef } from 'react';
import MuiBadge, { type BadgeProps as MuiBadgeProps } from '@mui/material/Badge';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  badgeClasses,
  type BadgeProps as TBadgeProps,
  type BadgeClasses as TBadgeClasses,
  type BadgeClassKey as TBadgeClassKey
} from '@mui/material/Badge';

const useStyles = makeStyles({ name: 'Badge' })(
  (theme: TTheme) => ({
    badge: {
      color: theme.palette.content.static.dark
    },
    colorError: {
      color: theme.palette.content.static.light
    },
    colorPrimary: {
      color: theme.palette.content.static.light,
      backgroundColor: theme.palette.actionV2.primaryBrand.fill
    }
  }),
);

function BadgeWithRef({ children, classes, color, overlap, className, ...otherProps }: MuiBadgeProps, ref: React.Ref<HTMLDivElement>) {
  const badgeColor = color === undefined ? 'primary' : color;
  const badgeOverlap = overlap === undefined ? 'rectangular' : overlap;
  
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiBadge 
      {...otherProps} 
      classes={mergedClasses} 
      overlap={badgeOverlap} 
      color={badgeColor} 
      ref={ref}>
      {children}
    </MuiBadge>
  );
}

BadgeWithRef.displayName = 'BadgeWithRef';

const Badge = forwardRef<HTMLDivElement, MuiBadgeProps>(BadgeWithRef);

export default Badge;