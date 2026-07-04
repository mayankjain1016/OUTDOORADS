import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "outline";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    const variants = {
      default: "border-transparent bg-brand-blue text-white hover:bg-blue-700",
      success: "border-transparent bg-green-100 text-green-800",
      warning: "border-transparent bg-yellow-100 text-yellow-800",
      error: "border-transparent bg-red-100 text-red-800",
      outline: "text-primary-900",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
