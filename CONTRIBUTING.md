# Contributing to `@scottylabs/components`

## Dev environment

This repo uses [devenv](https://devenv.sh/) via ScottyLabs' [shared devenv module](https://codeberg.org/ScottyLabs/devenv). With [direnv](https://direnv.net/) configured:

```sh
direnv allow                # one-time per checkout
bun install                 # installs deps and regenerates bun.nix via postinstall
bun run typecheck           # type-check the workspace
```

The first `direnv allow` will trigger Nix to set up Bun and the rest of the toolchain.

## Code style

Linting and formatting are handled by `oxlint` and `oxfmt`, configured declaratively in the shared devenv module. Pre-commit hooks (installed automatically by devenv) run both on every commit. No project-local `.oxlintrc.json` or `oxfmt.toml` exists or should be added. Adjust the upstream devenv module if defaults need to change.

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by a `commitizen` git hook).

## Adding a component

1. Define the component's public API as a TypeScript type in `packages/types/src/<name>.ts`.
1. Add the `tailwind-variants` config in `packages/variants/src/<name>.ts`, referencing types from step 1.
1. Add the component's CSS in `packages/styles/src/components/<name>.css`. Use only token references (`var(--sl-...)`). No literal colors or sizes.
1. Implement the React component in `packages/react/src/components/<Name>/index.tsx` using Radix primitives.
1. Implement the Svelte component in `packages/svelte/src/lib/components/<Name>/<Name>.svelte` using Bits UI.
1. Author stories in `apps/storybook-react/src/stories/<Name>.stories.tsx` and `apps/storybook-svelte/src/stories/<Name>.stories.ts`. Use the same `title` (e.g. `'Components/<Name>'`) in both so they group together in the composed view.
1. Add a `.changeset` entry describing the change.

## Tokens

Tokens are derived from `figma-export.json` (DTCG export from Tokenhaus) plus hand-authored typography, radius, spacing, stroke-width, and shadow scales. Re-export from Figma when the design system changes:

1. In Figma, open the Tokenhaus plugin, then Export, then DTCG JSON (Figma Import), then All Collections.
1. Replace `packages/tokens/figma-export.json`.
1. `bun run --filter '@scottylabs/tokens' build` to regenerate CSS variables.
1. Visually inspect Storybook for any token-driven regressions.

## Nix and reproducible builds

[`bun2nix`](https://github.com/nix-community/bun2nix) generates `bun.nix` from `bun.lock` so kennel can produce reproducible Bun-based static-site builds. `bun.nix` is committed to the repo. A `postinstall` script regenerates it whenever `bun install` runs:

```json
"scripts": { "postinstall": "bun2nix -o bun.nix" }
```

If you change `package.json` dependencies, commit the updated `bun.nix` alongside.

## Releases

Versioning uses [Changesets](https://github.com/changesets/changesets) in lockstep mode, so all packages bump together.

```sh
bun run changeset          # interactively add a changeset entry to a PR
bun run version            # bump versions and update changelogs (run on main)
bun run release            # build and publish to npm
```

## Repository

Deployments are handled in [kennel](https://codeberg.org/ScottyLabs/kennel), declared in `devenv.nix` under `scottylabs.kennel.sites`.

Changes to repository visibility or deployment topology need a separate PR against the [governance repo](https://codeberg.org/ScottyLabs/governance) under the `uia` team.
