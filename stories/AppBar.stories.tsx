import { StoryFn, Meta } from '@storybook/react';
import {
  AppBar,
  TAppBarProps,
  TToolbarProps,
  Typography,
  IconButton,
  Toolbar,
  makeStyles,
  MenuIcon
} from '@rbx/ui';
import { createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [AppBar](https://v5.mui.com/api/app-bar/) and [ToolBar](https://v5.mui.com/components/app-bar/).

### 🔄 Changelog
1. [AppBar] \`color\` prop does not support \`default\` as value. The default value is \`primary\`.`;

export default {
  title: 'Components/AppBar',
  component: AppBar,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=3633%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TAppBarProps, 'color' | 'position'> & Pick<TToolbarProps, 'variant'>
> = ({ color, position, variant }) => {
  const {
    classes: { menuButton, menuText }
  } = makeStyles()(() => ({
    menuText: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: 18
    }
  }))();

  return (
    <AppBar color={color} position={position}>
      <Toolbar variant={variant}>
        <IconButton aria-label='Menu' edge='start' className={menuButton} color='inherit'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h4' className={menuText}>
          News
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
configureArgs(Base, {
  color: createEnumControl(
    'Defines the theme colors of the button. The `inherit` variant should only be used when composing higher-order components (_i.e alerts_).',
    'primary',
    ['inherit', 'primary', 'secondary', 'transparent']
  ),
  position: createEnumControl(
    `Defines the appbar positioning type. The behavior of the different options is described in the MDN web docs. \`*\` NOTE: Sticky position is not universally supported and will fall back to static when unavailable.`,
    'fixed',
    ['absolute', 'fixed', 'relative', 'static', 'sticky']
  ),
  variant: createEnumControl(
    "Defines the stylistic toolbar variant to use. These variants control the component's height",
    'regular',
    ['regular', 'dense']
  )
});
