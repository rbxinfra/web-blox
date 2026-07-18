import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Switch, TSwitchProps } from '@rbx/ui';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Switch](https://v5.mui.com/api/switch/).

### 🔄 Changelog
1. [Switch] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.
1. [Switch] Added a \`loading\` prop that supports booleans as values. The default value is \`false\`.`;

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=307%3A196'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TSwitchProps, 'color' | 'checked' | 'loading' | 'size' | 'disabled'>
> = ({ color, checked = false, loading, size, disabled }) => {
  const [switchChecked, setSwitchChecked] = useState(false);
  useEffect(() => {
    setSwitchChecked(checked);
  }, [checked]);

  return (
    <Switch
      color={color}
      loading={loading}
      size={size}
      disabled={disabled}
      aria-label='switch'
      checked={switchChecked}
      onChange={(_, newChecked) => {
        setSwitchChecked(newChecked);
      }}
    />
  );
};
configureArgs(Base, {
  color: createEnumControl('Defines the theme colors of the switch.', 'primary', [
    'primary',
    'secondary'
  ]),
  checked: createBooleanControl('Defines if the switch should be checked.', false),
  disabled: createBooleanControl('Defines if the switch should be disabled.', false),
  loading: createBooleanControl('Defines if the switch should be loading.', false),
  size: createEnumControl('Defines size of the switch.', 'medium', ['medium', 'small'])
});
