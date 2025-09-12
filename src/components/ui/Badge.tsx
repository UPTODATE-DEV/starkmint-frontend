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
      default: "bg-white/10 text-white border-white/20 backdrop-blur-sm",
      secondary: "bg-white/5 text-white/80 border-white/10 backdrop-blur-sm",
      destructive: "bg-error/20 text-error border-error/30 backdrop-blur-sm",
      outline: "text-white border-white/30 bg-transparent backdrop-blur-sm",
      success: "bg-success/20 text-success border-success/30 backdrop-blur-sm",
      warning: "bg-warning/20 text-warning border-warning/30 backdrop-blur-sm",
      mint: "bg-mint/20 text-mint border-mint/30 backdrop-blur-sm glow-mint",
      navy: "bg-navy/20 text-navy border-navy/30 backdrop-blur-sm",
      glass: "bg-white/5 text-white border-white/10 backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-mint/20 focus:ring-offset-2 focus:ring-offset-slate-900",
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