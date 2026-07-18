import React from 'react';
import {
  StickyFooter,
  TStickyFooterProps,
  Grid,
  Typography,
  makeStyles
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { configureArgs, createBooleanControl } from './utils/controlUtils';

const notes = `

### ℹ️ Props
| Props      | Type                          | Required | Description                    |
|------------|-------------------------------|----------|--------------------------------|
| primary    | TButtonProps & {label:string} | false    | Right button                   |
| secondary  | TButtonProps & {label:string} | false    | Left Button                    |
| tertiary   | TButtonProps & {label:string} | false    | Leftmost Button                |
| classes    | {root: string}                | false    | Classnames to style the footer |
`;

export default {
  title: 'Components/Sticky Footer',
  component: StickyFooter,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/FPXfrUwidbpWLyCmAhlFrk/%5BQOL%5D-Fixed-Button-Footer'
    }
  }
} as Meta;

const useStickyFooterStyles = makeStyles()(() => ({
  footer: {
    left: 0
  }
}));

export const Base: StoryFn<
  Pick<TStickyFooterProps, 'classes'> & {
    showSecondaryButton: boolean;
    showTertiaryButton: boolean;
  }
> = ({ showSecondaryButton, showTertiaryButton }) => {
  const { classes: { footer } } = useStickyFooterStyles();
  return (
    <Grid container direction='column'>
      <Grid style={{ marginTop: 1200 }} />
      <StickyFooter
        primary={{ color: 'primary', label: 'Button Primary', variant: 'contained' }}
        {...(showSecondaryButton
          ? { secondary: { color: 'secondary', label: 'Button Secondary', variant: 'outlined' } }
          : {})}
        {...(showTertiaryButton
          ? { tertiary: { color: 'secondary', label: 'Button Tertiary' } }
          : {})}
        classes={{ root: footer }}
      />
      <Typography>Sticky Footer hides when user has scrolled to or past this</Typography>
    </Grid>
  );
};

configureArgs(Base, {
  showSecondaryButton: createBooleanControl('Defines if the secondary button should show.', false),
  showTertiaryButton: createBooleanControl('Defines if the tertiary button should show.', false)
});
