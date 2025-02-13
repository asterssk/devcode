"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const positioning = {
  default: `left-[50%] top-[50%] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg`,
  screen: `min-w-full sm:rounded-none md:border-solid md:rounded-lg md:h-rest md:max-w-(--breakpoint-lg) sm:w-[95%]`,
  full: "inset-0 w-screen h-screen rounded-none border-none",
};

const animations = {
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  slide: `data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,
  //   slide: `data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]`,
};

const dialogVariants = cva(
  "fixed z-50 grid gap-4 border bg-background shadow-lg duration-200 overflow-clip h-full w-full sm:h-auto",
  {
    variants: {
      variant: {
        default: cn(positioning.default, animations.base, animations.slide),
        screen: cn(
          positioning.default,
          positioning.screen,
          animations.base,
          animations.slide,
          "flex flex-col gap-0 p-0 md:border-solid"
        ),
        full: cn(
          positioning.full,
          animations.base,
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "flex flex-col gap-0 p-0"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const router = useRouter();
  return (
    <DialogPrimitive.Root
      onOpenChange={(isOpen) => (isOpen ? {} : router.back())}
      {...props}
    />
  );
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-black/80 backdrop-blur-xs",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  variant,
  children,
  ...props
}: DialogContentProps) {
  const [isFormDirty] = useQueryState("dirty");

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(dialogVariants({ variant, className }))}
        {...props}
        onEscapeKeyDown={(e) => {
          if (isFormDirty) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (isFormDirty) e.preventDefault();
        }}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
