/* Shim for StepLabel */

import StepLabel, { type StepLabelProps as MuiStepLabelProps } from '@mui/material/StepLabel';

export interface TStepLabelProps extends Omit<MuiStepLabelProps, 'StepIconComponent'> {
  // StepIconComponent override because it is incompat with svg icons?
  StepIconComponent?: React.ElementType<any>;
}

export {
  stepLabelClasses,
  type StepLabelClasses as TStepLabelClasses,
  type StepLabelClassKey as TStepLabelClassKey
} from '@mui/material/StepLabel';

// Override props:
export default StepLabel as React.ComponentType<TStepLabelProps>;