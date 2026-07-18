import { forwardRef } from 'react';
import MuiInputLabel, {
  inputLabelClasses,
  type InputLabelProps as MuiInputLabelProps,
} from '@mui/material/InputLabel';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  inputLabelClasses,
  type InputLabelProps as TInputLabelProps,
  type InputLabelClasses as TInputLabelClasses,
  type InputLabelClassKey as TInputLabelClassKey
} from '@mui/material/InputLabel';

export const useStyles = makeStyles({ name: 'InputLabel' })(
  (theme: TTheme) => ({
    root: {
      [`&.${inputLabelClasses.focused}`]: { color: theme.palette.content.standard },
      [`&.${inputLabelClasses.disabled}`]: { color: theme.palette.content.disabled },
    } as CSSObject,
    sizeSmall: {
      [`&:not(.${inputLabelClasses.focused})`]: { top: 1 },
    } as CSSObject,
  }),
);

function InputLabelWithRef({ classes, className, ...otherProps }: MuiInputLabelProps, ref: React.Ref<HTMLLabelElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiInputLabel {...otherProps} classes={mergedClasses} ref={ref} />;
}

InputLabelWithRef.displayName = 'InputLabelWithRef';

const InputLabel = forwardRef<HTMLLabelElement, MuiInputLabelProps>(InputLabelWithRef);

export default InputLabel;