import React from 'react';
import {
  Pagination,
  TPaginationProps,
  TDefaultPaginationProps,
  TReducedPaginationProps
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import {
  createBooleanControl,
  createEnumControl,
  createNumberControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Pagination](https://v5.mui.com/api/pagination/).`;

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=379%3A15491'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<
    TDefaultPaginationProps,
    | 'color'
    | 'disabled'
    | 'hideNextButton'
    | 'hidePrevButton'
    | 'shape'
    | 'showFirstButton'
    | 'showLastButton'
    | 'size'
    | 'variant'
  >
> = ({
  color,
  disabled,
  hideNextButton,
  hidePrevButton,
  shape,
  showFirstButton,
  showLastButton,
  size,
  variant
}) => {
  return (
    <Pagination
      count={10}
      color={color}
      disabled={disabled}
      hideNextButton={hideNextButton}
      hidePrevButton={hidePrevButton}
      shape={shape}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      size={size}
      variant={variant}
    />
  );
};
configureArgs(Base, {
  color: createEnumControl('Defines the theme colors of the button.', 'standard', [
    'primary',
    'secondary',
    'standard'
  ]),
  disabled: createBooleanControl('Defines if the pagination should be disabled.', false),
  hideNextButton: createBooleanControl('Defines if the next button should show.', false),
  hidePrevButton: createBooleanControl('Defines if the previous button should show.', false),
  shape: createEnumControl('Defines the shape of the pagination items.', 'circular', [
    'rounded',
    'circular'
  ]),
  showFirstButton: createBooleanControl('Defines if the show first button should show.', false),
  showLastButton: createBooleanControl('Defines if the show last button should show', false),
  size: createEnumControl('Defines the size of the pagination.', 'medium', [
    'large',
    'medium',
    'small'
  ]),
  variant: createEnumControl('Defines the stylistic variant to use.', 'text', ['outlined', 'text'])
});

export const ReducedPagination: StoryFn<
  Pick<TReducedPaginationProps, 'page' | 'shape' | 'size'> & {
    disableNextButton: boolean;
    disablePreviousButton: boolean;
  }
> = ({ page, shape, size, disableNextButton, disablePreviousButton }) => {
  return (
    <Pagination
      page={page}
      size={size}
      shape={shape}
      variant='reduced'
      nextProps={{ disabled: disableNextButton }}
      previousProps={{ disabled: disablePreviousButton }}
    />
  );
};
configureArgs(ReducedPagination, {
  page: createNumberControl('Defines the page values. It accepts numbers.', 1, 0, 100, 1),
  disableNextButton: createBooleanControl('Defines if the next button should be disabled.', false),
  disablePreviousButton: createBooleanControl(
    'Defines if the previous button should be disabled.',
    false
  ),
  shape: createEnumControl('Defines the shape of the pagination items.', 'rounded', [
    'rounded',
    'circular'
  ]),
  size: createEnumControl('Defines the size of the pagination.', 'medium', [
    'large',
    'medium',
    'small'
  ])
});

export const ControlledPagination: StoryFn<TPaginationProps> = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <React.Fragment>
      <Pagination count={10} page={page} onChange={handleChange} />
      <Pagination count={10} page={page} onChange={handleChange} />
    </React.Fragment>
  );
};
