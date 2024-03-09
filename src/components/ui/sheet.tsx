import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "coursekit-fixed coursekit-inset-0 coursekit-z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "coursekit-fixed coursekit-z-50 coursekit-gap-4 coursekit-bg-white coursekit-p-6 coursekit-shadow-lg coursekit-transition coursekit-ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:coursekit-duration-300 data-[state=open]:coursekit-duration-500 dark:bg-neutral-950 dark:border-neutral-900",
  {
    variants: {
      side: {
        top: "coursekit-inset-x-0 coursekit-top-0 coursekit-border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "coursekit-inset-x-0 coursekit-bottom-0 coursekit-border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "coursekit-inset-y-0 coursekit-left-0 coursekit-h-full coursekit-w-3/4 coursekit-border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:coursekit-max-w-sm",
        right:
          "coursekit-inset-y-0 coursekit-right-0 coursekit-h-full coursekit-w-3/4  coursekit-border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:coursekit-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="coursekit-absolute coursekit-right-4 coursekit-top-4 coursekit-rounded-sm coursekit-opacity-70 coursekit-ring-offset-white coursekit-transition-opacity hover:coursekit-opacity-100 focus:coursekit-outline-none focus:coursekit-ring-2 focus:ring-neutral-950 focus:coursekit-ring-offset-2 disabled:coursekit-pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800">
        <X className="coursekit-h-4 coursekit-w-4" />
        <span className="coursekit-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "coursekit-flex coursekit-flex-col coursekit-space-y-2 coursekit-text-center sm:coursekit-text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "coursekit-flex coursekit-flex-col-reverse sm:coursekit-flex-row sm:coursekit-justify-end sm:coursekit-space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "coursekit-text-lg coursekit-font-semibold text-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("coursekit-text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
