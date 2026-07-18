import { Tooltip, TTooltipProps, Button } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import {
  createEnumControl,
  createBooleanControl,
  createStringControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Tooltip](https://v5.mui.com/api/tooltip/).`;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=352%3A15014'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TTooltipProps, 'placement' | 'arrow'> & { tooltipText: string }> = ({
  placement,
  arrow,
  tooltipText
}) => {
  return (
    <Tooltip arrow={arrow} title={tooltipText} placement={placement}>
      <Button>Hover For Tooltip</Button>
    </Tooltip>
  );
};

configureArgs(Base, {
  placement: createEnumControl(
    'Defines the tooltip placement with respect to the children content. If there is not space to render the tooltip, a compromise will be made by MUI.',
    'bottom',
    [
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top'
    ]
  ),
  arrow: createBooleanControl('Defines if the tooltip should have a tail arrow.', true),
  tooltipText: createStringControl(
    'Defines tooltip text. This can take in React children if additional customization is required.',
    'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.'
  )
});
