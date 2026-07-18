import React, { ChangeEvent } from 'react';
import { InputAdornment, MenuItem, Select, makeStyles, TSelectProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import {
  createEnumControl,
  createBooleanControl,
  createStringControl,
  createNumberControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [TextField](https://v5.mui.com/api/text-field/), 
[Input Adornment](https://v5.mui.com/api/input-adornment/) and \`@rbx/ui\` V1 
[MenuItem](). This component is a conslidation 
of \`@rbx/ui\` V1 [Filled Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/FilledInput.tsx), 
[Outlined Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/OutlinedInput.tsx) 
and [Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/Input.tsx).`;

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=259%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<
    TSelectProps,
    'color' | 'disabled' | 'error' | 'helperText' | 'margin' | 'variant' | 'size'
  > & {
    width: number;
  }
> = ({ color, disabled, error, helperText, margin, variant, size, width }) => {
  const [defaultvalue, setDefaultValue] = React.useState('Value');
  const handleValueChange = (event: ChangeEvent<{ value: unknown }>): void => {
    setDefaultValue(event.target.value as string);
  };
  const {
    classes: { select }
  } = makeStyles()({
    select: {
      width
    }
  })();

  return (
    <Select
      classes={{ root: select }}
      color={color}
      disabled={disabled}
      error={error}
      helperText={helperText}
      label='Select Label Text'
      margin={margin}
      onChange={handleValueChange}
      value={defaultvalue}
      variant={variant}
      size={size}>
      <MenuItem value='Value'>Value</MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};
configureArgs(Base, {
  color: createEnumControl('Defines the theme colors of the select.', 'primary', [
    'primary',
    'secondary'
  ]),
  disabled: createBooleanControl(
    'Defines if the select will be disabled. This prevents the input from any interaction.',
    false
  ),
  error: createBooleanControl(
    'Defines if the select should be displayed in an error state.',
    false
  ),
  helperText: createStringControl('Defines the select helper text.', 'Select Helper Text'),
  margin: createEnumControl(
    'Defines the vertical spacing of the select and the adjacent components.',
    'none',
    ['none', 'dense', 'normal']
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'outlined', [
    'filled',
    'outlined'
  ]),
  width: createNumberControl('Defines the width of the select.', 150, 0, 600, 10),
  size: createEnumControl('Defines the size to use.', 'medium', ['small', 'medium'])
});

export const AdornmentSelect: StoryFn = () => {
  const [value, setValue] = React.useState('Value');
  const handleValueChange = (event: ChangeEvent<{ value: unknown }>): void => {
    setValue(event.target.value as string);
  };
  const {
    classes: { select }
  } = makeStyles()({
    select: {
      width: 200
    }
  })();

  return (
    <Select
      classes={{ root: select }}
      label='Select Label Text'
      value={value}
      onChange={handleValueChange}
      InputProps={{
        startAdornment: <InputAdornment position='start'>Text</InputAdornment>
      }}>
      <MenuItem value='Value'>Value</MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};

export const MultipleSelect: StoryFn = () => {
  const [value, setValue] = React.useState<Array<string>>([]);
  const handleValueChange = (event: ChangeEvent<{ value: unknown }>): void => {
    setValue(event.target.value as Array<string>);
  };
  const {
    classes: { select }
  } = makeStyles()({
    select: {
      width: 200
    }
  })();

  return (
    <Select
      classes={{ root: select }}
      label='Select Label Text'
      value={value}
      onChange={handleValueChange}
      SelectProps={{
        multiple: true
      }}>
      <MenuItem value='Ten'>Ten</MenuItem>
      <MenuItem value='Twenty'>Twenty</MenuItem>
      <MenuItem value='Thirty'>Thirty</MenuItem>
    </Select>
  );
};
