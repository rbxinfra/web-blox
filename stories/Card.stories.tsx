import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {
  Button,
  Card,
  Grid,
  CardContent,
  CardActions,
  CardHeader,
  CardMedia,
  TCardProps,
  Typography,
  IconButton,
  MoreVertIcon,
  ExpandMoreIcon,
  PlayArrowIcon,
  SkipNextIcon,
  SkipPreviousIcon,
  makeStyles,
  CardActionArea
} from '@rbx/ui';
import { createEnumControl, createBooleanControl, configureArgs } from './utils/controlUtils';
import imgPlaceholder from '../static/img_placeholder.png';

const notes = `Built over MUI v5 [Card](https://mui.com/material-ui/api/card/),
[Card Action](https://mui.com/material-ui/api/card-actions/), [Card Content](https://mui.com/material-ui/api/card-content/),
[Card Header](https://mui.com/material-ui/api/card-header/) and [Card Media](https://mui.com/material-ui/api/card-media/).`;

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=240%3A9393'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TCardProps, 'variant' | 'square'>> = ({ variant, square }) => {
  const {
    classes: { header, body }
  } = makeStyles()({
    header: {
      marginBottom: 8
    },
    body: {
      marginTop: 12
    }
  })();

  return (
    <Card variant={variant} square={square}>
      <CardContent>
        <Typography classes={{ root: header }} variant='body2'>
          Word of the Day
        </Typography>
        <Typography component='p' variant='h4'>
          be • ne • volent
        </Typography>
        <Typography component='p' variant='body2'>
          adjective
        </Typography>
        <Typography component='p' classes={{ root: body }} variant='body2'>
          well meaning and kindly.
          <br />
          &#34;a benevolent smile&#34;
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='text' size='small'>
          Small
        </Button>
      </CardActions>
    </Card>
  );
};
configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'filled', [
    'filled',
    'outlined'
  ]),
  square: createBooleanControl('Defines if card corners should have sharp corners.', false)
});

export const ClickableCard: StoryFn = () => {
  return (
    <Card>
      <CardActionArea>
        <CardHeader title='Card Header' subheader='Subheader' />
        <CardMedia height='140' component='img' image={imgPlaceholder} />
        <CardContent>
          <Typography variant='body2' color='secondary'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const ComplexInteractionCard: StoryFn = () => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label='More' color='inherit'>
            <MoreVertIcon />
          </IconButton>
        }
        title='Card Header'
        subheader='Subheader'
      />
      <CardMedia height='140' component='img' image={imgPlaceholder} />
      <CardContent>
        <Typography variant='body2' color='secondary'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button size='small'>Small</Button>
            <Button size='small'>Small</Button>
          </Grid>
          <Grid item>
            <IconButton aria-label='Expand' color='inherit'>
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export const UIControlsCard: StoryFn = () => {
  const {
    classes: { actions }
  } = makeStyles()({
    actions: {
      paddingLeft: 8,
      paddingBottom: 8
    }
  })();
  return (
    <Card>
      <Grid container wrap='wrap-reverse' justifyContent='space-between'>
        <Grid container item xs={12} sm={6} direction='column'>
          <CardContent>
            <Typography component='p' variant='h4' color='secondary'>
              Live From Space
            </Typography>
            <Typography component='p' variant='body1' color='secondary'>
              September 14, 2016
            </Typography>
          </CardContent>
          <Grid classes={{ root: actions }}>
            <IconButton aria-label='Previous'>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label='Play'>
              <PlayArrowIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label='Next'>
              <SkipNextIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia height='100%' component='img' image={imgPlaceholder} />
        </Grid>
      </Grid>
    </Card>
  );
};
