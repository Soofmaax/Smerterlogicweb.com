"use client";

import * as React from "react";

/**
 * AssistantOverlay: displays last voice command and quick actions.
 */
export function AssistantOverlay() {
  const [text, setText] = React.useState<string>("");
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onTranscript = (e: Event) => {
      const ce = e as CustomEvent<{ text?: string }>;
      const t = ce.detail?.text || "";
      if (!t) return;
      setText(t);
      setVisible(true);
      // auto hide after 10s
      const id = window.setTimeout(() => setVisible(false), 10000);
      return () => window.clearTimeout(id);
    };
    window.addEventListener("voice-transcript", onTranscript as EventListener);
    return () => window.removeEventListener("voice-transcript", onTranscript as EventListener);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-[70]">
      <div className="rounded-2xl border bg-card p-3 shadow-lg ring-1 ring-black/10">
        <div className="text-xs text-muted-foreground">Assistant vocal</div>
        <div className="mt-1 text-sm">“{text}”</div>
        <div className="mt-2 flex gap-2">
          <a href="/contact" className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-accent">Contact</a>
          <a href="/#tarifs" className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-accent">Tarifs</a>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-accent"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}