import { forwardRef } from 'react';
import MuiStep, {
  type StepProps as MuiStepProps,
} from '@mui/material/Step';
import { stepLabelClasses } from '@mui/material/StepLabel';
import { svgIconClasses } from '@mui/material/SvgIcon';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import { stepIconClasses } from './StepIcon';

export {
  stepClasses,
  type StepClasses as TStepClasses,
  type StepClassKey as TStepClassKey
} from '@mui/material/Step';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TStepOrientation = MuiStepProps['aria-orientation'];

export interface TStepProps extends MuiStepProps {
  alternativeLabel?: boolean;
  orientation?: TStepOrientation;
}

interface TStepStyleParams {
  alternativeLabel?: boolean;
  orientation?: TStepOrientation;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TStepStyleParams>({ name: 'Step' })(
  (theme: TTheme, { alternativeLabel, orientation }: TStepStyleParams) => {
    let root = {
      [`& .${stepLabelClasses.iconContainer}:not(.${stepLabelClasses.error})`]: {
        [`&.${stepLabelClasses.active} .${svgIconClasses.root}`]: {
          color: theme.palette.actionV2.primaryBrand.fill,
          backgroundColor: theme.palette.content.static.light,
          borderRadius: '50%',
          boxShadow: `inset 0 0 0 1px ${theme.palette.actionV2.primaryBrand.fill}`,
          [`& .${stepIconClasses.text}`]: {
            fill: theme.palette.content.static.light
          }
        }
      }
    } as CSSObject;

    if (alternativeLabel && orientation === 'vertical')
      root = {
        ...root,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      };

    return {
      root: root
    }
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function StepWithRef(
  props: TStepProps, 
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    children,
    classes,
    className,
    ...otherProps
  } = props;

  const { classes: mergedClasses } = useStyles(
    props,
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiStep {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiStep>
  );
}

StepWithRef.displayName = 'StepWithRef';

const Step = forwardRef<HTMLDivElement, TStepProps>(StepWithRef);

export default Step;