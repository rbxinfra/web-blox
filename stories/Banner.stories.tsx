import React from 'react';
import { Banner } from '@rbx/ui';
import { StoryFn, Meta } from '@storybook/react';
import { createStringControl, configureArgs, createBooleanControl } from './utils/controlUtils';
import spotIllustration from '../static/spot_illustration.png';

const notes = `
A banner shows a single, highly recommended action. A banner should clearly explain the value of the action, and nudge the user to perform it. You can add a “Close” button to the top-right of this banner to make it dismissible.

\`Tip\`: Use banners to drive people to features believed to cause an “a-ha” moment.

Banners are appropriately interruptive, and should only be used to drive users towards important actions. Overusing banners can hurt the overall experience.

**Usage Guidelines**
- Only one banner should be shown at a time. Do not stack banners.
- Banners are used in the body of the page, not as an overlay. If you want to overlay a message, use the Dialog component.
- Banners are often used at the top of the page, but can be used in the middle or at the end depending on the use case.

**Anatomy**
- Title (Required) - Less than 2 lines of text recommended
- Description (Optional) - Less than 2 lines of text recommended
- Primary Button (Required)
- Secondary Button (Optional)
- Close Button (Optional)
- Image (Optional) - 4:3 ratio, (381x286) recommended. Use a higher pixel density image (HDPI) to ensure images are crisp

<br />

### ℹ️ Props
| Props           | Type                          | Required | Description                                                                                              |
|-----------------|-------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| primaryButton   | TButtonProps & {label:string} | true     | Left Button                                                                                              |
| secondaryButton | TButtonProps & {label:string} | false    | Right Button                                                                                             |
| title           | string                        | true     | Text of the banner title                                                                                 |
| description     | string                        | false    | Text of the banner description                                                                           |
| illustration    | {alt: string; src:string}     | false    | Image source and alt text if a illustration should be shown                                              |
| onClose         | ()=>void                      | false    | Click handler for when the close icon is clicked. This close icon is only shown if showClose has a value |
| classes         | {root: string}                | false    | Classnames to style the footer                                                                           |
`;

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/QkHmoxTswFAXYOpdP9jyre/WebBlox-%5BCreator%5D?type=design&node-id=8604-23043'
    }
  }
} as Meta;

export const Base: StoryFn<{
  title: string;
  description: string;
  showDescription: boolean;
  showSecondaryButton: boolean;
  showIllustration: boolean;
  showCloseIcon: boolean;
}> = ({
  title,
  description,
  showDescription,
  showSecondaryButton,
  showIllustration,
  showCloseIcon
}) => {
    return (
      <Banner
        title={title}
        description={showDescription ? description : undefined}
        primary={{ label: 'Primary' }}
        secondary={showSecondaryButton ? { label: 'Secondary' } : undefined}
        onClose={
          showCloseIcon
            ? () => {
              console.log('clicked');
            }
            : undefined
        }
        illustration={showIllustration ? { src: spotIllustration, alt: 'Example' } : undefined}
      />
    );
  };
configureArgs(Base, {
  title: createStringControl(
    'Defines banner title text',
    'Use banners to emphasize a highly recommended action.'
  ),
  description: createStringControl(
    'Defines banner description text',
    'Add a brief description explaining why someone should interact with this content and what to expect from it.'
  ),
  showDescription: createBooleanControl('Defines if the description should be shown.', true),
  showSecondaryButton: createBooleanControl(
    'Defines if the secondary button should be shown.',
    true
  ),
  showIllustration: createBooleanControl('Defines if the illustration should be shown.', true),
  showCloseIcon: createBooleanControl('Defines if the close icon should be shown.', true)
});
