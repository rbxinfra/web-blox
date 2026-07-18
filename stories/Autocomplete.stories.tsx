import { TAutocompleteProps, Autocomplete, TextField, SearchIcon, InputAdornment } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Autocomplete](https://v5.mui.com/api/autocomplete/).`;

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=6037%3A84988'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TAutocompleteProps<undefined, undefined, undefined, undefined>, 'disabled' | 'multiple'> & {
    variant: 'outlined' | 'filled';
    enableAdornment: boolean;
  }
> = ({ variant, disabled, multiple, enableAdornment }) => {
  const staticOptions = [
    'option1',
    'option2',
    'option3',
    'option4',
    'option5',
    'option6',
    'option7',
    'option8',
    'option9',
    'option10'
  ];

  return (
    <Autocomplete<string>
      disabled={disabled}
      multiple={multiple}
      options={staticOptions}
      renderInput={params => (
        <TextField
          {...params}
          variant={variant}
          id='values'
          label='Values'
          InputProps={{
            ...params.InputProps,
            startAdornment: enableAdornment ? (
              <InputAdornment variant='standard' position='start'>
                <SearchIcon />
                {params.InputProps.startAdornment}
              </InputAdornment>
            ) : (
              params.InputProps.startAdornment
            )
          }}
        />
      )}
      getOptionLabel={option => option}
    />
  );
};

configureArgs(Base, {
  variant: createEnumControl('Defines the text field variant.', 'outlined', ['outlined', 'filled']),
  disabled: createBooleanControl('Defines if the input should be disabled.', false),
  multiple: createBooleanControl('Defines if multiple selection is enabled.', true),
  enableAdornment: createBooleanControl('Defines if a search icon should be shown.', false)
});
