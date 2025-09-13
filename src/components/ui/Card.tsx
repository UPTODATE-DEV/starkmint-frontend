import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "glow";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white border border-gray-200 shadow-sm",
      glass: "bg-white border border-gray-200 shadow-sm",
      glow: "bg-white border border-gray-200 shadow-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg text-card-foreground transition-all duration-300 hover:shadow-lg",
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

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 p-8", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-bold leading-none tracking-tight text-white",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-base text-white/70 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-8 pt-0", className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-8 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};