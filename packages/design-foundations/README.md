# @rbx/design-foundations

Roblox design tokens

This package exposes the design tokens bundled into [Web Blox](../ui) as plain TypeScript objects, so non-weblox consumers (e.g. apps building their own component styling, or tools that need raw token values) can read them without depending on weblox itself.

> **Note:** `src/index.ts` is auto-generated from weblox's bundled token output. Don't hand-edit it — changes should flow from the weblox token source and be re-exported here.

## Installation

```bash
pnpm add @rbx/design-foundations
```

## Usage

```typescript
import { UIBloxDark, UIBloxLight } from '@rbx/design-foundations';

// Read a raw token value
const linkColor = UIBloxDark.Color.Content.Link; // "rgb(82, 139, 255)"

// Pick a token set based on the active color scheme
const tokens = colorScheme === 'dark' ? UIBloxDark : UIBloxLight;

const cardStyle = {
  backgroundColor: tokens.Semantic.Color.Background.Default,
  borderRadius: tokens.Semantic.Radius.Medium,
  padding: tokens.Padding.Medium,
};
```

Both exports are `as const` objects, so property access is fully typed and autocompletes in editors — there's no runtime API to call, just nested objects to read from.

## API

### `UIBloxDark`

The complete token set for the dark theme, as a deeply nested `const` object. Top-level groups:

| Group | Contents |
| --- | --- |
| `Color` | Semantic-ish color roles (`ActionEmphasis`, `Content`, `Surface`, `Stroke`, `System`, etc.) plus `Extended`, a full ramp (100–1400 or similar) for each hue (`Blue`, `Gray`, `Green`, `Magenta`, `Orange`, `Pink`, `Purple`, `Red`, `Turquoise`, `Yellow`, `Black`, `White`). |
| `Component` | Per-component style values (`BaseMenu`, `Facepile`, `MenuCell`, `TextField`, `VerticalTile`, etc.) — colors, spacing, border radii, and typography scoped to a specific UI component. |
| `Semantic` | A higher-level abstraction over `Color`, `Radius`, `Stroke`, `Typography`, `Icon`, and `Opacity` for general-purpose, non-component-specific use (e.g. `Semantic.Color.Background.Default`, `Semantic.Typography.Body`). |
| `Global` | Lower-level primitives: a named color palette (`Alabaster`, `Slate`, `Obsidian`, etc.), plus numeric `Size_*`, `Space_*`, `Stroke_*`, `Opacity_*`, `FontSize_*`, and `Weight_*` scales. |
| `Typography` | Named text styles (`DisplayLarge`, `HeadingMedium`, `BodySmall`, `LabelLarge`, etc.), each with `Font`, `FontFamily`, `FontSize`, `FontWeight`, `LetterSpacing`, and `LineHeight`. |
| `Config` | Theme metadata: `ColorMode` (`IsDark`/`IsLight`/`Name`), `Theme`, `Text`, and `UI` scale settings. |
| `DarkMode` / `LightMode` / `Inverse` | Theme-specific color role snapshots, included for consumers that need a specific mode's colors regardless of which top-level token set (`UIBloxDark`/`UIBloxLight`) they're reading from. |
| `Ease` | Named easing curves (`Linear`, `StandardIn`, `StandardOut`, `ExpressiveIn`, `ExpressiveOut`) as both a CSS `cubic-bezier(...)` string and the raw 4-number array. |
| `FontSize` / `FontWeight` / `LineHeight` / `LetterSpacing` | Standalone numeric/string scales, also referenced from within `Typography` and `Semantic`. |
| `Gap` / `Gutter` / `Margin` / `Padding` / `Size` / `Stroke` / `Radius` / `IconSize` / `InputSize` / `ToggleSize` / `Time` | Named spacing, sizing, and timing scales (e.g. `Gap.Small`, `Radius.Circle`, `Time_300`). |

### `UIBloxLight`

Same shape as `UIBloxDark`, with light-theme values substituted throughout.

## Storybook

The token values in this package are visualized in the repo's Storybook under `Theme/*` (e.g. `Theme/Palette/Action`, `Theme/Palette/Background`, `Theme/Typography`, `Theme/Shadows`, `Theme/Elevation`), sourced from `stories/themes/`. See the [root README's Storybook section](../../README.md#storybook) for background on where these stories came from and their current migration state.

## Contributing

See the [Grasshopper contributing guide](../../CONTRIBUTING.md).

Changes to this package require a changeset:

```bash
pnpm changeset
```

## Owner

@roblox/creator-resources-foundation

See [CODEOWNERS](../../CODEOWNERS).