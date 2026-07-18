import { forwardRef } from 'react';
import MuiCheckbox, {
  checkboxClasses,
  type CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  checkboxClasses,
  type CheckboxProps as TCheckboxProps,
  type CheckboxClasses as TCheckboxClasses,
  type CheckboxClassKey as TCheckboxClassKey
} from '@mui/material/Checkbox';

interface TCheckboxStyleParams {
  size?: string;
}

const useStyles = makeStyles<TCheckboxStyleParams>({ name: 'Checkbox' })(
  (theme: TTheme, { size }: TCheckboxStyleParams) => ({
    root: {
      width: size === 'small' ? 20 : 42,
      height: size === 'small' ? 20 : 42,
    } as CSSObject,
    colorPrimary: {
      color: theme.palette.content.muted,
      [`&.${checkboxClasses.checked}`]: {
        color: theme.palette.actionV2.primaryBrand.fill,
      },
    } as CSSObject,
    colorSecondary: {
      color: theme.palette.actionV2.primary.fill,
    } as CSSObject,
    disabled: {
      color: theme.palette.states.disabled,
      [`&.${checkboxClasses.colorPrimary}.${checkboxClasses.checked}`]: {
        color: theme.palette.states.disabled,
      },
    } as CSSObject,
  }),
);

function CheckboxWithRef(
  {
    color = 'primary',
    classes,
    className,
    size,
    ...otherProps
  }: MuiCheckboxProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    { size },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiCheckbox
      {...otherProps}
      ref={ref}
      color={color ?? 'primary'}
      size={size}
      classes={mergedClasses}
    />
  );
}

CheckboxWithRef.displayName = 'CheckboxWithRef';

const Checkbox = forwardRef<HTMLButtonElement, MuiCheckboxProps>(CheckboxWithRef);

export default Checkbox;