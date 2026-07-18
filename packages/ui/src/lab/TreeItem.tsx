import { forwardRef } from 'react';
import {
  TreeItem as MuiTreeItem,
  treeItemClasses,
  type TreeItemProps as MuiTreeItemProps
} from '@mui/x-tree-view/TreeItem';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import typography from '../theme/typography';

export {
  treeItemClasses,
  type TreeItemClasses as TTreeItemClasses,
  type TreeItemClassKey as TTreeItemClassKey
} from '@mui/x-tree-view/TreeItem'

export interface TTreeItemProps extends Omit<MuiTreeItemProps, 'itemId'> {
  /**
   * @deprecated Use `itemId` instead. Kept for backwards compatibility with
   * MUI TreeView v5 API consumers that used `nodeId`.
   */
  nodeId?: string;

  /**
   * The unique identifier for the tree item.
   * 
   * @note Made as optional to support legacy `nodeId` prop. If both `itemId` and `nodeId` are provided, `itemId` takes precedence.
   */
  itemId?: string;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'TreeItem' })(
  (theme: TTheme) => ({
    content: {
      color: theme.palette.content.muted,

      // Label typography
      [`& .${treeItemClasses.label}`]: {
        ...theme.typography.largeLabel2,
        padding: 4,
      } as CSSObject,

      // Icon container
      [`& .${treeItemClasses.iconContainer}`]: {
        width: 18,
        marginRight: 6,
      },

      // Selected state
      [`&.${treeItemClasses.selected}`]: {
        color: theme.palette.content.standard,
      },

      // Selected label: switch to largeLabel1 + medium weight
      [`&.${treeItemClasses.selected} .${treeItemClasses.label}`]: {
        ...theme.typography.largeLabel1,
        fontWeight: typography.fontWeightMedium,
      } as CSSObject,
    } as CSSObject,

    root: {
      // focused+selected and selected content rows use states.selected bg
      [
        `& .${treeItemClasses.content}.${treeItemClasses.focused}.${treeItemClasses.selected},` +
        ` & .${treeItemClasses.content}.${treeItemClasses.selected}`
      ]: {
        backgroundColor: `${theme.palette.states.selected}`,
        '&:hover': {
          backgroundColor: `${theme.palette.states.selected}`,
        },
      },
    } as CSSObject,

    groupTransition: {
      marginLeft: 24,
    },
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function TreeItemWithRef(
  {
    children,
    classes,
    className,
    nodeId,
    itemId,
    ...otherProps
  }: TTreeItemProps, 
  ref: React.Ref<HTMLLIElement>
) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Support legacy nodeId prop — itemId takes precedence
  const resolvedItemId = itemId ?? nodeId ?? '';

  return (
    <MuiTreeItem
      {...otherProps}
      itemId={resolvedItemId}
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </MuiTreeItem>
  );
}

TreeItemWithRef.displayName = 'TreeItemWithRef';

const TreeItem = forwardRef<HTMLLIElement, TTreeItemProps>(TreeItemWithRef);

export default TreeItem;