import { forwardRef } from 'react';
import Typography, { type TTypographyProps } from '../typography/Typography';

import makeStyles from '../styles/makeStyles';
import type { TTheme } from '../theme/theme';
import childHasHrefProp from '../utils/childHasHrefProp';

export type TInlineCodeClasses = ReturnType<typeof useStyles>['classes'];
export type TInlineCodeClassKey = keyof TInlineCodeClasses;

export type TInlineCodeVariant = 'regular' | 'dense';

export interface TInlineCodeProps {
  children?: React.ReactNode;
  variant?: TInlineCodeVariant;
  classes?: TTypographyProps['classes'];
}

interface TInlineCodeStyleParams {
  asLink?: boolean;
}

const useStyles = makeStyles<TInlineCodeStyleParams>({ name: 'InlineCode' })(
  (theme: TTheme, { asLink }: TInlineCodeStyleParams) => ({
    root: {
      color: theme.palette.components.inlineCode[asLink ? 'asLink' : 'asText'].color,
      backgroundColor: theme.palette.components.inlineCode[asLink ? 'asLink' : 'asText'].fill,
      borderRadius: 4,
      paddingInline: 4,
      fontVariantLigatures: 'none',
      '& .MuiTypography-root': {
        color: 'inherit',
        backgroundColor: 'transparent'
      }
    }
  }),
);

function InlineCodeWithRef(
  {
    children,
    variant = 'regular',
    classes,
  }: TInlineCodeProps,
  ref: React.Ref<HTMLDivElement>
) {
  const asLink = childHasHrefProp(children);

  const { classes: mergedClasses } = useStyles(
    { asLink },
    {
      props: { classes: classes },
    });

  return (
    <Typography
      variant={variant === 'regular' ? 'code' : 'codeDense'}
      color='primary'
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </Typography>
  )
}

InlineCodeWithRef.displayName = 'InlineCodeWithRef';

const InlineCode = forwardRef<HTMLDivElement, TInlineCodeProps>(InlineCodeWithRef);

export default InlineCode;