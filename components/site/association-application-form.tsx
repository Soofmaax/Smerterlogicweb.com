"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Fields = {
  association: string;
  email: string;
  mission: string;
  why: string;
  website?: string;
  "bot-field"?: string;
};

export function AssociationApplicationForm() {
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

  const assocVal = watch("association");
  const emailVal = watch("email");
  const missionVal = watch("mission");
  const whyVal = watch("why");

  return (
    <form
      name="association-application"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/merci"
      className="mt-4 grid gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" name="form-name" value="association-application" />
      <p className="hidden">
        <label>Ne pas remplir: <input {...register("bot-field")} /></label>
      </p>

      {/* Association name */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="association"
            className={`peer fl-input h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.association ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("association", { required: "Champ requis." })}
          />
          <label
            htmlFor="association"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            Nom de l’association
          </label>
          {touchedFields.association && !errors.association && assocVal ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.association && <div className="text-sm text-red-500">{errors.association.message}</div>}
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="email"
            type="email"
            className={`peer fl-input h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.email ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("email", {
              required: "Champ requis.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide." },
            })}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            Email de contact
          </label>
          {touchedFields.email && !errors.email && emailVal ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
      </div>

      {/* Mission (max 500 chars) */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <textarea
            id="mission"
            rows={5}
            maxLength={500}
            className={`peer fl-input w-full rounded-md border bg-background px-3 py-2 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.mission ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("mission", { required: "Champ requis.", minLength: { value: 20, message: "Au moins 20 caractères." } })}
          />
          <label
            htmlFor="mission"
            className="pointer-events-none absolute left-3 top-3 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            Description de la mission (500 caractères max)
          </label>
          {touchedFields.mission && !errors.mission && missionVal && missionVal.length >= 20 ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.mission && <div className="text-sm text-red-500">{errors.mission.message}</div>}
      </div>

      {/* Why need a site */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <textarea
            id="why"
            rows={4}
            className={`peer fl-input w-full rounded-md border bg-background px-3 py-2 outline-none ring-offset-background transition-colors input-glow placeholder-transparent
            ${errors.why ? "border-red-400" : "border-foreground/20"}
            `}
            placeholder=" "
            {...register("why", { required: "Champ requis.", minLength: { value: 20, message: "Au moins 20 caractères." } })}
          />
          <label
            htmlFor="why"
            className="pointer-events-none absolute left-3 top-3 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            Pourquoi avez-vous besoin d’un site ?
          </label>
          {touchedFields.why && !errors.why && whyVal && whyVal.length >= 20 ? (
            <CheckCircle2 className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-green-500 transition-transform duration-300" />
          ) : null}
        </div>
        {errors.why && <div className="text-sm text-red-500">{errors.why.message}</div>}
      </div>

      {/* Existing website (optional) */}
      <div className="grid gap-2">
        <div className="relative fl-group">
          <input
            id="website"
            type="url"
            className="peer fl-input h-11 w-full rounded-md border bg-background px-3 outline-none ring-offset-background transition-colors input-glow placeholder-transparent border-foreground/20"
            placeholder=" "
            {...register("website")}
          />
          <label
            htmlFor="website"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground
            peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-foreground"
          >
            Site web actuel (si existe)
          </label>
        </div>
      </div>

      <div>
        <Button type="submit" className="rounded-full btn-lift" variant="cta" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours...
            </span>
          ) : (
            "Envoyer ma candidature"
          )}
        </Button>
      </div>
    </form>
  );
}