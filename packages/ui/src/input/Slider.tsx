import { forwardRef } from 'react';
import MuiSlider, {
  sliderClasses,
  type SliderProps as MuiSliderProps,
} from '@mui/material/Slider';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  sliderClasses,
  type SliderProps as TSliderProps,
  type SliderClasses as TSliderClasses,
  type SliderClassKey as TSliderClassKey
} from '@mui/material/Slider';

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'Slider' })(
  (theme: TTheme) => ({
    thumb: {
      boxShadow: theme.elevation.subtle
    },
    valueLabel: {
      ...theme.typography.smallLabel1,
      color: theme.palette.content.inverse,
      backgroundColor: theme.palette.actionV2.primary.fill
    },
    colorPrimary: {
      [`& .${sliderClasses.rail}`]: {
        color: theme.palette.content.disabled
      },
      [`&.${sliderClasses.trackInverted}`]: {
        [`& .${sliderClasses.track}`]: {
          backgroundColor: theme.palette.content.disabled
        },
        [`& .${sliderClasses.rail}`]: {
          color: theme.palette.actionV2.primaryBrand.fill
        }
      }
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function SliderWithRef(
  {
    classes,
    className,
    ...otherProps
  }: MuiSliderProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { classes: mergedClasses } = useStyles(
    undefined,
    {
      props: {
        classes: combineOverrides(classes, className)
      }
    }
  );

  return (
    <MuiSlider
      {...otherProps}
      classes={mergedClasses}
      ref={ref}
    />
  );
}

SliderWithRef.displayName = 'SliderWithRef';

const Slider = forwardRef<HTMLButtonElement, MuiSliderProps>(SliderWithRef);

export default Slider;