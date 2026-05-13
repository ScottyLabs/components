# @scottylabs/variants

This package holds the `tailwind-variants` configurations shared between the React and Svelte component packages, so identical variant logic, prop types, and class strings are produced in both frameworks and the public APIs stay in lockstep.

It re-exports a project-tuned `tv` with `twMerge: false`, since we don't use Tailwind utilities and the bundled merge logic can false-match our class names.

```ts
import { tv } from "@scottylabs/variants";

export const button = tv({
    base: "sl-btn",
    variants: {
        intent: { brand: "sl-btn--brand", neutral: "sl-btn--neutral" },
        size: { sm: "sl-btn--sm", md: "sl-btn--md", lg: "sl-btn--lg" },
    },
    defaultVariants: { intent: "neutral", size: "md" },
});
```

The class names emitted here must match the CSS authored in `@scottylabs/styles`.
