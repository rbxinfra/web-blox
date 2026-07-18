import React from 'react';
import { TextField, InputAdornment, TTextFieldProps, VisibilityIcon, makeStyles } from '@rbx/ui';
import { StoryFn, Meta } from '@storybook/react';
import {
  createEnumControl,
  createBooleanControl,
  createStringControl,
  createNumberControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Text Field](https://v5.mui.com/api/text-field/) and 
[Input Adornment](https://v5.mui.com/api/input-adornment/). This component is a conslidation 
of \`@rbx/ui\` V1 [Filled Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/exp/FilledInput.tsx), 
[Outlined Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/exp/OutlinedInput.tsx) 
and [Input](https://github.rbx.com/Roblox/uiblox-web/blob/master/packages/ui/input/exp/Input.tsx).`;

export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=276%3A15'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<
    TTextFieldProps,
    'color' | 'disabled' | 'error' | 'helperText' | 'margin' | 'variant' | 'size'
  > & {
    width: number;
  }
> = ({ color, disabled, error, helperText, margin, variant, size, width }) => {
  const {
    classes: { textfield }
  } = makeStyles()({
    textfield: {
      width
    }
  })();

  return (
    <TextField
      classes={{ root: textfield }}
      color={color}
      disabled={disabled}
      error={error}
      helperText={helperText}
      id='textFieldId'
      label='Text Field'
      margin={margin}
      variant={variant}
      size={size}
    />
  );
};
configureArgs(Base, {
  color: createEnumControl('Defines the theme colors of the text field.', 'primary', [
    'primary',
    'secondary'
  ]),
  disabled: createBooleanControl(
    'Defines if the text field will be disabled. This prevents the input from any interaction.',
    false
  ),
  error: createBooleanControl(
    'Defines if the text field should be displayed in an error state.',
    false
  ),
  helperText: createStringControl('Defines the text field helper text.', 'Text Input Helper Text'),
  margin: createEnumControl(
    'Defines the vertical spacing of the text field and the adjacent components.',
    'none',
    ['none', 'dense', 'normal']
  ),
  variant: createEnumControl('Defines the stylistic variant to use.', 'outlined', [
    'filled',
    'outlined',
    'standard'
  ]),
  width: createNumberControl('Defines the width of the text field.', 150, 0, 600, 10),
  size: createEnumControl('Defines the size to use.', 'medium', ['small', 'medium'])
});

export const ArdornmentTextField: StoryFn = () => {
  const {
    classes: { textfield }
  } = makeStyles()({
    textfield: {
      width: 200
    }
  })();

  return (
    <TextField
      id='textFieldId'
      label='Text Field Label Text'
      classes={{ root: textfield }}
      InputProps={{
        startAdornment: <InputAdornment position='start'>Text</InputAdornment>,
        endAdornment: (
          <InputAdornment position='end'>
            <VisibilityIcon />
          </InputAdornment>
        )
      }}
    />
  );
};
