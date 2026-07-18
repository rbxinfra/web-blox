import { StoryFn, Meta } from '@storybook/react';
import { Slide, TSlideProps, makeStyles } from '@rbx/ui';
import {
  createEnumControl,
  createBooleanControl,
  createNumberControl,
  configureArgs
} from '../utils/controlUtils';

const notes = `Built over MUI v5 [Slide](https://v5.mui.com/api/slide/).`;

export default {
  title: 'Components/Transition/Slide',
  component: Slide,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TSlideProps, 'in' | 'direction' | 'timeout'>> = ({
  in: checked,
  direction,
  timeout
}) => {
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
    <Slide direction={direction} in={checked} timeout={timeout}>
      <div className={square}>A</div>
    </Slide>
  );
};

configureArgs(Base, {
  direction: createEnumControl(
    'Defines the direction to animate the child component from.',
    'down',
    ['down', 'left', 'right', 'up']
  ),
  in: createBooleanControl('Defines if the component should transition in.', false),
  timeout: createNumberControl(
    `Defines the duration for the transition, in milliseconds.`,
    500,
    500,
    5000,
    500
  )
});
