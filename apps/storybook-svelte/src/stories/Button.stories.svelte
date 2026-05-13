<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { Button } from "@scottylabs/svelte";

    const { Story } = defineMeta({
        title: "Components/Button",
        component: Button,
        parameters: { layout: "centered" },
        argTypes: {
            intent: {
                control: "inline-radio",
                options: ["neutral", "brand", "brandNeutral"],
            },
            variant: {
                control: "inline-radio",
                options: ["filled", "tonal", "outline", "subtle"],
            },
            size: { control: "inline-radio", options: ["medium", "large"] },
            disabled: { control: "boolean" },
        },
        args: { intent: "brand", variant: "filled", size: "medium" },
    });
</script>

{#snippet template(args: Record<string, unknown>)}
    <Button {...args}>Button</Button>
{/snippet}

<Story name="Filled" args={{ intent: "brand", variant: "filled" }} {template} />
<Story name="Tonal" args={{ intent: "brand", variant: "tonal" }} {template} />
<Story name="Outline" args={{ intent: "neutral", variant: "outline" }} {template} />
<Story name="Subtle" args={{ intent: "brand", variant: "subtle" }} {template} />
<Story name="Large" args={{ intent: "brand", variant: "filled", size: "large" }} {template} />
<Story name="Disabled" args={{ intent: "brand", variant: "filled", disabled: true }} {template} />
