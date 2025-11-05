"use client";

import * as React from "react";

/**
 * Voice commands (webkitSpeechRecognition fallback):
 * - "recrutement" => open recruiter portal (dispatch event)
 * - "projets artisans/associations" => filter
 * - "contact" => navigate /contact
 */
export function VoiceCommands() {
  const [listening, setListening] = React.useState(false);
  const srRef = React.useRef<any>(null);

  const start = () => {
    try {
      const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (!SR) return;
      const sr = new SR();
      sr.lang = "fr-FR";
      sr.interimResults = false;
      sr.maxAlternatives = 1;
      sr.onresult = (event: any) => {
        const text = event.results[0][0].transcript?.toLowerCase() || "";
        if (text.includes("recrutement")) {
          window.dispatchEvent(new CustomEvent("voice-action", { detail: { type: "recruiter" } }));
        }
        if (text.includes("projets")) {
          if (text.includes("artisan")) {
            window.dispatchEvent(new CustomEvent("voice-filter", { detail: { filter: "artisans" } }));
          } else if (text.includes("association")) {
            window.dispatchEvent(new CustomEvent("voice-filter", { detail: { filter: "associations" } }));
          }
        }
        if (text.includes("contact")) {
          window.location.assign("/contact");
        }
        setListening(false);
      };
      sr.onerror = () => setListening(false);
      sr.onend = () => setListening(false);
      sr.start();
      srRef.current = sr;
      setListening(true);
    } catch {
      // no-op
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <button
        type="button"
        onClick={start}
        className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-sm shadow hover:bg-accent"
        aria-live="polite"
      >
        {listening ? "🎙 Écoute..." : "🎙 Commandes vocales"}
      </button>
    </div>
  );
}