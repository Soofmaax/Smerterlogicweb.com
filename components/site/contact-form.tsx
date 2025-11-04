"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  locale: "fr" | "en";
  action: string;
};

type Fields = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
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
    name: locale === "fr" ? "Nom" : "Name",
    email: "Email",
    message: locale === "fr" ? "Message" : "Message",
    consentLabel:
      locale === "fr"
        ? <>J’accepte le traitement de mes données. Voir <Link href="/politique-de-confidentialite" className="underline">la politique de confidentialité</Link>.</>
        : <>I agree to the processing of my data. See <Link href="/en/privacy-policy" className="underline">the privacy policy</Link>.</>,
    send: locale === "fr" ? "Envoyer" : "Send",
    sending: locale === "fr" ? "Envoi en cours..." : "Sending...",
    placeholderName: locale === "fr" ? "Votre nom" : "Your name",
    placeholderEmail: locale === "fr" ? "votrenom@email.com" : "you@email.com",
    placeholderMsg:
      locale === "fr"
        ? "Décrivez votre besoin, votre objectif et votre échéance."
        : "Describe your needs, goal and timeline.",
    tooShort: locale === "fr" ? "Au moins 20 caractères." : "At least 20 characters.",
    invalidEmail: locale === "fr" ? "Email invalide." : "Invalid email.",
    required: locale === "fr" ? "Champ requis." : "Required field.",
  };

  const nameVal = watch("name");
  const emailVal = watch("email");
  const messageVal = watch("message");

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

      {/* Name */}
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">{t.name}</label>
        <div className="relative">
          <input
            id="name"
            className={`h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors
            focus-visible:ring-2 focus-visible:ring-ring
            ${errors.name ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder={t.placeholderName}
            {...register("name", { required: t.required })}
          />
          {touchedFields.name && !errors.name && nameVal ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
          ) : null}
        </div>
        {errors.name && <div className="text-sm text-red-500">{errors.name.message}</div>}
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <div className="relative">
          <input
            id="email"
            type="email"
            className={`h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors
            focus-visible:ring-2 focus-visible:ring-ring
            ${errors.email ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder={t.placeholderEmail}
            {...register("email", {
              required: t.required,
              pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: t.invalidEmail },
            })}
          />
          {touchedFields.email && !errors.email && emailVal ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
          ) : null}
        </div>
        {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
      </div>

      {/* Message */}
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">{t.message}</label>
        <div className="relative">
          <textarea
            id="message"
            rows={6}
            className={`w-full rounded-md border bg-background px-3 py-2 outline-none ring-offset-background transition-colors
            focus-visible:ring-2 focus-visible:ring-ring
            ${errors.message ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder={t.placeholderMsg}
            {...register("message", {
              required: t.required,
              minLength: { value: 20, message: t.tooShort },
            })}
          />
          {touchedFields.message && !errors.message && messageVal && messageVal.length >= 20 ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-green-500" />
          ) : null}
        </div>
        {errors.message && <div className="text-sm text-red-500">{errors.message.message}</div>}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-2">
        <input id="consent" type="checkbox" required className="mt-1" {...register("consent", { required: true })} />
        <label htmlFor="consent" className="text-sm text-foreground/80">{t.consentLabel}</label>
      </div>

      <div>
        <Button type="submit" className="rounded-full" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.sending}
            </span>
          ) : (
            t.send
          )}
        </Button>
      </div>
    </form>
  );
}