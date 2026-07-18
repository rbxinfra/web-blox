import { forwardRef } from 'react';
import MuiCardMedia, {
  type CardMediaProps as MuiCardMediaProps
} from '@mui/material/CardMedia';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  cardMediaClasses,
  type CardMediaClasses as TCardMediaClasses,
  type CardMediaClassKey as TCardMediaClassKey
} from '@mui/material/CardMedia';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TVideoProps extends MuiCardMediaProps<'video'> {
  headerContent?: React.ReactNode;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Video' })(
  (theme: TTheme) => ({
    media: {
      width: '100%'
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      background: theme.palette.media.topOverlay,
      zIndex: 10
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function VideoWithRef(
  {
    children,
    classes,
    headerContent,
    className,
    ...otherProps
  }: TVideoProps,
  ref: React.ForwardedRef<HTMLVideoElement>
) {
  const { classes: { header, ...otherClasses } } = useStyles(
    undefined,
    {
      props: {
        classes: combineOverrides(classes, className)
      }
    }
  );

  return (
    <>
      {headerContent && <div className={header}>{headerContent}</div>}

      <MuiCardMedia
        {...otherProps}
        component="video"
        classes={otherClasses}
        ref={ref}
      >
        {children}
      </MuiCardMedia>
    </>
  )
}

VideoWithRef.displayName = 'VideoWithRef';

const Video = forwardRef<HTMLVideoElement, TVideoProps>(VideoWithRef);

export default Video;