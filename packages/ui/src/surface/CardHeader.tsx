import { forwardRef } from 'react';
import MuiCardHeader, {
  type CardHeaderProps as MuiCardHeaderProps,
} from '@mui/material/CardHeader';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  cardHeaderClasses,
  type CardHeaderProps as TCardHeaderProps,
  type CardHeaderClasses as TCardHeaderClasses,
  type CardHeaderClassKey as TCardHeaderClassKey
} from '@mui/material/CardHeader';

const useStyles = makeStyles({ name: 'CardHeader' })(
  (theme: TTheme) => ({
    title: { ...theme.typography.largeLabel1 } as CSSObject,
    subheader: { ...theme.typography.body2 } as CSSObject,
  }),
);

function CardHeaderWithRef({ classes, className, ...otherProps }: MuiCardHeaderProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiCardHeader {...otherProps} classes={mergedClasses} ref={ref} />;
}

CardHeaderWithRef.displayName = 'CardHeaderWithRef';

const CardHeader = forwardRef<HTMLDivElement, MuiCardHeaderProps>(CardHeaderWithRef);

export default CardHeader;