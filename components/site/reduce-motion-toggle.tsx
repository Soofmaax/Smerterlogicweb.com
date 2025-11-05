"use client";

import * as React from "react";

/**
 * ReduceMotionToggle
 * - Allows user to force-disable animations (manual override).
 * - Persists in localStorage and reloads the page to apply consistently.
 */
export function ReduceMotionToggle() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    try {
      setEnabled(localStorage.getItem("reduce_motion") === "1");
    } catch {
      // ignore
    }
  }, []);

  const toggle = () => {
    try {
      const next = !enabled;
      localStorage.setItem("reduce_motion", next ? "1" : "0");
      setEnabled(next);
      // Reload to let components re-evaluate the flag cleanly
      window.location.assign(window.location.href);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-20 left-6 z-[60]">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-sm shadow hover:bg-accent"
        aria-pressed={enabled}
        aria-label="Réduire les animations"
        title="Réduire les animations"
      >
        {enabled ? "🔕 Animations réduites" : "🎛 Réduire les animations"}
      </button>
    </div>
  );
}