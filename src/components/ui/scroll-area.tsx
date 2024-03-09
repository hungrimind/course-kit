import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { cn } from "../../lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("coursekit-relative coursekit-overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="coursekit-h-full coursekit-w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "coursekit-flex touch-none coursekit-select-none coursekit-transition-colors",
      orientation === "vertical" &&
        "coursekit-h-full coursekit-w-2.5 coursekit-border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "coursekit-h-2.5 coursekit-flex-col coursekit-border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="coursekit-relative coursekit-flex-1 coursekit-rounded-full bg-neutral-200 dark:bg-neutral-800" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
