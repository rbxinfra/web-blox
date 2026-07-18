import { Meta, StoryFn } from '@storybook/react';
import { TIconButtonProps, IconButton, TIconProps, StarIcon } from '@rbx/ui';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Icon Button](https://v5.mui.com/api/icon-button/).`;

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=252%3A84'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TIconButtonProps, 'size' | 'color' | 'disabled'> & Pick<TIconProps, 'fontSize'>
> = ({ size, color, disabled, fontSize }) => {
  return (
    <IconButton aria-label='Star' size={size} color={color} disabled={disabled}>
      <StarIcon color='inherit' fontSize={fontSize} />
    </IconButton>
  );
};
configureArgs(Base, {
  fontSize: createEnumControl(
    'Defines the size of the icon. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'medium',
    ['inherit', 'large', 'medium', 'small']
  ),
  size: createEnumControl('Defines padding size of the icon button', 'medium', [
    'large',
    'medium',
    'small'
  ]),
  color: createEnumControl(
    'Defines the theme colors of the icon button. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primary',
    ['inherit', 'default', 'primary', 'secondary', 'error', 'onMediaLight', 'onMediaDark']
  ),
  disabled: createBooleanControl('If true, the button will be disabled', false)
});
