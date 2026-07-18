import { StoryFn, Meta } from '@storybook/react';
import { Zoom, TZoomProps, makeStyles } from '@rbx/ui';
import { createBooleanControl, createNumberControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Zoom](https://v5.mui.com/api/zoom/).`;

export default {
  title: 'Components/Transition/Zoom',
  component: Zoom,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TZoomProps, 'in' | 'timeout'>> = ({ in: checked, timeout }) => {
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
    <Zoom in={checked} timeout={timeout}>
      <div className={square}>A</div>
    </Zoom>
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
