import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "bg-black text-[#dc2626] hover:border-[#dc2626] border border-gray-300 focus-visible:border-[#dc2626] focus-visible:ring-[#dc2626] placeholder:text-muted-foreground aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 resize-none text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }