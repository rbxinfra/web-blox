import { forwardRef } from 'react';
import Typography, { type TTypographyProps } from '../typography/Typography';

import makeStyles from '../styles/makeStyles';
import type { TTheme } from '../theme/theme';

export type TKeyboardInputClasses = ReturnType<typeof useStyles>['classes'];
export type TKeyboardInputClassKey = keyof TKeyboardInputClasses;

export interface TKeyboardInputProps {
  children?: React.ReactNode;
  classes?: TTypographyProps['classes'];
}

const useStyles = makeStyles({ name: 'KeyboardInput' })(
  (theme: TTheme) => ({
    root: {
      border: `1px solid ${theme.palette.surface.outline}`,
      borderRadius: 4,
      paddingInline: 4
    }
  }),
);

function KeyboardInputWithRef(
  {
    children,
    classes
  }: TKeyboardInputProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    undefined,
    {
      props: { classes: classes },
    });

  return (
    <Typography
      variant='code'
      color='primary'
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </Typography>
  )
}

KeyboardInputWithRef.displayName = 'KeyboardInputWithRef';

const KeyboardInput = forwardRef<HTMLDivElement, TKeyboardInputProps>(KeyboardInputWithRef);

export default KeyboardInput;