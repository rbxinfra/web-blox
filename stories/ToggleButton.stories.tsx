import React, { useState, MouseEvent } from 'react';
import { StarIcon, ToggleButton, ToggleButtonGroup, TToggleButtonGroupProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [ToggleButton](https://v5.mui.com/components/toggle-button).
Toggle buttons should always come as a group, which means there should not be a standalone toggle button.`;

export default {
  title: 'Components/Toggle Button',
  component: ToggleButton,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3638%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TToggleButtonGroupProps, 'size' | 'orientation' | 'exclusive'>> = ({
  size,
  orientation,
  exclusive
}) => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (event: MouseEvent<HTMLElement>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      orientation={orientation}
      exclusive={exclusive}
      size={size}
      onChange={handleChange}>
      <ToggleButton value='first'>
        <StarIcon fontSize={size} />
      </ToggleButton>
      <ToggleButton value='second'>
        <StarIcon fontSize={size} />
      </ToggleButton>
      <ToggleButton value='third'>
        <StarIcon fontSize={size} />
      </ToggleButton>
      <ToggleButton value='fourth'>
        <StarIcon fontSize={size} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
configureArgs(Base, {
  size: createEnumControl('Defines the size of the toggle button.', 'large', [
    'small',
    'medium',
    'large'
  ]),
  orientation: createEnumControl('Defines the orientation of the buttons.', 'horizontal', [
    'horizontal',
    'vertical'
  ]),
  exclusive: createBooleanControl('Defines if multiple select is enabled.', false)
});
