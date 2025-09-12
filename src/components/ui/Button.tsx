import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "web3" | "outline" | "ghost" | "destructive" | "mint" | "navy";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group";

    const variants = {
      default: "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
      web3: "bg-gradient-to-r from-mint to-mint-800 text-navy hover:shadow-lg hover:shadow-mint/25 hover:scale-105 font-bold",
      mint: "bg-mint text-navy hover:bg-mint-800 hover:shadow-lg hover:shadow-mint/30",
      navy: "bg-navy text-white hover:bg-navy-800 hover:shadow-lg hover:shadow-navy/30",
      outline: "border-2 border-mint text-mint bg-transparent hover:bg-mint hover:text-navy backdrop-blur-sm",
      ghost: "text-white hover:bg-white/10 backdrop-blur-sm",
      destructive: "bg-error text-white hover:bg-error-dark hover:shadow-lg hover:shadow-error/30",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
      xl: "h-16 px-10 text-xl",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect for web3 variant */}
        {variant === "web3" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };