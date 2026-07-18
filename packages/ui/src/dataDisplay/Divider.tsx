import { forwardRef } from 'react';
import MuiDivider, { type DividerProps as MuiDividerProps } from '@mui/material/Divider';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  dividerClasses,
  type DividerClasses as TDividerClasses,
  type DividerClassKey as TDividerClassKey
} from '@mui/material/Divider';

export interface TDividerProps extends MuiDividerProps {
  /** 'small' renders a 0.5px hairline; 'medium' (default) renders 1px */
  size?: 'small' | 'medium';
}

interface TDividerStyleParams {
  size?: 'small' | 'medium';
}

const useStyles = makeStyles<TDividerStyleParams>({ name: 'Divider' })(
  (_, { size }: TDividerStyleParams) => ({
    root: { borderBottomWidth: size === 'small' ? 0.5 : 1 },
  }),
);

function DividerWithRef({ classes, size = 'medium', className, ...otherProps }: TDividerProps, ref: React.Ref<HTMLHRElement>) {
  const { classes: mergedClasses } = useStyles(
    { size },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return <MuiDivider {...otherProps} classes={mergedClasses} ref={ref} />;
}

DividerWithRef.displayName = 'DividerWithRef';

const Divider = forwardRef<HTMLHRElement, TDividerProps>(DividerWithRef);

export default Divider;