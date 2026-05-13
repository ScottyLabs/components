# @scottylabs/tokens

This package emits the design tokens for the ScottyLabs component library. Terrazzo builds them from `figma-export.json` (the Tokenhaus DTCG export kept here in the package) along with hand-authored DTCG files under `tokens/` that cover everything Figma doesn't tokenize, including typography, radius, spacing, stroke widths, and shadows.

`@scottylabs/tokens/css` exports the full CSS variable set, with `:root` rules for the Light defaults and `[data-theme="dark"]` for the Dark overrides. The package root also exports TypeScript constants for the rare cases where a token value is needed in JavaScript.

CSS variables use the `--sl-` prefix, for example `--sl-background-brand-primary-enabled`.
