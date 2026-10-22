# Revue de cohérence des six documents (P-035)

- **Date** : 2026-10-22
- **Documents relus** : 01-prd, 02-trd, 03-app-flow, 04-ui-ux-brief, 05-backend-schema, 06-implementation-plan (version 0.1, brouillon).
- **Réserve** : relecture faite dans la même session que la rédaction. Une relecture en session neuve reste recommandée avant la finalisation.

## Contrôles
| Contrôle | Résultat |
|---|---|
| Chaque fonctionnalité du PRD (F1 à F12) a au moins une tâche dans le plan | Oui : F1 → T2, F2 → T3, F3 → T4, F4 → T5, F5 → T6, F6 → T7, F7 → T8, F8 → T9, F9 → T10, F10 → T11, F11 → T12, F12 → existant |
| Chaque user story a un écran dans l'App Flow | Oui (US1 à US9) |
| Ordre de la landing identique dans PRD F1, App Flow et brief UI/UX | Oui |
| Enchaînement des couleurs identique dans App Flow et brief UI/UX | Oui : blanc, bleu, blanc, bleu, bleu, bleu, bleu, blanc, blanc |
| Champs des formulaires du doc 05 conformes au code existant | Oui (`Contact.tsx`, `PartnerModal`) |
| Routes du TRD présentes dans l'App Flow | Oui |
| Aucun secret dans les documents | Oui : seul le nom `VITE_FORMS_ENDPOINT` apparaît |
| Envoi simulé des formulaires | Signalé (TRD Sécurité, tâche T4) : à retirer avant la mise en ligne |

## Contradictions trouvées
- Aucune contradiction entre documents.

## Questions encore ouvertes (bloquent la finalisation)
| Doc | Question |
|---|---|
| PRD | Q1 destinataire des formulaires ; Q2 pages Formation / Publications ; Q3 forme de la bande clients / partenaires ; Q4 pôles du hero ; Q5 contenus à fournir ; Q6 libellé du CTA |
| TRD | Q1 hébergeur ; Q2 service de formulaires ; Q3 URL anglaise ; Q4 pré-rendu SEO ; Q5 CMS |
| App Flow | Q1 menu ; Q2 actualités et événements dans une seule liste |
| Brief UI/UX | Q1 couleurs succès / erreur ; Q2 maquette des nouvelles pages |
| Schéma | Q1 conservation RGPD ; Q2 accord d'affichage des logos |
| Plan | Q1 copie de travail |

## Proposition pour avancer sans tout attendre
Les tâches T1 et T2 (mise en place, réordonnancement de la landing) ne dépendent d'aucune question ouverte. L'utilisateur peut finaliser les documents en tranchant les questions, ou décider que certaines (contenus, hébergeur, CMS) sont reportées à une version ultérieure du document.
