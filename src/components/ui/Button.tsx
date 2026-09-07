import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-sm text-sm font-bold tracking-wide uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-brand-navy text-white hover:bg-brand-orange hover:shadow-premium-hover",
      secondary: "bg-brand-orange text-white hover:bg-[#e65100] hover:shadow-premium-hover",
      outline: "border border-brand-navy bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white",
      ghost: "hover:bg-gray-100 text-brand-navy",
      link: "text-brand-navy underline-offset-4 hover:text-brand-orange hover:underline",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-[13px]",
      lg: "h-14 px-8 text-[14px]",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

