# Contributing to WebBlox

## Prerequisites

- [Lazygit](https://github.com/jesseduffield/lazygit) (recommended)
- pnpm 8+
- Node 20+

## Setup

```bash
git clone github.rbx.com/Roblox/web-blox
cd web-blox
pnpm install
```

## Lazygit setup

Copy `.lazygit/config.yml` to your global Lazygit config or set
`LG_CONFIG_FILE=.lazygit/config.yml` in your shell.

This gives you:
- `N` on the branches panel to create a properly named branch
- Branch colours distinguishing feature vs bugfix work
- GitHub integration with github.rbx.com

## Branch naming

Branches are created via the Lazygit `N` shortcut which enforces:

```
feature/PROJ-1234-branch-name
bugfix/PROJ-1234-branch-name
```

## Commit format

```
PROJ-1234 Short summary
Optional longer description explaining why, not what.
```

Use `ADHOC` if there is no Jira ticket:

```
ADHOC Short summary
Optional longer description explaining why, not what.
```

## Making changes

1. Create a branch via Lazygit `N` or manually following the naming above
2. Make your changes
3. Run `pnpm changeset` and follow the prompts
4. Commit following the format above
5. Open a PR — title must match the commit format
6. CODEOWNERS for the affected packages will be notified automatically

## Adding a new package

See the README and open an issue using the New Package Proposal template
before starting work.