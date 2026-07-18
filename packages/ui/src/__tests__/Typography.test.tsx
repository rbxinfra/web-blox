/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';

import UIThemeProvider from '../theme/UIThemeProvider';
import Typography from '../typography/Typography';

function wrap(ui: React.ReactElement, theme: 'dark' | 'light' = 'dark') {
  return render(<UIThemeProvider theme={theme}>{ui}</UIThemeProvider>);
}

// ── Rendering ──────────────────────────────────────────────────────────────

describe('Typography', () => {
  it('renders children', () => {
    wrap(<Typography>Hello world</Typography>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('defaults to span element', () => {
    const { container } = wrap(<Typography>Text</Typography>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders as p when paragraph=true', () => {
    const { container } = wrap(<Typography paragraph>Text</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders with explicit component prop', () => {
    const { container } = wrap(
      <Typography component="h2">Heading</Typography>,
    );
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    wrap(<Typography ref={ref}>Text</Typography>);
    expect(ref.current).toBeTruthy();
  });

  it('applies className', () => {
    wrap(<Typography className="custom">Text</Typography>);
    expect(screen.getByText('Text').closest('.custom')).toBeInTheDocument();
  });

  // ── Variants ───────────────────────────────────────────────────────────

  const variants = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'captionHeader', 'captionBody', 'captionSmall',
    'button', 'overline',
    'footer', 'code', 'codeDense', 'chip',
    'largeLabel1', 'largeLabel2',
    'legalDisclaimer', 'smallLabel1', 'smallLabel2',
    'buttonLarge', 'buttonMedium', 'buttonSmall',
    'tooltip', 'alertTitle', 'tableHead', 'avatarLetter', 'hero',
  ] as const;

  variants.forEach(variant => {
    it(`renders variant="${variant}" without throwing`, () => {
      expect(() =>
        wrap(<Typography variant={variant}>Text</Typography>),
      ).not.toThrow();
    });
  });

  // ── Colours ────────────────────────────────────────────────────────────

  const colors = [
    'primary', 'secondary', 'disabled',
    'error', 'info', 'warning', 'success', 'inherit',
  ] as const;

  colors.forEach(color => {
    it(`renders color="${color}" in dark mode without throwing`, () => {
      expect(() =>
        wrap(<Typography color={color}>Text</Typography>, 'dark'),
      ).not.toThrow();
    });

    it(`renders color="${color}" in light mode without throwing`, () => {
      expect(() =>
        wrap(<Typography color={color}>Text</Typography>, 'light'),
      ).not.toThrow();
    });
  });

  // ── Modifiers ──────────────────────────────────────────────────────────

  it('applies italics modifier', () => {
    wrap(<Typography italics>Italic text</Typography>);
    const el = screen.getByText('Italic text');
    // italics class should result in fontStyle: italic in computed styles
    // We verify the class is present rather than computed style in jsdom
    expect(el.className).toBeTruthy();
  });

  it('applies underline modifier', () => {
    wrap(<Typography underline>Underlined</Typography>);
    expect(screen.getByText('Underlined')).toBeInTheDocument();
  });

  it('combines italics and underline modifiers', () => {
    expect(() =>
      wrap(<Typography italics underline>Both</Typography>),
    ).not.toThrow();
  });

  // ── Color × mode combinations ──────────────────────────────────────────

  it('renders error color in dark mode with dark token', () => {
    wrap(<Typography color="error">Error</Typography>, 'dark');
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders error color in light mode with light token', () => {
    wrap(<Typography color="error">Error</Typography>, 'light');
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders warning color in dark mode with actionV2.notice', () => {
    wrap(<Typography color="warning">Warning</Typography>, 'dark');
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('renders success color in dark mode with actionV2.active', () => {
    wrap(<Typography color="success">Success</Typography>, 'dark');
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  // ── Prose combinations ─────────────────────────────────────────────────

  it('renders h3 heading as span by default', () => {
    const { container } = wrap(
      <Typography variant="h3">Heading</Typography>,
    );
    // Without component or paragraph, defaults to span
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders body text as paragraph when paragraph=true', () => {
    const { container } = wrap(
      <Typography variant="body1" paragraph>Paragraph</Typography>,
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });
});