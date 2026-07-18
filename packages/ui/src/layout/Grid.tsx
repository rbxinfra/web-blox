import { forwardRef } from 'react';
import MuiGrid, {
  gridClasses,
  type GridProps as MuiGridProps,
} from '@mui/material/Grid';
import type { CSSObject } from 'tss-react';

import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  gridClasses,
  type GridProps as TGridProps,
  type GridClasses as TGridClasses,
  type GridClassKey as TGridClassKey
} from '@mui/material/Grid';

interface TGridStyleParams {
  direction?: MuiGridProps['direction'];
}

const useStyles = makeStyles<TGridStyleParams>({ name: 'Grid' })(
  (_, { direction }: TGridStyleParams) => ({
    root: {
      // Column-direction grids: cap items at 100% width so they don't overflow
      [`& > .${gridClasses.item}`]: {
        maxWidth:
          direction === 'column' || direction === 'column-reverse'
            ? '100%'
            : undefined,
      },
    } as CSSObject,
  }),
);

function GridWithRef(
  { children, classes, className, direction, ...otherProps }: MuiGridProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const { classes: mergedClasses } = useStyles(
    { direction },
    { props: { classes: combineOverrides(classes, className) } },
  );

  return (
    <MuiGrid
      {...otherProps}
      direction={direction}
      classes={mergedClasses}
      ref={ref}
    >
      {children}
    </MuiGrid>
  );
}

GridWithRef.displayName = 'GridWithRef';

const Grid = forwardRef<HTMLDivElement, MuiGridProps>(GridWithRef);

export default Grid;