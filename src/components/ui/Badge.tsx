import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "mint"
    | "navy"
    | "glass";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-blue-100 text-blue-800 border-blue-200",
      secondary: "bg-gray-100 text-gray-800 border-gray-200",
      destructive: "bg-red-100 text-red-800 border-red-200",
      outline: "text-gray-700 border-gray-300 bg-transparent",
      success: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      mint: "bg-green-100 text-green-800 border-green-200",
      navy: "bg-gray-100 text-gray-800 border-gray-200",
      glass: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-white",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };