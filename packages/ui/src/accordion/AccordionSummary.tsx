import { forwardRef } from 'react';
import MuiAccordionSummary, {
  accordionSummaryClasses,
  type AccordionSummaryProps as MuiAccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  accordionSummaryClasses,
  type AccordionSummaryProps as TAccordionSummaryProps,
  type AccordionSummaryClasses as TAccordionSummaryClasses,
  type AccordionSummaryClassKey as TAccordionSummaryClassKey
} from '@mui/material/AccordionSummary';

const useStyles = makeStyles({ name: 'AccordionSummary' })(
  (theme: TTheme) => ({
    root: { ...theme.typography.largeLabel1 } as CSSObject,
    content: {
      margin: '22px 0',
      [`&.${accordionSummaryClasses.expanded}`]: { margin: '22px 0' },
    } as CSSObject,
  }),
);

function AccordionSummaryWithRef(
  { expandIcon = <ExpandMore />, classes, className, ...otherProps }: MuiAccordionSummaryProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiAccordionSummary {...otherProps} classes={mergedClasses} expandIcon={expandIcon} ref={ref} />
  );
}

AccordionSummaryWithRef.displayName = 'AccordionSummaryWithRef';

const AccordionSummary = forwardRef<HTMLDivElement, MuiAccordionSummaryProps>(AccordionSummaryWithRef);

export default AccordionSummary;