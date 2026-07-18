# @rbx/ui

WebBlox Material UI framework

`@rbx/ui` (internally "uiblox") is Roblox's React component library for web. It wraps [MUI](https://mui.com/material-ui/) — restyling a core set of components with [`@rbx/design-foundations`](../design-foundations) tokens and adding Roblox-specific pieces (icons, banners, dialog/snackbar providers) — and passes the rest of MUI through unchanged, so `@rbx/ui` is a single import source for Roblox web UI without a separate `@mui/material` dependency in app code.

This package is part of a pnpm workspace; scripts below assume that context.

## Installation

```bash
pnpm add @rbx/ui
```

`@rbx/ui` bundles MUI (`@mui/material`, `@mui/lab`, `@mui/icons-material`, `@mui/x-date-pickers`, `@mui/x-tree-view`), `tss-react`, and the emotion cache packages it needs — you don't install those separately. The only peer dependencies are:

```bash
pnpm add react @emotion/react
```

## Usage

### 1. Wrap your app in `UIThemeProvider`

`UIThemeProvider` applies the Roblox dark or light theme (built from `@rbx/design-foundations`) and renders MUI's `CssBaseline`:

```tsx
import { UIThemeProvider } from '@rbx/ui';

function App() {
  return (
    <UIThemeProvider theme="dark">
      <MyApp />
    </UIThemeProvider>
  );
}
```

- `theme` accepts `'dark'` (default), `'light'`, or the key of a theme registered via `registerCustomTheme()`.
- `cssBaselineMode` controls when `CssBaseline` renders: `'enabled'` (default), `'client-only'` (wrapped in `NoSsr`, to avoid SSR hydration mismatches), or `'disabled'`.

```tsx
import { registerCustomTheme } from '@rbx/ui';
import { createTheme } from '@mui/material/styles';

registerCustomTheme('my-brand', createTheme({ /* ... */ }));

<UIThemeProvider theme="my-brand">{children}</UIThemeProvider>;
```

### 2. Use components like MUI, styled like Roblox

Every component in the table below is exported from `@rbx/ui`, but not all of them are Roblox-customized. Four kinds of exports live side by side in this package, and the [Components](#components) table marks which is which:

- **Restyled** — the MUI component with Roblox design tokens applied and, in some cases, Roblox-specific props (e.g. `Button`'s `color` union, `Typography`'s `variant` scale).
- **Pass-through** — the MUI (or `@mui/lab` / `@mui/x-*`) component re-exported unchanged, purely so you have one import source instead of also reaching for `@mui/material`.
- **Wrapper** — the MUI component with a behavioral tweak or extra composition (e.g. a default prop, an added variant), but no visual restyling.
- **Roblox-original** — has no MUI equivalent at all: bespoke components (`Banner`, `StickyFooter`, custom icons), or infrastructure like the theme/SSR utilities and dialog/snackbar providers.

```tsx
import { Button, Card, TextField, Typography } from '@rbx/ui';

function Example() {
  return (
    <Card>
      <Typography variant="headingMedium">Sign in</Typography>
      <TextField label="Email" />
      <Button color="primaryBrand" size="large">
        Continue
      </Button>
    </Card>
  );
}
```

### 3. Dialogs and snackbars via context providers

`DialogProvider` and `SnackbarProvider` manage a single dialog/snackbar instance and queue, exposed via `useDialog`/`useSnackbar` hooks, so you don't need to manage `open` state by hand:

```tsx
import { DialogProvider, SnackbarProvider, useDialog, useSnackbar } from '@rbx/ui';

function Root() {
  return (
    <DialogProvider>
      <SnackbarProvider autoHideDuration={4000}>
        <Page />
      </SnackbarProvider>
    </DialogProvider>
  );
}

function Page() {
  const { configure, open } = useDialog();
  const { enqueue } = useSnackbar();

  const handleClick = () => {
    configure(<p>Are you sure?</p>, { id: 'confirm-dialog' });
    open();
  };

  const notify = () => enqueue({ message: 'Saved!' });

  return (
    <>
      <button onClick={handleClick}>Open dialog</button>
      <button onClick={notify}>Show snackbar</button>
    </>
  );
}
```

`SnackbarProvider` queues multiple `enqueue()` calls and shows them one at a time; pass a `shouldClose` predicate to `enqueue` to veto a close for a specific reason (e.g. prevent `clickaway` from dismissing an important message).

### 4. Icons

Custom Roblox, social, and "Builder" product icons are exported alongside the full Material icon set:

```tsx
import { RobloxIcon, RobuxIcon, Instagram, AccessTimeIcon } from '@rbx/ui';
```

### 5. SSR setup (Next.js or similar)

`@rbx/ui` uses two separate emotion caches (one for MUI, one for `tss-react`) and ships helpers to wire them up for server-side rendering without flash-of-unstyled-content or hydration mismatches:

```tsx
// _document.tsx (Pages Router) — render the insertion-point <meta> tags in <Head>
import { renderStyleTags } from '@rbx/ui';

<Head>{renderStyleTags()}</Head>;
```

```tsx
// server entry — create caches per request, wrap the app, extract critical CSS
import { createCache, CacheProvider, prepareServerStyleSheets } from '@rbx/ui';

const caches = createCache();
const html = renderToString(
  <CacheProvider value={caches}>
    <App />
  </CacheProvider>,
);
const { getStyleElementMui, getStyleElementTss } = prepareServerStyleSheets(caches);
```

```tsx
// root layout / _app.tsx — strip server-injected global styles after hydration
import { useEffect } from 'react';
import { removeServerSideCSS } from '@rbx/ui';

useEffect(() => {
  removeServerSideCSS();
}, []);
```

## API

**Legend**, used throughout the tables below:

| Tag | Meaning |
| --- | --- |
| 🎨 Restyled | MUI (or `@mui/lab` / `@mui/x-*`) component with Roblox design tokens applied, sometimes with added/renamed props |
| ⇢ Pass-through | The MUI component re-exported as-is — no visual or behavioral changes |
| ⚙ Wrapper | The MUI component with a behavioral tweak or extra composition, but not restyled |
| ★ Roblox-original | No MUI equivalent — a bespoke component, or infrastructure (theme/SSR/providers) built on top of MUI |

### Theme

Everything here is Roblox-original (★) — it's `@rbx/design-foundations` token data and the theme-building logic around it, not derived from any single MUI export.

| Export | Description |
| --- | --- |
| `UIThemeProvider` | Applies the Roblox theme and `CssBaseline`. See Usage above. |
| `darkTheme` / `lightTheme` | The underlying MUI `Theme` objects for each Roblox theme. |
| `registerCustomTheme` / `customThemes` | Register and look up named custom themes for use with `UIThemeProvider`. |
| `border`, `shadows`, `typography`, `TypographyStyles` | Design-token-derived theme primitives, also available on `theme.border` / `theme.typography` etc. once inside `UIThemeProvider`. |
| `darkElevation` / `lightElevation` | Elevation (shadow) scales per theme. |
| `darkPalette` / `lightPalette` | Raw color palettes per theme. |
| `darkDeprecatedPalettes` / `lightDeprecatedPalettes` | Legacy palette values kept for migration purposes — avoid in new code. |
| `gray`, `red`, `orange`, `yellow`, `green`, `turquoise`, `blue`, `indigo`, `purple`, `magenta`, `alpha` | Individual color scales used to build the palettes. |

### Styles

| Export | Type | Description |
| --- | --- | --- |
| `makeStyles` | ★ | `tss-react/mui`'s `makeStyles`, for writing theme-aware component styles consistent with how `@rbx/ui`'s own components are styled. |

### Components

Most restyled and wrapper components accept the same props as their MUI equivalent, with Roblox-specific extensions noted where relevant. Import directly from `@rbx/ui`.

| Category | 🎨 Restyled | ⇢ Pass-through | ⚙ Wrapper | ★ Roblox-original |
| --- | --- | --- | --- | --- |
| Accordion | `AccordionDetails`, `AccordionSummary` | `AccordionActions` | — | — |
| Alert | `Alert`, `AlertTitle` | — | — | — |
| Button | `Button` (adds `loading`; `color` accepts `'primaryBrand' \| 'primary' \| 'secondary' \| 'destructive' \| 'inherit'`), `ButtonGroup` | — | — | — |
| Icon button | `IconButton` | — | — | — |
| Data display | `Avatar`, `AvatarGroup`, `Badge`, `Chip`, `Divider`, `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemText`, `ListSubheader`, `TableCell`, `TableRow`, `Tooltip` | `List`, `ListItemAvatar`, `ListItemSecondaryAction`, `TableBody`, `TableContainer`, `TableFooter`, `TableHead`, `TableSortLabel` | `Table` (fixes default `padding`) | `Label` |
| Feedback | `Backdrop`, `Dialog`, `DialogActions`, `DialogContent`, `DialogTitle`, `LinearProgress`, `Skeleton`, `Snackbar` | `CircularProgress`, `DialogContentText`, `SnackbarContent` | — | `DialogTemplate`, `DialogProvider` + `useDialog`, `SnackbarProvider` + `useSnackbar` |
| Form | — | `FormControl`, `FormControlLabel`, `FormGroup`, `FormHelperText`, `FormLabel` | — | — |
| Input | `Autocomplete`, `Checkbox`, `DatePicker`, `Fab`, `FilledInput`, `Input`, `InputLabel`, `OutlinedInput`, `Radio`, `Select`, `Slider`, `Switch`, `TextField`, `ToggleButton` | `InputAdornment`, `NativeSelect`, `RadioGroup`, `Rating`, `ToggleButtonGroup` | `PickerUtilsProvider` (pins the `@mui/x-date-pickers` adapter) | — |
| Lab | `TreeItem`, `TreeView` | `LoadingButton`, `Masonry`, `TabList`, `TabPanel`, `Timeline`, `TimelineConnector`, `TimelineContent`, `TimelineDot`, `TimelineItem`, `TimelineOppositeContent`, `TimelineSeparator` | — | — |
| Layout | `Grid` | `Box`, `Container`, `ImageList`, `ImageListItem`, `ImageListItemBar`, `Stack` | — | — |
| Media | `Video` | — | — | — |
| Navigation | `BottomNavigationAction`, `Breadcrumbs`, `Drawer`, `Link`, `Menu`, `MenuItem`, `PaginationItem`, `Step`, `StepConnector`, `StepIcon`, `Tab`, `Tabs` | `BottomNavigation`, `SwipeableDrawer`, `MenuList`, `MobileStepper`, `SpeedDial`, `SpeedDialAction`, `SpeedDialIcon`, `StepButton`, `StepContent`, `StepLabel`, `Stepper`, `TabScrollButton`, `TablePagination` | `Pagination` (adds a `'reduced'` variant) | `ReducedPagination` |
| Surface | `AppBar`, `Card`, `CardHeader`, `Paper` | `CardActionArea`, `CardActions`, `CardContent`, `CardMedia`, `Toolbar` | — | `Banner` |
| Sticky footer | — | — | — | `StickyFooter` |
| Text | — | — | — | `InlineCode`, `KeyboardInput` |
| Transitions | — | `Collapse`, `Fade`, `Grow`, `Slide`, `Zoom` | — | — |
| Typography | `Typography` (Roblox `variant`/`color` scale) | — | — | — |
| Icons | — | `Icon`, `SvgIcon`, and the full Material icon set (`*Icon`, `*OutlinedIcon`, `*RoundedIcon`, `*SharpIcon`, `*TwoToneIcon`) | — | `RobloxIcon`, `RobuxIcon`, `LimitedIcon`, `AdjustIcon`, `AnimationIcon`, `AssistantIcon`, `GuildedIcon`, `MusicIcon`, `PackageIcon`, `PlayingIcon`, `PlusHeavyIcon`, `PremiumIcon`, `ReportFlagIcon`, `StudioIcon`, `VanityLinkIcon`, `Instagram`, `Facebook`, `LinkedIn`, `X`, `YouTube`, the `Builder*` icon set |

### Utilities

| Export | Type | Description |
| --- | --- | --- |
| `combineOverrides` | ★ | Merges a MUI `classes` object with a plain `className`, appending to `classes.root`. Used internally by most `@rbx/ui` components to support both props at once. |
| `useMediaQuery` | ⇢ | Re-export of MUI's `useMediaQuery`. |
| `useUIThemeMeta` | ★ | Hook for reading the currently active `UIThemeProvider` theme/mode. |
| `useTheme`, `muiAlpha` (aliased from `alpha`), `capitalize`, `NoSSR` (aliased from `NoSsr`), `Hidden` | ⇢ | Re-exports of the corresponding `@mui/material` utilities. |
| `ClickAwayListener`, `Modal`, `Popover`, `Popper`, `Portal`, `TextareaAutosize` | ⇢ | Re-exports of the corresponding MUI utility components. |
| `VisuallyHidden` | ★ | Accessibility helper with no MUI equivalent. |
| `createCache`, `CacheProvider`, `prepareServerStyleSheets`, `renderStyleTags`, `removeServerSideCSS` | ★ | SSR emotion-cache helpers, custom to this package. See "SSR setup" above. |

## Development

This package lives in a pnpm workspace and expects the monorepo's root `tsconfig`/`oxlint`/`jest` configs to be present.

```bash
pnpm build         # type declarations + rollup bundle (cjs + esm)
pnpm lint          # oxlint src/
pnpm test          # jest
pnpm clean         # remove dist/
```