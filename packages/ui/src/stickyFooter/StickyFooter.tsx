import { forwardRef, useEffect, useRef, useState } from 'react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import { useTheme } from '../utils/utils';
import Button, { type TButtonProps } from '../button/Button';
import useMediaQuery from '../utils/useMediaQuery';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TStickyFooterClasses = ReturnType<typeof useStickyFooterStyles>['classes'] & Record<'root', string>;
export type TStickyFooterClassKey = keyof TStickyFooterClasses;

export interface TStickFooterButtonProps extends TButtonProps {
  label: string;
}

export interface TStickyFooterProps {
  primary?: TStickFooterButtonProps;
  secondary?: TStickFooterButtonProps;
  tertiary?: TStickFooterButtonProps;
  classes?: Partial<TStickyFooterClasses>;
}

interface TStickyFooterStyleParams {
  leftPosition?: number;
  rightPosition?: number;
  hasTertiary?: boolean;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStickyFooterStyles = makeStyles<TStickyFooterStyleParams>({ name: 'StickyFooter' })(
  (
    theme: TTheme,
    { leftPosition, rightPosition, hasTertiary }: TStickyFooterStyleParams,
  ) => ({
    footer: {
      gap: 12,
      backgroundColor: theme.palette.components.stickyFooter.fill,
      backdropFilter: 'blur(50px)',
      transition: 'opacity 0.2s, display 0.2s allow-discrete',
      width: `calc(100% - ${leftPosition}px - calc(100% - ${rightPosition}px))`,
      display: 'flex',
      justifyContent: hasTertiary ? 'space-between' : 'flex-start',
      right: rightPosition,
      bottom: 0,
      left: leftPosition,
      position: 'fixed',
      opacity: 1
    },
    containerPadding: {
      padding: 24,
      paddingLeft: 24,
      paddingRight: 24,
      [theme.breakpoints.down('Medium')]: {
        padding: 16,
        paddingLeft: 24,
        paddingRight: 24
      }
    },
    direction: {
      flexDirection: 'row',
      [theme.breakpoints.down('Medium')]: {
        flexDirection: 'column-reverse'
      }
    },
    hidden: {
      display: 'none',
      opacity: 0,
      pointerEvents: 'none'
    },
    responsiveButton: {
      [theme.breakpoints.down('Medium')]: {
        width: '100%'
      }
    },
    tertiaryButton: {
      marginRight: 'auto'
    },
    primaryDiv: {
      display: 'flex',
      gap: 12,
      flexDirection: 'row',
      [theme.breakpoints.down('Medium')]: {
        flexDirection: 'column-reverse'
      }
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function StickyFooterWithRef(
  {
    primary,
    secondary,
    tertiary,
    classes
  }: TStickyFooterProps,
  ref: React.Ref<HTMLDivElement>
) {
  const [visible, setVisible] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  const { classes: stickyFooterClasses, cx } = useStickyFooterStyles(
    { leftPosition, rightPosition, hasTertiary: !!tertiary }
  );

  const theme = useTheme();
  const isMediumBreakpoint = useMediaQuery(theme.breakpoints.down('Medium'));
  const stickyElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0)
          setVisible(false);
        else
          setVisible(true);
      });
      const currentElement = stickyElement.current;

      if (currentElement) observer.observe(currentElement);
      return () => { if (currentElement) observer.unobserve(currentElement); }
    })
  }, []);

  const updateFooter = () => {
    if (stickyElement.current) {
      const boundingClientRect = stickyElement.current.getBoundingClientRect();

      setLeftPosition(boundingClientRect.left);
      setRightPosition(boundingClientRect.right);
    }
  };

  useEffect(() => {
    updateFooter();

    const observer = new ResizeObserver(() => updateFooter());
    const currentElement = stickyElement.current;

    if (currentElement) observer.observe(currentElement);
    return () => { if (currentElement) observer.unobserve(currentElement); }
  }, []);

  return (
    <div ref={stickyElement}>
      <div
        className={cx(
          stickyFooterClasses.footer,
          { [stickyFooterClasses.hidden]: !visible },
          stickyFooterClasses.containerPadding,
          stickyFooterClasses.direction,
          classes?.root
        )}
        ref={ref}
      >
        {/* Tertiary button */}
        {tertiary && (
          <div>
            <Button
              {...tertiary}
              size={tertiary.size ?? isMediumBreakpoint ? 'medium' : 'large'}
              variant='text'
              classes={{
                root: cx(stickyFooterClasses.tertiaryButton, stickyFooterClasses.responsiveButton)
              }}
            >
              {tertiary.label}
            </Button>
          </div>
        )}

        <div className={stickyFooterClasses.primaryDiv}>
          {/* Secondary Button */}
          {secondary && (
            <Button
              {...secondary}
              size={secondary.size ?? 'large'}
              classes={{ root: stickyFooterClasses.responsiveButton }}
            >
              {secondary.label}
            </Button>
          )}

          {/* Primary button */}
          {primary && (
            <Button
              {...primary}
              size={primary.size ?? 'large'}
              classes={{ root: stickyFooterClasses.responsiveButton }}
            >
              {primary.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

StickyFooterWithRef.displayName = 'StickyFooterWithRef';

const StickyFooter = forwardRef<HTMLDivElement, TStickyFooterProps>(StickyFooterWithRef);

export default StickyFooter;