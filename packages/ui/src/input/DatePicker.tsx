import { 
  DatePicker as MuiDatePicker, 
  type DatePickerProps as MuiDatePickerProps 
} from '@mui/x-date-pickers/DatePicker';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker';
import {
  TimePicker as MuiTimePicker,
  type TimePickerProps as MuiTimePickerProps
} from '@mui/x-date-pickers/TimePicker';

import { pickersDayClasses } from '@mui/x-date-pickers/PickersDay';
import { clockClasses, clockNumberClasses, clockPointerClasses } from '@mui/x-date-pickers/ClockPicker';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';

export {
  pickersDayClasses,
  clockClasses,
  clockNumberClasses,
  clockPointerClasses,

  type PickersDayClasses as TPickersDayClasses,
  type ClockClasses as TClockClasses,
  type ClockNumberClasses as TClockNumberClasses,
  type ClockPointerClasses as TClockPointerClasses,
  type PickersDayClassKey as TPickersDayClassKey,
  type ClockClassKey as TClockClassKey,
  type ClockNumberClassKey as TClockNumberClassKey,
  type ClockPointerClassKey as TClockPointerClassKey
} from '@mui/x-date-pickers';

// ── Types ─────────────────────────────────────────────────────────────────────

// Essentially just MuiDatePickerProps, but with a default TDate type of Date. 
// This is to avoid having to specify the generic type when using the component, as it is the most common use case.
export interface TDatePickerProps<TInputDate extends unknown = Date, TDate extends unknown = Date> 
  extends MuiDatePickerProps<TInputDate, TDate> {
}

// Essentially just MuiDateTimePickerProps, but with a default TInputDate and TDate type of Date.
// This is to avoid having to specify the generic type when using the component, as it is the most common use case.
export interface TDateTimePickerProps<TInputDate extends unknown = Date, TDate extends unknown = Date> 
  extends MuiDateTimePickerProps<TInputDate, TDate> {
}

// Essentially just MuiTimePickerProps, but with a default TInputDate and TDate type of Date.
// This is to avoid having to specify the generic type when using the component, as it is the most common use case.
export interface TTimePickerProps<TInputDate extends unknown = Date, TDate extends unknown = Date> 
  extends MuiTimePickerProps<TInputDate, TDate> {
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'DatePicker' })(
  (theme: TTheme) => ({
    paper: {
      ...theme.border.radius.large,
      boxShadow: theme.elevation.overlay,
      [`& .${pickersDayClasses.root}.Mui-selected`]: {
        color: theme.palette.content.static.light,
        backgroundColor: theme.palette.actionV2.primaryBrand.fill,
        '&:hover': {
          backgroundColor: theme.palette.actionV2.primaryBrand.fill
        }
      },
      [`& .${clockPointerClasses.root}`]: {
        backgroundColor: theme.palette.actionV2.primaryBrand.fill
      },
      [`& .${clockPointerClasses.thumb}`]: {
        backgroundColor: theme.palette.actionV2.primaryBrand.fill,
        borderColor: theme.palette.actionV2.primaryBrand.fill
      },
      [`& .${clockNumberClasses.selected}`]: {
        color: theme.palette.content.static.light
      },
      [`& .${clockClasses.pin}`]: {
        backgroundColor: theme.palette.actionV2.primaryBrand.fill
      }
    }
  }),
);

// ── Components ─────────────────────────────────────────────────────────────────

export function DatePicker(
  { 
    PaperProps, 
    PopperProps: { className: popperClassName, ...otherPopperProps } = {}, 
    ...otherProps 
  }: TDatePickerProps
) {
  const { classes, cx } = useStyles();

  return (<MuiDatePicker
      {...otherProps}
      PaperProps={{
        ...PaperProps,
        className: cx(classes.paper, PaperProps?.className)
      }}
      PopperProps={{
        className: cx(classes.paper, popperClassName),
        ...otherPopperProps,
      }}
    />
  );
}

DatePicker.displayName = 'DatePicker';

export function DateTimePicker(
  { 
    PaperProps,
    ...otherProps
  }: TDateTimePickerProps
) {
  const { classes, cx } = useStyles();

  return (<MuiDateTimePicker
      {...otherProps}
      PaperProps={{
        ...PaperProps,
        className: cx(classes.paper, PaperProps?.className)
      }}
    />
  );
}

DateTimePicker.displayName = 'DateTimePicker';

export function TimePicker(
  { 
    PaperProps,
    ...otherProps
  }: TTimePickerProps
) {
  const { classes, cx } = useStyles();

  return (<MuiTimePicker
      {...otherProps}
      PaperProps={{
        ...PaperProps,
        className: cx(classes.paper, PaperProps?.className)
      }}
    />
  );
}

TimePicker.displayName = 'TimePicker';