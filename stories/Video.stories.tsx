import { Card, CardHeader, Video, makeStyles } from '@rbx/ui';
import { Meta, StoryFn } from '@storybook/react';
import { createBooleanControl, createStringControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [CardMedia](https://v5.mui.com/api/card-media/).`;
const videoSrc = 'https://images.rbxcdn.com/f75c6908eb48f73fca11fcdf5d9b2741.mp4';

export default {
  title: 'Components/Video',
  component: Video,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=6038%3A75481'
    }
  }
} as Meta;

const useStyles = makeStyles()(theme => ({
  card: {
    maxWidth: 800
  },
  videoText: {
    display: 'block',
    maxWidth: 800,
    margin: theme.spacing(2, 0)
  }
}));

export const Base: StoryFn = ({ src, showHeaderContent }) => {
  const {
    classes: { card }
  } = useStyles();

  return (
    <Card className={card} variant='outlined' square>
      <Video
        headerContent={
          showHeaderContent && <CardHeader title='Card Header' subheader='Subheader' />
        }
        controls
        src={src}
      />
    </Card>
  );
};

configureArgs(Base, {
  src: createStringControl('Defines the src of the video.', videoSrc),
  showHeaderContent: createBooleanControl(
    'Defines if the video header should show via `headerContent` prop. This can take in React children if additional customization is required.',
    false
  )
});
