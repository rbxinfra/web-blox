import { forwardRef } from 'react';
import MuiInput, {
  inputClasses,
  type InputProps as MuiInputProps,
} from '@mui/material/Input';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  inputClasses,
  type InputProps as TInputProps,
  type InputClasses as TInputClasses,
  type InputClassKey as TInputClassKey
} from '@mui/material/Input';

export const useStyles = makeStyles({ name: 'Input' })(
  (theme: TTheme) => ({
    disabled: {},
    underline: {
      '&:before': { borderBottomColor: theme.palette.standardInputLine },
      [`&:hover:not(.${inputClasses.disabled}):before`]: {
        '@media (hover: none)': {
          borderBottomColor: theme.palette.standardInputLine,
        },
      },
    } as CSSObject,
  }),
);

function InputWithRef({ classes, className, ...otherProps }: MuiInputProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiInput {...otherProps} classes={mergedClasses} ref={ref} />;
}

InputWithRef.displayName = 'InputWithRef';

const Input = forwardRef<HTMLDivElement, MuiInputProps>(InputWithRef);

export default Input;