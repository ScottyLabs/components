import type { Intent } from "./index.js";

export type ButtonVariant = "filled" | "tonal" | "outline" | "subtle";
export type ButtonSize = "medium" | "large";

export interface ButtonVariantProps {
    intent?: Intent;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
