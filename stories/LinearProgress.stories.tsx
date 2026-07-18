import { LinearProgress, TLinearProgressProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createNumberControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Linear Progress](https://v5.mui.com/api/linear-progress/).`;

export default {
  title: 'Components/LinearProgress',
  component: LinearProgress,
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

export const Base: StoryFn<
  Pick<TLinearProgressProps, 'color' | 'value' | 'valueBuffer' | 'variant'>
> = ({ color, value, valueBuffer, variant }) => {
  return (
    <LinearProgress
      title='linearProgress'
      color={color}
      value={value}
      valueBuffer={valueBuffer}
      variant={variant}
    />
  );
};

configureArgs(Base, {
  color: createEnumControl('Defines the theme colors of the progress.', 'primary', [
    'primary',
    'secondary'
  ]),
  value: createNumberControl(
    'Defines the length of the progress section for the `determinate` variant. Acceptable values are between 0 and 100.',
    60,
    0,
    100,
    10
  ),
  valueBuffer: createNumberControl(
    'Defines the length of the buffer section in the for the `buffer` variant. Acceptable values are between 0 and 100.',
    65,
    0,
    100,
    5
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'determinate', [
    'indeterminate',
    'determinate',
    'buffer',
    'query'
  ])
});
