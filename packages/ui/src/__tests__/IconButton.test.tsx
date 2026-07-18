/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import IconButton from '../iconButton/IconButton';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

const Icon = () => <svg data-testid="icon" aria-hidden />;

// ── Rendering ──────────────────────────────────────────────────────────────

describe('IconButton', () => {
  it('renders children', () => {
    wrap(<IconButton aria-label="settings"><Icon /></IconButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders an accessible button', () => {
    wrap(<IconButton aria-label="close"><Icon /></IconButton>);
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    wrap(<IconButton aria-label="test" ref={ref}><Icon /></IconButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies className', () => {
    wrap(<IconButton aria-label="test" className="custom"><Icon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  // ── Disabled ───────────────────────────────────────────────────────────

  it('is disabled when disabled prop is set', () => {
    wrap(<IconButton aria-label="test" disabled><Icon /></IconButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = jest.fn();
    wrap(
      <IconButton aria-label="test" disabled onClick={onClick}>
        <Icon />
      </IconButton>,
    );
    await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: PointerEventsCheckLevel.Never });
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Interaction ────────────────────────────────────────────────────────

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    wrap(
      <IconButton aria-label="test" onClick={onClick}>
        <Icon />
      </IconButton>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // ── Color variants ─────────────────────────────────────────────────────

  const colors = [
    'primary',
    'secondary',
    'primaryBrand',
    'destructive',
    'default',
    'onMediaLight',
    'onMediaDark',
  ] as const;

  colors.forEach(color => {
    it(`renders color="${color}" without throwing`, () => {
      expect(() =>
        wrap(
          <IconButton aria-label="test" color={color}>
            <Icon />
          </IconButton>,
        ),
      ).not.toThrow();
    });
  });

  // ── Variant ────────────────────────────────────────────────────────────

  const variants = ['default', 'contained', 'outlined'] as const;

  variants.forEach(variant => {
    it(`renders variant="${variant}" without throwing`, () => {
      expect(() =>
        wrap(
          <IconButton aria-label="test" variant={variant}>
            <Icon />
          </IconButton>,
        ),
      ).not.toThrow();
    });
  });

  // ── Size ───────────────────────────────────────────────────────────────

  it('applies small size', () => {
    wrap(
      <IconButton aria-label="test" size="small">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('MuiIconButton-sizeSmall');
  });

  // ── Colour × variant matrix ────────────────────────────────────────────

  it('renders onMediaLight contained without throwing', () => {
    expect(() =>
      wrap(
        <IconButton aria-label="test" color="onMediaLight" variant="contained">
          <Icon />
        </IconButton>,
      ),
    ).not.toThrow();
  });

  it('renders destructive outlined without throwing', () => {
    expect(() =>
      wrap(
        <IconButton aria-label="test" color="destructive" variant="outlined">
          <Icon />
        </IconButton>,
      ),
    ).not.toThrow();
  });
});