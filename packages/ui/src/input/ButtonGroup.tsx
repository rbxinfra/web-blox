import { forwardRef, createContext, useMemo } from 'react';
import {
  ButtonGroup as MuiButtonGroup,
  type ButtonGroupProps as MuiButtonGroupProps,
} from '@mui/material';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  buttonGroupClasses,
  type ButtonGroupClasses as TButtonGroupClasses,
  type ButtonGroupClassKey as TButtonGroupClassKey
} from '@mui/material/ButtonGroup';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TButtonColor = 'primaryBrand' | 'primary' | 'secondary' | 'destructive' | 'inherit';
export type TButtonSize = MuiButtonGroupProps['size'];

export interface TButtonGroupProps
  extends Omit<MuiButtonGroupProps, 'color' | 'size'> {
  color?: TButtonColor;
  size?: TButtonSize;
}

// ── Color map ─────────────────────────────────────────────────────────────────

const muiColorMap: Record<TButtonColor, MuiButtonGroupProps['color']> = {
  primaryBrand: 'primary',
  primary: 'secondary',
  secondary: 'secondary',
  destructive: 'error',
  inherit: 'inherit',
};

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'ButtonGroup' })(
  (theme: TTheme) => ({
    root: { ...theme.border.radius.medium },
  }),
);

// ── Context ───────────────────────────────────────────────────────────────────

export const ButtonGroupContext = createContext<{
  color?: TButtonColor;
  size?: TButtonSize;
}>({});

// ── Component ─────────────────────────────────────────────────────────────────

function ButtonGroupWithRef(
  {
    classes,
    className,
    children,
    color = 'primaryBrand',
    size,
    ...otherProps
  }: TButtonGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Provide color/size down to child Buttons via context
  const contextValue = useMemo(
    () => ({ color, size }),
    [color, size],
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <MuiButtonGroup
        {...otherProps}
        ref={ref}
        classes={mergedClasses}
        color={muiColorMap[color]}
        size={size}
      >
        {children}
      </MuiButtonGroup>
    </ButtonGroupContext.Provider>
  );
}

ButtonGroupWithRef.displayName = 'ButtonGroupWithRef';

const ButtonGroup = forwardRef<HTMLDivElement, TButtonGroupProps>(ButtonGroupWithRef);

export default ButtonGroup;