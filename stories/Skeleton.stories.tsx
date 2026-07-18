import { Meta, StoryFn } from '@storybook/react';
import {
  Skeleton,
  Card,
  CardHeader,
  TCardHeaderProps,
  makeStyles,
  TSkeletonProps
} from '@rbx/ui';
import {
  createEnumControl,
  createNumberControl,
  createBooleanControl,
  configureArgs
} from './utils/controlUtils';

const notes = `Built over MUI v5 [Skeleton](https://v5.mui.com/api/skeleton/).

### 🔄 Changelog
1. [Skeleton] Changed the \`animate\` prop to allow boolean values. The default value is \`false\`.`;

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=379%3A15238'
    }
  }
} as Meta;

export const Base: StoryFn<Pick<TSkeletonProps, 'animate' | 'height' | 'variant' | 'width'>> = ({
  animate,
  height,
  variant,
  width
}) => {
  return <Skeleton animate={animate} variant={variant} width={width} height={height} />;
};

configureArgs(Base, {
  animate: createBooleanControl('Defines if the skeleton animation should be shown.', false),
  height: createNumberControl('Defines the height of the skeleton.', 40, 10, 600, 10),
  variant: createEnumControl('Defines the stylistic variant to use.', 'text', [
    'text',
    'rectangular',
    'circular',
    'square'
  ]),
  width: createNumberControl('Defines the width of the skeleton.', 40, 10, 600, 10)
});

export const CardSkeleton: StoryFn = () => {
  const {
    classes: { card, title }
  } = makeStyles()({
    card: {
      maxWidth: 500
    },
    title: {
      marginBottom: 4
    }
  })();
  return (
    <Card square className={card}>
      <CardHeader
        avatar={<Skeleton animate variant='circular' width={40} height={40} />}
        title={
          (
            <Skeleton className={title} animate variant='text' height={12} width='80%' />
          ) as TCardHeaderProps['title']
        }
        subheader={<Skeleton animate variant='text' height={12} width='60%' />}
      />
      <Skeleton animate variant='square' height={150} />
    </Card>
  );
};
