---
document: "TRD — exigences techniques"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.0
date: 2026-10-22
valide_par: "Fabrice — 2026-10-22"
---

# 02 — TRD : exigences techniques

> Découle du PRD (`01-prd.md`). Décrit l'existant et ce qui change. Aucune valeur secrète : seulement des noms de variables (SEC-1).

## Plateformes
- Web uniquement, ordinateur et mobile (largeur minimale 360 px), navigateurs récents (Chrome, Safari, Firefox, Edge).

## Frontend et hébergement
- **Framework** : React 19 + TypeScript, Vite 8, React Router 7 (déjà en place). Globe : `d3-geo`, `topojson-client`, `world-atlas`.
- **Environnement d'exécution** : site statique (build `vite build` → `dist/`), Node pour les scripts de test.
- **Hébergement / déploiement** : à trancher (Q1). Exigence : hébergeur statique qui sert `index.html` pour toutes les routes (réécriture SPA), HTTPS, domaine ICES.

## Backend et données
- **Services** : aucun serveur propre. Contenus (textes, réalisations, actualités) en fichiers TypeScript versionnés (`src/content/fr`, `src/content/en`). Formulaires envoyés en JSON à un service externe (`src/services/forms.ts`).
- **Base de données** : aucune en V1 (voir `05-backend-schema.md`).
- **Région** : sans objet (dépend du service de formulaires retenu).

## Authentification et rôles
- **Méthodes de connexion** : aucune ; site public.
- **Rôles et permissions** : visiteur uniquement. Mise à jour des contenus par commit dans le dépôt (équipe technique).

## Services externes et API
| Service | Usage | Limites / quotas / coût | Détenteur des identifiants | Variable d'environnement |
|---|---|---|---|---|
| Service de formulaires (à choisir, Q2) | Recevoir contact / devis / candidature partenaire | Selon offre (quota mensuel d'envois) | ICES | `VITE_FORMS_ENDPOINT` |
| Google Search Console | Indexation, sitemap | Gratuit | ICES | — |

## Architecture
- **Composants** : `SiteLayout` (en-tête, contenu, Contact partagé, pied de page, modale partenaire) ; pages sous `src/pages` ; sections sous `src/sections/<page>` ; contenus bilingues sous `src/content/<langue>` via `useContent()`.
- **Routes cibles** : `/` (accueil), `/prestations` (expertises, existant), `/realisations`, `/realisations/:slug`, `/actualites`, `/actualites/:slug`, `/a-propos` ; version anglaise selon Q3.
- **Circulation des données** : contenu statique → composants ; formulaire → `submitForm()` → `POST` JSON vers `VITE_FORMS_ENDPOINT` → message de réussite ou d'erreur.
- **Landing** : les transitions (dôme, section figée par `useStackPin`, pauses) et la superposition (`z-index`) sont attachées à la position, pas à la section, pour que l'ordre puisse changer sans casser l'enchaînement.

## Sécurité et confidentialité
- **Données sensibles** : données personnelles des formulaires (nom, email, téléphone, message). Jamais stockées dans le navigateur ni dans le dépôt.
- **Contrôles d'accès** : sans objet côté site ; anti-spam côté service de formulaires (champ piège + limitation du service). Validation dans le navigateur pour l'ergonomie, et côté service quand il le permet (SEC-5).
- **Durée de conservation** : celle du service de formulaires ; à préciser dans la mention de consentement (Q2).
- `.env` ignoré par Git (déjà dans `.gitignore`) ; `.env.example` à créer avec `VITE_FORMS_ENDPOINT=` vide.
- L'envoi simulé actuel (succès affiché sans transmission quand `VITE_FORMS_ENDPOINT` est absent) doit disparaître avant la mise en ligne : sans destinataire, le formulaire affiche une erreur.

## Performance et fiabilité
- **Temps de réponse visés** : LCP < 2,5 s sur mobile 4G ; animations en pause hors écran (déjà en place, `usePauseOffscreen`) ; photos en WebP, dimensionnées.
- **Disponibilité** : celle de l'hébergeur statique.
- **Sauvegardes** : le dépôt Git (GitHub `Fabrice210/ICES-Website`).
- **Tâches longues** : aucune.

## SEO
- Balises `title`, `description`, Open Graph et `canonical` par page et par langue ; `hreflang` FR/EN ; `sitemap.xml` et `robots.txt` dans `public/`.
- Limite connue d'une SPA : le contenu est rendu en JavaScript. Pré-rendu statique des routes à envisager (Q4).

## Environnements et mise en production
- **Développement / préproduction / production** : `npm run dev` (port 5173, réservé à l'utilisateur ; les agents utilisent un autre port), `npm run preview` (4173), production selon Q1.
- **CI/CD** : aucune pour l'instant. Avant toute fusion : `npm run build`, `npm run lint`, `npm test` (contenu, visuel, timings, mobile).

## Décisions techniques clés
| Décision | Raison | Alternative écartée |
|---|---|---|
| Garder React + Vite + React Router | Site déjà construit et testé | Repartir sur Next.js |
| Contenus en fichiers TS versionnés | Pas de back-office à maintenir, contenu bilingue typé | CMS headless (possible plus tard, Q5) |
| Pages de détail par `slug` | URL lisibles et indexables | Modale sur la landing |
| Transitions attachées à la position | Garder l'enchaînement visuel validé quand l'ordre change | Recoder chaque section |

## Questions reportées
> Validées comme reportées par l’utilisateur le 22/10/2026 (« je valide les six documents »). Chaque question se tranche avant la tâche qui en dépend (06-implementation-plan.md) ; le document repasse alors en brouillon jusqu’à revalidation.
- Q1 — Hébergeur et domaine de production (Netlify, Vercel, OVH, autre) ?
- Q2 — Service et destinataire des formulaires (lié à la question Q1 du PRD) ?
- Q3 — URL de la version anglaise : préfixe `/en/…` (recommandé pour le SEO) ou bascule sans changer d'URL comme aujourd'hui ?
- Q4 — Pré-rendu statique des pages pour le SEO : oui ou non en V1 ?
- Q5 — L'équipe ICES doit-elle publier seule actualités et réalisations (CMS) dès la V1 ?

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
