import { forwardRef } from 'react';
import MuiLink, { type LinkProps as MuiLinkProps } from '@mui/material/Link';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';
import { capitalize } from '../utils/utils';

export {
  linkClasses,
  type LinkProps as TLinkProps,
  type LinkClasses as TLinkClasses,
  type LinkClassKey as TLinkClassKey
} from '@mui/material/Link';

const useStyles = makeStyles({ name: 'Link' })(
  (theme: TTheme) => ({
    root: {
      fontWeight: theme.typography.fontWeightMedium,
      textUnderlineOffset: 4,
    },
    colorInherit: { color: 'inherit' },
    colorPrimary: { color: theme.palette.content.action },
  }),
);

function LinkWithRef(
  {
    classes,
    underline = 'hover',
    color = 'primary',
    className,
    ...otherProps
  }: MuiLinkProps, 
  ref: React.Ref<HTMLAnchorElement>
) {
  const { classes: linkClasses, cx } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  // Compose root: colour class + base reset, merging any consumer classes.root
  const rootClass = cx(
    linkClasses[`color${capitalize(String(color))}` as keyof typeof linkClasses],
    linkClasses.root,
    classes?.root,
  );

  return (
    <MuiLink
      {...otherProps}
      classes={{ ...linkClasses, root: rootClass }}
      underline={underline}
      color={color}
      ref={ref}
    />
  );
}

LinkWithRef.displayName = 'LinkWithRef';

const Link = forwardRef<HTMLAnchorElement, MuiLinkProps>(LinkWithRef);

export default Link;