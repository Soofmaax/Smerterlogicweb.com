"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { MessageCircle, X, Send, Mail, Calendar, ChevronRight } from "lucide-react";

type Role = "bot" | "user";
type Branch = "home" | "tarifs" | "rdv" | "formule" | "question";

type Message = {
  id: string;
  role: Role;
  content: React.ReactNode;
};

type QuizState = {
  gallery?: boolean;
  blog?: boolean;
  booking?: boolean;
};

function useTypingDelay() {
  const [typing, setTyping] = React.useState(false);
  const show = (ms = 600) => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), ms);
    return () => clearTimeout(t);
  };
  return { typing, show };
}

function QuickButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 btn-lift",
        className
      )}
    />
  );
}

export function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [bubbleVisible, setBubbleVisible] = React.useState(false); // bubble hidden until hesitation detected
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [branch, setBranch] = React.useState<Branch>("home");
  const [input, setInput] = React.useState("");
  const [quiz, setQuiz] = React.useState<QuizState>({});
  const pathname = usePathname() || "/";
  const { typing, show } = useTypingDelay();
  const openedRef = React.useRef(false);
  const greetRef = React.useRef<() => void>(() => {});
  const goTarifsRef = React.useRef<() => void>(() => {});
  const goFormuleRef = React.useRef<() => void>(() => {});

  const push = React.useCallback((role: Role, content: React.ReactNode) => {
    setMessages((m) => [...m, { id: `${Date.now()}-${m.length}`, role, content }]);
  }, []);

  // Quick recommendation by activity (placeholder)
  const recommend = React.useCallback(
    (activity: string) => {
      const a = activity.toLowerCase();
      track(`chat_recommend_${a}`);
      push(
        "bot",
        <>
          Pour {activity}, commencez avec <strong>Essentiel</strong> pour une présence claire. Si vous avez besoin de blog/actualités, FAQ/témoignages ou d’intégrations avancées, passez sur <strong>Professionnel</strong> ou <strong>Premium</strong>.
        </>
      );
      push(
        "bot",
        <div className="mt-2 flex flex-wrap gap-2">
          <QuickButton onClick={() => goFormuleRef.current()}>Lancer le mini‑quiz</QuickButton>
          <QuickButton onClick={() => goTarifsRef.current()}>Voir les tarifs <ChevronRight className="h-4 w-4" /></QuickButton>
        </div>
      );
    },
    [push, goFormuleRef, goTarifsRef]
  );

  // First question of the mini‑quiz (placeholder)
  const askGallery = React.useCallback(() => {
    push(
      "bot",
      <>
        Avez‑vous besoin d’une galerie/portfolio pour présenter vos réalisations ?
        <div className="mt-2 flex flex-wrap gap-2">
          {["Oui", "Non"].map((b) => (
            <QuickButton key={b} onClick={() => push("bot", b === "Oui" ? <>Parfait, noté.</> : <>Très bien.</>)}>
              {b}
            </QuickButton>
          ))}
        </div>
      </>
    );
  }, [push]);

  const openChat = React.useCallback(
    (reason: string) => {
      if (openedRef.current) return;
      openedRef.current = true;
      setOpen(true);
      track(`chat_open_${reason}`);
      // call the latest greet without referencing it in deps
      try {
        greetRef.current();
      } catch {
        // no-op
      }
    },
    [setOpen]
  );

  const goTarifs = React.useCallback(() => {
    setBranch("tarifs");
    track("chat_branch_tarifs");
    push(
      "bot",
      <>
        Je ne publie plus de grille tarifaire détaillée en ligne. Les projets sont désormais chiffrés uniquement sur devis, en
        fonction de votre situation (création, refonte, volume de contenus, délais).
      </>
    );
    push(
      "bot",
      <div className="mt-2 flex flex-wrap gap-2">
        <QuickButton>
          <Link href="/contact">Demander un devis</Link>
        </QuickButton>
      </div>
    );
  }, [push, setBranch]);

  const goRDV = React.useCallback(() => {
    setBranch("rdv");
    track("chat_branch_rdv");
    push(
      "bot",
      <>D’accord. Le plus simple est de passer par la page contact ou de réserver un audit gratuit.</>
    );
    push(
      "bot",
      <div className="mt-2 flex flex-wrap gap-2">
        <QuickButton>
          <Link href="/contact">Aller à la page contact</Link>
        </QuickButton>
        <QuickButton>
          <Link href="/contact">Demander un devis</Link>
        </QuickButton>
      </div>
    );
  }, [push, setBranch]);

  const goFormule = React.useCallback(() => {
    setBranch("formule");
    track("chat_branch_formule");
    push("bot", <>Répondez à ces 3 questions pour une recommandation rapide.</>);
    askGallery();
  }, [push, setBranch, askGallery]);

  const goQuestion = React.useCallback(() => {
    setBranch("question");
    track("chat_branch_question");
    push(
      "bot",
      <>
        D’accord. Pour une réponse précise, le mieux est de passer par le formulaire de contact.
        <div className="mt-2 flex flex-wrap gap-2">
          <QuickButton>
            <Link href="/contact">Ouvrir le formulaire de contact</Link>
          </QuickButton>
        </div>
      </>
    );
  }, [push, setBranch]);

  const greet = React.useCallback(() => {
    push("bot", <>Bonjour, je peux vous orienter en quelques clics.</>);
    push(
      "bot",
      <div className="mt-2 flex flex-wrap gap-2">
        <QuickButton onClick={goTarifs}>Voir les tarifs</QuickButton>
        <QuickButton onClick={goRDV}>Parler de votre projet</QuickButton>
        <QuickButton onClick={goQuestion}>Poser une question</QuickButton>
      </div>
    );
  }, [push, goTarifs, goRDV, goQuestion]);

  // keep greetRef in sync
  React.useEffect(() => {
    greetRef.current = greet;
  }, [greet]);

  // keep go refs in sync
  React.useEffect(() => {
    goTarifsRef.current = goTarifs;
  }, [goTarifs]);

  React.useEffect(() => {
    goFormuleRef.current = goFormule;
  }, [goFormule]);

  // Hesitation detection — bubble désactivée pour une expérience plus minimaliste
  React.useEffect(() => {
    setBubbleVisible(false);
  }, [pathname]);

  // Free text + FAQ keywords
  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    push("user", txt);
    setInput("");
    const answer = faqAuto(txt.toLowerCase());
    show();
    setTimeout(() => {
      push("bot", answer);
    }, 700);
  };

  const faqAuto = (t: string): React.ReactNode => {
    const pairs: Array<[RegExp, React.ReactNode]> = [
      [
        /prix|tarif|co[uû]t/,
        <>
          Je fonctionne désormais uniquement sur devis personnalisé. Après un premier échange (email ou visio), je vous envoie un devis
          détaillé et clair, sans surprise. Pour en discuter, le plus simple est de passer par la page{" "}
          <Link href="/contact" className="underline">
            Contact
          </Link>
          .
        </>
      ],
      [
        /refonte/,
        <>
          Pour une refonte (WordPress lent &rarr; site vitrine statique), le budget dépend surtout de la taille du site, du SEO à reprendre
          et des contenus à retravailler. On commence toujours par un audit rapide, puis je vous envoie un devis détaillé. Vous pouvez démarrer via la page{" "}
          <Link href="/contact" className="underline">
            Contact
          </Link>
          .
        </>
      ],
      [/d[ée]lai|combien de temps/, <>Essentiel: 2‑3 semaines, Professionnel: 4‑6 semaines, Premium: 8‑12 semaines (après réception contenus).</>],
      [/wordpress|wix/, <>Wix: lent/limité; WordPress: maintenance et sécurité. Mon approche: statique sur‑mesure — rapide, sécurisée et simple d’usage.</>],
      [/maintenance|bug|support/, <>Support prioritaire inclus selon offre. Option <strong>Formule Évolution</strong> possible (1h/mois cumulable, monitoring, tweaks), sur devis.</>],
      [/h[ée]bergement|serveur/, <>Hébergement Netlify gratuit à vie; pas de maintenance obligatoire. Option <strong>Formule Évolution</strong> si souhaitée.</>],
      [/seo|google|r[ée]f[ée]rencement/, <>SEO on‑page inclus. Les résultats naturels prennent 2‑3 mois. Je vous forme aux bonnes pratiques.</>],
      [/publicit[ée]|ads|adwords/, <>Pas obligatoire. Le SEO suffit souvent aux artisans locaux; la pub peut accélérer si besoin.</>],
      [/analytics|stat/, <>Suivi des visiteurs (GA4/Plausible) selon offre. Tableau simple et clair.</>],
    ];
    const hit = pairs.find(([re]) => re.test(t));
    if (hit) return hit[1];
    return (
      <>
        Merci pour votre message. Pour une réponse précise, laissez votre email — je reviens vers vous sous 24h.
        <div className="mt-2">
          <QuickButton onClick={() => goQuestion()}>Laisser mon email</QuickButton>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Floating bubble — désactivée par défaut pour une interface plus calme */}
      {false && bubbleVisible && !open && (
        <button
          aria-label="Ouvrir le chat"
          className="chat-bubble fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:opacity-90"
          onClick={() => {
            setOpen(true);
            if (!openedRef.current) {
              openedRef.current = true;
              track("chat_open_click");
              greet();
            }
          }}
        >
          <div className="bubble-pulse absolute inset-0 rounded-full" />
          <MessageCircle className="relative h-6 w-6" />
        </button>
      )}

      {/* Overlay + window */}
      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div
            className={cn(
              "chat-window fixed bottom-6 right-6 h-[600px] w-[400px] overflow-hidden rounded-2xl border bg-card shadow-xl sm:bottom-6 sm:right-6",
              "animate-chat-up",
              "max-sm:inset-0 max-sm:h-auto max-sm:w-auto max-sm:rounded-none max-sm:border-0"
            )}
          >
            <header className="flex items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-heading text-sm">S</span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Assistant — smarterlogicweb</div>
                  <div className="text-[11px] text-muted-foreground">Simple, efficace, non intrusif</div>
                </div>
              </div>
              <button aria-label="Fermer" className="rounded p-1 hover:bg-accent" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex h-[calc(100%-120px)] flex-col">
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 border"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border bg-muted/50 px-3 py-2">
                      <span className="typing">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input row */}
              <div className="border-t p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Écrivez votre message…"
                    className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    onClick={send}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                    aria-label="Envoyer"
                    title="Envoyer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  En utilisant ce chat, vous acceptez notre{" "}
                  <Link href="/politique-de-confidentialite" className="underline">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}