import { forwardRef } from 'react';
import MuiRadio, {
  radioClasses,
  type RadioProps as MuiRadioProps,
} from '@mui/material/Radio';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  radioClasses,
  type RadioProps as TRadioProps,
  type RadioClasses as TRadioClasses,
  type RadioClassKey as TRadioClassKey,
} from '@mui/material/Radio';

export type TRadioSize = MuiRadioProps['size'];
export type TRadioColor = MuiRadioProps['color'];

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Radio' })(
  (theme: TTheme) => ({
    root: {
      color: theme.palette.states.active
    },
    colorPrimary: {
      [`&.${radioClasses.checked}`]: {
        color: theme.palette.actionV2.primaryBrand.fill
      }
    },
    colorSecondary: {
      color: theme.palette.actionV2.primary.fill
    },
    disabled: {
      color: theme.palette.states.disabled,
      [`&.${radioClasses.colorPrimary}.${radioClasses.checked}`]: {
        color: theme.palette.states.disabled
      }
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function RadioWithRef(
  {
    classes,
    color = 'primary',
    inputProps,
    'aria-label': ariaLabel,
    className,
    ...otherProps
  }: MuiRadioProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    undefined,
    { props: {
      classes: combineOverrides(classes, className)
    }}
  );

  return (
    <MuiRadio
      {...otherProps}
      classes={mergedClasses}
      color={color}
      ref={ref}
      inputProps={{
        'aria-label': ariaLabel,
        ...inputProps
      }}
    />
  )
}

RadioWithRef.displayName = 'RadioWithRef';

const Radio = forwardRef<HTMLButtonElement, MuiRadioProps>(RadioWithRef);

export default Radio;