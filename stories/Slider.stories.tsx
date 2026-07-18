import React from 'react';
import { Slider, TSliderProps, makeStyles } from '@rbx/ui';
import { StoryFn } from '@storybook/react';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Slider](https://v5.mui.com/api/slider/).`;

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=346%3A14652'
    }
  }
};

export const Base: StoryFn<
  Pick<TSliderProps, 'disabled' | 'track' | 'color' | 'orientation' | 'valueLabelDisplay'>
> = ({ disabled, track, color, orientation, valueLabelDisplay }) => {
  const {
    classes: { slider }
  } = makeStyles()({
    slider: {
      width: orientation === 'horizontal' ? 300 : 50,
      height: orientation === 'horizontal' ? 50 : 300
    }
  })();

  return (
    <div className={slider}>
      <Slider
        aria-label='Base Slider'
        defaultValue={30}
        color={color}
        track={track}
        orientation={orientation}
        disabled={disabled}
        valueLabelDisplay={valueLabelDisplay}
      />
    </div>
  );
};

configureArgs(Base, {
  disabled: createBooleanControl(
    'Defines if the slider will be disabled. This prevents the slider from being clicked.',
    false
  ),
  track: createEnumControl(
    'Defines the slider range that is available for a user to select from',
    'normal',
    ['normal', 'inverted', false]
  ),
  color: createEnumControl('Defines the theme colors of the slider. ', 'primary', [
    'primary',
    'secondary'
  ]),
  orientation: createEnumControl('Defines the slider orientation.', 'horizontal', [
    'vertical',
    'horizontal'
  ]),
  valueLabelDisplay: createEnumControl('Defines when the label is displayed', 'off', [
    'on',
    'auto',
    'off'
  ])
});

export const CustomMarksSlider: StoryFn = () => {
  const {
    classes: { root }
  } = makeStyles()({
    root: {
      width: 300
    }
  })();
  const marks = [
    {
      value: 0,
      label: '0°C'
    },
    {
      value: 20,
      label: '20°C'
    },
    {
      value: 37,
      label: '37°C'
    },
    {
      value: 100,
      label: '100°C'
    }
  ];

  return (
    <div className={root}>
      <Slider
        aria-label='Custom Marks Slider'
        defaultValue={30}
        marks={marks}
        valueLabelDisplay='auto'
      />
    </div>
  );
};
