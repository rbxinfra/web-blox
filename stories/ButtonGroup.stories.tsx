import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonGroup, TButtonGroupProps } from '@rbx/ui';
import { createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Button Group](https://v5.mui.com/api/button-group/) and 
\`@rbx/ui\` V1 [Button](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/button/Button.tsx).

### 🔄 Changelog
1. [ButtonGroup] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.`;

export default {
  title: 'Components/ButtonGroup',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=149%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TButtonGroupProps, 'size' | 'variant' | 'color' | 'orientation'>> = ({
  size,
  variant,
  color,
  orientation
}) => {
  return (
    <div>
      <ButtonGroup size={size} variant={variant} color={color} orientation={orientation}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    </div>
  );
};
configureArgs(Base, {
  size: createEnumControl('Defines the size of the button group.', 'medium', [
    'large',
    'medium',
    'small'
  ]),
  color: createEnumControl(
    'Defines the theme colors of the button group. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primaryBrand',
    ['inherit', 'primaryBrand', 'primary', 'secondary', 'destructive']
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'outlined', [
    'contained',
    'outlined',
    'text'
  ]),
  orientation: createEnumControl('Defines the button group orientation.', 'horizontal', [
    'horizontal',
    'vertical'
  ])
});
