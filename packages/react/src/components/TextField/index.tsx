import { type TextFieldVariants, textField } from "@scottylabs/variants";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface TextFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, TextFieldVariants {
    trailingIcon?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    { intent, fieldStyle, size, trailingIcon, className, ...rest },
    ref,
) {
    const cls = textField({ intent, fieldStyle, size, class: className });

    if (trailingIcon) {
        return (
            <div className="sl-text-field-wrapper">
                <input ref={ref} className={cls} {...rest} />
                <span className="sl-text-field-trailing-icon">{trailingIcon}</span>
            </div>
        );
    }

    return <input ref={ref} className={cls} {...rest} />;
});
