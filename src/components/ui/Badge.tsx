import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "outline";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-sm px-3 py-1 text-[11px] font-bold tracking-widest uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2";
    
    const variants = {
      default: "bg-gray-100 text-brand-navy",
      brand: "bg-brand-navy text-brand-orange",
      outline: "border border-border text-foreground",
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

