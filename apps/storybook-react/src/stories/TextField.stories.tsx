import { TextField } from "@scottylabs/react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Components/TextField",
    component: TextField,
    parameters: { layout: "centered" },
    args: { placeholder: "Placeholder text" },
    argTypes: {
        intent: { control: "inline-radio", options: ["neutral", "brandNeutral"] },
        fieldStyle: { control: "inline-radio", options: ["filled", "outline", "underline"] },
        size: { control: "inline-radio", options: ["xsmall", "small", "medium", "large"] },
        disabled: { control: "boolean" },
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const Outline: Story = { args: { fieldStyle: "outline" } };
export const Filled: Story = { args: { fieldStyle: "filled" } };
export const Underline: Story = { args: { fieldStyle: "underline" } };
export const Small: Story = { args: { fieldStyle: "outline", size: "small" } };
export const Large: Story = { args: { fieldStyle: "outline", size: "large" } };
export const BrandNeutral: Story = { args: { fieldStyle: "filled", intent: "brandNeutral" } };
export const Disabled: Story = { args: { fieldStyle: "outline", disabled: true } };
