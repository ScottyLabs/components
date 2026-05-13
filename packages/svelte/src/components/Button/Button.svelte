<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { button } from "@scottylabs/variants";
    import type { ButtonVariants } from "@scottylabs/variants";

    type Props = HTMLButtonAttributes &
        ButtonVariants & {
            children?: Snippet;
            child?: Snippet<[{ class: string }]>;
        };

    let {
        intent,
        variant,
        size,
        children,
        child,
        class: className,
        ...rest
    }: Props = $props();

    const cls = $derived(String(button({ intent, variant, size, class: className as string | undefined })));
</script>

{#if child}
    {@render child({ class: cls })}
{:else}
    <button class={cls} {...rest}>
        {@render children?.()}
    </button>
{/if}
