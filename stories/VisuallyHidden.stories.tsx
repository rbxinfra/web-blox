import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { VisuallyHidden } from '@rbx/ui';

const notes = `This component helps provide a common mechanism for hidings elements visually, but making them available for assistive technology (_via CSS_). 

Built with inspiration from  \`@mui/utils\`'s [visuallyHidden](https://mui.com/system/screen-readers/) helper.
`;

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    }
  }
} as Meta;

export const Base: StoryFn = () => {
  return (
    <VisuallyHidden>Text available for assistive technology but visually hidden</VisuallyHidden>
  );
};
