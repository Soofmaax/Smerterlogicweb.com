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
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] p-6 text-white shadow-lg",
        // Dark plum gradient similar to reference
        "bg-gradient-to-br from-[#2c2438] via-[#241f31] to-[#1a1825]",
        className
      )}
    >
      {/* soft radial highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
      />
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