import { forwardRef } from 'react';
import MuiAccordion, {
  type AccordionProps as MuiAccordionProps,
} from '@mui/material/Accordion';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export { 
  accordionClasses,
  type AccordionClasses as TAccordionClasses, 
  type AccordionClassKey as TAccordionClassKey 
} from '@mui/material/Accordion';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TAccordionVariant = MuiAccordionProps['variant'];

export interface TAccordionProps extends Omit<MuiAccordionProps, 'variant'> {
  variant?: TAccordionVariant;
}

interface TAccordionStyleParams {
  variant?: TAccordionVariant;
  square?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TAccordionStyleParams>({ name: 'Accordion' })(
  (
    theme: TTheme,
    { variant, square }: TAccordionStyleParams,
  ) => {
    const radiusStyles: CSSObject = square
      ? { ...theme.border.radius.none }
      : {
        ...theme.border.radius.large,
        '&:first-of-type': {
          ...theme.border.radius.topLeft.large,
          ...theme.border.radius.topRight.large,
        } as CSSObject,
        '&:last-of-type': {
          ...theme.border.radius.bottomLeft.large,
          ...theme.border.radius.bottomRight.large,
        } as CSSObject,
      };

    return {
      root: {
        ...radiusStyles,
        boxShadow: 'none',
        backgroundColor: variant === 'outlined'
          ? 'transparent'
          : theme.palette.surface[300],
        '&:before': {
          backgroundColor: theme.palette.components.divider,
        },
      } as CSSObject,
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function AccordionWithRef({ children, variant, classes, className, square, ...otherProps }: TAccordionProps, ref: React.Ref<HTMLDivElement>) {

  const { classes: mergedClasses } = useStyles(
    { variant, square },
    { props: { classes: combineOverrides(classes, className) } },
  );

  const muiVariant: MuiAccordionProps['variant'] =
    variant === 'outlined' ? 'outlined' : 'elevation';

  return (
    <MuiAccordion
      {...otherProps}
      square={square}
      variant={muiVariant}
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </MuiAccordion>
  );
}

AccordionWithRef.displayName = 'AccordionWithRef';

const Accordion = forwardRef<HTMLDivElement, TAccordionProps>(AccordionWithRef);

export default Accordion;