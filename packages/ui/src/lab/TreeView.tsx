/* eslint-disable import/no-internal-modules */

import { forwardRef } from 'react';
import { SimpleTreeView as MuiTreeView } from '@mui/x-tree-view/SimpleTreeView';
import type { SimpleTreeViewProps as MuiTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { treeItemClasses, type TTreeItemClasses } from './TreeItem';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TTreeViewVariant = 'default' | 'dense';

export interface TTreeViewProps extends Omit<MuiTreeViewProps<true>, 'slots'> {
  variant?: TTreeViewVariant;
  classes?: Partial<TTreeItemClasses> & { root?: string };
  className?: string;

  /* Kept for backwards compatibility with MUI TreeView v5 API consumers that used `defaultCollapseIcon` and `defaultExpandIcon`. */

  defaultCollapseIcon?: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
}

interface TTreeViewStyleParams {
  variant?: TTreeViewVariant;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TTreeViewStyleParams>({ name: 'TreeView' })(
  (theme: TTheme, { variant = 'dense' }: TTreeViewStyleParams) => {
    // 'default' uses body1, 'dense' uses body2
    const labelTypography = variant === 'default'
      ? theme.typography.body1
      : theme.typography.body2;

    const contentPadding = variant === 'default' ? 8 : '4px 8px';

    return {
      root: {
        [`& .${treeItemClasses.content}`]: {
          ...theme.border.radius.medium,
          padding: contentPadding,

          [`& .${treeItemClasses.label}, &.${treeItemClasses.selected} .${treeItemClasses.label}`]: {
            ...labelTypography,
          } as CSSObject,
        } as CSSObject,
      } as CSSObject,
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function TreeViewWithRef(
  {
    children,
    classes,
    className,
    variant = 'dense',
    ...otherProps
  }: TTreeViewProps, 
  ref: React.Ref<HTMLUListElement>
) {
  const { classes: treeViewClasses } = useStyles(
    { variant },
    { props: { classes: combineOverrides(classes as Record<string, string>, className) } },
  );

  return (
    <MuiTreeView
      {...otherProps}
      className={treeViewClasses.root}
      ref={ref}
      slots={{
        collapseIcon: ExpandMoreIcon,
        expandIcon: ChevronRightIcon,
      }}
    >
      {children}
    </MuiTreeView>
  );
}

TreeViewWithRef.displayName = 'TreeViewWithRef';

const TreeView = forwardRef<HTMLUListElement, TTreeViewProps>(TreeViewWithRef);

export default TreeView;