import React from 'react';
import {
  makeStyles,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  Grid,
  TAccordionProps
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import {
  createBooleanControl,
  createStringControl,
  configureArgs,
  createEnumControl
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Accordion](https://mui.com/material-ui/api/accordion/),
[Accordion Summary](https://mui.com/material-ui/api/accordion-summary/) and
[Accordion Details](https://mui.com/material-ui/api/accordion-details/).`;

const accordionContent =
  'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3129%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TAccordionProps, 'variant' | 'square'> & {
    headerText: string;
    subHeaderText: string;
    detailsText: string;
    disabled: boolean;
  }
> = ({ variant, square, headerText, subHeaderText, detailsText, disabled }) => {
  const {
    classes: { header, subHeader }
  } = makeStyles()({
    header: {
      flexBasis: '33.33%',
      flexShrink: 0
    },
    subHeader: {
      flexShrink: 0
    }
  })();
  return (
    <Accordion variant={variant} square={square} disabled={disabled}>
      <AccordionSummary>
        <Typography classes={{ root: header }} variant='h6'>
          {headerText}
        </Typography>
        <Typography classes={{ root: subHeader }} variant='body1' color='secondary'>
          {subHeaderText}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{detailsText}</AccordionDetails>
    </Accordion>
  );
};

configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'filled', [
    'filled',
    'outlined'
  ]),
  square: createBooleanControl('Defines if card corners should have sharp corners.', false),
  headerText: createStringControl(
    'Defines accordion header text. This can take in React children if additional customization is required.',
    'Accordion Header'
  ),
  subHeaderText: createStringControl(
    'Defines accordion subheader text. This can take in React children if additional customization is required.',
    'Accordion Subheader'
  ),
  detailsText: createStringControl(
    'Defines accordion details text. This can take in React children if additional customization is required.',
    accordionContent
  ),
  disabled: createBooleanControl('Defines if the accordion should be disabled.', false)
});

export const SeparatedAccordion: StoryFn = () => {
  const {
    classes: { root }
  } = makeStyles()(() => ({
    root: {
      marginTop: 12
    }
  }))();
  return (
    <React.Fragment>
      <Grid>
        <Accordion>
          <AccordionSummary>Separated Accordion #1</AccordionSummary>
          <AccordionDetails>{accordionContent}</AccordionDetails>
        </Accordion>
      </Grid>
      <Grid classes={{ root }}>
        <Accordion>
          <AccordionSummary>Separated Accordion #2</AccordionSummary>
          <AccordionDetails>{accordionContent}</AccordionDetails>
        </Accordion>
      </Grid>
    </React.Fragment>
  );
};
