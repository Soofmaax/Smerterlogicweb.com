<div align="center">
  <img src="./public/logo.svg" alt="SmarterLogicWeb" height="72" />
  <h1>🚀 SmarterLogicWeb — Site Vitrine Next.js 14 (FR/EN)</h1>
  <p><strong>La qualité qui se mesure : vitesse, sécurité, résultats.</strong></p>

  <a href="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/security.yml">
    <img alt="Security Scan" src="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/security.yml/badge.svg" />
  </a>
  <a href="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/codeql.yml">
    <img alt="CodeQL" src="https://github.com/Soofmaax/Smerterlogicweb.com/actions/workflows/codeql.yml/badge.svg" />
  </a>
  <a href="./LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>

  <p>
    <a href="#-pourquoi-ce-projet-">Pourquoi ce projet ?</a> •
    <a href="#-features">Features</a> •
    <a href="#-demo">Demo</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-documentation">Docs</a> •
    <a href="#-support--contact">Support</a>
  </p>
</div>

---

🎯 Pourquoi ce projet ?
- Vitrine premium pour artisans/PME, bilingue FR/EN, orientée conversion (CTA clairs, performances élevées).
- Architecture moderne (Next.js 14 App Router) + sécurité soignée (CSP, HSTS, rate limiting).
- Intégration optionnelle BaaS (Supabase) pour capter/persister les leads — sans backend lourd.

✨ Features
- 🧭 Bilingue FR/EN avec routing i18n (Next.js App Router)
- 🎨 Design premium (cartes arrondies, gloss subtil, animations accessibles)
- 🧩 Composants UI réutilisables (Button, Badge, Carousel…)
- 🔒 Sécurité: CSP stricte, HSTS, headers, endpoint /api/csp-report
- 🚦 Healthcheck: /api/health
- 📈 Analytics: Plausible ou Umami (via env)
- 📨 leads: /api/subscribe (validation stricte + rate limit) + persistance Supabase (optionnelle)
- 🧪 CI/CD: Lint/Build, CodeQL, Security Scan (audit + SBOM), Dependabot

🎥 Demo
- Site: https://smarterlogicweb.com (mettre à jour si nécessaire)
- Sitemap: /sitemap.xml • Robots: /robots.txt • Health: /api/health
- Screenshots: placez vos captures dans public/screenshots et référencez-les ici.

🚀 Quick Start
1) Installer
   - npm install
2) Développer
   - npm run dev
   - http://localhost:3000
3) Build/Run
   - npm run build && npm run start

📚 Documentation
- Démarrage, configuration, architecture, déploiement, API et troubleshooting:
  - docs/README.md — [Index](file:///docs/README.md)
  - docs/getting-started/quick-start.md — [Quick Start](file:///docs/getting-started/quick-start.md)
  - ARCHITECTURE.md — [Vue d’ensemble](file:///ARCHITECTURE.md)

🛠️ Tech Stack
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, lucide-react
- CI/CD: GitHub Actions (CI, Security, CodeQL)
- Hébergement: Netlify (plugin Next.js)
- BaaS (optionnel): Supabase (Postgres + RLS) pour leads

🔑 Variables d’environnement (extraits)
Voir .env.example — [Télécharger](file:///.env.example)
- NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible|umami
- GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID
- NEXT_PUBLIC_GUIDE_PDF_URL
- SUBSCRIBE_WEBHOOK (Zapier/Make)
- SUPABASE_URL / SUPABASE_SERVICE_ROLE (optionnel leads)

🤝 Contributing
- Conventions: Conventional Commits
- Lint: npm run lint
- PRs bienvenues — voir CONTRIBUTING.md — [Lire](file:///CONTRIBUTING.md)

📝 License
- MIT — [LICENSE](file:///LICENSE)

📧 Support & Contact
- Contact général — contact@smarterlogicweb.com
- Problèmes de code / bugs — admin@smarterlogicweb.com
- Website: https://smarterlogicweb.com

---

<div align="center">
  <p>Made with ❤️ by <strong>SmarterLogicWeb</strong></p>
  <p>
    🌐 <a href="https://smarterlogicweb.com">Website</a> •
    📧 <a href="mailto:contact@smarterlogicweb.com">Contact</a>
  </p>
  <p>
    <sub>© 2025 SmarterLogicWeb. All rights reserved.</sub>
  </p>
</div>