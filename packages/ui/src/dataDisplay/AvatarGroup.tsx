import { forwardRef } from 'react';
import { avatarClasses } from '@mui/material/Avatar';
import MuiAvatarGroup, { type AvatarGroupProps as MuiAvatarGroupProps } from '@mui/material/AvatarGroup';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';
import combineOverrides from '../utils/combineOverrides';

export type {
  avatarGroupClasses,
  AvatarGroupProps as TAvatarGroupProps,
  AvatarGroupClasses as TAvatarGroupClasses,
  AvatarGroupClassKey as TAvatarGroupClassKey
} from '@mui/material/AvatarGroup';

const useStyles = makeStyles({ name: 'AvatarGroup' })(
  (theme: TTheme) => ({
    root: {
        display: 'inline-flex',
    },
    avatar: {
        [`& .${avatarClasses.root}`]: {
            ...theme.typography.avatarLetter,
            border: `2px solid ${theme.palette.surface[0]}`,
            color: theme.palette.content.standard,
            backgroundColor: theme.palette.components.avatar.fill,
        }
    }
  }),
);

function AvatarGroupWithRef({ children, classes, className, ...otherProps }: MuiAvatarGroupProps, ref: React.Ref<HTMLDivElement>) {
  const { classes: mergedClasses } = useStyles(undefined, {
    props: { classes: combineOverrides(classes, className) },
  });

  return (
    <MuiAvatarGroup {...otherProps} classes={mergedClasses} ref={ref}>
      {children}
    </MuiAvatarGroup>
  );
}

AvatarGroupWithRef.displayName = 'AvatarGroupWithRef';

const AvatarGroup = forwardRef<HTMLDivElement, MuiAvatarGroupProps>(AvatarGroupWithRef);

export default AvatarGroup;