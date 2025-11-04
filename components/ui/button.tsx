import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "cta";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  default: "relative overflow-hidden bg-primary text-primary-foreground hover:opacity-90 btn-shine",
  // Neutral, understated secondary (outline dark)
  secondary: "border border-foreground/20 bg-transparent text-foreground hover:bg-accent",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  // CTA premium: gradient shift, elevation, ripple
  cta:
    "relative overflow-hidden bg-gradient-to-r from-primary to-[hsl(219_81%_56%)] text-primary-foreground " +
    "shadow-sm transition-transform will-change-transform hover:scale-[1.05] hover:shadow-lg btn-ripple btn-gradient-shift",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

// Very light click sound using Web Audio API (no external asset)
function playClickSound() {
  if (typeof window === "undefined") return;
  try {
    const w = window as any;
    const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!AudioCtx) return;
    w.__btnAudioCtx = w.__btnAudioCtx || new AudioCtx();
    const ctx: AudioContext = w.__btnAudioCtx;

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = "triangle";
    o.frequency.setValueAtTime(700, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(420, ctx.currentTime + 0.1); // slight downward chirp

    g.gain.setValueAtTime(0.02, ctx.currentTime); // very low volume
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    o.connect(g);
    g.connect(ctx.destination);

    o.start();
    o.stop(ctx.currentTime + 0.13);
  } catch {
    // no-op if audio fails
  }
}

function attachRippleHandler(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string } = {}
) {
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--ripple-x", `${x}px`);
    el.style.setProperty("--ripple-y", `${y}px`);
    // trigger
    el.classList.remove("btn-rippling");
    // Force reflow to restart animation
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.classList.add("btn-rippling");

    // play subtle click tone
    playClickSound();

    props.onMouseDown?.(e as any);
  };
  return onMouseDown;
}

export function Button({
  asChild = false,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const extraProps: Record<string, any> = {
      className: cn(classes, child.props.className),
    };
    if (variant === "cta") {
      extraProps.onMouseDown = attachRippleHandler(child.props);
    }
    return React.cloneElement(child, extraProps);
  }

  const rest = { ...props } as React.ButtonHTMLAttributes<HTMLButtonElement>;
  if (variant === "cta") {
    rest.onMouseDown = attachRippleHandler(props);
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}