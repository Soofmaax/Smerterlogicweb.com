"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  locale: "fr" | "en";
  action: string;
};

type Fields = {
  firstName: string;
  phone: string;
  metier: string;
  city?: string;
  "bot-field"?: string;
};

export function ContactForm({ locale, action }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    watch,
  } = useForm<Fields>({ mode: "onChange" });

  const onSubmit = async (_: Fields, e?: React.BaseSyntheticEvent) => {
    const form = e?.target as HTMLFormElement | undefined;
    if (form) form.submit();
  };

  const t = {
    firstName: locale === "fr" ? "Prénom" : "First name",
    phone: locale === "fr" ? "Téléphone" : "Phone",
    metier: locale === "fr" ? "Métier" : "Trade",
    city: locale === "fr" ? "Ville (optionnel)" : "City (optional)",
    send: locale === "fr" ? "📞 Être rappelé aujourd'hui" : "📞 Call me back today",
    sending: locale === "fr" ? "Envoi en cours..." : "Sending...",
    required: locale === "fr" ? "Champ requis." : "Required field.",
    reassurance:
      locale === "fr"
        ? "✓ Sans engagement ✓ Réponse sous 2h ✓ Audit offert"
        : "✓ No commitment ✓ Reply within 2h ✓ Free audit",
    invalidPhone: locale === "fr" ? "Numéro invalide (ex: 06 12 34 56 78)." : "Invalid phone number.",
    placeholderFirst: locale === "fr" ? "Votre prénom" : "Your first name",
    placeholderPhone: locale === "fr" ? "06 12 34 56 78" : "+33 6 12 34 56 78",
    placeholderCity: locale === "fr" ? "Votre ville" : "Your city",
  };

  const firstNameVal = watch("firstName");
  const phoneVal = watch("phone");
  const metierVal = watch("metier");

  const validatePhone = (val: string) => {
    const raw = String(val || "");
    const sanitized = raw.replace(/[\\s.()-]/g, "");
    if (locale === "fr") {
      // Accept formats like 06XXXXXXXX or +33XXXXXXXXX (no spaces after sanitize)
      const ok = /^(\+33|0)[1-9]\d{8}$/.test(sanitized);
      return ok || t.invalidPhone;
    }
    // Generic international lenient check for EN
    const ok = /^[+]?[\d\s().-]{6,}$/.test(raw);
    return ok || t.invalidPhone;
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action={action}
      className="mt-4 grid gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>Don’t fill: <input {...register("bot-field")} /></label>
      </p>

      {/* Prénom */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="firstName"
            name="firstName"
            className={`peer fl-input h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.firstName ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("firstName", { required: t.required })}
          />
          <label
            htmlFor="firstName"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            {t.firstName}
          </label>
          {touchedFields.firstName && !errors.firstName ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.firstName && <div className="text-sm text-red-500">{errors.firstName.message}</div>}
      </div>

      {/* Téléphone */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`peer fl-input h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.phone ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("phone", {
              required: t.required,
              validate: validatePhone,
            })}
          />
          <label
            htmlFor="phone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            {t.phone}
          </label>
          {touchedFields.phone && !errors.phone ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.phone && <div className="text-sm text-red-500">{errors.phone.message}</div>}
      </div>

      {/* Métier */}
      <div className="grid gap-2">
        <div className="relative">
          <select
            id="metier"
            name="metier"
            className={`h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background transition-colors
            ${errors.metier ? "border-red-400" : "border-foreground/20"}
            `}
            {...register("metier", { required: t.required })}
            defaultValue=""
          >
            <option value="" disabled>{t.metier}</option>
            <option value="Plombier">{locale === "fr" ? "Plombier" : "Plumber"}</option>
            <option value="Électricien">{locale === "fr" ? "Électricien" : "Electrician"}</option>
            <option value="Boulanger">{locale === "fr" ? "Boulanger" : "Baker"}</option>
            <option value="Coiffeur">{locale === "fr" ? "Coiffeur" : "Hairdresser"}</option>
            <option value="Artisan du Bâtiment">{locale === "fr" ? "Artisan du Bâtiment" : "General Contractor"}</option>
            <option value="Autre">{locale === "fr" ? "Autre" : "Other"}</option>
          </select>
        </div>
        {errors.metier && <div className="text-sm text-red-500">{errors.metier.message}</div>}
      </div>

      {/* Ville (optionnel) */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="city"
            name="city"
            className="peer fl-input h-11 w-full rounded-md border border-foreground/20 bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent"
            placeholder=" "
            {...register("city")}
          />
          <label
            htmlFor="city"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            {t.city}
          </label>
        </div>
      </div>

      <div>
        <Button type="submit" className="rounded-full" variant="cta" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.sending}
            </span>
          ) : (
            t.send
          )}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">{t.reassurance}</p>
      </div>
    </form>
  );
}