import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { button, type ButtonVariants } from "@scottylabs/variants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
    asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { intent, variant, size, asChild, className, ...rest },
    ref,
) {
    const Comp = asChild ? Slot : "button";
    const cls = button({ intent, variant, size, class: className });
    return <Comp ref={ref} className={cls} {...rest} />;
});
