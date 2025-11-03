import React from "react";
import { cn } from "@/lib/utils";

type Item = {
  value: string;
  label: string;
};

export function StatsCard({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  return (
    <div className={cn("stat-card shadow-lg", className)}>
      <div className="space-y-6">
        {items.map((it, i) => (
          <div key={i} className={cn("pt-2", i !== 0 && "border-t border-white/20 pt-6")}>
            <div className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
              {it.value}
            </div>
            <div className="mt-3 text-lg font-medium tracking-tight text-white/90">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}