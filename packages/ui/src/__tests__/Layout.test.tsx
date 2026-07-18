/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';

import UIThemeProvider from '../theme/UIThemeProvider';
import Grid from '../layout/Grid';
import { Container } from '../layout/Layout';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Grid ───────────────────────────────────────────────────────────────────

describe('Grid', () => {
  it('renders children', () => {
    wrap(
      <Grid container>
        <Grid item><span>Item</span></Grid>
      </Grid>,
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders as a container', () => {
    const { container } = wrap(<Grid container><Grid item>A</Grid></Grid>);
    expect(container.querySelector('.MuiGrid-container')).toBeInTheDocument();
  });

  it('renders as an item', () => {
    const { container } = wrap(
      <Grid container>
        <Grid item xs={6}>A</Grid>
      </Grid>,
    );
    expect(container.querySelector('.MuiGrid-item')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Grid container ref={ref}><Grid item>A</Grid></Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(
      <Grid container className="my-grid">
        <Grid item>A</Grid>
      </Grid>,
    );
    expect(container.querySelector('.my-grid')).toBeInTheDocument();
  });

  it('accepts direction prop without throwing', () => {
    expect(() =>
      wrap(
        <Grid container direction="column">
          <Grid item>A</Grid>
        </Grid>,
      ),
    ).not.toThrow();
  });

  it('accepts column-reverse direction', () => {
    expect(() =>
      wrap(
        <Grid container direction="column-reverse">
          <Grid item>A</Grid>
        </Grid>,
      ),
    ).not.toThrow();
  });

  it('passes spacing prop through to MUI Grid', () => {
    const { container } = wrap(
      <Grid container spacing={2}>
        <Grid item>A</Grid>
      </Grid>,
    );
    expect(container.querySelector('.MuiGrid-container')).toBeInTheDocument();
  });
});

// ── Container ──────────────────────────────────────────────────────────────

describe('Container', () => {
  it('renders children', () => {
    wrap(<Container><p>Content</p></Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('defaults to lg maxWidth', () => {
    const { container } = wrap(<Container><p>Content</p></Container>);
    expect(
      container.querySelector('.MuiContainer-maxWidthLg'),
    ).toBeInTheDocument();
  });

  it('accepts standard MUI maxWidth values', () => {
    const { container } = wrap(
      <Container maxWidth="sm"><p>Content</p></Container>,
    );
    expect(
      container.querySelector('.MuiContainer-maxWidthSm'),
    ).toBeInTheDocument();
  });

  it('accepts Roblox breakpoint maxWidth values without throwing', () => {
    expect(() =>
      wrap(<Container maxWidth="Large"><p>Content</p></Container>),
    ).not.toThrow();
  });

  it('accepts disableGutters prop', () => {
    const { container } = wrap(
      <Container disableGutters><p>Content</p></Container>,
    );
    expect(
      container.querySelector('.MuiContainer-disableGutters'),
    ).toBeInTheDocument();
  });

  it('accepts fixed prop', () => {
    const { container } = wrap(
      <Container fixed><p>Content</p></Container>,
    );
    expect(
      container.querySelector('.MuiContainer-fixed'),
    ).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Container ref={ref}><p>Content</p></Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(
      <Container className="my-container"><p>Content</p></Container>,
    );
    expect(container.querySelector('.my-container')).toBeInTheDocument();
  });
});