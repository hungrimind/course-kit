import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "coursekit-flex coursekit-cursor-default coursekit-select-none coursekit-items-center coursekit-rounded-sm coursekit-px-2 coursekit-py-1.5 coursekit-text-sm coursekit-outline-none focus:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:focus:bg-neutral-800 dark:data-[state=open]:bg-neutral-800",
      inset && "coursekit-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="coursekit-ml-auto coursekit-h-4 coursekit-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "coursekit-z-50 min-w-[8rem] coursekit-overflow-hidden coursekit-rounded-md coursekit-border border-neutral-200 coursekit-bg-white coursekit-p-1 text-neutral-950 coursekit-shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "coursekit-z-50 min-w-[8rem] coursekit-overflow-hidden coursekit-rounded-md coursekit-border border-neutral-200 coursekit-bg-white coursekit-p-1 text-neutral-950 coursekit-shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "coursekit-relative coursekit-flex coursekit-cursor-default coursekit-select-none coursekit-items-center coursekit-rounded-sm coursekit-px-2 coursekit-py-1.5 coursekit-text-sm coursekit-outline-none coursekit-transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:coursekit-pointer-events-none data-[disabled]:coursekit-opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      inset && "coursekit-pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "coursekit-relative coursekit-flex coursekit-cursor-default coursekit-select-none coursekit-items-center coursekit-rounded-sm coursekit-py-1.5 coursekit-pl-8 coursekit-pr-2 coursekit-text-sm coursekit-outline-none coursekit-transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:coursekit-pointer-events-none data-[disabled]:coursekit-opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="coursekit-absolute coursekit-left-2 coursekit-flex coursekit-h-3.5 coursekit-w-3.5 coursekit-items-center coursekit-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="coursekit-h-4 coursekit-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "coursekit-relative coursekit-flex coursekit-cursor-default coursekit-select-none coursekit-items-center coursekit-rounded-sm coursekit-py-1.5 coursekit-pl-8 coursekit-pr-2 coursekit-text-sm coursekit-outline-none coursekit-transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:coursekit-pointer-events-none data-[disabled]:coursekit-opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
      className
    )}
    {...props}
  >
    <span className="coursekit-absolute coursekit-left-2 coursekit-flex coursekit-h-3.5 coursekit-w-3.5 coursekit-items-center coursekit-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="coursekit-h-2 coursekit-w-2 coursekit-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "coursekit-px-2 coursekit-py-1.5 coursekit-text-sm coursekit-font-semibold",
      inset && "coursekit-pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "coursekit--mx-1 coursekit-my-1 coursekit-h-px coursekit-bg-neutral-100 dark:coursekit-bg-neutral-800",
      className
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("coursekit-ml-auto coursekit-text-xs coursekit-tracking-widest coursekit-opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
