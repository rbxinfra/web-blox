import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Typography, KeyboardInput } from '@rbx/ui';
import { createStringControl, configureArgs } from './utils/controlUtils';

const notes = `This style makes it easy to identify when the author is referring to a keyboard key in the middle of a sentence.

Built over \`@rbx/ui\` V1 [Typography](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/typography/Typography.tsx).

### ℹ️ Props
| Props          | Type            | Required | Description                                                                                                    |
|----------------|-----------------|----------|----------------------------------------------------------------------------------------------------------------|
| children       | React.ReactNode | -        | Text for the keyboard input component.                                                                         |
| classes        | number          | -        | Classes property for deeper customization. This is equivalent to the classes property on Typography component. |
`;

export default {
  title: 'Components/KeyboardInput',
  component: KeyboardInput,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gKvhpvi2PGHT76Q6uZTkG9/Design-Staging-v2?node-id=1%3A13160'
    }
  }
} as Meta;

export const Base: StoryFn<{ keyboardInputText: string }> = ({ keyboardInputText }) => {
  return (
    <Typography variant='body1'>
      The keyboard input text provided is &nbsp;
      <KeyboardInput>{keyboardInputText}</KeyboardInput>
    </Typography>
  );
};
configureArgs(Base, {
  keyboardInputText: createStringControl(
    'Defines keyboard input text',
    'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
  )
});

export const ExampleKeyboardInput: StoryFn = () => {
  return (
    <Typography variant='body1'>
      Press <KeyboardInput>CTRL</KeyboardInput> + <KeyboardInput>C</KeyboardInput>
      &nbsp;to copy
    </Typography>
  );
};
