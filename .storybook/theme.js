import {
  create
} from 'storybook/theming';
import robloxLogo from '../static/media/roblox_logo.png';

export default create({
  base: 'light',
  brandTitle: 'Roblox Storybook',
  brandUrl: 'https://webblox.rbxlabs.net',
  brandImage: robloxLogo,
  brandTarget: '_self',
});