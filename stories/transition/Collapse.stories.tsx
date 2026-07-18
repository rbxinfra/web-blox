import { StoryFn, Meta } from '@storybook/react';
import { Collapse, TCollapseProps, makeStyles } from '@rbx/ui';
import { createNumberControl, createBooleanControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Collapse](https://v5.mui.com/api/collapse/).`;

export default {
  title: 'Components/Transition/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TCollapseProps, 'in' | 'timeout' | 'collapsedSize'>> = ({
  in: checked,
  timeout,
  collapsedSize
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
    <Collapse in={checked} collapsedSize={collapsedSize} timeout={timeout}>
      <div className={square}>A</div>
    </Collapse>
  );
};

configureArgs(Base, {
  collapsedSize: createNumberControl(
    `Defines the height of the container when collapsed.`,
    40,
    10,
    100,
    10
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
