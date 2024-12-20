import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center tracking-wide justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:bg-neutral-300/70 disabled:from-neutral-200/70 disabled:to-neutral-200/70 disabled:text-gray-600 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-tr from-cyan-400 to-blue-600 text-primary-foreground hover:from-blue-600 hover:to-cyan-400 transition-all duration-500",
        destructive:
          "bg-gradient-to-tr from-rose-400 to-red-600 text-destructive-foreground hover:from-red-600 hover:to-rose-400 transition-all duration-500",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-tr from-gray-400/20 to-gray-400/40 text-secondary-foreground hover:from-gray-400/50 to-gray-400/30 transition-all duration-500",
        tertiary:
          "bg-gradient-to-tr from-blue-400/30 to-blue-400/50 text-blue-600 hover:from-blue-400/50 hover:to-blue-400/40 transition-all duration-500",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        muted: "bg-neutral-100 text-neutral-500/80 hover:bg-neutral-200/50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-6 rounded-md px-2 text-xs",
        md: "h-8 rounded-md px-4 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-10 rounded-md px-16",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
