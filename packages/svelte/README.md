# @scottylabs/svelte

This package contains the Svelte components for the ScottyLabs design system. Each component is a thin wrapper around a Bits UI primitive, applying variant classes from `@scottylabs/variants` against CSS authored in `@scottylabs/styles`.

```svelte
<script>
  import "@scottylabs/styles";
  import { Button } from "@scottylabs/svelte";
</script>

<Button>Click</Button>
```

`bits-ui` is declared as a peer dependency, so it isn't bundled.
