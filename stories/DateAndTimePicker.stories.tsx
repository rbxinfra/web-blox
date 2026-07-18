import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  TDatePickerProps,
  TTimePickerProps,
  TextField,
  PickersUtilsProvider,
  pickerlocales
} from '@rbx/ui';
import {
  createBooleanControl,
  createEnumControl,
  createMultiEnumControl,
  createRangeControl,
  configureArgs
} from './utils/controlUtils';

const notes = `These date and time pickers are imported from the @material-ui/pickers package. Their styles are covered by the ExpTheme. 
Only a few props are demonstrated in this story, please check the official site for API references: https://material-ui-pickers.dev.
To use these components, a picker utils provider must be provided. Here this provider is wrapped and exported as a component.`;

export default {
  title: 'Components/Date and Time Picker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=356%3A17257'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<
    TDatePickerProps,
    'disabled' | 'disableFuture' | 'disablePast' | 'openTo' | 'orientation' | 'readOnly' | 'views'
  >
> = ({ disabled, disableFuture, disablePast, openTo, orientation, readOnly, views }) => {
  const [selectedDate, handleDateChange] = useState<Date>(
    new Date('2020-04-13T00:00:00.000+08:00')
  );
  return (
    <PickersUtilsProvider>
      <DatePicker
        label='Date Picker'
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Date Picker Input'
            id='date-picker-input'
          />
        )}
        value={selectedDate}
        onChange={date => date !== null && handleDateChange(date)}
        disabled={disabled}
        disableFuture={disableFuture}
        disablePast={disablePast}
        openTo={openTo}
        orientation={orientation}
        readOnly={readOnly}
        views={views}
      />
    </PickersUtilsProvider>
  );
};

configureArgs(Base, {
  disabled: createBooleanControl('Defines if picker and text field is disabled', false),
  disableFuture: createBooleanControl('Defines if future dates are disabled', false),
  disablePast: createBooleanControl('Defines if past dates are disabled', false),
  openTo: createEnumControl('Defines the first view to show in DatePicker', 'day', [
    'day',
    'year',
    'month'
  ]),
  orientation: createEnumControl(
    'Defines the force rendering in particular orientation',
    'portrait',
    ['portrait', 'landscape']
  ),
  readOnly: createBooleanControl('Defines if picker is read only', false),
  views: createMultiEnumControl(
    'Defines the array of views to show',
    ['year', 'month', 'day'],
    ['year', 'month', 'day']
  )
});

export const TimePickerConfig: StoryFn<Pick<TTimePickerProps, 'ampm' | 'minutesStep' | 'views'>> = ({
  ampm,
  minutesStep,
  views
}) => {
  const [selectedDate, handleDateChange] = useState(new Date('2020-04-13T00:00:00.000+08:00'));
  return (
    <PickersUtilsProvider>
      <TimePicker
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Time Picker Input'
            id='time-picker-input'
          />
        )}
        label='Time Picker'
        value={selectedDate}
        onChange={date => date !== null && handleDateChange(date)}
        ampm={ampm}
        minutesStep={minutesStep}
        views={views}
      />
    </PickersUtilsProvider>
  );
};

TimePickerConfig.parameters = {
  docs: {
    storyDescription: 'Time picker allows user to select time from a clock panel.'
  }
};

configureArgs(TimePickerConfig, {
  ampm: createBooleanControl('Defines the 12h/24h view for hour selection clock', true),
  minutesStep: createRangeControl('Defines the step over minutes', 1, 1, 10),
  views: createMultiEnumControl(
    'Defines the array of views to show',
    ['hours', 'minutes'],
    ['hours', 'minutes']
  )
});

export const DateTimePickerConfig: StoryFn = () => {
  const [selectedDate, handleDateChange] = useState(new Date('2020-04-13T00:00:00.000+08:00'));
  return (
    <PickersUtilsProvider>
      <PickersUtilsProvider>
        <DateTimePicker
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label='Time Picker Input'
              id='time-picker-input'
            />
          )}
          label='Date Time Picker'
          value={selectedDate}
          onChange={date => date !== null && handleDateChange(date)}
        />
      </PickersUtilsProvider>
    </PickersUtilsProvider>
  );
};

DateTimePickerConfig.parameters = {
  docs: {
    storyDescription:
      'Date picker allows user to pick date as well as time from date and clock panel.'
  }
};

export const LocalizedDateTimePickerConfig: StoryFn = () => {
  const [selectedDate, handleDateChange] = useState(new Date('2020-04-13T00:00:00.000+08:00'));
  return (
    <PickersUtilsProvider adapterLocale={pickerlocales.de}>
      <DateTimePicker
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Time Picker Input'
            id='time-picker-input'
          />
        )}
        label='Date Time Picker'
        value={selectedDate}
        onChange={date => date !== null && handleDateChange(date)}
      />
    </PickersUtilsProvider>
  );
};

LocalizedDateTimePickerConfig.parameters = {
  docs: {
    storyDescription:
      'Localization for the datetime picker is possible by passing in the specified locale into `adapterLocale`.'
  }
};
