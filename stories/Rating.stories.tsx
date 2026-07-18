import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Rating, TRatingProps } from '@rbx/ui';
import {
  createEnumControl,
  createBooleanControl,
  createNumberControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Rating](https://v5.mui.com/api/rating/).`;

export default {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gKvhpvi2PGHT76Q6uZTkG9/Design-Staging-v2'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TRatingProps, 'disabled' | 'max' | 'precision' | 'readOnly' | 'size'>
> = ({ disabled, max, precision, readOnly, size }) => {
  return (
    <Rating
      disabled={disabled}
      max={max}
      precision={precision}
      name={readOnly ? undefined : 'Rating'}
      readOnly={readOnly}
      size={size}
    />
  );
};

configureArgs(Base, {
  disabled: createBooleanControl('Defines if the rating should be disabled.', false),
  max: createNumberControl('Defines the maximum possible rating.', 5, 3, 10),
  precision: createNumberControl('Defines the smallest rating increment.', 0.5, 0.5, 1, 0.5),
  readOnly: createBooleanControl('Defines if the rating cannot be changed.', false),
  size: createEnumControl('Defines the size of the rating.', 'medium', ['large', 'medium', 'small'])
});
