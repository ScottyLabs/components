# @scottylabs/types

This package holds the shared TypeScript prop types for components in the design system. Both `@scottylabs/react` and `@scottylabs/svelte` import from here, so any drift between the two framework APIs surfaces as a compile error.

Per-component types live in `src/<name>.ts` and re-export through `src/index.ts`.
