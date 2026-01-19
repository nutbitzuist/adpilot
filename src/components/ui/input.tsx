import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-2 border-foreground bg-background px-3 py-2 text-sm font-medium shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all file:border-0 file:bg-transparent file:text-sm file:font-bold placeholder:text-muted-foreground focus:shadow-[1px_1px_0px_0px_hsl(var(--foreground))] focus:translate-x-0.5 focus:translate-y-0.5 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
