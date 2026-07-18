import { StoryFn, Meta } from '@storybook/react';
import { Fade, TFadeProps, makeStyles } from '@rbx/ui';
import { createBooleanControl, createNumberControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Fade](https://v5.mui.com/api/fade/).`;

export default {
  title: 'Components/Transition/Fade',
  component: Fade,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TFadeProps, 'in' | 'timeout'>> = ({ in: checked, timeout }) => {
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
    <Fade in={checked} timeout={timeout}>
      <div className={square}>A</div>
    </Fade>
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
