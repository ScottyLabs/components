import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@scottylabs/react";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: { layout: "centered" },
    args: { children: "Button" },
    argTypes: {
        intent: { control: "inline-radio", options: ["neutral", "brand", "brandNeutral"] },
        variant: { control: "inline-radio", options: ["filled", "tonal", "outline", "subtle"] },
        size: { control: "inline-radio", options: ["medium", "large"] },
        disabled: { control: "boolean" },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = { args: { intent: "brand", variant: "filled" } };
export const Tonal: Story = { args: { intent: "brand", variant: "tonal" } };
export const Outline: Story = { args: { intent: "neutral", variant: "outline" } };
export const Subtle: Story = { args: { intent: "brand", variant: "subtle" } };
export const Large: Story = { args: { intent: "brand", variant: "filled", size: "large" } };
export const Disabled: Story = { args: { intent: "brand", variant: "filled", disabled: true } };
