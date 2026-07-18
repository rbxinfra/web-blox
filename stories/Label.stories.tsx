import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Label, TLabelProps, StarIcon } from '@rbx/ui';
import {
  createStringControl,
  createEnumControl,
  createBooleanControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Labels should be used to highlight information or status such as labelling new or beta features. Avoid using Icons if text and color alone can communicate meaning.

### ℹ️ Props
| Props     | Type                                                     | Required | Description                                                                   |
|-----------|----------------------------------------------------------|----------|-------------------------------------------------------------------------------|
| classes   | Object                                                   | -        | Classes property for deeper customization. This contains the 'root' property. |
| labelText | string                                                   | ✔️        | Text the label should render.                                                 |
| severity  | \`'default' | 'info' | 'success' | 'warning' | 'error'\` | -        | The color of the component. 'default' is the default color.                   |
| icon      | React.ReactElement                                       | -        | Icon to render on the left of the label if defined.                           |
| variant   | \`'contained' | 'text'\`                                 | -        | Defines the stylistic variant to use. Available choices are \`'contained'\` and \`'text'\` |
`;

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/QkHmoxTswFAXYOpdP9jyre/%5BWebBlox%5D-DarkMode-Library?type=design&node-id=559-116686&t=jsx8UXP8276TKc7K-4'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TLabelProps, 'labelText' | 'severity' | 'variant'> & { showIcon: boolean }
> = ({ labelText, severity, showIcon, variant }) => {
  // NOTE (jcountryman, 06/14/23): See
  // https://github.com/storybookjs/storybook/issues/20920
  // This is required for the component to correctly show it's display name
  
  // @ts-ignore
  StarIcon.displayName = 'StarIcon';

  return (
    <Label
      severity={severity}
      labelText={labelText}
      icon={showIcon ? <StarIcon /> : undefined}
      variant={variant}
    />
  );
};

configureArgs(Base, {
  labelText: createStringControl('Defines label text.', 'Label'),
  severity: createEnumControl('Defines the theme colors of the label.', 'default', [
    'default',
    'info',
    'warning',
    'error',
    'success'
  ]),
  showIcon: createBooleanControl('Defines if inline icons should be shown', false),
  variant: createEnumControl('Defines the variant of the label.', 'contained', [
    'contained',
    'text'
  ])
});
