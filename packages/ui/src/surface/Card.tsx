import { forwardRef } from 'react';
import MuiCard, { type CardProps as MuiCardProps } from '@mui/material/Card';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  cardClasses,
  type CardProps as TCardProps,
  type CardClasses as TCardClasses,
  type CardClassKey as TCardClassKey
} from '@mui/material/Card';

export type TCardVariant = MuiCardProps['variant'];

interface TCardStyleParams {
  variant?: TCardVariant;
}

const useStyles = makeStyles<TCardStyleParams>({ name: 'Card' })(
  (theme: TTheme, { variant }: TCardStyleParams) => ({
    root: {
      boxShadow: 'none',
      overflow: 'hidden',
      // Fixes Safari border-radius clipping on child images
      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      backgroundColor: variant === 'outlined'
        ? 'transparent'
        : theme.palette.surface[200],
      position: 'relative',
      ...theme.border.radius.large,
    } as CSSObject,
  }),
);

function CardWithRef({ children, classes, variant, className, ...otherProps }: MuiCardProps, ref: React.Ref<HTMLDivElement>) {

  const { classes: mergedClasses } = useStyles(
    { variant },
    { props: { classes: combineOverrides(classes, className) } },
  );

  const muiVariant: TCardVariant =
    variant === 'outlined' ? 'outlined' : 'elevation';

  return (
    <MuiCard {...otherProps} variant={muiVariant} classes={mergedClasses} ref={ref}>
      {children}
    </MuiCard>
  );
}

CardWithRef.displayName = 'CardWithRef';

const Card = forwardRef<HTMLDivElement, MuiCardProps>(CardWithRef);

export default Card;