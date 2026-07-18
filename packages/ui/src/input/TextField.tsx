import { forwardRef } from 'react';
import MuiTextField, {
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { useStyles as useOutlinedInputStyles } from './OutlinedInput';
import { useStyles as useFilledInputStyles } from './FilledInput';
import { useStyles as useInputStyles } from './Input';
import { useStyles as useInputLabelStyles } from './InputLabel';

export {
  textFieldClasses,
  type TextFieldProps as TTextFieldProps,
  type TextFieldClasses as TTextFieldClasses,
  type TextFieldClassKey as TTextFieldClassKey
} from '@mui/material/TextField';

// FormHelperText disabled colour override
const useStyles = makeStyles({ name: 'FormHelperText' })(
  (theme: TTheme) => ({
    root: {
      [`&.${formHelperTextClasses.disabled}`]: {
        color: theme.palette.content.disabled,
      },
    } as CSSObject,
  }),
);

function TextFieldWithRef(
  {
    FormHelperTextProps = {},
    InputProps = {},
    InputLabelProps = {},
    variant = 'outlined',
    className,
    classes,
    ...otherProps
  }: MuiTextFieldProps,
  ref: React.Ref<HTMLDivElement>
) {
  // Instantiate each sub-component's style hook — TextField
  // assembles the right set based on the variant prop
  const outlinedInputStyles = useOutlinedInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });
  const filledInputStyles = useFilledInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });
  const inputStyles = useInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });
  const inputLabelStyles = useInputLabelStyles(undefined, {
    props: { classes: InputLabelProps.classes },
  });

  // Pick the right input classes for the active variant
  let inputPropsStyles: Record<string, string> = inputStyles.classes;
  if (variant === 'outlined') inputPropsStyles = outlinedInputStyles.classes;
  if (variant === 'filled') inputPropsStyles = filledInputStyles.classes;

  const formHelperTextStyles = useStyles(undefined, {
    props: { classes: FormHelperTextProps.classes },
  });

  // Root classes — merge className onto the root key
  const rootClasses = combineOverrides(classes, className);

  return (
    <MuiTextField
      {...otherProps}
      ref={ref}
      variant={variant}
      classes={{
        ...rootClasses,
        root: inputStyles.cx(classes?.root, className),
      }}
      InputLabelProps={{ ...InputLabelProps, classes: inputLabelStyles.classes }}
      InputProps={{ ...InputProps, classes: inputPropsStyles }}
      FormHelperTextProps={{ ...FormHelperTextProps, classes: formHelperTextStyles.classes }}
    />
  );
}

TextFieldWithRef.displayName = 'TextFieldWithRef';

const TextField = forwardRef<HTMLDivElement, MuiTextFieldProps>(TextFieldWithRef);

export default TextField;