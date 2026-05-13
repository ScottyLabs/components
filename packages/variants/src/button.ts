import { tv, type VariantProps } from "tailwind-variants";

export const button = tv(
    {
        base: "sl-btn",
        variants: {
            intent: {
                neutral: "sl-btn--neutral",
                brand: "sl-btn--brand",
                brandNeutral: "sl-btn--brand-neutral",
            },
            variant: {
                filled: "sl-btn--filled",
                tonal: "sl-btn--tonal",
                outline: "sl-btn--outline",
                subtle: "sl-btn--subtle",
            },
            size: {
                medium: "sl-btn--md",
                large: "sl-btn--lg",
            },
        },
        defaultVariants: {
            intent: "neutral",
            variant: "filled",
            size: "medium",
        },
    },
    { twMerge: false },
);

export type ButtonVariants = VariantProps<typeof button>;
