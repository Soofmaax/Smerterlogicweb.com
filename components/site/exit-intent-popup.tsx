"use client";

import * as React from "react";
import { Modal } from "@/components/site/modal";
import { Button } from "@/components/ui/button";

export function ExitIntentPopup() {
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Only desktop (ignore touch devices)
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Only trigger once per session
    try {
      if (sessionStorage.getItem("exit_intent_shown") === "1") return;
    } catch {
      // no-op
    }

    const onMouseOut = (e: MouseEvent) => {
      const y = e.clientY;
      const to = (e as any).relatedTarget || (e as any).toElement;
      // Exit at top of viewport with no related target (leaving document)
      if (y <= 0 && !to) {
        setOpen(true);
        try {
          sessionStorage.setItem("exit_intent_shown", "1");
        } catch {
          // ignore
        }
        // Detach listener after trigger
        document.removeEventListener("mouseout", onMouseOut);
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json", "x-pathname": window.location.pathname },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error("subscribe_failed");
      }
      const url = String(data.downloadUrl || "");
      setDownloadUrl(url || null);
      if (url) {
        try {
          window.open(url, "_blank", "noopener,noreferrer");
        } catch {}
      }
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={() => setOpen(false)} ariaLabel="Télécharger le guide gratuit">
      <div className="flex items-start justify-between gap-3 px-2 pb-2">
        <h3 className="text-lg font-bold leading-snug">
          Attendez ! Téléchargez notre guide gratuit :{" "}
          <span className="text-primary">Les 7 erreurs fatales des artisans sur le web</span>
        </h3>
        <button
          type="button"
          className="rounded-full border px-3 py-1 text-xs hover:bg-accent"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
        >
          Fermer
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-3 p-2">
        <label htmlFor="exit-email" className="block text-sm font-medium">
          Votre email
        </label>
        <input
          id="exit-email"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" className="w-full rounded-full text-base" disabled={busy}>
          📥 Télécharger le guide gratuit
        </Button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {downloadUrl && (
          <p className="text-sm">
            Merci ! Votre téléchargement est prêt:{" "}
            <a className="link-underline link-underline-strong" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              ouvrir le PDF
            </a>
          </p>
        )}
      </form>

      <p className="px-2 pt-1 text-center text-xs text-muted-foreground">
        Aucun spam. Vous pouvez vous désinscrire à tout moment.
      </p>
    </Modal>
  );
}