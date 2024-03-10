import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "coursekit-inline-flex coursekit-items-center coursekit-justify-center coursekit-whitespace-nowrap coursekit-rounded-md coursekit-text-sm coursekit-font-medium coursekit-ring-offset-white coursekit-transition-colors focus-visible:coursekit-outline-none focus-visible:coursekit-ring-2 focus-visible:ring-neutral-950 focus-visible:coursekit-ring-offset-2 disabled:coursekit-pointer-events-none disabled:coursekit-opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "coursekit-bg-neutral-900 coursekit-text-neutral-50 hover:coursekit-bg-neutral-900/90 dark:coursekit-bg-neutral-50 dark:coursekit-text-neutral-900 dark:hover:coursekit-bg-neutral-50/90",
        destructive:
          "coursekit-bg-red-500 coursekit-text-neutral-50 hover:coursekit-bg-red-500/90 dark:coursekit-bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "coursekit-border border-neutral-200 coursekit-bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "coursekit-bg-neutral-100 coursekit-text-neutral-900 hover:coursekit-bg-neutral-100/80 dark:coursekit-bg-neutral-800 dark:coursekit-text-neutral-50 dark:coursekit-hover:bg-neutral-800/80",
        ghost:
          "hover:coursekit-bg-neutral-100 hover:coursekit-text-neutral-900 dark:hover:coursekit-bg-neutral-800 dark:hover:coursekit-text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:coursekit-underline dark:text-neutral-50",
      },
      size: {
        default: "coursekit-h-10 coursekit-px-4 coursekit-py-2",
        sm: "coursekit-h-9 coursekit-rounded-md coursekit-px-3",
        lg: "coursekit-h-11 coursekit-rounded-md coursekit-px-8",
        icon: "coursekit-h-10 coursekit-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
