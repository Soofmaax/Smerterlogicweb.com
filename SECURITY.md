# Security Policy — SmarterLogicWeb

We take security seriously and strive to keep this project safe and reliable.

## Supported Versions

This repository is actively maintained on the `main` branch. Security updates are applied continuously. We recommend always deploying the latest version from `main`.

## Reporting a Vulnerability

If you discover a security issue, please report it responsibly:

- Email: security@smarterlogicweb.com (or contact@smarterlogicweb.com)
- Subject: [Security Report] Vulnerability in smarterlogicweb.com
- Include:
  - A clear description of the issue and potential impact
  - Steps to reproduce (PoC preferred)
  - Affected URLs and configurations
  - Any logs or screenshots that help us understand the context

We aim to acknowledge reports within 72 hours and provide a remediation plan as soon as possible. Please avoid public disclosure until a fix is released.

## Scope

- Next.js application (FR/EN)
- Serverless API routes under `/api/*` (e.g., health, csp-report, google-reviews, subscribe)
- CI/CD workflows and configurations in this repository

## Out of Scope

- Third-party services (e.g., Netlify, Google Places API, Supabase) beyond our configuration and usage
- Social engineering and physical attacks
- Denial of service (DoS) without a proven vulnerability in our code

## Best Practices Implemented

- Strict Content Security Policy (CSP) with reporting
- HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy
- Server-side input validation and rate limiting for API routes
- No secrets committed; environment variables documented in `.env.example`
- GitHub Actions security scanning (CodeQL), dependency audit, and SBOM generation

## Coordinated Disclosure

We appreciate responsible disclosures and will credit researchers (if desired) after the fix is released.

Thank you for helping keep SmarterLogicWeb secure.