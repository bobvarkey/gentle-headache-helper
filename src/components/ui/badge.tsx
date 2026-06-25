import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all",
  {
    variants: {
      variant: {
        default: "clay-badge",
        secondary: "bg-secondary text-secondary-foreground inset-shadow-sm",
        destructive: "clay-badge bg-gradient-to-b from-[#c45c5c] to-[#a84c4c]",
        outline: "border border-input bg-background text-foreground",
        success: "clay-badge success",
        warning: "clay-badge warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };