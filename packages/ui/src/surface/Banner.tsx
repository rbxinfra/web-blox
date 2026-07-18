import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import type { CSSObject } from 'tss-react';

import Card from './Card';
import Typography from '../typography/Typography';
import Button from '../button/Button';
import IconButton from '../iconButton/IconButton';
import type { TButtonColor, TButtonSize } from '../input/ButtonGroup';

import useMediaQuery from '../utils/useMediaQuery';
import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TBannerClasses = ReturnType<typeof useStyles>['classes'] & { root?: string };
export type TBannerClassKey = keyof TBannerClasses;

export interface TBannerAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: TButtonColor;
  variant?: 'contained' | 'outlined' | 'text';
  size?: TButtonSize;
  /** Any extra Button props */
  [key: string]: unknown;
}

export interface TBannerIllustration {
  src: string;
  alt: string;
}

export interface TBannerProps {
  title: string;
  description?: string;
  primary: TBannerAction;
  secondary?: TBannerAction;
  illustration?: TBannerIllustration;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: TBannerClasses;
  ref?: React.Ref<HTMLDivElement>;
}

interface TBannerStyleParams {
  showIllustration: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TBannerStyleParams>({ name: 'Banner' })(
  (theme: TTheme, { showIllustration }: TBannerStyleParams) => ({
    upsellCard: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },

    upsellContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: showIllustration ? '70%' : '100%',
      minWidth: 347,
      padding: 48,
      '&:last-child': { padding: 48 },

      [theme.breakpoints.down('Large')]: {
        padding: 32,
        '&:last-child': { padding: 32 },
      },
      [theme.breakpoints.down('Medium')]: {
        width: '100%',
        minWidth: 0,
        padding: 24,
        '&:last-child': { padding: 24 },
      },
    } as CSSObject,

    title: {
      ...theme.typography.h3,
      [theme.breakpoints.down('Large')]: { ...theme.typography.h4 },
    } as CSSObject,

    description: {
      ...theme.typography.body1,
      marginTop: 8,
      [theme.breakpoints.down('Large')]: { ...theme.typography.body2 },
    } as CSSObject,

    button: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      gap: 12,
      marginTop: 24,
      [theme.breakpoints.down('Medium')]: {
        width: '100%',
        flexDirection: 'column',
      },
    } as CSSObject,

    illustration: {
      position: 'relative',
      '& > img': { height: '100%', width: 'auto', position: 'absolute' },
    },

    closeIcon: {
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      background: theme.palette.components.mediaButtons.onMediaLight.fill,
      position: 'absolute',
      right: 24,
      top: 24,
    },
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function BannerWithRef(
  {
    title,
    description,
    primary,
    secondary,
    illustration,
    onClose,
    classes,
  }: TBannerProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: bannerClasses, cx } = useStyles(
    { showIllustration: illustration !== undefined },
  );

  // Track illustration aspect ratio to compute its displayed width
  const [aspectRatio, setAspectRatio] = useState(1);
  const [cardHeight, setCardHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setCardHeight(el.clientHeight);
    });
    observer.observe(el);
    setCardHeight(el.clientHeight);
    return () => observer.disconnect();
  }, []);

  const illustrationWidth = useMemo(
    () => aspectRatio * cardHeight,
    [aspectRatio, cardHeight],
  );

  // Hide illustration on small screens
  const isMediumOrSmaller = useMediaQuery(
    (theme: TTheme) => theme.breakpoints.down('Medium'),
    { noSsr: true },
  );

  // Destructure action props — label and onClick are ours, rest pass to Button
  const {
    label: primaryLabel,
    color: primaryColor = 'primary',
    variant: primaryVariant = 'contained',
    size: primarySize = 'large',
    ...primaryRest
  } = primary;

  return (
    <Card ref={ref} classes={{ root: cx(bannerClasses.upsellCard, classes?.root) }}>
      {/* Content column */}
      <CardContent ref={contentRef} classes={{ root: bannerClasses.upsellContent }}>
        <Typography classes={{ root: bannerClasses.title }} variant="h3">
          {title}
        </Typography>

        {description && (
          <Typography classes={{ root: bannerClasses.description }} variant="body1">
            {description}
          </Typography>
        )}

        <div className={bannerClasses.button}>
          <Button
            {...(primaryRest as object)}
            color={primaryColor}
            variant={primaryVariant}
            size={primarySize}
          >
            {primaryLabel}
          </Button>

          {secondary && (() => {
            const {
              label: secondaryLabel,
              color: secondaryColor = 'secondary',
              variant: secondaryVariant = 'outlined',
              size: secondarySize = 'large',
              ...secondaryRest
            } = secondary;
            return (
              <Button
                {...(secondaryRest as object)}
                color={secondaryColor}
                variant={secondaryVariant}
                size={secondarySize}
              >
                {secondaryLabel}
              </Button>
            );
          })()}
        </div>
      </CardContent>

      {/* Illustration — hidden on Medium and below */}
      {!isMediumOrSmaller && illustration && (
        <div
          className={bannerClasses.illustration}
          style={{ width: `min(30%, ${illustrationWidth}px)` }}
        >
          <img
            style={{ maxWidth: 'unset' }}
            src={illustration.src}
            alt={illustration.alt}
            onLoad={({ currentTarget }) => {
              setAspectRatio(
                currentTarget.naturalWidth / currentTarget.naturalHeight,
              );
            }}
          />
        </div>
      )}

      {/* Close button */}
      {onClose && (
        <IconButton
          classes={{ root: bannerClasses.closeIcon }}
          color="onMediaDark"
          size="small"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      )}
    </Card>
  );
}

BannerWithRef.displayName = 'BannerWithRef';

const Banner = forwardRef<HTMLDivElement, TBannerProps>(BannerWithRef);

export default Banner;