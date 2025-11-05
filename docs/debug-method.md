# Debug Méthodique — Guide Interne

Utilisez ce guide quand vous rencontrez un bug/erreur pour analyser proprement et proposer des solutions solides.

## 1) Identifier le problème précis

- Quel composant/page ?
- Quelle fonctionnalité ne marche pas ?
- Message d’erreur exact (copier/coller + capture si possible)
- Conditions de reproduction (navigateur, device, URL, étapes)

## 2) Diagnostic

- Cause(s) probable(s) : code, dépendance, config, environnement
- Pourquoi ça ne fonctionne pas (hypothèse argumentée)
- Impact sur le reste du site (portée locale vs globale)

## 3) Deux solutions concrètes

### Solution A
- Approche / plan d’action
- Avantages
- Inconvénients
- Difficulté (faible/moyenne/élevée)

### Solution B
- Approche / plan d’action
- Avantages
- Inconvénients
- Difficulté (faible/moyenne/élevée)

## 4) Recommandation

- Choix recommandé et justification (coût, risque, délai, impact)
- Si incertitude : plan de test/POC rapide

⚠️ Ne jamais supprimer une fonctionnalité sans expliquer pourquoi et proposer des alternatives claires.

## Annexes utiles

- Logs de build/deploy (Netlify/GitHub Actions)
- Console navigateur (erreurs, CSP, 404)
- Performance (Lighthouse) et accessibilité (axe/lint)