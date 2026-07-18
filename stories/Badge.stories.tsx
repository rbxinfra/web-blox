import { Badge, MailIcon, TBadgeProps } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import {
  createEnumControl,
  createNumberControl,
  createStringControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Badge](https://v5.mui.com/api/badge/).

### 🔄 Changelog
1. [Badge] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.`;

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gKvhpvi2PGHT76Q6uZTkG9/Design-Staging-v2?node-id=122%3A35533'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TBadgeProps, 'badgeContent' | 'color' | 'max' | 'variant' | 'overlap'>
> = ({ badgeContent, color, max, variant, overlap }) => {
  return (
    <Badge overlap={overlap} color={color} max={max} variant={variant} badgeContent={badgeContent}>
      <MailIcon />
    </Badge>
  );
};

configureArgs(Base, {
  badgeContent: createStringControl(
    'Defines the badge content. This can take in React children if additional customization is required.',
    '88'
  ),
  color: createEnumControl('Defines the theme colors of the badge.', 'primary', [
    'error',
    'primary',
    'secondary'
  ]),
  max: createNumberControl(
    'Defines the max badge content to display before truncation occurs. This property only works if string provided in `badgeContent` is a `number`.',
    99,
    1,
    9999,
    1
  ),
  overlap: createEnumControl(
    "Defines the relative placement of the badge with respect to the wrapped element's corner.",
    'rectangular',
    ['circular', 'rectangular']
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'standard', [
    'dot',
    'standard'
  ])
});
