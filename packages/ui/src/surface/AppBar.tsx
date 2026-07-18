import { forwardRef } from 'react';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  appBarClasses,
  type AppBarProps as TAppBarProps,
  type AppBarClasses as TAppBarClasses,
  type AppBarClassKey as TAppBarClassKey
} from '@mui/material/AppBar';

const useStyles = makeStyles({ name: 'AppBar' })(
  (theme: TTheme) => ({
    colorPrimary: {
      color: theme.palette.content.static.light,
      backgroundColor: theme.palette.actionV2.primaryBrand.fill
    }
  }),
);

function AppBarWithRef(
  { 
    children, 
    color = 'primary', 
    classes, 
    className, 
    ...otherProps 
  }: MuiAppBarProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiAppBar
      {...otherProps}
      color={color}
      ref={ref}
      classes={mergedClasses}
    >
      {children}
    </MuiAppBar>
  )
}

AppBarWithRef.displayName = 'AppBarWithRef';

const AppBar = forwardRef<HTMLDivElement, MuiAppBarProps>(AppBarWithRef);

export default AppBar;