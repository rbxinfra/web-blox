import React from 'react';
import { Radio, TRadioProps, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@rbx/ui';
import { StoryFn } from '@storybook/react';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Radio Group](https://v5.mui.com/api/radio-group/) 
and [Radio](https://v5.mui.com/api/radio/).

### 🔄 Changelog
1. [Radio] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.`;

export default {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=246%3A11925'
    }
  }
};

export const Base: StoryFn<Pick<TRadioProps, 'color' | 'disabled' | 'size'>> = ({
  color,
  disabled,
  size
}) => {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <React.Fragment>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        color={color}
        disabled={disabled}
        size={size}
        value='a'
        aria-label='a'
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        color={color}
        disabled={disabled}
        size={size}
        value='b'
        aria-label='b'
      />
    </React.Fragment>
  );
};
configureArgs(Base, {
  disabled: createBooleanControl(
    'Defines if the radio button will be disabled. This prevents the radio button from being clicked.',
    false
  ),
  color: createEnumControl('Defines the theme colors of the radio button.', 'primary', [
    'primary',
    'secondary'
  ]),
  size: createEnumControl('Defines the size of the radio button.', 'medium', ['small', 'medium'])
});

export const RadioGroupConfig: StoryFn = () => {
  const [value, setValue] = React.useState('female');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value='female' control={<Radio aria-label='Female' />} label='Female' />
        <FormControlLabel value='male' control={<Radio aria-label='Male' />} label='Male' />
        <FormControlLabel value='other' control={<Radio aria-label='Other' />} label='Other' />
      </RadioGroup>
    </FormControl>
  );
};
