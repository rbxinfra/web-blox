/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { UIBloxLight } from '@rbx/design-foundations';

import { red, yellow, blue, green } from './colorScales';
import { lightDeprecatedPalettes } from './deprecatedPalettes';

import type { 
  TActionV2Color, 
  TComponentsColor, 
  TContentColor, 
  TNavigationColor, 
  TPalette, 
  TStatesColor, 
  TSurfaceColor 
} from './types/colorPaletteTypes';

const states: TStatesColor = {
  active:             UIBloxLight.Color.System.Neutral,
  disabled:           UIBloxLight.Color.Extended.Gray.Gray_200,
  dragged:            UIBloxLight.Color.Shift.Shift_100,
  disabledBackground: UIBloxLight.Color.State.Hover,
  focusVisible:       UIBloxLight.Color.Shift.Shift_300,
  focus:              UIBloxLight.Color.State.Press,
  selected:           UIBloxLight.Color.State.Press,
  hover:              UIBloxLight.Color.State.Hover,
} as const;

const surface: TSurfaceColor = {
  outline: UIBloxLight.Color.Stroke.Emphasis,
  400:     UIBloxLight.Color.Shift.Shift_100,
  300:     UIBloxLight.Color.Surface.Surface_300,
  200:     UIBloxLight.Color.Surface.Surface_200,
  100:     UIBloxLight.Color.Surface.Surface_100,
  0:       UIBloxLight.Color.Surface.Surface_0,
} as const;

const actionV2: TActionV2Color = {
  primaryBrand: {
    fill:                 UIBloxLight.Color.System.Emphasis,
    containedHoverFocus:  UIBloxLight.Color.Extended.Blue.Blue_800,
  },
  primary: {
    fill:                 UIBloxLight.Color.Content.Default,
    containedHoverFocus:  UIBloxLight.Color.Content.Emphasis,
  },
  secondary: {
    fill:                 UIBloxLight.Color.ActionStandard.Background,
    containedHoverFocus:  UIBloxLight.Color.Shift.Shift_400,
  },
  important: {
    fill:                 UIBloxLight.Color.System.Alert,
    containedHoverFocus:  UIBloxLight.Color.Extended.Red.Red_900,
  },
  notice: {
    fill:                 UIBloxLight.Color.System.Warning,
    containedHoverFocus:  UIBloxLight.Color.Extended.Yellow.Yellow_500,
  },
  active: {
    fill:                 UIBloxLight.Color.System.Success,
    containedHoverFocus:  UIBloxLight.Color.Extended.Green.Green_600,
  },
} as const;

const content: TContentColor = {
  standard: UIBloxLight.Color.Content.Emphasis,
  muted:    UIBloxLight.Color.Content.Default,
  disabled: UIBloxLight.Color.Content.Muted,
  inverse:  UIBloxLight.Inverse.Content.Emphasis,
  action:   UIBloxLight.Color.Content.Link,
  static: {
    light: UIBloxLight.LightMode.Surface.Surface_0,
    dark:  UIBloxLight.DarkMode.Surface.Surface_0,
  },
  alert: {
    inform:    UIBloxLight.Color.System.Emphasis,
    important: UIBloxLight.Color.System.Alert,
    active:    UIBloxLight.Color.System.Success,
    notice:    UIBloxLight.Color.System.Warning,
  },
} as const;

const components: TComponentsColor = {
  divider: UIBloxLight.Color.Stroke.Default,
  input: {
    filled: {
      enableFill: UIBloxLight.Color.Surface.Surface_200,
      hoverFill:  UIBloxLight.Color.Surface.Surface_300,
    },
    outlined: {
      enabledBorder: UIBloxLight.Color.Stroke.Default,
      hoverBorder:   UIBloxLight.Color.Content.Default,
      focusBorder:   UIBloxLight.Color.Content.Default,
      errorBorder:   UIBloxLight.Color.System.Alert,
    },
  },
  alert: {
    importantContent: UIBloxLight.LightMode.Content.Emphasis,
    importantFill:    'rgba(223, 40, 31, 0.16)',
    noticeContent:    UIBloxLight.LightMode.Content.Emphasis,
    noticeFill:       'rgba(242, 186, 42, 0.16)',
    informContent:    UIBloxLight.LightMode.Content.Emphasis,
    informFill:       'rgba(51, 95, 255, 0.16)',
    activeContent:    UIBloxLight.LightMode.Content.Emphasis,
    activeFill:       'rgba(57, 197, 130, 0.16)',
  },
  backdrop: { fill: UIBloxLight.Color.Common.Scrim },
  label: {
    warningText:      UIBloxLight.Color.Extended.Yellow.Yellow_800,
    importantContent: red[1000],
    importantFill:    red[100],
    noticeContent:    yellow[1000],
    noticeFill:       yellow[100],
    informContent:    blue[1000],
    informFill:       blue[100],
    activeContent:    green[1000],
    activeFill:       green[100],
  },
  button: { disabled: UIBloxLight.Color.Content.Muted },
  rating: {
    enabledBorder: UIBloxLight.Color.System.Warning,
    activeFill:    UIBloxLight.Color.ActionStandard.Foreground,
  },
  stickyFooter: { fill: UIBloxLight.Color.Common.Scrim },
  media: {
    fill:    UIBloxLight.Color.OverMedia.OverMedia_300,
    toolbar: UIBloxLight.Color.Common.NavigationBar,
    overlay: UIBloxLight.DarkMode.OverMedia.OverMedia_200,
  },
  mediaButtons: {
    onMediaLight: {
      fill:  UIBloxLight.DarkMode.Common.Shadow,
      hover: UIBloxLight.DarkMode.Common.Scrim,
      focus: UIBloxLight.DarkMode.Common.Scrim,
    },
    onMediaDark: {
      fill:  UIBloxLight.Color.OverMedia.OverMedia_0,
      hover: UIBloxLight.Color.OverMedia.OverMedia_300,
      focus: UIBloxLight.Color.OverMedia.OverMedia_300,
    },
    outlined: {
      enabledBorder: surface.outline,
      hoverBorder:   UIBloxLight.Color.Stroke.Emphasis,
      focusBorder:   UIBloxLight.Color.Stroke.Emphasis,
      errorBorder:   UIBloxLight.Color.System.Alert,
    },
  },
  avatar:       { fill: UIBloxLight.Color.Shift.Shift_400 },
  switch: {
    slideFill:    UIBloxLight.Inverse.Content.Muted,
    knobFill:     UIBloxLight.Color.Content.Emphasis,
    disabledKnob: UIBloxLight.Inverse.Content.Muted,
  },
  inlineCode: {
    asText: { fill: UIBloxLight.Color.Shift.Shift_400, color: content.standard },
    asLink: { fill: UIBloxLight.Color.Shift.Shift_400, color: UIBloxLight.Color.Content.Link },
  },
  linearProgress: {
    backgroundSecondary: UIBloxLight.Inverse.Content.Muted,
  },
} as const;

const navigation: TNavigationColor = {
  global:  UIBloxLight.Color.Common.NavigationBar,
  default: UIBloxLight.Color.Common.NavigationBar,
} as const;

const lightPalette: TPalette = {
  mode: 'light' as const,
  common: {
    black: UIBloxLight.DarkMode.Surface.Surface_0,
    white: UIBloxLight.LightMode.Surface.Surface_0,
  },
  actionV2,
  content,
  states,
  surface,
  navigation,
  components,
  ...lightDeprecatedPalettes,
};

export default lightPalette;