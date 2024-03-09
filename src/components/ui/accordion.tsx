import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "coursekit-border-b coursekit-border-b-neutral-200 dark:coursekit-border-b-neutral-900",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="coursekit-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "coursekit-flex coursekit-flex-1 coursekit-items-center coursekit-justify-between coursekit-py-4 coursekit-text-sm coursekit-font-medium coursekit-transition-all hover:coursekit-underline [&[data-state=open]>svg]:coursekit-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="coursekit-h-4 coursekit-w-4 coursekit-shrink-0 coursekit-text-neutral-500 coursekit-transition-transform coursekit-duration-200 dark:coursekit-text-neutral-400" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="coursekit-overflow-hidden coursekit-text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("coursekit-pb-4 coursekit-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
