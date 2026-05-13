# @scottylabs/components

This monorepo is ScottyLabs' design system, providing design tokens and components for React and Svelte built from a shared [Figma source](https://www.figma.com/design/TlYR1IqgGhRDXHyKJ1LHQs/ScottyLabs-UI-Kit).

The library is split across six packages:

- `@scottylabs/tokens` generates the design tokens from Figma via Terrazzo, exposing them as CSS variables and TypeScript constants with both Light and Dark mode values
- `@scottylabs/styles` contains the pre-compiled component CSS that references those tokens, using the `sl-` class prefix throughout
- `@scottylabs/variants` holds the shared `tailwind-variants` configurations consumed by both framework packages
- `@scottylabs/types` holds the shared TypeScript prop types so the React and Svelte public APIs stay in lockstep
- `@scottylabs/react` is the React component layer, built on Radix UI primitives
- `@scottylabs/svelte` is the Svelte component layer, built on Bits UI primitives

Four apps cover the publication surface:

- `apps/docs` is the narrative documentation site, built with Astro Starlight
- `apps/storybook` is a Storybook composition host that pulls in the framework-specific Storybooks via `refs`
- `apps/storybook-react` and `apps/storybook-svelte` are those framework-specific Storybooks

The dev environment is `devenv` via ScottyLabs' [shared module](https://codeberg.org/ScottyLabs/devenv), and deployment runs through [kennel](https://codeberg.org/ScottyLabs/kennel) with site declarations in `devenv.nix`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup.

This project is dual-licensed under [MIT](./LICENSE-MIT) or [Apache-2.0](./LICENSE-APACHE-2.0) at your option.
