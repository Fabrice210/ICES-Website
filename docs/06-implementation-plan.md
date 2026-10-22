---
document: "Plan d'implémentation"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.0
date: 2026-10-22
valide_par: "Fabrice — 2026-10-22"
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
| T4 | 3 | Formulaires : envoi réel, plus d'envoi simulé, erreur générique | Claude | TRD Q2 (service) | `forms.ts`, Contact, PartnerModal | US2 et US3 vérifiées avec le vrai service | décision TRD Q2 |
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
- Q1 — Travail directement dans `ICES-Website` (copie de l'utilisateur) ou dans une copie dédiée `automation/worktrees/site` comme pour Incub-OS et SM ?

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
