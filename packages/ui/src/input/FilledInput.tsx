import { forwardRef } from 'react';
import MuiFilledInput, {
  filledInputClasses,
  type FilledInputProps as MuiFilledInputProps,
} from '@mui/material/FilledInput';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  filledInputClasses,
  type FilledInputProps as TFilledInputProps,
  type FilledInputClasses as TFilledInputClasses,
  type FilledInputClassKey as TFilledInputClassKey
} from '@mui/material/FilledInput';

export const useStyles = makeStyles({ name: 'FilledInput' })(
  (theme: TTheme) => {
    const outline = theme.palette.surface.outline;
    const enableFill = theme.palette.components.input.filled.enableFill;
    const focusBorder = theme.palette.components.mediaButtons.outlined.focusBorder;

    return {
      root: {
        // Top corners only — FilledInput has a flat bottom edge with underline
        ...theme.border.radius.topLeft.medium,
        ...theme.border.radius.topRight.medium,
        backgroundColor: enableFill,
        '&:hover': {
          backgroundColor: theme.palette.states.focus,
          '@media (hover: none)': { backgroundColor: enableFill },
        },
        [`&.${filledInputClasses.focused}`]: { backgroundColor: enableFill },
        [`&.${filledInputClasses.disabled}`]: {
          backgroundColor: theme.palette.states.disabledBackground,
        },
      } as CSSObject,
      underline: {
        '&:before': { borderBottomColor: outline },
        '&:after': { borderBottomColor: focusBorder },
      },
    };
  },
);

function FilledInputWithRef({ classes, className, ...otherProps }: MuiFilledInputProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiFilledInput {...otherProps} classes={mergedClasses} ref={ref} />;
}

FilledInputWithRef.displayName = 'FilledInputWithRef';

const FilledInput = forwardRef<HTMLDivElement, MuiFilledInputProps>(FilledInputWithRef);

export default FilledInput;