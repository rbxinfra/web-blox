/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import UIThemeProvider from '../theme/UIThemeProvider';
import Button from '../button/Button';
import ButtonGroup from '../input/ButtonGroup';

function renderWithTheme(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Rendering ──────────────────────────────────────────────────────────────

describe('Button', () => {
  it('renders children', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as text by default', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text');
  });

  it('renders contained variant', () => {
    renderWithTheme(<Button variant="contained">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');
  });

  it('renders outlined variant', () => {
    renderWithTheme(<Button variant="outlined">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined');
  });

  // ── Disabled / loading ─────────────────────────────────────────────────

  it('is disabled when disabled prop is set', () => {
    renderWithTheme(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    renderWithTheme(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows a CircularProgress spinner when loading', () => {
    renderWithTheme(<Button loading>Submit</Button>);
    // CircularProgress renders an svg with role="progressbar"
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows startIcon when not loading', () => {
    renderWithTheme(
      <Button startIcon={<span data-testid="icon" />}>Click me</Button>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('replaces startIcon with spinner when loading', () => {
    renderWithTheme(
      <Button loading startIcon={<span data-testid="icon" />}>
        Click me
      </Button>,
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // ── Colors ────────────────────────────────────────────────────────────

  it('defaults to primaryBrand color', () => {
    renderWithTheme(<Button>Click me</Button>);
    // primaryBrand maps to MUI 'primary' color
    expect(screen.getByRole('button')).toHaveClass('MuiButton-textPrimary');
  });

  it('applies secondary color', () => {
    renderWithTheme(<Button color="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-textSecondary');
  });

  it('applies destructive color (maps to MUI error)', () => {
    renderWithTheme(<Button color="destructive">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-textError');
  });

  // ── Sizes ─────────────────────────────────────────────────────────────

  it('defaults to medium size', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeMedium');
  });

  it('applies large size', () => {
    renderWithTheme(<Button size="large">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('applies small size', () => {
    renderWithTheme(<Button size="small">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');
  });

  // ── Interaction ───────────────────────────────────────────────────────

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    renderWithTheme(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = jest.fn();
    renderWithTheme(<Button disabled onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: PointerEventsCheckLevel.Never });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const onClick = jest.fn();
    renderWithTheme(<Button loading onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: PointerEventsCheckLevel.Never });
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Forwarded ref ─────────────────────────────────────────────────────

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // ── Class / className ─────────────────────────────────────────────────

  it('applies className to root', () => {
    renderWithTheme(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});

// ── ButtonGroup ────────────────────────────────────────────────────────────

describe('ButtonGroup', () => {
  it('renders children', () => {
    renderWithTheme(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument();
  });

  it('passes color down to child buttons via context', () => {
    renderWithTheme(
      <ButtonGroup color="destructive">
        <Button>Delete</Button>
      </ButtonGroup>,
    );
    // destructive maps to MUI error
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlinedError');
  });

  it('passes size down to child buttons via context', () => {
    renderWithTheme(
      <ButtonGroup size="large">
        <Button>Large</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('allows child button to override group color', () => {
    renderWithTheme(
      <ButtonGroup color="primary">
        <Button color="destructive">Override</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlinedError');
  });

  it('allows child button to override group size', () => {
    renderWithTheme(
      <ButtonGroup size="large">
        <Button size="small">Override</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');
  });

  it('forwards ref to the group element', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(
      <ButtonGroup ref={ref}>
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
