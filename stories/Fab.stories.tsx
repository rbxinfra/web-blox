import { Meta, StoryFn } from '@storybook/react';
import { Fab, AddIcon, Typography, TFabProps } from '@rbx/ui';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Fab](https://v5.mui.com/components/floating-action-button).`;

export default {
  title: 'Components/Fab',
  component: Fab,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=253%3A1'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TFabProps, 'size' | 'color' | 'variant' | 'disabled'>> = ({
  size,
  color,
  variant,
  disabled
}) => {
  return (
    <Fab aria-label='Add' variant={variant} color={color} size={size} disabled={disabled}>
      <AddIcon fontSize='small' />
      {variant === 'extended' && <Typography variant='buttonLarge'>Extended</Typography>}
    </Fab>
  );
};

configureArgs(Base, {
  size: createEnumControl('Defines the size of the Fab', 'large', ['small', 'medium', 'large']),
  color: createEnumControl('Defines the color of the Fab', 'primary', [
    'primary',
    'secondary',
    'inherit'
  ]),
  variant: createEnumControl('Defines the variant of the Fab', 'circular', [
    'circular',
    'extended'
  ]),
  disabled: createBooleanControl('Defines if the Fab is disabled', false)
});
