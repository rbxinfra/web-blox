import { forwardRef } from 'react';
import makeStyles from '../styles/makeStyles';

// ── Types ────────────────────────────────────────────────────────────────────

export interface TVisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
}

// ── Styles ────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({ name: 'VisuallyHidden' })(
  (_) => ({
    root: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px'
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

function VisuallyHiddenWithRef(
  {
    children,
    ...otherProps
  }: TVisuallyHiddenProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { classes: { root } } = useStyles();

  return (
    <div {...otherProps} className={root} ref={ref}>{children}</div>
  );
}

VisuallyHiddenWithRef.displayName = 'VisuallyHiddenWithRef';

const VisuallyHidden = forwardRef<HTMLDivElement, TVisuallyHiddenProps>(VisuallyHiddenWithRef);

export default VisuallyHidden;