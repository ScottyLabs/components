# Contributing to `@scottylabs/components`

## Dev environment

Install [Lix](https://lix.systems/install/) with the ScottyLabs binary cache:

```sh
curl -sSf -L https://install.lix.systems/lix | sh -s -- install \
  --extra-conf "extra-substituters = https://scottylabs.cachix.org" \
  --extra-conf "extra-trusted-public-keys = scottylabs.cachix.org-1:hajjEX5SLi/Y7yYloiXTt2IOr3towcTGRhMh1vu6Tjg="
```

Then log in with `nix run git+https://git.cmu.dev/ScottyLabs/kennel#login` and enter the dev shell with `nix develop`. The shell provides Deno and the rest of the toolchain and installs the workspace dependencies.

```sh
deno task build             # build every package
deno task typecheck         # type-check the workspace
pitchfork start --local     # serve the docs and the three Storybooks
pitchfork stop --local
```

## Code style

Linting and formatting are handled by `oxlint` and `oxfmt`, configured declaratively in the kennel flake module. Pre-commit hooks (installed automatically by `nix develop`) run both on every commit. No project-local `.oxlintrc.json` or `oxfmt.toml` exists or should be added. Adjust the kennel module if defaults need to change.

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
1. `deno task --cwd packages/tokens build` to regenerate CSS variables.
1. Visually inspect Storybook for any token-driven regressions.

## Nix and reproducible builds

Kennel builds each site offline from `deno.lock`, so commit the updated `deno.lock` alongside any `package.json` dependency change.

## Releases

Versioning uses [Changesets](https://github.com/changesets/changesets) in lockstep mode, so all packages bump together.

```sh
deno task changeset        # interactively add a changeset entry to a PR
deno task version          # bump versions and update changelogs (run on main)
deno task release          # build and publish to npm
```

## Repository

Deployments are handled in [kennel](https://git.cmu.dev/ScottyLabs/kennel), declared in `flake.nix` under `sites`.

Changes to repository visibility or deployment topology need a separate PR against the [governance repo](https://git.cmu.dev/ScottyLabs/governance) under the `uia` team.
