import { forwardRef } from 'react';
import MuiStepConnector, {
  type StepConnectorProps as MuiStepConnectorProps,
} from '@mui/material/StepConnector';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

import type { TStepOrientation } from './Step';

export {
  stepConnectorClasses,
  type StepConnectorClasses as TStepConnectorClasses,
  type StepConnectorClassKey as TStepConnectorClassKey
} from '@mui/material/StepConnector';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TStepConnectorProps extends MuiStepConnectorProps {
  alternativeLabel?: boolean;
  orientation?: TStepOrientation;
}

interface TStepConnectorStyleParams {
  alternativeLabel?: boolean;
  orientation?: TStepOrientation;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles<TStepConnectorStyleParams>({ name: 'StepConnector' })(
  (theme: TTheme, { alternativeLabel, orientation }: TStepConnectorStyleParams) => {
    let verticalStyles: CSSObject = {};

    if (alternativeLabel)
      verticalStyles = {
        padding: '8px 0',
        marginLeft: 0
      };

    let alternativeLabelStyles: CSSObject = {};

    if (orientation === 'vertical')
      alternativeLabelStyles = {
        position: 'static'
      };

    return {
      alternativeLabel: alternativeLabelStyles,
      vertical: verticalStyles
    }
  },
);

// ── Component ─────────────────────────────────────────────────────────────────

function StepConnectorWithRef(
  props: TStepConnectorProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    classes,
    className,
    ...otherProps
  } = props;

  const { classes: mergedClasses } = useStyles(
    props,
    { props: { classes: combineOverrides(classes, className) } },
  );

  return <MuiStepConnector {...otherProps} classes={mergedClasses as unknown as MuiStepConnectorProps['classes']} ref={ref} />;
}

StepConnectorWithRef.displayName = 'StepConnectorWithRef';

const StepConnector = forwardRef<HTMLDivElement, TStepConnectorProps>(StepConnectorWithRef);

export default StepConnector;