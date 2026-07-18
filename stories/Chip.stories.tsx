import { Chip, TChipProps, Avatar, StarIcon } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Chip](https://v5.mui.com/api/chip/).

### 🔄 Changelog
1. [Chip] \`variant\` prop does not support \`default\` as value. The default value is \`filled\`.`;

export default {
  title: 'Components/Chip',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=191%3A8232'
    }
  }
} as Meta<TChipProps>;

export const Base: StoryFn<
  Pick<TChipProps, 'variant' | 'size' | 'color' | 'disabled'> & {
    clickable: boolean;
    showDelete: boolean;
    showAvatar: boolean;
    showIcon: boolean;
  }
> = ({ size, disabled, variant, color, clickable, showDelete, showAvatar, showIcon }) => {
  return (
    <Chip
      label='Chip Component'
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      onClick={
        clickable
          ? () => {
            console.log('clicked');
          }
          : undefined
      }
      onDelete={
        showDelete
          ? () => {
            console.log();
          }
          : undefined
      }
      icon={showIcon ? <StarIcon /> : undefined}
      avatar={showAvatar ? <Avatar alt=''>F</Avatar> : undefined}
    />
  );
};
configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'filled', [
    'filled',
    'outlined'
  ]),
  size: createEnumControl('Defines the size of the chip.', 'medium', ['small', 'medium', 'large']),
  color: createEnumControl('Defines the theme colors of the button.', 'primaryBrand', [
    'primaryBrand',
    'primary',
    'secondary',
    'error',
    'success',
    'warning'
  ]),
  clickable: createBooleanControl('Defines if the chip should be clickable', false),
  disabled: createBooleanControl('Defined if the chip is disabled', false),
  showDelete: createBooleanControl(
    'Defines if the delete button should show. This will appear when the `onDelete` prop is defined.',
    false
  ),
  showIcon: createBooleanControl(
    'Defines if the chip should show an icon via `icon`. This cannot be used with the `avatar` prop.',
    false
  ),
  showAvatar: createBooleanControl(
    'Defines if the chip should show an avatar via `avatar` prop. This cannot be used with the `icon` prop.',
    false
  )
});
