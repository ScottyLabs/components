<script module lang="ts">
    import { TextField } from "@scottylabs/svelte";
    import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: "Components/TextField",
        component: TextField,
        parameters: { layout: "centered" },
        argTypes: {
            intent: {
                control: "inline-radio",
                options: ["neutral", "brandNeutral"],
            },
            fieldStyle: {
                control: "inline-radio",
                options: ["filled", "outline", "underline"],
            },
            size: { control: "inline-radio", options: ["xsmall", "small", "medium", "large"] },
            disabled: { control: "boolean" },
        },
        args: { intent: "neutral", fieldStyle: "outline", size: "medium", placeholder: "Placeholder text" },
    });
</script>

{#snippet template(args: Record<string, unknown>)}
    <TextField {...args} />
{/snippet}

<Story name="Outline" args={{ fieldStyle: "outline" }} {template} />
<Story name="Filled" args={{ fieldStyle: "filled" }} {template} />
<Story name="Underline" args={{ fieldStyle: "underline" }} {template} />
<Story name="Small" args={{ fieldStyle: "outline", size: "small" }} {template} />
<Story name="Large" args={{ fieldStyle: "outline", size: "large" }} {template} />
<Story name="BrandNeutral" args={{ fieldStyle: "filled", intent: "brandNeutral" }} {template} />
<Story name="Disabled" args={{ fieldStyle: "outline", disabled: true }} {template} />
