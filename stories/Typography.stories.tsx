import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Typography, TTypographyProps } from '@rbx/ui';
import {
  createBooleanControl,
  createStringControl,
  createEnumControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Typography](https://v5.mui.com/api/typography/);`;

export default {
  title: 'Components/Typography',
  component: Typography,
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

export const Base: StoryFn<
  Pick<TTypographyProps, 'variant' | 'color' | 'italics' | 'underline' | 'paragraph'> & {
    component: React.ElementType;
    typographyText: string;
  }
> = ({ variant, color, italics, underline, paragraph, component, typographyText }) => (
  <Typography
    variant={variant}
    color={color}
    italics={italics}
    underline={underline}
    paragraph={paragraph}
    component={component}>
    {typographyText}
  </Typography>
);

configureArgs(Base, {
  typographyText: createStringControl(
    'Defines typography text. This can take in React children if additional customization is required.',
    'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
  ),
  italics: createBooleanControl('Defines if text should be italicized.', false),
  underline: createBooleanControl('Defines if text should be underlined.', false),
  color: createEnumControl(
    'Defines the theme colors of the button.The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'inherit',
    ['inherit', 'primary', 'secondary', 'disabled', 'info', 'error', 'warning', 'success']
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'body1', [
    'captionHeader',
    'captionBody',
    'footer',
    'code',
    'codeDense',
    'chip',
    'largeLabel1',
    'largeLabel2',
    'legalDisclaimer',
    'smallLabel1',
    'smallLabel2',
    'buttonLarge',
    'buttonMedium',
    'buttonSmall',
    'tooltip',
    'alertTitle',
    'tableHead',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline'
  ]),
  paragraph: createBooleanControl('Defines if component should be a paragraph.', false),
  component: createEnumControl('Defines the comoponent to use.', 'span', [
    undefined,
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span'
  ])
});
