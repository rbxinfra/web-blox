/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import { UIBloxDark } from '@rbx/design-foundations';

import { red, yellow, blue, green } from './colorScales';
import { darkDeprecatedPalettes } from './deprecatedPalettes';

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
  active:             UIBloxDark.Color.System.Neutral,
  disabled:           UIBloxDark.Color.Extended.Gray.Gray_600,
  dragged:            UIBloxDark.Color.Shift.Shift_100,
  disabledBackground: UIBloxDark.Color.State.Hover,
  focusVisible:       UIBloxDark.Color.Shift.Shift_300,
  focus:              UIBloxDark.Color.State.Press,
  selected:           UIBloxDark.Color.State.Press,
  hover:              UIBloxDark.Color.State.Hover,
} as const;

const surface: TSurfaceColor = {
  outline: UIBloxDark.Color.Stroke.Emphasis,
  400:     UIBloxDark.Color.Shift.Shift_100,
  300:     UIBloxDark.Color.Surface.Surface_300,
  200:     UIBloxDark.Color.Surface.Surface_200,
  100:     UIBloxDark.Color.Surface.Surface_100,
  0:       UIBloxDark.Color.Surface.Surface_0,
} as const;

const actionV2: TActionV2Color = {
  primaryBrand: {
    fill:                 UIBloxDark.Color.System.Emphasis,
    containedHoverFocus:  UIBloxDark.Color.Extended.Blue.Blue_600,
  },
  primary: {
    fill:                 UIBloxDark.Color.Content.Default,
    containedHoverFocus:  UIBloxDark.Color.Content.Emphasis,
  },
  secondary: {
    fill:                 UIBloxDark.Color.ActionStandard.Background,
    containedHoverFocus:  UIBloxDark.Color.Shift.Shift_400,
  },
  important: {
    fill:                 UIBloxDark.Color.System.Alert,
    containedHoverFocus:  UIBloxDark.Color.Extended.Red.Red_700,
  },
  notice: {
    fill:                 UIBloxDark.Color.System.Warning,
    containedHoverFocus:  UIBloxDark.Color.Extended.Yellow.Yellow_300,
  },
  active: {
    fill:                 UIBloxDark.Color.System.Success,
    containedHoverFocus:  UIBloxDark.Color.Extended.Green.Green_400,
  },
} as const;

const content: TContentColor = {
  standard: UIBloxDark.Color.Content.Emphasis,
  muted:    UIBloxDark.Color.Content.Default,
  disabled: UIBloxDark.Color.Content.Muted,
  inverse:  UIBloxDark.Inverse.Content.Emphasis,
  action:   UIBloxDark.Color.Content.Link,
  static: {
    light: UIBloxDark.LightMode.Surface.Surface_0,
    dark:  UIBloxDark.DarkMode.Surface.Surface_0,
  },
  alert: {
    inform:    UIBloxDark.Color.System.Emphasis,
    important: UIBloxDark.Color.System.Alert,
    active:    UIBloxDark.Color.System.Success,
    notice:    UIBloxDark.Color.System.Warning,
  },
} as const;

const components: TComponentsColor = {
  divider: UIBloxDark.Color.Stroke.Default,
  input: {
    filled: {
      enableFill: UIBloxDark.Color.Surface.Surface_200,
      hoverFill:  UIBloxDark.Color.Surface.Surface_300,
    },
    outlined: {
      enabledBorder: UIBloxDark.Color.Stroke.Default,
      hoverBorder:   UIBloxDark.Color.Content.Default,
      focusBorder:   UIBloxDark.Color.Content.Default,
      errorBorder:   UIBloxDark.Color.System.Alert,
    },
  },
  alert: {
    importantContent: UIBloxDark.DarkMode.Content.Emphasis,
    importantFill:    'rgba(223, 40, 31, 0.16)',
    noticeContent:    UIBloxDark.DarkMode.Content.Emphasis,
    noticeFill:       'rgba(242, 186, 42, 0.16)',
    informContent:    UIBloxDark.DarkMode.Content.Emphasis,
    informFill:       'rgba(51, 95, 255, 0.16)',
    activeContent:    UIBloxDark.DarkMode.Content.Emphasis,
    activeFill:       'rgba(57, 197, 130, 0.16)',
  },
  backdrop: { fill: UIBloxDark.Color.Common.Scrim },
  button:   { disabled: UIBloxDark.Color.Content.Muted },
  label: {
    warningText:      UIBloxDark.Color.System.Warning,
    importantContent: red[300],
    importantFill:    red[1100],
    noticeContent:    yellow[300],
    noticeFill:       yellow[1100],
    informContent:    blue[300],
    informFill:       blue[1100],
    activeContent:    green[300],
    activeFill:       green[1100],
  },
  rating: {
    enabledBorder: UIBloxDark.Color.System.Warning,
    activeFill:    UIBloxDark.Color.ActionStandard.Foreground,
  },
  stickyFooter: { fill: UIBloxDark.Color.Common.Scrim },
  media: {
    fill:    UIBloxDark.Color.OverMedia.OverMedia_300,
    toolbar: UIBloxDark.Color.Common.NavigationBar,
    overlay: UIBloxDark.DarkMode.OverMedia.OverMedia_200,
  },
  mediaButtons: {
    onMediaLight: {
      fill:  UIBloxDark.DarkMode.Common.Shadow,
      hover: UIBloxDark.DarkMode.Common.Scrim,
      focus: UIBloxDark.DarkMode.Common.Scrim,
    },
    onMediaDark: {
      fill:  UIBloxDark.Color.OverMedia.OverMedia_0,
      hover: UIBloxDark.Color.OverMedia.OverMedia_300,
      focus: UIBloxDark.Color.OverMedia.OverMedia_300,
    },
    outlined: {
      enabledBorder: surface.outline,
      hoverBorder:   UIBloxDark.Color.Stroke.Emphasis,
      focusBorder:   UIBloxDark.Color.Stroke.Emphasis,
      errorBorder:   UIBloxDark.Color.System.Alert,
    },
  },
  avatar: { fill: UIBloxDark.Color.Shift.Shift_400 },
  switch: {
    slideFill:    UIBloxDark.Inverse.Content.Muted,
    knobFill:     UIBloxDark.Color.Content.Emphasis,
    disabledKnob: UIBloxDark.Inverse.Content.Muted,
  },
  inlineCode: {
    asText: { fill: UIBloxDark.Color.Shift.Shift_400, color: content.standard },
    asLink: { fill: UIBloxDark.Color.Shift.Shift_400, color: UIBloxDark.Color.Content.Link },
  },
  linearProgress: {
    backgroundSecondary: UIBloxDark.Inverse.Content.Muted,
  },
} as const;

const navigation: TNavigationColor = {
  global:  UIBloxDark.Color.Common.NavigationBar,
  default: UIBloxDark.Color.Common.NavigationBar,
} as const;

const darkPalette: TPalette = {
  mode: 'dark' as const,
  common: {
    black: UIBloxDark.DarkMode.Surface.Surface_0,
    white: UIBloxDark.LightMode.Surface.Surface_0,
  },
  actionV2,
  content,
  states,
  surface,
  navigation,
  components,
  ...darkDeprecatedPalettes,
};

export default darkPalette;