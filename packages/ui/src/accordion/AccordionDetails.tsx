import { forwardRef } from 'react';
import MuiAccordionDetails, {
  type AccordionDetailsProps as MuiAccordionDetailsProps,
} from '@mui/material/AccordionDetails';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export { 
  accordionDetailsClasses, 
  type AccordionDetailsProps as TAccordionDetailsProps,
  type AccordionDetailsClasses as TAccordionDetailsClasses,
  type AccordionDetailsClassKey as TAccordionDetailsClassKey
} from '@mui/material/AccordionDetails';

const useStyles = makeStyles({ name: 'AccordionDetails' })(
  (theme: TTheme) => ({
    root: { ...theme.typography.body1 } as CSSObject,
  }),
);

function AccordionDetailsWithRef({ classes, className, ...otherProps }: MuiAccordionDetailsProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiAccordionDetails {...otherProps} classes={mergedClasses} ref={ref} />
  );
}

AccordionDetailsWithRef.displayName = 'AccordionDetailsWithRef';

const AccordionDetails = forwardRef<HTMLDivElement, MuiAccordionDetailsProps>(AccordionDetailsWithRef);

export default AccordionDetails;