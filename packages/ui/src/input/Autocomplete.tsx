import { forwardRef } from 'react';
import MuiAutocomplete, {
  autocompleteClasses,
  type AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material/Autocomplete';
import { filledInputClasses } from '@mui/material/FilledInput';

import { useStyles as useChipStyles, type TChipProps } from '../dataDisplay/Chip';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  autocompleteClasses,
  type AutocompleteClasses as TAutocompleteClasses,
  type AutocompleteClassKey as TAutocompleteClassKey
} from '@mui/material/Autocomplete';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TAutocompleteProps<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> extends Omit<MuiAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>, 'ChipProps'> {
  ChipProps?: TChipProps;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Autocomplete' })(
  (theme: TTheme) => ({
    root: {
      [`&.${autocompleteClasses.hasClearIcon} .${filledInputClasses.root}`]: {
        paddingTop: 28
      }
    },
    paper: {
      ...theme.border.radius.medium,
      overflow: 'hidden'
    },
    listbox: {
      [`& .${autocompleteClasses.option}`]: {
        '&[aria-selected="true"]': {
          backgroundColor: theme.palette.states.selected,
          [`&.${autocompleteClasses.focused}`]: {
            backgroundColor: theme.palette.states.selected,
          }
        }
      }
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function AutocompleteWithRef<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>(
  {
    ChipProps: {
      color = 'primary',
      size,
      ...otherChipProps
    } = {},
    classes,
    className,
    ...otherProps
  }: TAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedAutocompleteClasses } = useStyles(
    undefined,
    { props: { classes: combineOverrides(classes, className) } },
  );
  const { classes: mergedChipClasses } = useChipStyles(
    { color, large: size === 'large' },
    { props: { classes: combineOverrides(otherChipProps?.classes) } },
  );

  return (
    <MuiAutocomplete<Value, Multiple, DisableClearable, FreeSolo>
      {...otherProps}
      ref={ref}
      classes={mergedAutocompleteClasses}
      ChipProps={{
        ...otherChipProps,
        size: size !== 'large' ? size : undefined,
        classes: mergedChipClasses
      }}
    />
  );
}

AutocompleteWithRef.displayName = 'AutocompleteWithRef';

type TAutocompleteComponent = <
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>(
  props: TAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> & { ref?: React.Ref<HTMLDivElement> }
) => ReturnType<typeof AutocompleteWithRef>;

// Forward ref with and allow passing generic type parameters to the component
const Autocomplete = forwardRef(AutocompleteWithRef) as TAutocompleteComponent;

export default Autocomplete;