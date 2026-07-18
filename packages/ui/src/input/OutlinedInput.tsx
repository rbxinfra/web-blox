import { forwardRef } from 'react';
import MuiOutlinedInput, {
  outlinedInputClasses,
  type OutlinedInputProps as MuiOutlinedInputProps,
} from '@mui/material/OutlinedInput';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  outlinedInputClasses,
  type OutlinedInputProps as TOutlinedInputProps,
  type OutlinedInputClasses as TOutlinedInputClasses,
  type OutlinedInputClassKey as TOutlinedInputClassKey
} from '@mui/material/OutlinedInput';

export const useStyles = makeStyles({ name: 'OutlinedInput' })(
  (theme: TTheme) => {
    const {
      enabledBorder: enabled,
      focusBorder: focused,
      hoverBorder: hovered,
    } = theme.palette.components.input.outlined;

    return {
      root: {
        ...theme.border.radius.medium,
        '@media (hover: none)': {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: enabled,
          },
        },
        [`& .${outlinedInputClasses.notchedOutline}`]: { borderColor: enabled },
        [`& .${outlinedInputClasses.inputSizeSmall}`]: {
          padding: '9px 14px',
          paddingTop: '10px',
        },
        [`&.${outlinedInputClasses.focused}:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: focused,
        },
        [`&:hover:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: hovered,
        },
      } as CSSObject,
      disabled: {
        [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: enabled,
        },
        [`&.${outlinedInputClasses.disabled}.${outlinedInputClasses.focused}:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: enabled,
        },
        [`&.${outlinedInputClasses.disabled}:hover:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: enabled,
        },
      } as CSSObject,
      notchedOutline: { borderColor: enabled },
      sizeSmall: { padding: '1px 0px' },
    };
  },
);

function OutlinedInputWithRef({ classes, className, ...otherProps }: MuiOutlinedInputProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiOutlinedInput {...otherProps} classes={mergedClasses} ref={ref} />;
}

OutlinedInputWithRef.displayName = 'OutlinedInputWithRef';

const OutlinedInput = forwardRef<HTMLDivElement, MuiOutlinedInputProps>(OutlinedInputWithRef);

export default OutlinedInput;