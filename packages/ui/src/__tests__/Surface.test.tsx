/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import Banner from '../surface/Banner';

// Mock ResizeObserver — not available in jsdom
class MockResizeObserver {
  observe()    {}
  unobserve()  {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

const primary = { label: 'Get started', onClick: jest.fn() };
const secondary = { label: 'Learn more', onClick: jest.fn() };

// ── Banner ─────────────────────────────────────────────────────────────────

describe('Banner', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders title', () => {
    wrap(<Banner title="Welcome to Roblox" primary={primary} />);
    expect(screen.getByText('Welcome to Roblox')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    wrap(
      <Banner
        title="Title"
        description="This is a description."
        primary={primary}
      />,
    );
    expect(screen.getByText('This is a description.')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    wrap(<Banner title="Title" primary={primary} />);
    expect(screen.queryByText('This is a description.')).not.toBeInTheDocument();
  });

  it('renders primary action button', () => {
    wrap(<Banner title="Title" primary={primary} />);
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('renders secondary action button when provided', () => {
    wrap(<Banner title="Title" primary={primary} secondary={secondary} />);
    expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('does not render secondary button when omitted', () => {
    wrap(<Banner title="Title" primary={primary} />);
    expect(screen.queryByRole('button', { name: 'Learn more' })).not.toBeInTheDocument();
  });

  it('fires primary onClick', async () => {
    const onClick = jest.fn();
    wrap(<Banner title="Title" primary={{ label: 'Go', onClick }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires secondary onClick', async () => {
    const onClick = jest.fn();
    wrap(
      <Banner
        title="Title"
        primary={primary}
        secondary={{ label: 'Skip', onClick }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Skip' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders close button when onClose is provided', () => {
    wrap(
      <Banner title="Title" primary={primary} onClose={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('does not render close button when onClose is omitted', () => {
    wrap(<Banner title="Title" primary={primary} />);
    expect(screen.queryByRole('button', { name: 'close' })).not.toBeInTheDocument();
  });

  it('fires onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    wrap(<Banner title="Title" primary={primary} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom root class', () => {
    const { container } = wrap(
      <Banner
        title="Title"
        primary={primary}
        classes={{ root: 'my-banner' }}
      />,
    );
    expect(container.querySelector('.my-banner')).toBeInTheDocument();
  });

  it('forwards ref to the card element', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Banner title="Title" primary={primary} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders without secondary or illustration without throwing', () => {
    expect(() =>
      wrap(<Banner title="Title" primary={primary} />),
    ).not.toThrow();
  });

  it('renders with all props without throwing', () => {
    expect(() =>
      wrap(
        <Banner
          title="Full banner"
          description="All props"
          primary={{ label: 'Primary', color: 'primaryBrand', variant: 'contained', size: 'large' }}
          secondary={{ label: 'Secondary', color: 'secondary', variant: 'outlined', size: 'medium' }}
          illustration={{ src: 'https://example.com/img.png', alt: 'Banner illustration' }}
          onClose={() => {}}
          classes={{ root: 'full-banner' }}
        />,
      ),
    ).not.toThrow();
  });

  it('renders primary button with default color, variant, size', () => {
    wrap(<Banner title="Title" primary={{ label: 'Go' }} />);
    const btn = screen.getByRole('button', { name: 'Go' });
    // Default: color=primary (→ MUI secondary), variant=contained, size=large
    expect(btn).toHaveClass('MuiButton-containedSecondary');
    expect(btn).toHaveClass('MuiButton-sizeLarge');
  });
});