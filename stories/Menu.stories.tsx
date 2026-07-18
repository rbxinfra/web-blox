import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Button,
  Checkbox,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  StarIcon,
  TMenuProps
} from '@rbx/ui';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Menu](https://v5.mui.com/api/menu/) and [Menu Item](https://v5.mui.com/api/menu-item/).

### 🔄 Changelog
1. [Menu] \`variant\` prop supports \`modal\` as value.
1. [Menu Item] Added a \`variant\` prop that supports \`modal\` or \`standardMenu\` as value. 
The \`modal\` variant should be used with the same variant for \`Menu\`. The default value is \`standardMenu\`.`;

export default {
  title: 'Components/Menu',
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=368%3A3'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TMenuProps, 'variant'> & {
    selected: boolean;
    showMenuIcon: boolean;
    showMenuCheckbox: boolean;
    showDivider: boolean;
  }
> = ({ variant, selected, showMenuIcon, showMenuCheckbox, showDivider }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuItemCount = 10;
  return (
    <React.Fragment>
      <Button onClick={event => setAnchorEl(event.currentTarget)}>Open Menu</Button>
      <Menu
        variant={variant}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}>
        {[...Array(menuItemCount)].map((_, index) => {
          const itemNumber = index + 1;
          const text = `Menu Item Text ${itemNumber}`;
          return (
            <React.Fragment key={text}>
              <MenuItem variant={variant === 'modal' ? 'modal' : undefined} selected={selected}>
                {(showMenuIcon || showMenuCheckbox) && (
                  <ListItemIcon>
                    {showMenuIcon ? <StarIcon /> : <Checkbox size='small' />}
                  </ListItemIcon>
                )}
                {text}
              </MenuItem>
              {showDivider && itemNumber % 3 === 0 && <Divider />}
            </React.Fragment>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};
configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use.', 'selectedMenu', [
    'menu',
    'selectedMenu',
    'modal'
  ]),
  selected: createBooleanControl('Whether the menu items are selected.', false),
  showMenuIcon: createBooleanControl(
    'Defines if the menu icon should show. This can take in React children if additional customization is required. Takes priority over showMenuCheckbox.',
    false
  ),
  showMenuCheckbox: createBooleanControl(
    'Defines if a checkbox should show in the menu item.',
    false
  ),
  showDivider: createBooleanControl('Whether to show a divider in the Menu.', false)
});
