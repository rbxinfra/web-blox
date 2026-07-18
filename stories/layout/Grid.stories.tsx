import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Grid, TGridProps, makeStyles } from '@rbx/ui';
import { createEnumControl, configureArgs } from '../utils/controlUtils';

const notes = `Built over MUI v5 [Grid](https://v5.mui.com/api/grid/).`;

export default {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=6546%3A45426'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TGridProps, 'alignItems' | 'justifyContent' | 'direction'>> = ({
  alignItems,
  justifyContent,
  direction
}) => {
  const {
    classes: { foreground, background }
  } = makeStyles()(theme => ({
    foreground: {
      padding: 10,
      color: theme.palette.content.inverse,
      border: `1px solid ${theme.palette.content.standard}`,
      boxShadow: theme.shadows[5]
    },
    background: {
      height: 300,
      width: '100%',
      margin: 0,
      borderRadius: 5,
      backgroundColor: theme.palette.content.standard
    }
  }))();

  return (
    <React.Fragment>
      <Grid
        container
        classes={{ root: background }}
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        spacing={3}>
        <Grid item>
          <div className={foreground}>Grid Item 1</div>
        </Grid>
        <Grid item>
          <div className={foreground}>Grid Item 2</div>
        </Grid>
        <Grid item>
          <div className={foreground}>Grid Item 3</div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
configureArgs(Base, {
  alignItems: createEnumControl(
    'Defines the `align-items` style property of the grid flexbox.',
    'stretch',
    ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
  ),
  direction: createEnumControl(
    'Defines the `flex-direction` style property. It is applied for all screen sizes.',
    'row',
    ['row', 'row-reverse', 'column', 'column-reverse']
  ),
  justifyContent: createEnumControl('Defines the `justify-content` style property.', 'center', [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly'
  ])
});

export const BreakpointedGrid: StoryFn = () => {
  const {
    classes: { foreground }
  } = makeStyles()(theme => ({
    foreground: {
      padding: 5,
      borderRadius: 5,
      backgroundColor: theme.palette.content.standard,
      color: theme.palette.content.inverse
    }
  }))();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className={foreground}>xs=12</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={foreground}>xs=12 sm=6</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={foreground}>xs=12 sm=6</div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <div className={foreground}>xs=6 sm=3</div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <div className={foreground}>xs=6 sm=3</div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <div className={foreground}>xs=6 sm=3</div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <div className={foreground}>xs=6 sm=3</div>
      </Grid>
    </Grid>
  );
};
