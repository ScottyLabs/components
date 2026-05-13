<script module lang="ts">
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { Button } from "@scottylabs/svelte";

    const { Story } = defineMeta({
        title: "Components/Button",
        component: Button,
        parameters: { layout: "centered" },
        argTypes: {
            intent: { control: "inline-radio", options: ["neutral", "brand", "brandNeutral"] },
            variant: { control: "inline-radio", options: ["filled", "tonal", "outline", "subtle"] },
            size: { control: "inline-radio", options: ["medium", "large"] },
            disabled: { control: "boolean" },
        },
        args: { intent: "brand", variant: "filled", size: "medium" },
    });
</script>

<Story name="Filled" args={{ intent: "brand", variant: "filled" }}>
    <Button intent="brand" variant="filled">Button</Button>
</Story>

<Story name="Tonal" args={{ intent: "brand", variant: "tonal" }}>
    <Button intent="brand" variant="tonal">Button</Button>
</Story>

<Story name="Outline" args={{ intent: "neutral", variant: "outline" }}>
    <Button intent="neutral" variant="outline">Button</Button>
</Story>

<Story name="Subtle" args={{ intent: "brand", variant: "subtle" }}>
    <Button intent="brand" variant="subtle">Button</Button>
</Story>

<Story name="Large" args={{ intent: "brand", variant: "filled", size: "large" }}>
    <Button intent="brand" variant="filled" size="large">Button</Button>
</Story>

<Story name="Disabled" args={{ intent: "brand", variant: "filled", disabled: true }}>
    <Button intent="brand" variant="filled" disabled>Button</Button>
</Story>
