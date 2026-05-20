<script lang="ts">
    import type { TextFieldVariants } from "@scottylabs/variants";
    import { textField } from "@scottylabs/variants";
    import type { Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = Omit<HTMLInputAttributes, "size"> &
        TextFieldVariants & {
            trailingIcon?: Snippet;
        };

    let {
        intent,
        fieldStyle,
        size,
        trailingIcon,
        class: className,
        ...rest
    }: Props = $props();

    const cls = $derived(String(textField({ intent, fieldStyle, size, class: className as string | undefined })));
</script>

{#if trailingIcon}
    <div class="sl-text-field-wrapper">
        <input class={cls} {...rest} />
        <span class="sl-text-field-trailing-icon">{@render trailingIcon()}</span>
    </div>
{:else}
    <input class={cls} {...rest} />
{/if}
