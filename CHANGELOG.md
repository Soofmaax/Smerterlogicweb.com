# Changelog — SmarterLogicWeb

All notable changes to this project will be documented in this file.

The format is based on
- Keep a Changelog (https://keepachangelog.com/en/1.1.0/)
- Semantic Versioning (https://semver.org/)

## [Unreleased]

### Added
- CI unification and concurrency guards
- Security workflow (npm audit + SBOM) and CodeQL
- Optional Supabase persistence for leads (`/api/subscribe`) with SQL schema
- Branding: README overhaul, docs skeleton, issue/PR templates

### Changed
- Premium UI harmonization (brand blue banner, stripes variant, link underline strong)
- Improved API security: rate limiting, input validation, CSP report handling

### Fixed
- Security workflows: CycloneDX action pinned to v1 (correct tag)
- CI: missing lockfile handling for `npm ci`

## [0.1.0] - 2025-11-10
### Added
- Initial public repository
- Next.js 14 FR/EN site with premium design
- Netlify config with strict security headers (CSP, HSTS, etc.)
- API routes: `/api/health`, `/api/csp-report`, `/api/google-reviews`, `/api/subscribe`