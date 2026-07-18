/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import Checkbox      from '../input/Checkbox';
import FilledInput   from '../input/FilledInput';
import Input         from '../input/Input';
import InputLabel    from '../input/InputLabel';
import OutlinedInput from '../input/OutlinedInput';
import Select        from '../input/Select';
import TextField     from '../input/TextField';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Checkbox ───────────────────────────────────────────────────────────────

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    wrap(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('is checked when checked prop is true', () => {
    wrap(<Checkbox checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('is unchecked by default', () => {
    wrap(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const onChange = jest.fn();
    wrap(<Checkbox onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    wrap(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders small size', () => {
    const { container } = wrap(<Checkbox size="small" />);
    expect(container.querySelector('.MuiCheckbox-root')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    wrap(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

// ── InputLabel ─────────────────────────────────────────────────────────────

describe('InputLabel', () => {
  it('renders label text', () => {
    wrap(<InputLabel>Email address</InputLabel>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>();
    wrap(<InputLabel ref={ref}>Label</InputLabel>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});

// ── Input ──────────────────────────────────────────────────────────────────

describe('Input', () => {
  it('renders an input element', () => {
    wrap(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('accepts value prop', () => {
    wrap(<Input value="hello" onChange={() => {}} />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    wrap(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('calls onChange on typing', async () => {
    const onChange = jest.fn();
    wrap(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'abc');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<Input ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});

// ── FilledInput ────────────────────────────────────────────────────────────

describe('FilledInput', () => {
  it('renders an input element', () => {
    wrap(<FilledInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies filled class', () => {
    const { container } = wrap(<FilledInput />);
    expect(container.querySelector('.MuiFilledInput-root')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    wrap(<FilledInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<FilledInput ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});

// ── OutlinedInput ──────────────────────────────────────────────────────────

describe('OutlinedInput', () => {
  it('renders an input element', () => {
    wrap(<OutlinedInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies outlined class', () => {
    const { container } = wrap(<OutlinedInput />);
    expect(container.querySelector('.MuiOutlinedInput-root')).toBeInTheDocument();
  });

  it('renders small size', () => {
    const { container } = wrap(<OutlinedInput size="small" />);
    expect(
      container.querySelector('.MuiInputBase-sizeSmall'),
    ).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<OutlinedInput ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});

// ── TextField ──────────────────────────────────────────────────────────────

describe('TextField', () => {
  it('renders with label', () => {
    wrap(<TextField label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    wrap(<TextField label="Email" helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('defaults to outlined variant', () => {
    const { container } = wrap(<TextField label="Test" />);
    expect(
      container.querySelector('.MuiOutlinedInput-root'),
    ).toBeInTheDocument();
  });

  it('renders filled variant', () => {
    const { container } = wrap(<TextField label="Test" variant="filled" />);
    expect(
      container.querySelector('.MuiFilledInput-root'),
    ).toBeInTheDocument();
  });

  it('renders standard variant', () => {
    const { container } = wrap(<TextField label="Test" variant="standard" />);
    expect(
      container.querySelector('.MuiInput-root'),
    ).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    wrap(<TextField label="Test" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows error state', () => {
    const { container } = wrap(
      <TextField label="Test" error helperText="Required" />,
    );
    expect(container.querySelector('.Mui-error')).toBeInTheDocument();
  });

  it('calls onChange on typing', async () => {
    const onChange = jest.fn();
    wrap(<TextField label="Test" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(<TextField label="Test" ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('applies className', () => {
    const { container } = wrap(
      <TextField label="Test" className="my-field" />,
    );
    expect(container.firstChild).toHaveClass('my-field');
  });
});

// ── Select ─────────────────────────────────────────────────────────────────

// ── Select ─────────────────────────────────────────────────────────────────
 
describe('Select', () => {
  it('renders a combobox', () => {
    wrap(
      <Select label="Option" value="a" onChange={() => {}}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
 
  it('defaults to outlined variant', () => {
    const { container } = wrap(
      <Select label="Test" value="a" onChange={() => {}}>
        <option value="a">A</option>
      </Select>,
    );
    expect(
      container.querySelector('.MuiOutlinedInput-root'),
    ).toBeInTheDocument();
  });
 
  it('renders filled variant', () => {
    const { container } = wrap(
      <Select label="Test" variant="filled" value="a" onChange={() => {}}>
        <option value="a">A</option>
      </Select>,
    );
    expect(
      container.querySelector('.MuiFilledInput-root'),
    ).toBeInTheDocument();
  });
 
  it('is disabled when disabled prop is set', () => {
    wrap(
      <Select label="Test" disabled value="a" onChange={() => {}}>
        <option value="a">A</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });
 
  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Select label="Test" ref={ref} value="a" onChange={() => {}}>
        <option value="a">A</option>
      </Select>,
    );
    expect(ref.current).toBeTruthy();
  });
});
