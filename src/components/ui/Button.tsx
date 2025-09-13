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
      default: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
      web3: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25 font-bold",
      mint: "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30",
      navy: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-500/30",
      outline: "border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50",
      ghost: "text-gray-700 hover:bg-gray-100",
      destructive: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30",
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
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };