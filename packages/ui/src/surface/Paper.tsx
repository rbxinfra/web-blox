import { forwardRef } from 'react';
import MuiPaper, {
  paperClasses,
  type PaperProps as MuiPaperProps,
} from '@mui/material/Paper';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  paperClasses,
  type PaperProps as TPaperProps,
  type PaperClasses as TPaperClasses,
  type PaperClassKey as TPaperClassKey
} from '@mui/material/Paper';

export type TPaperVariant = MuiPaperProps['variant'];

interface TPaperStyleParams {
  variant?: TPaperVariant;
}

const useStyles = makeStyles<TPaperStyleParams>({ name: 'Paper' })(
  () => ({
    root: {
      boxShadow: 'none',
      [`&.${paperClasses.elevation}`]: {
        backgroundImage: 'none'
      }
    }
  }),
);

function PaperWithRef(
  {
    children,
    classes,
    variant,
    className, 
    ...otherProps 
  }: MuiPaperProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    { ...otherProps, variant }, {
    props: { classes: combineOverrides(classes, className) },
  });

  const muiVariant = variant === 'outlined' ? 'outlined' : 'elevation';

  return (
    <MuiPaper
      {...otherProps}
      variant={muiVariant}
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </MuiPaper>
  )
}

PaperWithRef.displayName = 'PaperWithRef';

const Paper = forwardRef<HTMLDivElement, MuiPaperProps>(PaperWithRef);

export default Paper;