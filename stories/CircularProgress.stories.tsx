import { TCircularProgressProps, CircularProgress } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createNumberControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Circular Progress](https://v5.mui.com/api/circular-progress/).`;

export default {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=348%3A948'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TCircularProgressProps, 'color' | 'value' | 'variant'>> = ({
  color,
  value,
  variant
}) => {
  return <CircularProgress variant={variant} color={color} value={value} />;
};

configureArgs(Base, {
  color: createEnumControl(
    'Defines the theme colors of the progress. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primary',
    ['inherit', 'primary', 'secondary']
  ),
  value: createNumberControl(
    'Defines the length of the progress section for the `determinate` variant. Acceptable values are between 0 and 100.',
    60,
    0,
    100,
    10
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'indeterminate', [
    'indeterminate',
    'determinate'
  ])
});
