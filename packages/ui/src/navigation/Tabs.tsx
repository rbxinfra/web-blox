import { forwardRef } from 'react';
import MuiTabs, { type TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { tabClasses } from './Tab';

export {
  tabsClasses,
  type TabsClasses as TTabsClasses,
  type TabsClassKey as TTabsClassKey
} from '@mui/material/Tabs';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TTabsProps extends MuiTabsProps {
  /**
   * When true (default), tab labels are rendered with capitalize text transform.
   * Set to false to render labels exactly as provided.
   */
  capitalize?: boolean;
}

interface TTabsStyleParams {
  capitalize?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TTabsStyleParams>({ name: 'Tabs' })(
  (
    theme: TTheme,
    { capitalize: doCapitalize = true }: TTabsStyleParams,
  ) => ({
    root: {
      [`& .${tabClasses.root}`]: {
        textTransform: doCapitalize ? 'capitalize' : 'none',
        color: theme.palette.content.muted,
        opacity: 1,
      },
      [`& .${tabClasses.selected}`]: {
        color: theme.palette.actionV2.primary.fill,
      },
      [`& .${tabClasses.disabled}`]: {
        color: theme.palette.states.disabled,
      },
    } as CSSObject,
    indicator: {
      backgroundColor: theme.palette.actionV2.primary.fill,
    },
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function TabsWithRef(
  {
    children,
    classes,
    className,
    capitalize,
    ...otherProps
  }: TTabsProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    { capitalize },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiTabs
      {...otherProps}
      ref={ref}
      classes={mergedClasses}
      textColor="inherit"
    >
      {children}
    </MuiTabs>
  );
}

TabsWithRef.displayName = 'TabsWithRef';

const Tabs = forwardRef<HTMLDivElement, TTabsProps>(TabsWithRef);

export default Tabs;