import { tv, type VariantProps } from "tailwind-variants";

export const textField = tv(
    {
        base: "sl-text-field",
        variants: {
            intent: {
                neutral: "sl-text-field--neutral",
                brandNeutral: "sl-text-field--brand-neutral",
            },
            fieldStyle: {
                filled: "sl-text-field--filled",
                outline: "sl-text-field--outline",
                underline: "sl-text-field--underline",
            },
            size: {
                xsmall: "sl-text-field--xs",
                small: "sl-text-field--sm",
                medium: "sl-text-field--md",
                large: "sl-text-field--lg",
            },
        },
        defaultVariants: {
            intent: "neutral",
            fieldStyle: "outline",
            size: "medium",
        },
    },
    { twMerge: false },
);

export type TextFieldVariants = VariantProps<typeof textField>;
