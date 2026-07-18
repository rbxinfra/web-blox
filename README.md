# WebBlox

WebBlox (`Roblox/web-blox`, formerly `uiblox-web`/"UIBlox" — renamed to remove ambiguity with UIBlox Luau) is Roblox's React component library and design token system for web. It's a pnpm monorepo owned by Creator Resources Foundation, containing:

| Package | Purpose |
| --- | --- |
| [`@rbx/ui`](./packages/ui) | The component library itself — restyled MUI components, Roblox-original components, and theming/SSR infrastructure. |
| [`@rbx/design-foundations`](./packages/design-foundations) | The design tokens (color, typography, spacing, etc.) that `@rbx/ui` is built on, published standalone for consumers who need raw token values without the component library. |

## Key Links

- **Repo:** `github.rbx.com/Roblox/web-blox`
- **CODEOWNERS:** `github.rbx.com/Roblox/web-blox/blob/master/CODEOWNERS`

## Getting Started

```bash
git clone github.rbx.com/Roblox/web-blox
cd web-blox
pnpm install
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, commit format, and the PR workflow.

## Scripts

```bash
pnpm build         # build all packages
pnpm build:clean   # remove all packages' dist/
pnpm lint          # lint all packages
pnpm test          # test all packages
pnpm changeset     # record a change for release notes/versioning
```

## Consuming WebBlox

```bash
pnpm add @rbx/ui @emotion/react
```

```tsx
import { UIThemeProvider, Button, Card, TextField, Typography } from '@rbx/ui';

function App() {
  return (
    <UIThemeProvider theme="dark">
      <Card>
        <Typography variant="headingMedium">Sign in</Typography>
        <TextField label="Email" />
        <Button color="primaryBrand" size="large">
          Continue
        </Button>
      </Card>
    </UIThemeProvider>
  );
}
```

Consumers who only need raw design tokens (e.g. non-`@rbx/ui` styling, tooling) can depend on `@rbx/design-foundations` directly instead:

```bash
pnpm add @rbx/design-foundations
```

See each package's README ([`@rbx/ui`](./packages/ui/README.md), [`@rbx/design-foundations`](./packages/design-foundations/README.md)) for full API docs.

## Storybook

WebBlox ships a Storybook (`.storybook/`, stories in `stories/`) that documents `@rbx/ui` components and `@rbx/design-foundations` tokens.

```bash
pnpm storybook          # run locally on port 6006
pnpm build-storybook    # build static output to storybook-static/
```

> **Note:** The stories currently in this repo are Storybook v10 stories migrated from a 2024 snapshot of webblox.roblox.com, which ran on Storybook v6 and was one of the last versions of that site prior to it being shut down. As a result, some stories or their organization may still reflect that older site rather than the current package APIs — treat the Storybook as a useful reference, but expect some cleanup/reconciliation work against `@rbx/ui` and `@rbx/design-foundations` as they exist today.

