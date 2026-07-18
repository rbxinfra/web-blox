/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import Avatar        from '../dataDisplay/Avatar';
import Chip          from '../dataDisplay/Chip';
import Divider       from '../dataDisplay/Divider';
import Label         from '../dataDisplay/Label';
import ListItem      from '../dataDisplay/ListItem';
import ListItemButton from '../dataDisplay/ListItemButton';
import ListItemIcon  from '../dataDisplay/ListItemIcon';
import ListItemText  from '../dataDisplay/ListItemText';
import ListSubheader from '../dataDisplay/ListSubheader';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Avatar ─────────────────────────────────────────────────────────────────

describe('Avatar', () => {
  it('renders children', () => {
    wrap(<Avatar>AB</Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Avatar ref={ref}>A</Avatar>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(<Avatar className="custom">A</Avatar>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

// ── Chip ───────────────────────────────────────────────────────────────────

describe('Chip', () => {
  it('renders label', () => {
    wrap(<Chip label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('defaults to filled variant', () => {
    const { container } = wrap(<Chip label="Test" />);
    expect(container.querySelector('.MuiChip-filled')).toBeInTheDocument();
  });

  it('renders outlined variant', () => {
    const { container } = wrap(<Chip label="Test" variant="outlined" />);
    expect(container.querySelector('.MuiChip-outlined')).toBeInTheDocument();
  });

  it('renders large size without passing size to MUI', () => {
    // size="large" is a custom uiblox extension — MUI doesn't have it
    const { container } = wrap(<Chip label="Large" size="large" />);
    // Should not have MuiChip-sizeLarge (MUI doesn't know about it)
    expect(container.querySelector('.MuiChip-sizeLarge')).not.toBeInTheDocument();
  });

  it('fires onClick when clickable', async () => {
    const onClick = jest.fn();
    wrap(<Chip label="Click" onClick={onClick} />);
    await userEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Chip label="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ── Divider ────────────────────────────────────────────────────────────────

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = wrap(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = wrap(<Divider className="custom" />);
    expect(container.querySelector('hr')).toHaveClass('custom');
  });

  it('accepts size prop without throwing', () => {
    expect(() => wrap(<Divider size="small" />)).not.toThrow();
    expect(() => wrap(<Divider size="medium" />)).not.toThrow();
  });
});

// ── Label ──────────────────────────────────────────────────────────────────

describe('Label', () => {
  it('renders labelText', () => {
    wrap(<Label labelText="Featured" />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    wrap(
      <Label
        labelText="With icon"
        icon={<span data-testid="icon" />}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('With icon')).toBeInTheDocument();
  });

  it('renders all severity variants without throwing', () => {
    const severities = ['default', 'success', 'info', 'warning', 'error'] as const;
    severities.forEach(severity => {
      expect(() =>
        wrap(<Label labelText="Test" severity={severity} />),
      ).not.toThrow();
    });
  });

  it('renders text variant', () => {
    expect(() =>
      wrap(<Label labelText="Text" variant="text" severity="success" />),
    ).not.toThrow();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Label labelText="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ── List components ────────────────────────────────────────────────────────

describe('ListItem', () => {
  it('renders children', () => {
    wrap(
      <ul>
        <ListItem>
          <ListItemText primary="Item" />
        </ListItem>
      </ul>,
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLIElement>();
    wrap(
      <ul>
        <ListItem ref={ref}>Item</ListItem>
      </ul>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

describe('ListItemButton', () => {
  it('renders and is clickable', async () => {
    const onClick = jest.fn();
    wrap(
      <ul>
        <ListItemButton onClick={onClick}>Click me</ListItemButton>
      </ul>,
    );
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <ul>
        <ListItemButton ref={ref}>Item</ListItemButton>
      </ul>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('ListItemIcon', () => {
  it('renders children', () => {
    wrap(
      <ul>
        <li>
          <ListItemIcon>
            <span data-testid="icon" />
          </ListItemIcon>
        </li>
      </ul>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

describe('ListItemText', () => {
  it('renders primary text', () => {
    wrap(
      <ul>
        <li>
          <ListItemText primary="Primary text" />
        </li>
      </ul>,
    );
    expect(screen.getByText('Primary text')).toBeInTheDocument();
  });

  it('renders secondary text', () => {
    wrap(
      <ul>
        <li>
          <ListItemText primary="Primary" secondary="Secondary" />
        </li>
      </ul>,
    );
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });
});

describe('ListSubheader', () => {
  it('renders children', () => {
    wrap(
      <ul>
        <ListSubheader>Section Title</ListSubheader>
      </ul>,
    );
    expect(screen.getByText('Section Title')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLIElement>();
    wrap(
      <ul>
        <ListSubheader ref={ref}>Title</ListSubheader>
      </ul>,
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});