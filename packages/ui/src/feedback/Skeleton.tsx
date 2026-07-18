import { forwardRef } from 'react';
import MuiSkeleton, {
  type SkeletonProps as MuiSkeletonProps,
} from '@mui/material/Skeleton';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  skeletonClasses,
  type SkeletonClasses as TSkeletonClasses,
  type SkeletonClassKey as TSkeletonClassKey
} from '@mui/material/Skeleton';

// ── Types ─────────────────────────────────────────────────────────────────────

// uiblox adds a 'square' variant on top of MUI's set
export type TSkeletonVariant = MuiSkeletonProps['variant'] | 'square';

export interface TSkeletonProps extends Omit<MuiSkeletonProps, 'variant'> {
  variant?: TSkeletonVariant;
  /** When true, shows the wave animation */
  animate?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Skeleton' })(
  (theme: TTheme) => ({
    root: { backgroundColor: theme.palette.states.hover },
    wave: { backgroundColor: theme.palette.states.focus },
    rectangular: { ...theme.border.radius.large } as CSSObject,
    square: { borderRadius: '0px' },
  }),
);

// MUI variant map — 'square' is uiblox-only, maps to 'rectangular' in MUI
const variantMap: Record<string, MuiSkeletonProps['variant']> = {
  text: 'text',
  rectangular: 'rectangular',
  circular: 'circular',
  square: 'rectangular',  // rbx custom — rectangular + no radius
};

// ── Component ─────────────────────────────────────────────────────────────────

function SkeletonWithRef(
  {
    variant = 'text',
    animate = false,
    classes,
    className,
    ...otherProps
  }: TSkeletonProps, 
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { classes: skeletonClasses, cx } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Separate the square and rectangular class so we can conditionally apply square
  const { square: squareClass, rectangular: rectangularClass, ...otherClasses } = skeletonClasses;

  return (
    <MuiSkeleton
      {...otherProps}
      ref={ref}
      variant={variantMap[variant ?? 'text']}
      animation={animate ? 'wave' : false}
      classes={{
        ...otherClasses,
        rectangular: cx(
          rectangularClass,
          { [squareClass]: variant === 'square' },
        ),
      }}
    />
  );
}

SkeletonWithRef.displayName = 'SkeletonWithRef';

const Skeleton = forwardRef<HTMLSpanElement, TSkeletonProps>(SkeletonWithRef);

export default Skeleton;