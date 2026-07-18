import React from 'react';
import { Link, TLinkProps } from '@rbx/ui';
import { StoryFn, Meta } from '@storybook/react';
import { createStringControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Link](https://v5.mui.com/api/link/).`;

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=347%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<{ linkText: string } & Pick<TLinkProps, 'color' | 'underline'>> = ({
  linkText,
  underline,
  color
}) => {
  return (
    // NOTE (jcountryman, 07/22/22): We do not provide the example with a href so
    // clicking the example link does nothing

    <Link color={color} underline={underline}>
      {linkText}
    </Link>
  );
};
configureArgs(Base, {
  color: createEnumControl(
    'Defines the theme colors of the link. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primary',
    ['inherit', 'primary']
  ),
  underline: createEnumControl('Defines when the link should be underlined.', 'hover', [
    'hover',
    'always',
    'none'
  ]),
  linkText: createStringControl(
    'Defines link text',
    'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
  )
});
