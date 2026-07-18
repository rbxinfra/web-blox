import { forwardRef } from 'react';
import MuiSwitch, {
  switchClasses,
  type SwitchProps as MuiSwitchProps,
} from '@mui/material/Switch';
import MuiCircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { getThumbSize, getProgressSize, getProgressThickness } from './sizes';

export {
  switchClasses,
  type SwitchClasses as TSwitchClasses,
  type SwitchClassKey as TSwitchClassKey
} from '@mui/material/Switch';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TSwitchSize = MuiSwitchProps['size'];

export interface TSwitchProps extends MuiSwitchProps {
  /** Shows a CircularProgress spinner inside the thumb */
  loading?: boolean;
}

interface TSwitchStyleParams {
  size?: TSwitchSize;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TSwitchStyleParams, string>({ name: 'Switch' })(
  (
    theme: TTheme,
    { size }: TSwitchStyleParams,
    classes,
  ) => {
    const thumbSize = getThumbSize(size);
    const progressSize = getProgressSize(size);

    return {
      root: {
        // Disabled + checked → 50% opacity (uses :has() for CSS-only approach)
        [`&:has(> .${switchClasses.colorPrimary}.${switchClasses.disabled}.${switchClasses.checked})`]: {
          opacity: 0.5,
        },
        [`&:has(> .${switchClasses.colorSecondary}.${switchClasses.disabled})`]: {
          opacity: 0.5,
        },
      } as CSSObject,

      switchBase: {
        color: theme.palette.actionV2.primary.fill,
        // Checked track
        [`&.${switchClasses.checked} + .${switchClasses.track}.${classes.track}`]: {
          opacity: 0.38,
        },
        // Disabled track
        [`&.${switchClasses.disabled} + .${switchClasses.track}.${classes.track}`]: {
          opacity: 0.38,
        },
      } as CSSObject,

      thumb: {
        position: 'relative',
        pointerEvents: 'none',
        width: thumbSize,
        height: thumbSize,
        borderRadius: '50%',
        boxShadow: theme.elevation.subtle,
      },

      track: { opacity: 0.38 },

      // Loading spinner inside thumb
      progress: {
        color: theme.palette.actionV2.primaryBrand.fill,
        position: 'absolute',
        top: (thumbSize - progressSize) / 2,
        left: (thumbSize - progressSize) / 2,
        zIndex: 1,
      },

      colorPrimary: {
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: theme.palette.components.switch.knobFill,
        },
        [`& .${switchClasses.track}`]: {
          backgroundColor: theme.palette.components.switch.slideFill,
        },
        // Checked
        [`&.${switchClasses.checked} .${switchClasses.thumb}`]: {
          background: theme.palette.actionV2.primaryBrand.fill,
        },
        [`&.${switchClasses.checked} .${switchClasses.track}`]: {
          background: theme.palette.actionV2.primaryBrand.fill,
          opacity: 0.38,
        },
        [`&.${switchClasses.checked} .${circularProgressClasses.root}`]: {
          color: theme.palette.actionV2.primary.fill,
        },
        // Disabled
        [`&.${switchClasses.disabled} .${switchClasses.thumb}`]: {
          background: theme.palette.components.switch.disabledKnob,
        },
        [`&.${switchClasses.disabled} .${switchClasses.track}`]: {
          background: theme.palette.components.switch.slideFill,
        },
        [`&.${switchClasses.disabled} .${circularProgressClasses.root}`]: {
          color: theme.palette.actionV2.primaryBrand.fill,
        },
        // Disabled + checked
        [`&.${switchClasses.disabled}.${switchClasses.checked} .${switchClasses.thumb}`]: {
          background: theme.palette.actionV2.primaryBrand.fill,
        },
        [`&.${switchClasses.disabled}.${switchClasses.checked} .${switchClasses.track}`]: {
          background: theme.palette.actionV2.primaryBrand.fill,
        },
      } as CSSObject,

      colorSecondary: {
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: theme.palette.components.switch.knobFill,
        },
        [`& .${switchClasses.track}`]: {
          backgroundColor: theme.palette.components.switch.slideFill,
        },
      } as CSSObject,
    };
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function SwitchWithRef(
  {
    classes,
    color = 'primary',
    loading,
    size,
    checkedIcon,
    icon,
    'aria-label': ariaLabel,
    inputProps,
    className,
    ...otherProps
  }: TSwitchProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    { size },
    { props: { classes: combineOverrides(classes, className) } },
  );

  const { thumb: thumbClass, progress: progressClass, ...otherSwitchClasses } = mergedClasses;

  const progressSize = getProgressSize(size);
  const thickness = getProgressThickness(size);

  // Thumb element — wraps a spinner when loading
  const thumbEl = (
    <div className={`${switchClasses.thumb} ${thumbClass}`}>
      {loading && (
        <MuiCircularProgress
          thickness={thickness}
          size={progressSize}
          classes={{ root: progressClass }}
        />
      )}
    </div>
  );

  return (
    <MuiSwitch
      {...otherProps}
      checkedIcon={checkedIcon ?? thumbEl}
      classes={otherSwitchClasses}
      color={color}
      icon={icon ?? thumbEl}
      ref={ref}
      size={size}
      inputProps={{ 'aria-label': ariaLabel, ...inputProps }}
    />
  );
}

SwitchWithRef.displayName = 'SwitchWithRef';

const Switch = forwardRef<HTMLButtonElement, TSwitchProps>(SwitchWithRef);

export default Switch;
