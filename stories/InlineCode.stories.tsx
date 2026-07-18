import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Typography, InlineCode, TInlineCodeProps } from '@rbx/ui';
import { createStringControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `This style makes it easy to identify source code in the middle of a sentence.

Built over \`@rbx/ui\` V1 [Typography](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/typography/Typography.tsx).

### ℹ️ Props
| Props          | Type            | Required | Description                                                                                                    |
|----------------|-----------------|----------|----------------------------------------------------------------------------------------------------------------|
| children       | React.ReactNode | -        | Text for the keyboard input component.                                                                         |
| classes        | number          | -        | Classes property for deeper customization. This is equivalent to the classes property on Typography component. |
`;

export default {
  title: 'Components/InlineCode',
  component: InlineCode,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=7817%3A53106'
    }
  }
} as Meta;

export const Base: StoryFn<{ inlineCodeText: string } & Pick<TInlineCodeProps, 'variant'>> = ({
  inlineCodeText,
  variant
}) => {
  return (
    <Typography variant='body1'>
      The inline code text provided is &nbsp;
      <InlineCode variant={variant}>{inlineCodeText}</InlineCode>
    </Typography>
  );
};
configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'regular', [
    'regular',
    'dense'
  ]),
  inlineCodeText: createStringControl(
    'Defines inline code text',
    'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
  )
});

export const ExampleInlineCode: StoryFn = () => {
  return (
    <Typography variant='body1'>
      The action string is provided &nbsp;
      <InlineCode>(ContextActionService/BindAction)|BindAction</InlineCode> and{' '}
      <InlineCode>ContextActionService/UnbindAction|UnbindAction</InlineCode>
    </Typography>
  );
};
