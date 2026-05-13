# @scottylabs/react

This package contains the React components for the ScottyLabs design system. Each component is a thin wrapper around a Radix UI primitive, applying variant classes from `@scottylabs/variants` against CSS authored in `@scottylabs/styles`.

```ts
import "@scottylabs/styles";
import { Button } from "@scottylabs/react";
```

Radix primitives are peer-depended per component (for example `@radix-ui/react-dialog`), so they aren't bundled.
