/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import UIThemeProvider from '../theme/UIThemeProvider';
import TreeItem from '../lab/TreeItem';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// SimpleTreeView is the required parent for TreeItem
function Tree({ children }: { children: React.ReactNode }) {
  return (
    <UIThemeProvider>
      <SimpleTreeView>{children}</SimpleTreeView>
    </UIThemeProvider>
  );
}

// ── TreeItem ───────────────────────────────────────────────────────────────

describe('TreeItem', () => {
  it('renders label', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Root node" />
      </Tree>,
    );
    expect(screen.getByText('Root node')).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Parent">
          <TreeItem itemId="1-1" label="Child" />
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByText('Parent')).toBeInTheDocument();
    // Child is hidden until expanded — just check parent renders
  });

  it('accepts nodeId as legacy prop', () => {
    render(
      <Tree>
        <TreeItem nodeId="legacy-1" label="Legacy node" />
      </Tree>,
    );
    expect(screen.getByText('Legacy node')).toBeInTheDocument();
  });

  it('applies className', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Styled" className="custom-class" />
      </Tree>,
    );
    // className should appear on one of the rendered elements
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('expands children on click', async () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Parent">
          <TreeItem itemId="1-1" label="Child node" />
        </TreeItem>
      </Tree>,
    );

    // Child is not visible until expanded
    expect(screen.queryByText('Child node')).not.toBeInTheDocument();

    // Click the expand icon (the icon container area)
    await userEvent.click(screen.getByText('Parent'));

    expect(screen.getByText('Child node')).toBeInTheDocument();
  });

  it('forwards ref to the list item element', () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <Tree>
        <TreeItem itemId="1" label="Ref test" ref={ref} />
      </Tree>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  it('renders multiple siblings', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="First" />
        <TreeItem itemId="2" label="Second" />
        <TreeItem itemId="3" label="Third" />
      </Tree>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('renders a disabled item', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Disabled" disabled />
      </Tree>,
    );
    const item = screen.getByRole('treeitem', { name: 'Disabled' });
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders deeply nested items', () => {
    render(
      <Tree>
        <TreeItem itemId="1" label="Level 1">
          <TreeItem itemId="1-1" label="Level 2">
            <TreeItem itemId="1-1-1" label="Level 3" />
          </TreeItem>
        </TreeItem>
      </Tree>,
    );
    expect(screen.getByText('Level 1')).toBeInTheDocument();
  });
});