import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-brand-blue text-white hover:bg-blue-700 shadow-md",
      secondary: "bg-primary-800 text-white hover:bg-primary-700",
      outline: "border border-primary-200 bg-transparent hover:bg-primary-100 text-primary-900",
      ghost: "hover:bg-primary-100 hover:text-primary-900 text-primary-600",
      link: "text-brand-blue underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
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
