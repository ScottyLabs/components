export type TextFieldStyle = "filled" | "outline" | "underline";
export type TextFieldSize = "xsmall" | "small" | "medium" | "large";

export interface TextFieldVariantProps {
    intent?: "neutral" | "brandNeutral";
    fieldStyle?: TextFieldStyle;
    size?: TextFieldSize;
}
