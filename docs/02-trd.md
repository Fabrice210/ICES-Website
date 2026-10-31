---
document: "TRD — exigences techniques"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.1
date: 2026-10-31
valide_par: "Fabrice — 2026-10-31"
---

# 02 — TRD : exigences techniques

> Découle du PRD (`01-prd.md`). Décrit l'existant et ce qui change. Aucune valeur secrète : seulement des noms de variables (SEC-1).

## Plateformes
- Web uniquement, ordinateur et mobile (largeur minimale 360 px), navigateurs récents (Chrome, Safari, Firefox, Edge).

## Frontend et hébergement
- **Framework** : React 19 + TypeScript, Vite 8, React Router 7 (déjà en place). Globe : `d3-geo`, `topojson-client`, `world-atlas`.
- **Environnement d'exécution** : site statique (build `vite build` → `dist/`), plus une fonction serverless Node sur Vercel (`api/demande.ts`) ; Node pour les scripts de test.
- **Hébergement / déploiement** : Vercel (constaté le 2026-10-31 : `www.ices-consulting.com` répond avec `server: Vercel`), domaine ICES géré chez OVH. Déploiement par Vercel depuis le dépôt GitHub `Fabrice210/ICES-Website` (branche suivie à confirmer par la personne qui a l'accès Vercel). `vercel.json` : réécriture SPA vers `index.html`, sauf `/api/*` et `/campagne/*` ; `cleanUrls` pour servir `/campagne/institutionnel` depuis `institutionnel.html`.

## Backend et données
- **Services** : une seule fonction serverless, `POST /api/demande`, sur Vercel. Elle reçoit en JSON les formulaires du site (contact, candidature partenaire) et ceux des 6 pages de campagne ICES Emailing (`besoin-01` à `besoin-06`), valide les champs côté serveur, rejette le champ piège, puis envoie la demande par e-mail à `FORMS_TO` (contact@ices-consulting.com) via l'API de Resend (appel HTTP, aucune dépendance npm). Contenus (textes, réalisations, actualités) toujours en fichiers TypeScript versionnés (`src/content/fr`, `src/content/en`).
- **Base de données** : aucune (voir `05-backend-schema.md`) ; les demandes ne sont pas stockées par le site, elles arrivent par e-mail.
- **Région** : celle des fonctions Vercel (par défaut).

## Authentification et rôles
- **Méthodes de connexion** : aucune ; site public.
- **Rôles et permissions** : visiteur uniquement. Mise à jour des contenus par commit dans le dépôt (équipe technique).

## Services externes et API
| Service | Usage | Limites / quotas / coût | Détenteur des identifiants | Variable d'environnement |
|---|---|---|---|---|
| Fonction Vercel `api/demande` | Recevoir contact, devis, candidature partenaire et demandes de campagne | Quotas des fonctions Vercel de l'offre du projet | ICES (accès Vercel) | `VITE_FORMS_ENDPOINT=/api/demande` (front) |
| Resend (API d'envoi d'e-mails) | Envoyer chaque demande à contact@ices-consulting.com | Offre gratuite à quota mensuel limité, à vérifier à l'inscription ; domaine `ices-consulting.com` à vérifier par DNS chez OVH | ICES (personne qui a les accès Vercel et OVH) | `RESEND_API_KEY`, `FORMS_FROM`, `FORMS_TO` (serveur uniquement) |
| Google Search Console | Indexation, sitemap | Gratuit | ICES | — |

## Architecture
- **Composants** : `SiteLayout` (en-tête, contenu, Contact partagé, pied de page, modale partenaire) ; pages sous `src/pages` ; sections sous `src/sections/<page>` ; contenus bilingues sous `src/content/<langue>` via `useContent()`.
- **Routes cibles** : `/` (accueil), `/prestations` (expertises, existant), `/realisations`, `/realisations/:slug`, `/actualites`, `/actualites/:slug`, `/a-propos` ; version anglaise selon Q3.
- **Circulation des données** : contenu statique → composants ; formulaire → `submitForm()` → `POST` JSON vers `/api/demande` → validation serveur → e-mail Resend vers `FORMS_TO` → réponse `{ ok: true }` ou erreur générique → message de réussite ou d'erreur. Les pages de campagne (`public/campagne/`) envoient au même endpoint, même origine (pas de CORS).
- **Landing** : les transitions (dôme, section figée par `useStackPin`, pauses) et la superposition (`z-index`) sont attachées à la position, pas à la section, pour que l'ordre puisse changer sans casser l'enchaînement.

## Sécurité et confidentialité
- **Données sensibles** : données personnelles des formulaires (nom, email, téléphone, message). Jamais stockées dans le navigateur ni dans le dépôt.
- **Contrôles d'accès** : la fonction n'accepte que `POST` en JSON (≤ 20 Ko), valide chaque champ selon le doc 05 (obligatoires, formats, longueurs, listes fermées), ignore toute demande dont le champ piège est rempli et refuse un `formulaire` inconnu. La validation du navigateur n'est qu'une aide (SEC-5).
- **Secrets** : `RESEND_API_KEY` seulement dans les variables d'environnement Vercel, saisie par la personne qui a l'accès ; jamais dans le dépôt ni dans le code du navigateur (SEC-1). `.env.example` liste les noms sans valeur.
- **Erreurs** : réponse générique au navigateur (`{ ok: false }`) ; le détail reste dans les journaux de la fonction (SEC-8).
- **Durée de conservation** : le site ne conserve rien ; les demandes vivent dans la boîte contact@ (durée fixée par ICES, doc 05 Q1).
- L'envoi simulé actuel (succès affiché sans transmission quand `VITE_FORMS_ENDPOINT` est absent) disparaît : sans endpoint ou en cas d'échec, le formulaire affiche une erreur.

## Performance et fiabilité
- **Temps de réponse visés** : LCP < 2,5 s sur mobile 4G ; animations en pause hors écran (déjà en place, `usePauseOffscreen`) ; photos en WebP, dimensionnées.
- **Disponibilité** : celle de Vercel ; la fonction répond en moins de 3 s (un seul appel HTTP à Resend, bien sous la durée maximale des fonctions, P-016).
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
| Une fonction Vercel commune pour tous les formulaires | Un seul circuit, une seule boîte, même hébergeur que le site, validation serveur | Netlify Forms (autre hébergeur), Formspree (service tiers en plus) |
| Resend par défaut pour l'envoi | API HTTP sans dépendance, vérification du domaine | SMTP de la boîte OVH (demande son mot de passe et une dépendance ; possible plus tard en changeant seulement la fonction) |

## Questions reportées
> Validées comme reportées par l’utilisateur le 22/10/2026 (« je valide les six documents »). Chaque question se tranche avant la tâche qui en dépend (06-implementation-plan.md) ; le document repasse alors en brouillon jusqu’à revalidation.
- ~~Q1 — Hébergeur et domaine de production~~ : tranchée le 2026-10-31, Vercel (constaté), domaine chez OVH.
- ~~Q2 — Service et destinataire des formulaires~~ : tranchée le 2026-10-31, fonction Vercel `/api/demande` vers contact@ices-consulting.com, envoi Resend par défaut.
- Q3 — URL de la version anglaise : préfixe `/en/…` (recommandé pour le SEO) ou bascule sans changer d'URL comme aujourd'hui ?
- Q4 — Pré-rendu statique des pages pour le SEO : oui ou non en V1 ?
- Q5 — L'équipe ICES doit-elle publier seule actualités et réalisations (CMS) dès la V1 ?

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
| 1.1 | 2026-10-31 | Q1 (Vercel) et Q2 (fonction `/api/demande`, Resend) tranchées ; pages de campagne ICES Emailing sous `/campagne/` | Fabrice |
