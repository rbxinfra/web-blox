/* eslint-disable */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import Menu     from '../navigation/Menu';
import MenuItem from '../navigation/MenuItem';
import Tab      from '../navigation/Tab';
import Tabs     from '../navigation/Tabs';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Menu ───────────────────────────────────────────────────────────────────

describe('Menu', () => {
  // Menu requires an anchorEl to be open
  function renderOpenMenu(props: Partial<React.ComponentProps<typeof Menu>> = {}) {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    return wrap(
      <Menu open anchorEl={anchor} {...props}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
      </Menu>,
    );
  }

  afterEach(() => {
    document.querySelectorAll('button[data-test-anchor]').forEach(el => el.remove());
  });

  it('renders menu items when open', () => {
    renderOpenMenu();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    wrap(
      <Menu open={false} anchorEl={anchor}>
        <MenuItem>Hidden</MenuItem>
      </Menu>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('defaults to menu variant', () => {
    renderOpenMenu();
    // MUI Menu with variant='menu' renders a ul role=menu
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('accepts modal variant without throwing', () => {
    expect(() => renderOpenMenu({ variant: 'modal' })).not.toThrow();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = jest.fn();
    renderOpenMenu({ onClose });
    // MUI Menu closes on backdrop click, not on MenuItem click
    // (MenuItem click closing is app-level logic via the onClose prop passed down)
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const anchor = document.createElement('button');
    document.body.appendChild(anchor);
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Menu open anchorEl={anchor} ref={ref}>
        <MenuItem>Item</MenuItem>
      </Menu>,
    );
    expect(ref.current).toBeTruthy();
  });
});

// ── MenuItem ───────────────────────────────────────────────────────────────

describe('MenuItem', () => {
  it('renders children', () => {
    wrap(
      <ul>
        <MenuItem>Click me</MenuItem>
      </ul>,
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    wrap(
      <ul>
        <MenuItem onClick={onClick}>Click me</MenuItem>
      </ul>,
    );
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders selected state', () => {
    const { container } = wrap(
      <ul>
        <MenuItem selected>Selected</MenuItem>
      </ul>,
    );
    expect(container.querySelector('.Mui-selected')).toBeInTheDocument();
  });

  it('renders standardMenu variant without throwing', () => {
    expect(() =>
      wrap(
        <ul>
          <MenuItem variant="standardMenu">Item</MenuItem>
        </ul>,
      ),
    ).not.toThrow();
  });

  it('renders modal variant without throwing', () => {
    expect(() =>
      wrap(
        <ul>
          <MenuItem variant="modal">Item</MenuItem>
        </ul>,
      ),
    ).not.toThrow();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLIElement>();
    wrap(
      <ul>
        <MenuItem ref={ref}>Item</MenuItem>
      </ul>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  it('applies className', () => {
    wrap(
      <ul>
        <MenuItem className="custom">Item</MenuItem>
      </ul>,
    );
    expect(document.querySelector('.custom')).toBeInTheDocument();
  });
});

// ── Tab ────────────────────────────────────────────────────────────────────

describe('Tab', () => {
  it('renders label', () => {
    wrap(
      <Tabs value={0}>
        <Tab label="First" value={0} />
      </Tabs>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
  });

  it('renders multiple tabs', () => {
    wrap(
      <Tabs value={0}>
        <Tab label="Tab 1" value={0} />
        <Tab label="Tab 2" value={1} />
        <Tab label="Tab 3" value={2} />
      </Tabs>,
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('has disableRipple set', () => {
    wrap(
      <Tabs value={0}>
        <Tab label="No ripple" value={0} />
      </Tabs>,
    );
    // disableRipple means no MuiTouchRipple element
    expect(document.querySelector('.MuiTouchRipple-root')).not.toBeInTheDocument();
  });

  it('renders disabled tab', () => {
    wrap(
      <Tabs value={0}>
        <Tab label="Active" value={0} />
        <Tab label="Disabled" value={1} disabled />
      </Tabs>,
    );
    expect(screen.getByText('Disabled').closest('button')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Tabs value={0}>
        <Tab label="Ref" value={0} ref={ref} />
      </Tabs>,
    );
    expect(ref.current).toBeTruthy();
  });
});

// ── Tabs ───────────────────────────────────────────────────────────────────

describe('Tabs', () => {
  it('renders tablist', () => {
    wrap(
      <Tabs value={0}>
        <Tab label="One" value={0} />
        <Tab label="Two" value={1} />
      </Tabs>,
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', async () => {
    const onChange = jest.fn();
    wrap(
      <Tabs value={0} onChange={onChange}>
        <Tab label="One" value={0} />
        <Tab label="Two" value={1} />
      </Tabs>,
    );
    await userEvent.click(screen.getByText('Two'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders capitalize=false without throwing', () => {
    expect(() =>
      wrap(
        <Tabs value={0} capitalize={false}>
          <Tab label="lowercase" value={0} />
        </Tabs>,
      ),
    ).not.toThrow();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Tabs value={0} ref={ref}>
        <Tab label="Tab" value={0} />
      </Tabs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(
      <Tabs value={0} className="my-tabs">
        <Tab label="Tab" value={0} />
      </Tabs>,
    );
    expect(container.querySelector('.my-tabs')).toBeInTheDocument();
  });

  it('renders scrollable variant', () => {
    const { container } = wrap(
      <Tabs value={0} variant="scrollable" scrollButtons="auto">
        <Tab label="One" value={0} />
        <Tab label="Two" value={1} />
      </Tabs>,
    );
    expect(
      container.querySelector('.MuiTabs-scroller'),
    ).toBeInTheDocument();
  });
});