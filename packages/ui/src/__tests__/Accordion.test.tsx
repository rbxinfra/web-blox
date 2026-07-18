/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import UIThemeProvider from '../theme/UIThemeProvider';
import Accordion, { type TAccordionProps }        from '../accordion/Accordion';
import AccordionSummary from '../accordion/AccordionSummary';
import AccordionDetails from '../accordion/AccordionDetails';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

interface BasicAccordionProps extends Omit<TAccordionProps, 'children'> {
}

function BasicAccordion(props: BasicAccordionProps = {} as BasicAccordionProps) {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Summary text
      </AccordionSummary>
      <AccordionDetails>Details content</AccordionDetails>
    </Accordion>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────────

describe('Accordion', () => {
  it('renders summary', () => {
    wrap(<BasicAccordion />);
    expect(screen.getByText('Summary text')).toBeInTheDocument();
  });

  it('hides details when collapsed by default', () => {
    wrap(<BasicAccordion />);
    expect(screen.queryByText('Details content')).not.toBeVisible();
  });

  it('shows details when defaultExpanded', () => {
    wrap(<BasicAccordion defaultExpanded />);
    expect(screen.getByText('Details content')).toBeVisible();
  });

  it('expands on summary click', async () => {
    wrap(<BasicAccordion />);
    await userEvent.click(screen.getByText('Summary text'));
    expect(screen.getByText('Details content')).toBeVisible();
  });

  it('collapses after second click', async () => {
    wrap(<BasicAccordion defaultExpanded />);
    await userEvent.click(screen.getByText('Summary text'));
    expect(screen.queryByText('Details content')).not.toBeVisible();
  });

  it('renders elevation variant without throwing', () => {
    expect(() => wrap(<BasicAccordion variant="elevation" />)).not.toThrow();
  });

  it('renders outlined variant without throwing', () => {
    expect(() => wrap(<BasicAccordion variant="outlined" />)).not.toThrow();
  });

  it('renders outlined as MUI outlined', () => {
    const { container } = wrap(<BasicAccordion variant="outlined" />);
    expect(
      container.querySelector('.MuiAccordion-root'),
    ).toBeInTheDocument();
  });

  it('renders square without throwing', () => {
    expect(() => wrap(<BasicAccordion square />)).not.toThrow();
  });

  it('is disabled when disabled prop is set', () => {
    wrap(<BasicAccordion disabled />);
    expect(
      screen.getByRole('button', { name: /summary text/i }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onChange when expanded state changes', async () => {
    const onChange = jest.fn();
    wrap(<BasicAccordion onChange={onChange} />);
    await userEvent.click(screen.getByText('Summary text'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<BasicAccordion ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(<BasicAccordion className="my-accordion" />);
    expect(container.querySelector('.my-accordion')).toBeInTheDocument();
  });

  it('renders multiple accordions', () => {
    wrap(
      <>
        <Accordion>
          <AccordionSummary>First</AccordionSummary>
          <AccordionDetails>First details</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Second</AccordionSummary>
          <AccordionDetails>Second details</AccordionDetails>
        </Accordion>
      </>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});

// ── AccordionSummary ───────────────────────────────────────────────────────

describe('AccordionSummary', () => {
  it('renders children', () => {
    wrap(
      <Accordion>
        <AccordionSummary>My summary</AccordionSummary>
      </Accordion>,
    );
    expect(screen.getByText('My summary')).toBeInTheDocument();
  });

  it('renders expand icon', () => {
    wrap(
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon data-testid="expand-icon" />}>
          Summary
        </AccordionSummary>
      </Accordion>,
    );
    expect(screen.getByTestId('expand-icon')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Accordion>
        <AccordionSummary ref={ref}>Summary</AccordionSummary>
      </Accordion>,
    );
    expect(ref.current).toBeTruthy();
  });
});

// ── AccordionDetails ───────────────────────────────────────────────────────

describe('AccordionDetails', () => {
  it('renders children', () => {
    wrap(
      <Accordion defaultExpanded>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails>Detail content here</AccordionDetails>
      </Accordion>,
    );
    expect(screen.getByText('Detail content here')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Accordion defaultExpanded>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails ref={ref}>Details</AccordionDetails>
      </Accordion>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = wrap(
      <Accordion defaultExpanded>
        <AccordionSummary>Summary</AccordionSummary>
        <AccordionDetails className="my-details">Details</AccordionDetails>
      </Accordion>,
    );
    expect(container.querySelector('.my-details')).toBeInTheDocument();
  });
});