"use client";

import * as React from "react";
import { Modal } from "@/components/site/modal";

/**
 * Easter eggs:
 * - Konami code => retro mode + recruiter modal
 * - Triple right-click => unpublished projects modal
 * - Double Shift + R => developer console overlay
 */
export function EasterEggs() {
  const [retro, setRetro] = React.useState(false);
  const [openRecruiter, setOpenRecruiter] = React.useState(false);
  const [openSecret, setOpenSecret] = React.useState(false);
  const [openDev, setOpenDev] = React.useState(false);

  React.useEffect(() => {
    if (retro) {
      document.documentElement.classList.add("retro");
      document.body.classList.add("retro");
    } else {
      document.documentElement.classList.remove("retro");
      document.body.classList.remove("retro");
    }
  }, [retro]);

  React.useEffect(() => {
    const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];
    let index = 0;

    const onKey = (e: KeyboardEvent) => {
      // Konami
      if (e.code === konami[index]) {
        index++;
        if (index === konami.length) {
          setRetro(true);
          setOpenRecruiter(true);
          index = 0;
          beep();
        }
      } else {
        index = 0;
      }

      // Double shift + R => dev overlay
      if (e.key === "R" && e.shiftKey) {
        if ((window as any).__shiftOnce) {
          setOpenDev(true);
          (window as any).__shiftOnce = false;
          beep(580);
        } else {
          (window as any).__shiftOnce = true;
          setTimeout(() => ((window as any).__shiftOnce = false), 1000);
        }
      }
    };

    // Triple right-click => secret menu
    let rightClicks = 0;
    const onContext = (e: MouseEvent) => {
      rightClicks++;
      if (rightClicks >= 3) {
        setOpenSecret(true);
        rightClicks = 0;
        beep(420);
      }
      setTimeout(() => (rightClicks = 0), 1200);
      e.preventDefault();
    };

    const onVoice = (e: Event) => {
      const ce = e as CustomEvent<{ type?: string }>;
      if (ce.detail?.type === "recruiter") {
        setOpenRecruiter(true);
        beep(640);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("voice-action", onVoice as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("voice-action", onVoice as EventListener);
    };
  }, []);

  return (
    <>
      <RecruiterModal open={openRecruiter} onClose={() => setOpenRecruiter(false)} onDisableRetro={() => setRetro(false)} />
      <SecretProjectsModal open={openSecret} onClose={() => setOpenSecret(false)} />
      <DevConsoleModal open={openDev} onClose={() => setOpenDev(false)} />
    </>
  );
}

function RecruiterModal({ open, onClose, onDisableRetro }: { open: boolean; onClose: () => void; onDisableRetro: () => void }) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Formulaire recruteur">
      <div className="space-y-3">
        <h3 className="font-heading text-xl font-semibold">Portail Recruteur (Secret)</h3>
        <p className="text-sm text-foreground/80">
          Merci de laisser vos coordonnées — je vous envoie mon CV et un portfolio détaillé.
        </p>
        <form
          name="recruiter-lead"
          method="POST"
          data-netlify="true"
          action="/merci"
          className="grid gap-2 rounded-md border bg-muted/30 p-3"
        >
          <input type="hidden" name="form-name" value="recruiter-lead" />
          <label className="text-xs">Nom</label>
          <input name="name" required className="h-9 rounded-md border px-2 text-sm" placeholder="Votre nom" />
          <label className="text-xs">Email</label>
          <input name="email" type="email" required className="h-9 rounded-md border px-2 text-sm" placeholder="vous@email.com" />
          <label className="text-xs">Entreprise</label>
          <input name="company" className="h-9 rounded-md border px-2 text-sm" placeholder="Nom de l’entreprise" />
          <div className="mt-2 flex gap-2">
            <button className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground shadow-sm hover:opacity-90">
              Envoyer
            </button>
            <button
              type="button"
              onClick={onDisableRetro}
              className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
              aria-label="Quitter mode rétro"
              title="Quitter mode rétro"
            >
              Quitter mode rétro
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function SecretProjectsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Projets non publiés">
      <div className="space-y-3">
        <h3 className="font-heading text-xl font-semibold">Projets non publiés</h3>
        <ul className="list-disc pl-5 text-sm text-foreground/80">
          <li>Refonte vitrine — Menuiserie artisanale (en cours)</li>
          <li>Site solidaire — Banque alimentaire locale (spécifique)</li>
          <li>Portfolio boutiques — multi-villes (bientôt)</li>
        </ul>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
          >
            Fermer
          </button>
        </div>
      </div>
    </Modal>
  );
}

function DevConsoleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Console développeur">
      <div className="space-y-2">
        <h3 className="font-heading text-xl font-semibold">Console développeur</h3>
        <div className="rounded-md border bg-muted/40 p-3 text-sm">
          <pre className="whitespace-pre-wrap break-words">
{`Build: OK
Perf: 95/100
SEO: 98/100
A11y: AA

Next.js App Router • Tailwind • Shadcn/UI
Strict CSP • Netlify • i18n FR/EN
`}
          </pre>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
          >
            Fermer
          </button>
        </div>
      </div>
    </Modal>
  );
}

function beep(freq = 700) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), 120);
  } catch {
    // ignore
  }
}