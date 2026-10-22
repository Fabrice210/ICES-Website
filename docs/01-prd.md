---
document: "PRD — exigences produit"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.0
date: 2026-10-22
valide_par: "Fabrice — 2026-10-22"
---

# 01 — PRD : exigences produit

> Périmètre : refonte V2 du site vitrine ICES (directive « Refonte V2 et SEO »), à partir du site React existant (branche `feat/nouvelle-da-creative`) et de la réunion de revue de maquette du 22/10/2026.

## Le produit en une phrase
- **Nom** : site institutionnel ICES (FR / EN).
- **Problème résolu** : présenter de façon crédible les expertises, missions et références d'ICES (cabinet de conseil, Bénin et Guinée) et transformer la visite en demande de devis, en demande d'information ou en candidature de partenaire.

## Utilisateurs cibles
| Profil | Besoin principal | Contexte d'usage |
|---|---|---|
| États et institutions publiques | Juger la crédibilité et les références d'ICES | Bureau, ordinateur, souvent après une recommandation |
| Entreprises et organisations (clients) | Comprendre l'offre et demander un devis | Ordinateur et mobile |
| Partenaires et acteurs du développement (bailleurs, institutions internationales) | Évaluer une collaboration, devenir partenaire | Ordinateur, lecture de la plaquette |
| Porteurs de projets et entrepreneurs | Trouver un accompagnement (incubation, formation) | Surtout mobile |
| Équipe ICES | Publier actualités, événements et réalisations | Interne |

## Problème et solution actuelle
- **Ce qui fait mal aujourd'hui** : le site tient sur une page ; les réalisations, actualités et événements n'ont pas de page propre ; l'ordre des sections ne suit pas le discours validé ; les formulaires n'envoient encore rien (envoi simulé tant que le destinataire n'est pas fourni) ; la plaquette téléchargée est un `.docx`.
- **Ce que les utilisateurs font à la place** : ils demandent la plaquette par email ou contactent ICES directement.

## Objectif et mesure du succès
- **Résultat visé** : un site multi-pages, bilingue, référencé, qui génère des demandes qualifiées.
- **Indicateur mesurable** : nombre de demandes de devis et de candidatures partenaires reçues par mois (à mesurer dès que les formulaires envoient réellement) ; pages indexées par Google pour chaque page publique FR et EN.

## Fonctionnalités principales
| ID | Fonctionnalité | Bénéfice pour l'utilisateur | Priorité (P1/P2/P3) |
|---|---|---|---|
| F1 | Landing réordonnée : Hero → Nos cibles → Vision & valeurs → Nos offres → Nos interlocuteurs → Notre approche → Missions & Réalisations → Actualités & Événements → Équipe & partenaires → Contact. Sections inchangées, enchaînement des couleurs et transitions gardés par position. | Discours dans l'ordre validé | P1 |
| F2 | CTA « Parlons de vos besoins » menant au formulaire de demande de devis | Passage direct à l'action | P1 |
| F3 | Formulaires réellement envoyés : contact / devis / information, et candidature « Devenir partenaire » | Les demandes arrivent chez ICES | P1 |
| F4 | Plaquette téléchargeable en PDF | Document lisible partout | P1 |
| F5 | Page Missions & Réalisations (liste) et page de détail d'une réalisation, ouverte au clic sur une carte de la landing | Preuves concrètes | P2 |
| F6 | Pages Actualités & Événements (liste) et page de détail | Montrer l'activité | P2 |
| F7 | Page À propos (« Qui sommes-nous », vision Horizon tirée de la plaquette) | Identité et ambition | P2 |
| F8 | Section Équipe refaite : 2 ou 3 photos d'équipe qui défilent, bande clients / partenaires (deux côté clients, deux côté partenaires, ou défilement de logos) | Crédibilité par les références | P2 |
| F9 | Offres illustrées par de vraies photos d'activités et d'événements | Authenticité | P2 |
| F10 | Version anglaise de toutes les pages, sélecteur FR / EN | Bailleurs et partenaires anglophones | P1 |
| F11 | SEO : titre, description, balises Open Graph, URL propres, sitemap, `hreflang` FR/EN par page | Être trouvé | P1 |
| F12 | Page Expertises (`/prestations`, existante) conservée | — | P1 |

## Hors périmètre de la version 1
- Espace client, connexion, back-office maison.
- Paiement en ligne.
- Blog avec commentaires.
- Toute autre langue que FR et EN.

## User stories
| ID | En tant que… | je veux… | pour… | Fonctionnalité |
|---|---|---|---|---|
| US1 | visiteur | parcourir la landing dans l'ordre validé | comprendre ICES en une lecture | F1 |
| US2 | client | demander un devis depuis « Parlons de vos besoins » | être recontacté | F2, F3 |
| US3 | partenaire | remplir le formulaire « Devenir partenaire » | proposer une collaboration | F3 |
| US4 | visiteur | télécharger la plaquette en PDF | la lire ou la transmettre | F4 |
| US5 | visiteur | ouvrir une réalisation | voir le détail d'une mission | F5 |
| US6 | visiteur | lire une actualité ou un événement | suivre l'activité d'ICES | F6 |
| US7 | visiteur | lire la page À propos | connaître l'équipe et la vision | F7 |
| US8 | visiteur anglophone | basculer tout le site en anglais | lire dans ma langue | F10 |
| US9 | visiteur | voir clients et partenaires sous l'équipe | juger les références | F8 |

## Critères d'acceptation
| User story | Étant donné… | Quand… | Alors (résultat visible)… |
|---|---|---|---|
| US1 | la landing ouverte | je fais défiler | les sections apparaissent dans l'ordre F1, couleurs blanc/bleu dans le même enchaînement qu'avant, transition en dôme sur le hero conservée |
| US2 | la landing | je clique « Parlons de vos besoins » | j'arrive au formulaire avec le type « Devis » ; à l'envoi valide, un message de réussite s'affiche et ICES reçoit la demande |
| US2 | le formulaire | je l'envoie sans email ou sans consentement | l'envoi est refusé et le champ fautif est signalé |
| US2 | le formulaire | le service d'envoi est indisponible | un message d'erreur générique s'affiche, la saisie est conservée |
| US3 | la modale « Devenir partenaire » | je l'envoie complète | message « Candidature envoyée » et réception chez ICES |
| US4 | la section Nos offres | je clique « Téléchargez notre plaquette » | un fichier PDF se télécharge |
| US5 | une carte de réalisation | je clique | la page de détail s'ouvre à son URL ; retour arrière ramène à la landing au même endroit |
| US6 | la page Actualités | aucune actualité n'existe | un état vide lisible s'affiche, pas de page cassée |
| US8 | n'importe quelle page | je clique EN | la même page s'affiche en anglais, l'URL et les balises `hreflang` suivent |
| US9 | la section Équipe | je la fais défiler | 2 ou 3 photos d'équipe défilent, la bande clients / partenaires s'affiche sous elles |

## Questions reportées
> Validées comme reportées par l’utilisateur le 22/10/2026 (« je valide les six documents »). Chaque question se tranche avant la tâche qui en dépend (06-implementation-plan.md) ; le document repasse alors en brouillon jusqu’à revalidation.
- Q1 — Destinataire des formulaires : adresse email ou service (Formspree, API ICES…) ? Qui détient le compte ?
- Q2 — Pages « Formation » et « Publications » du menu : pages à créer, ou renvoi vers Actualités comme aujourd'hui ?
- Q3 — Section Équipe : quatre cases (deux clients, deux partenaires) ou bande de logos qui défile ?
- Q4 — Pôles du hero : remplacer par des icônes, ou autre présentation ?
- Q5 — Contenus à fournir : plaquette PDF, photos d'activités, photos d'équipe, logos clients et partenaires (avec autorisation d'usage), textes des réalisations et actualités, texte « Horizon 20xx ».
- Q6 — Libellé du CTA : « Parlons de vos besoins » ou « Quels sont vos besoins ? » ?

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création à partir du site existant et de la réunion du 22/10 | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
