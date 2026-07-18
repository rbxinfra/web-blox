import { forwardRef } from 'react';
import MuiDrawer, { type DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  drawerClasses,
  type DrawerProps as TDrawerProps,
  type DrawerClasses as TDrawerClasses,
  type DrawerClassKey as TDrawerClassKey
} from '@mui/material/Drawer';

const useStyles = makeStyles({ name: 'Drawer' })(
  (theme: TTheme) => ({
    // Apply shadow level 16 to the drawer paper
    root: { elevation: theme.shadows[16] },
  }),
);

function DrawerWithRef({ classes, className, children, ...otherProps }: MuiDrawerProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiDrawer {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiDrawer>
  );
}

DrawerWithRef.displayName = 'DrawerWithRef';

const Drawer = forwardRef<HTMLDivElement, MuiDrawerProps>(DrawerWithRef);

export default Drawer;