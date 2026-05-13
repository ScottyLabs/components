# @scottylabs/docs

This app is the narrative documentation site for the design system, built with Starlight on top of Astro. It deploys alongside the three Storybook applications.

Pages live in `src/content/docs/`, and the sidebar structure is declared in `astro.config.mjs`.

The "Components" sidebar entry deep-links out to the Storybook composition host at `components.components.scottylabs.org` rather than embedding it via iframe.
