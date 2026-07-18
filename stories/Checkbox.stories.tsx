import { Checkbox, FormControlLabel, TCheckboxProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = 'Built over MUI v5 [Checkbox](https://v5.mui.com/components/checkboxes).';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=243%3A9916'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TCheckboxProps, 'color' | 'size' | 'disabled' | 'indeterminate' | 'checked'>
> = ({ color, size, disabled, indeterminate, checked }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          color={color}
          indeterminate={indeterminate}
          disabled={disabled}
          size={size}
          checked={checked}
        />
      }
      label='Checkbox'
    />
  );
};

configureArgs(Base, {
  color: createEnumControl('Defines the color of the checkbox', 'primary', [
    'primary',
    'secondary'
  ]),
  size: createEnumControl('Defines the size of the checkbox', 'medium', ['medium', 'small']),
  disabled: createBooleanControl('Defines if the checkbox is disabled', false),
  indeterminate: createBooleanControl('Defines if the checkbox should be indeterminate', false),
  checked: createBooleanControl('Defines if the checkbox should be in checked state', false)
});
