import { forwardRef } from 'react';
import type { CSSObject } from 'tss-react';
import MuiTab, { type TabProps as MuiTabProps } from '@mui/material/Tab';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  tabClasses,
  type TabProps as TTabProps,
  type TabClasses as TTabClasses,
  type TabClassKey as TTabClassKey
} from '@mui/material/Tab';

const useStyles = makeStyles({ name: 'Tab' })(
  (theme: TTheme) => ({
    root: { ...theme.typography.body1 } as CSSObject,
  }),
);

function TabWithRef({ classes, className, ...otherProps }: MuiTabProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiTab
      {...otherProps}
      ref={ref}
      classes={mergedClasses}
      disableRipple
    />
  );
}

TabWithRef.displayName = 'TabWithRef';

const Tab = forwardRef<HTMLDivElement, MuiTabProps>(TabWithRef);

export default Tab;