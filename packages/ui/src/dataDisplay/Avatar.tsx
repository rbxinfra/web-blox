import { forwardRef } from 'react';
import MuiAvatar, { type AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export {
  avatarClasses,
  type AvatarProps as TAvatarProps,
  type AvatarClasses as TAvatarClasses,
  type AvatarClassKey as TAvatarClassKey
} from '@mui/material/Avatar';

const useStyles = makeStyles({ name: 'Avatar' })(
  (theme: TTheme) => ({
    colorDefault: {
      ...theme.typography.avatarLetter,
      color:           theme.palette.content.standard,
      backgroundColor: theme.palette.components.avatar.fill,
    },
    rounded: {
      ...theme.border.radius.medium,
    },
  }),
);

function AvatarWithRef({ children, classes, className, ...otherProps }: MuiAvatarProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiAvatar {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiAvatar>
  );
}

AvatarWithRef.displayName = 'AvatarWithRef';

const Avatar = forwardRef<HTMLDivElement, MuiAvatarProps>(AvatarWithRef);

export default Avatar;