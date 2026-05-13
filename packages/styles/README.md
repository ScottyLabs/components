# @scottylabs/styles

This package ships the pre-compiled component CSS for the design system. Every rule references tokens from `@scottylabs/tokens` via CSS custom properties rather than literal hex or px values.

A single `@import "@scottylabs/styles"` pulls in the tokens, the global reset, and every component's stylesheet, but consumers can also import pieces individually, such as `@import "@scottylabs/styles/base"` or `@import "@scottylabs/styles/components/button"`.

The cascade layer order is `@layer reset, tokens, components, utilities, overrides`. Consumer overrides placed in the `overrides` layer or left unlayered take precedence over the library's own styles, so there's no need for `!important` or higher-specificity selectors.

Classes use the `sl-` prefix with BEM-style modifiers, for example `.sl-btn`, `.sl-btn--primary`, and `.sl-btn--md`.
