import { StoryFn, Meta } from '@storybook/react';
import { Grow, TGrowProps, makeStyles } from '@rbx/ui';
import { createBooleanControl, createNumberControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Grow](https://v5.mui.com/api/grow/).`;

export default {
  title: 'Components/Transition/Grow',
  component: Grow,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TGrowProps, 'in' | 'timeout'>> = ({ in: checked, timeout }) => {
  const {
    classes: { square }
  } = makeStyles()(() => ({
    square: {
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
      background: 'white',
      fontSize: 80
    }
  }))();

  return (
    <Grow in={checked} timeout={timeout}>
      <div className={square}>A</div>
    </Grow>
  );
};

configureArgs(Base, {
  in: createBooleanControl('Defines if the component should transition in.', false),
  timeout: createNumberControl(
    `Defines the duration for the transition, in milliseconds.`,
    500,
    500,
    5000,
    500
  )
});
