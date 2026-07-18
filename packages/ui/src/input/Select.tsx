import { forwardRef } from 'react';
import MuiTextField, {
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';

import { useStyles as useOutlinedInputStyles } from './OutlinedInput';
import { useStyles as useFilledInputStyles } from './FilledInput';
import { useStyles as useInputStyles } from './Input';
import { useStyles as useInputLabelStyles } from './InputLabel';

export type TSelectProps = MuiTextFieldProps & {
  multiple?: boolean;
  displayEmpty?: boolean;
  renderValue?: (value: unknown) => React.ReactNode;
};

// Rounded corners on the Select dropdown paper
const useStyles = makeStyles({ name: 'Select' })(
  (theme: TTheme) => ({
    paper: { ...theme.border.radius.medium },
  }),
);

function SelectWithRef(
  {
    InputProps = {},
    SelectProps = {},
    InputLabelProps = {},
    variant = 'outlined',
    multiple = false,
    displayEmpty = false,
    renderValue,
    ...otherProps
  }: TSelectProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const outlinedStyles = useOutlinedInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });
  const filledStyles = useFilledInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });
  const inputStyles = useInputStyles(undefined, {
    props: { classes: InputProps.classes },
  });

  let inputPropsStyles: Record<string, string> = inputStyles.classes;
  if (variant === 'outlined') inputPropsStyles = outlinedStyles.classes;
  if (variant === 'filled') inputPropsStyles = filledStyles.classes;

  const inputLabelStyles = useInputLabelStyles(undefined, {
    props: { classes: InputLabelProps.classes },
  });

  const { classes: dropdownClasses } = useStyles(undefined, {
    props: { classes: SelectProps.MenuProps?.classes },
  });

  return (
    <MuiTextField
      {...otherProps}
      select
      SelectProps={{
        multiple,
        renderValue,
        displayEmpty,
        IconComponent: ArrowDropDownRoundedIcon,
        ...SelectProps,
        MenuProps: {
          ...(SelectProps.MenuProps ?? {}),
          classes: { ...dropdownClasses },
        },
      }}
      InputLabelProps={{ ...InputLabelProps, classes: inputLabelStyles.classes }}
      InputProps={{ ...InputProps, classes: inputPropsStyles }}
      variant={variant}
      ref={ref}
    />
  );
}

SelectWithRef.displayName = 'SelectWithRef';

const Select = forwardRef<HTMLDivElement, TSelectProps>(SelectWithRef);

export default Select;