import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TreeItem, TreeView, TTreeViewProps, ArrowForwardIcon, ArrowBackIcon } from '@rbx/ui';
import { createBooleanControl, configureArgs, createEnumControl } from './utils/controlUtils';

const notes = `Built over MUI v5 [TreeView](https://v5.mui.com/api/tree-view/) and [TreeItem](https://v5.mui.com/api/tree-item/);`;

export default {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3633%3A209'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TTreeViewProps, 'multiSelect' | 'disableSelection' | 'variant'> & {
    showCustomCollapseIcon: boolean;
    showCustomExpandIcon: boolean;
  }
> = ({ multiSelect, disableSelection, showCustomCollapseIcon, showCustomExpandIcon, variant }) => {
  return (
    <TreeView
      disableSelection={disableSelection}
      multiSelect={multiSelect}
      defaultCollapseIcon={showCustomCollapseIcon ? <ArrowBackIcon /> : undefined}
      defaultExpandIcon={showCustomExpandIcon ? <ArrowForwardIcon /> : undefined}
      variant={variant}>
      <TreeItem nodeId='1' label='Main Item 1'>
        <TreeItem nodeId='2' label='Subitem 1' />
        <TreeItem nodeId='3' label='Subitem 2' />
        <TreeItem nodeId='4' label='Subitem 3' />
      </TreeItem>
      <TreeItem nodeId='5' label='Main Item 2'>
        <TreeItem nodeId='7' label='Subitem 1'>
          <TreeItem nodeId='8' label='Sub-subitem 1' />
          <TreeItem nodeId='9' label='Sub-subitem 2' />
          <TreeItem nodeId='10' label='Sub-subitem 3' />
        </TreeItem>
        <TreeItem nodeId='6' label='Subitem 2' />
        <TreeItem nodeId='11' label='Subitem 3' />
      </TreeItem>
      <TreeItem nodeId='12' label='Main Item 3' />
    </TreeView>
  );
};
configureArgs(Base, {
  multiSelect: createBooleanControl(
    'Defines if tree view should allow multiselect with `ctrl` and `shift`',
    false
  ),
  disableSelection: createBooleanControl('Defines if selection will not be bolded', false),
  showCustomCollapseIcon: createBooleanControl(
    'Defines if a custom collapse icon shold be shown.',
    false
  ),
  showCustomExpandIcon: createBooleanControl(
    'Defines if a custom expand icon shold be shown.',
    false
  ),
  variant: createEnumControl('Defines the variant of the tree view`', 'dense', ['default', 'dense'])
});
