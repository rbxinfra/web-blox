import { forwardRef } from 'react';
import MuiBreadcrumbs, {
  type BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material/Breadcrumbs';
import type { CSSObject } from 'tss-react';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  breadcrumbsClasses,
  type BreadcrumbsProps as TBreadcrumbsProps,
  type BreadcrumbsClasses as TBreadcrumbsClasses,
  type BreadcrumbsClassKey as TBreadcrumbsClassKey
} from '@mui/material/Breadcrumbs';

const useStyles = makeStyles({ name: 'Breadcrumbs' })(
  (theme: TTheme) => ({
    root: {
      ...theme.typography.body1,
      color: theme.palette.content.muted,
    } as CSSObject,
  }),
);

function BreadcrumbsWithRef({ classes, className, ...otherProps }: MuiBreadcrumbsProps, ref: React.Ref<HTMLElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return <MuiBreadcrumbs {...otherProps} classes={mergedClasses} ref={ref} />;
}

BreadcrumbsWithRef.displayName = 'BreadcrumbsWithRef';

const Breadcrumbs = forwardRef<HTMLElement, MuiBreadcrumbsProps>(BreadcrumbsWithRef);

export default Breadcrumbs;