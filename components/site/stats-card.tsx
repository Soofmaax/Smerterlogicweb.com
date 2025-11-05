import React from "react";
import { cn } from "@/lib/utils";

type Item = {
  value: string;
  label: string;
};

type Variant = "dark" | "light";

export function StatsCard({
  items,
  className,
  variant = "dark",
}: {
  items: Item[];
  className?: string;
  variant?: Variant;
}) {
  const isLight = variant === "light";
  return (
    <div className={cn(isLight ? "stat-card--light" : "stat-card shadow-lg", className)}>
      <div className="space-y-6">
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              "pt-2",
              i !== 0 && (isLight ? "border-t border-foreground/10 pt-6" : "border-t border-white/20 pt-6")
            )}
          >
            <div
              className={cn(
                "text-4xl font-bold leading-none tracking-tight md:text-5xl",
                isLight ? "text-foreground" : ""
              )}
            >
              {it.value}
            </div>
            <div
              className={cn(
                "mt-3 text-lg font-medium tracking-tight",
                isLight ? "text-foreground/70" : "text-white/90"
              )}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}