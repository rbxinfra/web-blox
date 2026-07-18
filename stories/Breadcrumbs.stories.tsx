import React from 'react';
import {
  Typography,
  Breadcrumbs,
  StarIcon,
  Link,
  makeStyles,
  TBreadcrumbsProps
} from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createNumberControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Breadcrumbs](https://v5.mui.com/api/breadcrumbs/). `;

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=170%3A8777'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TBreadcrumbsProps, 'maxItems' | 'separator'>> = ({
  maxItems,
  separator
}) => {
  const {
    classes: { linkDisabledStyle }
  } = makeStyles()(theme => ({
    linkDisabledStyle: {
      color: theme.palette.content.disabled
    }
  }))();

  return (
    <Breadcrumbs aria-label='breadcrumb' maxItems={maxItems} separator={separator}>
      <Typography color='secondary'>Breadcrumb</Typography>
      <Link href='#' className={linkDisabledStyle}>
        Breadcrumb
      </Link>
      <Typography color='primary'>Breadcrumb</Typography>
    </Breadcrumbs>
  );
};

configureArgs(Base, {
  maxItems: createNumberControl('Defines the maximum number of breadcrumbs to display.', 8),
  separator: createEnumControl('Defines the separator node', '/', ['>', '/', '-'])
});

export const BreadcrumbWithIcon: StoryFn = () => {
  const {
    classes: { iconStyle, typographyStyle }
  } = makeStyles()(() => ({
    iconStyle: {
      marginRight: 4,
      width: 20,
      height: 20
    },
    typographyStyle: {
      display: 'flex'
    }
  }))();

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Typography variant='body1' className={typographyStyle}>
        <StarIcon className={iconStyle} />
        Breadcrumb
      </Typography>
      <Typography color='secondary' className={typographyStyle}>
        <StarIcon className={iconStyle} />
        Breadcrumb
      </Typography>
      <Typography color='primary' className={typographyStyle}>
        <StarIcon className={iconStyle} />
        Breadcrumb
      </Typography>
    </Breadcrumbs>
  );
};
