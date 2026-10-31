---
document: "Plan d'implémentation"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.1
date: 2026-10-31
valide_par: "Fabrice — 2026-10-31"
---

# 06 — Plan d'implémentation

> Ordre de construction, avec un point de contrôle à chaque étape. Le site existe déjà : l'étape 1 est courte. Avancement noté dans `PROJECT_STATE.md` (P-005).

## Étapes
| Étape | Contenu | Critère de fin |
|---|---|---|
| 1. Mise en place | `.env.example`, `PROJECT_STATE.md`, vérification build / lint / tests sur l'existant | `npm run build` et `npm run lint` passent |
| 2. Données | structures de contenu du doc 05, contrôle de contenu étendu | `npm run test:content` passe en FR et EN |
| 3. Parcours principal | réordonnancement de la landing, CTA « Parlons de vos besoins », formulaires réellement envoyés, plaquette PDF | critères US1 à US4 vérifiés dans le navigateur |
| 4. Fonctionnalités secondaires | pages Réalisations, Actualités & Événements, À propos ; section Équipe et bande références ; photos des offres | critères US5 à US9 vérifiés |
| 5. Qualité | accessibilité, SEO (balises, sitemap, hreflang), performance mobile, audit en contexte neuf (SEC-9) | `npm test` passe ; rapport d'audit sans point bloquant |
| 6. Mise en ligne | hébergeur choisi, réécriture SPA, domaine, Search Console (SEC-7) | site en ligne, formulaires reçus en production |

## Tâches
| ID | Étape | Tâche | Responsable / agent | Entrées | Livrable | Critère de fin | Dépend de |
|---|---|---|---|---|---|---|---|
| T1 | 1 | Créer `.env.example` et `PROJECT_STATE.md` | Claude | TRD | 2 fichiers | présents, sans valeur secrète | — |
| T2 | 3 | Landing : ordre validé, transitions et `z-index` attachés à la position | Claude | App Flow (ordre) | `HomePage.tsx`, `useStackPin`, CSS des sections | US1 vérifiée en FR et EN, ordinateur et mobile ; `npm run test:visual` relancé, seuls les écarts attendus | T1 |
| T3 | 3 | CTA « Parlons de vos besoins » → formulaire, type Devis présélectionné | Claude | PRD Q6 | contenus FR/EN, Contact | US2 vérifiée | T2 |
| T4a | 3 | Fonction `api/demande.ts` (Vercel) : validation serveur (doc 05), champ piège, envoi Resend vers `FORMS_TO`, erreurs génériques ; `vercel.json` (réécriture SPA hors `/api` et `/campagne`, `cleanUrls`) ; `.env.example` | Claude | TRD, doc 05 | `api/demande.ts`, `vercel.json`, `.env.example`, tests | tests locaux de la fonction : corps valides acceptés et transmis à un Resend simulé ; champs manquants, formats faux, `formulaire` inconnu, corps trop gros et méthode autre que `POST` refusés ; champ piège rempli = rien envoyé | — |
| T4 | 3 | Formulaires du site : envoi réel vers `/api/demande`, plus d'envoi simulé, champ piège `website`, erreur générique | Claude | T4a | `forms.ts`, Contact, PartnerModal | US2 et US3 vérifiées en local contre la fonction | T4a |
| T4b | 3 | Pages de campagne ICES Emailing dans `public/campagne/` (6 pages + 6 formulaires, version DA), formulaires en JSON vers `/api/demande` | Claude | dépôt ICES Emailing (`scripts/build-netlify.mjs` adapté) | `public/campagne/` | les 12 adresses `/campagne/<sujet>` et `/campagne/<sujet>-besoin` s'affichent en local ; envoi accepté par la fonction | T4a |
| T4c | 6 | Mise en service de l'envoi : compte Resend, domaine vérifié par DNS chez OVH, variables `RESEND_API_KEY`, `FORMS_FROM`, `FORMS_TO` dans Vercel ; déploiement de la branche | personne qui a les accès Vercel et OVH, avec l'accord de Fabrice | note de mise en service | site déployé | une demande de test de chaque type arrive dans contact@ | T4, T4b |
| T5 | 3 | Plaquette PDF | Claude | PDF fourni par ICES | `src/assets/*.pdf`, lien | US4 vérifiée | PDF reçu |
| T6 | 4 | Pages Réalisations (liste, détail) + cartes de la landing cliquables | Claude | maquette, contenus | routes, pages, contenus FR/EN | US5 vérifiée | T2, maquette |
| T7 | 4 | Pages Actualités & Événements (liste, détail, filtre) | Claude | maquette, contenus | routes, pages | US6 vérifiée | T2, maquette |
| T8 | 4 | Page À propos | Claude | plaquette (Horizon), maquette | page | US7 vérifiée | maquette |
| T9 | 4 | Équipe : 2-3 photos qui défilent + bande clients / partenaires | Claude | photos, logos, PRD Q3 | section Équipe | US9 vérifiée | photos, logos |
| T10 | 4 | Photos réelles dans Nos offres ; pôles du hero (PRD Q4) | Claude | photos | sections | rendu vérifié | photos |
| T11 | 4 | Version anglaise de toutes les nouvelles pages | Claude | traductions | `content/en` | US8 vérifiée | T6 à T9 |
| T12 | 5 | SEO : balises par page, `sitemap.xml`, `robots.txt`, `hreflang` | Claude | TRD Q3, Q4 | `public/`, composant de balises | balises présentes sur chaque route | T11 |
| T13 | 5 | Audit en contexte neuf (SEC-9) | autre agent | site complet | `docs/audit-<date>.md` | aucun point bloquant ouvert | T12 |
| T14 | 6 | Mise en ligne | utilisateur + Claude | TRD Q1 | site en production | formulaires reçus en production | T13 |

## Point de contrôle à chaque fin d'étape
1. Lancer l'application (`npm run preview`, port 4173).
2. Vérifier les critères d'acceptation du PRD concernés.
3. Noter les problèmes non résolus dans `PROJECT_STATE.md`.
4. Faire un commit (P-029), sans push ni fusion sans accord de l'utilisateur.

## Questions reportées
> Validées comme reportées par l’utilisateur le 22/10/2026 (« je valide les six documents »). Chaque question se tranche avant la tâche qui en dépend (06-implementation-plan.md) ; le document repasse alors en brouillon jusqu’à revalidation.
- ~~Q1 — Copie de travail~~ : tranchée le 2026-10-31, copie dédiée `automation/worktrees/site`, une branche `auto/<fiche>` par chantier (ici `auto/api-demande`).

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
| 1.1 | 2026-10-31 | Tâches T4a, T4b, T4c (fonction `/api/demande`, pages de campagne, mise en service) ; Q1 tranchée | Fabrice |
