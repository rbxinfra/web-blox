import React from 'react';
import { Button, TButtonProps, ArrowForwardIcon, ArrowBackIcon } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Button](https://v5.mui.com/api/button/).

### 🔄 Changelog
1. [Button] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.`;

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=38%3A3937'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TButtonProps, 'size' | 'variant' | 'fullWidth' | 'color' | 'disabled' | 'loading'> & {
    showStartIcon: boolean;
    showEndIcon: boolean;
  }
> = ({ size, variant, fullWidth, color, disabled, showStartIcon, showEndIcon, loading }) => {
  return (
    <Button
      fullWidth={fullWidth}
      size={size}
      color={color}
      variant={variant}
      disabled={disabled}
      loading={loading}
      startIcon={showStartIcon && <ArrowBackIcon />}
      endIcon={showEndIcon && <ArrowForwardIcon />}>
      Button Text
    </Button>
  );
};
configureArgs(Base, {
  size: createEnumControl('Defines the size of the button.', 'medium', [
    'large',
    'medium',
    'small'
  ]),
  color: createEnumControl(
    'Defines the theme colors of the button. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primaryBrand',
    ['inherit', 'primaryBrand', 'primary', 'secondary', 'destructive']
  ),
  fullWidth: createBooleanControl(
    'Defines if all the horizontal spacing should be used by the button.',
    false
  ),
  variant: createEnumControl(
    'Defines the stylistic variant to use. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'text',
    ['contained', 'outlined', 'text']
  ),
  showStartIcon: createBooleanControl(
    'Defines if the button should show an icon via `startIcon` prop.',
    false
  ),
  showEndIcon: createBooleanControl(
    'Defines if the button should show an icon via `endIcon` prop.',
    false
  ),
  disabled: createBooleanControl(
    'Defines if the button will be disabled. This prevents the button from being clicked.',
    false
  ),
  loading: createBooleanControl('Defines if the button will be in loading state', false)
});
