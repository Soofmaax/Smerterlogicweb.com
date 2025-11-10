# API Endpoints

Base URL: same-origin (Next.js API routes)

## GET /api/health
Health check.

Response:
```json
{
  "status": "ok",
  "time": "2025-01-01T00:00:00.000Z",
  "uptime_seconds": 1234,
  "env": {
    "provider": "netlify",
    "branch": "main",
    "context": "production",
    "commit": "abcdef"
  }
}
```

## POST /api/csp-report
Collect CSP violation reports.

- Content-Type: `application/reports+json`, `application/csp-report` ou `application/json`
- Response: `204 No Content`
- Oversized payloads can be dropped.

## GET /api/google-reviews
Fetch Google rating and latest reviews (server-side proxy).

Query: none  
Headers:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

Response (example):
```json
{
  "rating": 4.9,
  "total": 42,
  "reviews": [
    {
      "author": "John",
      "avatar": "https://...",
      "rating": 5,
      "text": "Great!",
      "date": "2025-01-01T00:00:00.000Z",
      "relative": "il y a 2 mois"
    }
  ],
  "placeId": "xxx",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:xxx"
}
```

Rate limit: 60 req / 10 min / IP.

## POST /api/subscribe
Capture leads.

Content-Type: `application/json`  
Request:
```json
{ "email": "prospect@example.com" }
```

Response:
```json
{ "ok": true, "downloadUrl": "https://..." }
```

Headers:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

Rate limit: 10 req / 10 min / IP.

Notes:
- Validation stricte des inputs (emails valides)
- JSON uniquement (`415` sinon), taille max 20 KB (`413`)
- Persistance Supabase optionnelle (si `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE` configurés)
- Webhook optionnel (Zapier/Make) via `SUBSCRIBE_WEBHOOK`

## Sécurité & CORS
- Endpoints same-origin; CORS non nécessaire
- CSP stricte et headers de sécurité configurés via `netlify.toml`