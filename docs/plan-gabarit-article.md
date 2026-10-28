# Plan — gabarit « page article » des sous-pages

- **Date** : 2026-10-28 · **Statut** : à valider par l'utilisateur
- **Référence** : https://www.alethia.earth/our-company (analysée en 375 px puis en 1440 px)
- **Pages concernées** : Prestations, Réalisations (liste et détail), puis Actualités et Événements. L'accueil garde son design.

## Ce qu'on reprend de la référence

| Bloc de la référence | Rôle | Ce qu'on reprend | Mobile (375 px) | Desktop (1440 px) |
|---|---|---|---|---|
| Hero sombre plein écran | Ouverture | Fond sombre, visuel à droite qui déborde, pastille d'étiquette, grand titre blanc, sous-titre en bas à gauche, « Défiler pour découvrir » en bas à droite | Visuel en haut, étiquette, titre sur 3 lignes, sous-titre en bas | Titre à gauche au milieu, visuel à droite, sous-titre en bas |
| Déclaration | Message principal | Fond clair, pastille, phrase géante qui se dévoile ligne par ligne au défilement, puis paragraphe + carte image | Phrase en très grand sur toute la largeur | Phrase sur 4 lignes, carte image à droite |
| Titre + texte, puis rangée d'images | Approfondir | Filet en haut, titre à gauche, texte à droite, rangée de cartes images qu'on fait glisser | Titre puis texte empilés, cartes glissées au doigt | Deux colonnes, rangée horizontale |
| Liste numérotée en accordéon | Étapes, principes | Pastille numérotée, intitulé, « + » qui déplie le texte, filets entre lignes | Pleine largeur | Pleine largeur, « + » à droite |
| Bandeau de texte géant | Respiration | Une phrase en très grand qui glisse à l'horizontale avec le défilement, avec l'emblème ICES | Défile sur toute la largeur | Idem |
| Cartes de personnes | Équipe | Grandes cartes photo, nom et fonction en bas, « + » qui ouvre la biographie | Une carte par ligne | Deux par ligne |
| Partenaires | Preuve | Phrase d'accroche puis logos | Logos sur 2 colonnes | Rangée de logos |
| Appel à l'action en deux cartes | Conversion | Carte sombre avec grand titre, carte claire avec texte et bouton | Empilées | Côte à côte |

**Défilement** : défilement fluide (bibliothèque Lenis, celle de la référence).
**Ouvertures** : titres et sous-titres révélés ligne par ligne (masque qui monte), étiquettes et paragraphes en fondu, images qui se dévoilent.

## Adaptation ICES (charte stricte)

- **Police** : Montserrat seule. Les étiquettes en capitales espacées remplacent la police à chasse fixe de la référence.
- **Couleurs** :
  - le vert sombre de la référence devient `--dark` / `--navy` ;
  - le vert clair des pastilles devient le bleu ICES `--blue`, ou un bleu pâle pour le fond des pastilles ;
  - le fond crème devient `--gray-100` / `--white`.
- **Texte aligné à gauche** partout (pas de texte centré).
- Animations en CSS et avec les crochets du site (`useInView`, `MaskedWords`) ; Lenis seulement pour le défilement.

## Application par page

| Page | Hero | Déclaration | Titre + texte / images | Accordéon | Autres blocs |
|---|---|---|---|---|---|
| Détail d'une réalisation | Offre en étiquette, titre de la mission, résumé | Contexte | Intervention + photos de la mission | Enjeux, puis étapes de l'intervention | Résultats en cartes, bandeau géant, appel « Un projet similaire ? » |
| Réalisations (liste) | Titre de la page | Introduction | — | — | Liste des missions en onglets (déjà validée), chiffres, appel au devis |
| Prestations | Titre actuel | Positionnement | Domaines en rangée de cartes | Les 10 domaines | Chiffres, appel au devis |
| Actualités / Événements | Titre de l'article | Chapô | Corps + photos | Programme (événements) | Appel à l'action |

## Étapes

1. **Socle** : défilement fluide, composants du gabarit (hero, déclaration, titre + texte, rangée d'images, accordéon, bandeau géant, appel en deux cartes), ouvertures de texte. Conçu d'abord en 375 px, puis en 1440 px.
2. **Pilote** : la page détail d'une réalisation, vérifiée en mobile et en desktop.
3. **Réalisations (liste)** et **Prestations** passent sur le gabarit.
4. Actualités et Événements, construites directement sur le gabarit.
5. Contrôles : build, lint, rendu 375 / 768 / 1440 px, mouvement réduit, balises SEO de chaque page (R-008).

## Questions à trancher

- **Q1. Défilement fluide** : sur les sous-pages seulement, ou sur tout le site ? L'accueil a des sections figées et des arrêts de défilement qui peuvent réagir différemment.
- **Q2. Nouvelle dépendance** : ajouter le paquet `lenis` (bibliothèque reconnue, éditée par darkroom.engineering, celle de la référence) ?
- **Q3.** Commencer par la page détail d'une réalisation comme pilote ?
