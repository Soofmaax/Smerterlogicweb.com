# BODACC lead pipeline (GitHub Actions)

This job fetches recent company creations from a BODACC RSS/Atom feed, enriches with Pappers (and optionally Hunter), then posts leads to a Zoho Flow webhook (or any HTTP endpoint).

## Files

- `scripts/bodacc/bodacc.py` — main pipeline
- `scripts/bodacc/requirements.txt` — Python deps
- `.github/workflows/bodacc.yml` — scheduled workflow
- `scripts/bodacc/templates/email-default.md` — editable email template (subject + body)

## Required secrets (Repository → Settings → Secrets and variables → Actions → Secrets)

- `BODACC_FEED_URL` — URL of the BODACC feed for new company creations (RSS/Atom)
- `ZOHO_FLOW_WEBHOOK` — HTTPS endpoint to receive leads (Zoho Flow or custom)

## Optional secrets

- `PAPPERS_API_KEY` — token for https://api.pappers.fr (enrichment by SIREN/denomination)
- `HUNTER_API_KEY` — token for https://api.hunter.io (domain/contacts discovery)

## Optional variables (Repository → Settings → Secrets and variables → Actions → Variables)

- `BODACC_MAX_ITEMS` — limit items processed per run (default 50)
- `BODACC_CITY_ALLOW` — comma-separated list of cities to keep (case-insensitive)
- `BODACC_NAF_PREFIX_ALLOW` — comma-separated list of NAF code prefixes to keep (e.g. `620,731`)
- `BODACC_EMAIL_TEMPLATE_PATH` — path to editable template file (default: `scripts/bodacc/templates/email-default.md`)
- `ZOHO_BOOKINGS_LINK` — booking link used in email template
- `BODACC_EMAIL_SIGNATURE` — signature text used in email template

## Email template format

The template is a single Markdown-like file with a subject header and body:

```
Subject: Idée rapide pour le site de {{company_name}}

Bonjour,

... body content ...
{{bookings_link}}

{{my_signature}}
```

Supported tokens are replaced before posting to Zoho Flow:
- `{{company_name}}` `{{denomination}}` `{{city}}` `{{website}}`
- `{{link}}` (BODACC item link) `{{published_at}}`
- `{{bookings_link}}` (from variable `ZOHO_BOOKINGS_LINK`)
- `{{my_signature}}` (from `BODACC_EMAIL_SIGNATURE`)

The pipeline includes fields in the webhook payload:
- `to_email` (best candidate from Hunter, if any)
- `email_candidates` (list of discovered emails)
- `email_subject`, `email_body` (rendered from template)

Your Zoho Flow can use these fields to send the outreach email, or ignore them if you prefer a Flow-side template.

## Payload example (POSTed to webhook)

```json
{
  "source": "bodacc",
  "company_name": "ACME SARL",
  "denomination": "ACME SARL",
  "siren": "123456789",
  "siret": "12345678900012",
  "code_naf": "6201Z",
  "libelle_code_naf": "Programmation informatique",
  "ville": "Paris",
  "adresse": "12 Rue Exemple",
  "site": "https://acme.fr",
  "emails": [{ "value": "contact@acme.fr" }],
  "email_pattern": "first.last",
  "to_email": "contact@acme.fr",
  "email_subject": "Idée rapide pour le site de ACME SARL",
  "email_body": "Bonjour, ...",
  "link": "https://bodacc.example/item/abc",
  "published_at": "2025-11-14T08:00:00Z",
  "ts": "2025-11-14T09:00:00Z"
}
```

## Notes

- The script is idempotent per run and uses simple in-memory de-duplication. Your CRM/Flow should deduplicate by SIREN/email.
- If `PAPPERS_API_KEY` is not set, enrichment is skipped.
- If `HUNTER_API_KEY` is not set or no domain is known, contact discovery is skipped.
- Set cron in `.github/workflows/bodacc.yml` to match your timezone/schedule.