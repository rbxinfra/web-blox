import React from 'react';
import {
  Button,
  Grid,
  MobileStepper,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  VisibilityIcon,
  Stepper,
  Typography,
  makeStyles,
  TStepperProps,
  TStepLabelProps
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Stepper](https://mui.com/material-ui/api/stepper/),
[Mobile Stepper](https://mui.com/material-ui/api/mobile-stepper/), [Step Connector](https://mui.com/material-ui/api/step-connector/),
[Step](https://mui.com/material-ui/api/step/), [Step Label](https://mui.com/material-ui/api/step-label/), and [Step Icon](https://mui.com/material-ui/api/step-icon/)`;

export default {
  title: 'Components/Stepper',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3616%3A14693'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TStepperProps, 'orientation' | 'alternativeLabel'> &
    Pick<TStepLabelProps, 'error' | 'optional'> & {
      showOptionalLabel: boolean;
      showCustomIcon: boolean;
    }
> = ({ orientation, alternativeLabel, error, showOptionalLabel, showCustomIcon }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Step Label Text 1', 'Step Label Text 2', 'Step Label Text 3'];
  const stepsContent = ['Step Content Text 1', 'Step Content Text 2', 'Step Content Text 3'];
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const {
    classes: { buttons }
  } = makeStyles()({
    buttons: {
      paddingTop: 10
    }
  })();

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={alternativeLabel}
        orientation={orientation}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={showCustomIcon ? VisibilityIcon : StepIcon}
              error={error}
              optional={showOptionalLabel && 'Step Label Optional Text'}>
              {label}
            </StepLabel>
            {orientation === 'vertical' && (
              <StepContent>
                <Typography variant='body1'>{stepsContent[index]}</Typography>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Grid classes={{ root: buttons }}>
          <Typography variant='body1'>All steps completed</Typography>
          <Button classes={{ root: buttons }} onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      ) : (
        <Grid classes={{ root: buttons }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant='contained' color='primary' onClick={handleNext}>
            Next
          </Button>
        </Grid>
      )}
    </React.Fragment>
  );
};

configureArgs(Base, {
  orientation: createEnumControl('Defines the stepper orientation.', 'horizontal', [
    'horizontal',
    'vertical'
  ]),
  alternativeLabel: createBooleanControl(
    'Defines if the stepper label should be positioned under the stepper icon. This only works with the `horizontal` orientation.',
    false
  ),
  error: createBooleanControl(
    'Defines if the stepper label should be shown in error state.',
    false
  ),
  showOptionalLabel: createBooleanControl(
    'Defines if the stepper label should show an optional text via `optional` prop.',
    false
  ),
  showCustomIcon: createBooleanControl(
    'Defines if the stepper label should show a custom icon via `StepIconComponent` prop.',
    false
  )
});

export const MobileStepperConfig: StoryFn = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      steps={6}
      position='static'
      activeStep={activeStep}
      nextButton={
        <Button
          variant='text'
          color='primary'
          size='small'
          onClick={handleNext}
          disabled={activeStep === 5}>
          Next
        </Button>
      }
      backButton={
        <Button
          variant='text'
          color='primary'
          size='small'
          onClick={handleBack}
          disabled={activeStep === 0}>
          Back
        </Button>
      }
    />
  );
};
