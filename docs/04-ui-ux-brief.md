---
document: "Brief UI/UX"
statut: finalisé        # brouillon | finalisé — seul l'utilisateur valide le passage à « finalisé » (R-001)
version: 1.0
date: 2026-10-22
valide_par: "Fabrice — 2026-10-22"
---

# 04 — Brief UI/UX

> Reprend la direction artistique déjà en place sur `feat/nouvelle-da-creative`. Les nouvelles pages s'alignent sur la maquette fournie par ICES (à recevoir).

## Public et ton
- **Pour qui** : décideurs publics, dirigeants d'entreprise, bailleurs et partenaires du développement en Afrique francophone.
- **Trois adjectifs** : institutionnel, confiant, moderne.

## Produits de référence
| Lien ou capture | À reprendre | À éviter |
|---|---|---|
| Site actuel (landing React) | Dômes entre sections, sections figées, révélations mot par mot, cartes double face, curseur personnalisé | — |
| Maquette des nouvelles pages (à recevoir) | Structure des pages Réalisations, Actualités, À propos | — |
| Captures `Inspo refonte/` | Ambiance générale, rythme | Copier à l'identique |

## Couleurs
| Rôle | Valeur |
|---|---|
| Principale | `--blue` #0A74BF |
| Accent | `--blue-light` #1E8FD9, `--navy` #13284A, tons par domaine (`tones.css`) |
| Fond | `--white` #FFFFFF, `--gray-100` #F4F5F7, `--dark` #0E1A2B (pied de page) |
| Texte | `--ink` #1B1B1B, `--text` #3C3C3C, `--muted` #6B6B6B |
| Succès / avertissement / erreur | à définir à partir des tokens (Q1) |

Enchaînement des couleurs de la landing : blanc, bleu, blanc, bleu, bleu, bleu, bleu, blanc, blanc. Il reste attaché aux positions, quel que soit l'ordre des sections.

## Typographie
- **Polices** : Montserrat (auto-hébergée, `src/assets/fonts`).
- **Tailles (titres, texte)** : titres de section à la taille du hero (déjà en place), texte courant 16 px minimum.

## Composants
- Existants : boutons ronds à flèche, liens ronds, cartes double face, cartes offres en défilement horizontal, timeline d'approche, cartes actualités, formulaires contact et partenaire, modale, globe d'implantation.
- À créer : carte de réalisation cliquable vers son détail, page de détail (image d'en-tête, texte, galerie), liste actualités / événements avec filtre, bande clients / partenaires, défilement de 2 ou 3 photos d'équipe.

## Mise en page
- **Grille et espacements** : conteneur 1240 px, gouttière 24 px, en-tête 84 px.
- **Points de rupture responsive** : 720 px (mobile), plus ceux de `responsive.css`.

## Notes par écran
| Écran (cf. App Flow) | Contenu clé | Hiérarchie |
|---|---|---|
| Accueil | Ordre validé (App Flow) | Hero → cibles → vision → offres → interlocuteurs → approche → réalisations → actualités → équipe → contact |
| Réalisations | Cartes photo + titre + client + pays | Titre de page, grille |
| Détail réalisation | Contexte, mission, résultats, photos | Image, titre, chapô, corps, galerie, CTA devis |
| Actualités & Événements | Cartes date + type + titre | Titre, filtre par type, grille |
| À propos | Qui sommes-nous, vision Horizon, équipe | Texte, chiffres clés, équipe |

## Accessibilité
- Contraste AA sur blanc et sur bleu ; focus visible ; navigation clavier de la modale (déjà `<dialog>`) ; `alt` sur toutes les photos ; animations réduites si `prefers-reduced-motion` (déjà géré) ; zones tactiles de 44 px minimum.

## États d'interaction
- Survol (cartes double face, liens ronds), focus, bouton d'envoi désactivé pendant l'envoi, message de réussite, message d'erreur générique.

## Charte d'animation (relevée dans le code, à suivre sur toutes les pages)
> La maquette `ices-site-complet_1.html` a ses propres animations (classe `.reveal` ajoutée par un IntersectionObserver). On n'en reprend **que la structure** : les nouvelles pages utilisent les mécanismes ci-dessous, rien d'autre.

| Mécanisme | Où il est | Comportement | Règle pour les nouvelles pages |
|---|---|---|---|
| Entrée au défilement | `useInView(seuil)` → classe `is-in` (ou `reveal is-hidden` → `reveal is-revealing`) | Une seule fois, à l'entrée à l'écran | Chaque bloc (en-tête de section, grille) a son propre `useInView` : en-tête seuil 0,4, grille 0,2 |
| Montée en fondu décalée | `--i` sur chaque élément ; `opacity .8s var(--ease)`, `transform .9s cubic-bezier(.22,1,.36,1)`, décalage `--i × 90 à 120 ms` | Les éléments montent de 24 à 28 px l'un après l'autre | Cartes de liste : même courbe, même décalage |
| Titre mot par mot | `MaskedWords` + `reveal-item` | Chaque mot sort de son masque (60 à 70 ms d'écart) | Tous les grands titres (hero de page, titres de section) |
| Hero de sous-page | `sections/shared/Hero.tsx` + `enhancements/hero.css` | Image qui dézoome en 7 s, titre mot par mot, texte puis bouton en fondu | Toutes les nouvelles pages réutilisent ce Hero |
| Image qui se dévoile | `clip-path: inset(100% 0 0 0)` → `inset(0)` en 1,1 s (cartes actualités) | L'image se découvre du bas vers le haut | Cartes réalisations, actualités, événements |
| Survol de carte | `real2-card`, `ncard` : légère élévation et ombre en .45 s ; flèche du lien qui glisse | — | Même survol sur toutes les cartes |
| Carte à double face | `HoverTransition` (balayage ou onde) | Réservée aux Interlocuteurs | Ne pas réutiliser ailleurs (signature de la section) |
| Compteurs | `CountUp` (1,6 s, déclenché à l'entrée) | Chiffres qui défilent jusqu'à la valeur | Bandes de chiffres (résultats d'une mission, stats) |
| Transitions entre sections | `curve-top` (dôme), `sheet-top` (feuille arrondie), `useStackPin` + `StackPause` | Section figée recouverte par la suivante | Propre à la landing ; sur les sous-pages, alternance blanc / bleu sans section figée |
| Défilement horizontal | `useHorizontalScroll` | Rangée qui glisse au scroll vertical | Réservé à la landing |
| Curseur | `CustomCursor` (listes `INTERACTIVE`, `ON_BLUE`, `ON_WHITE`) | Anneau qui grossit sur les éléments cliquables, blanc sur le bleu | Ajouter les nouvelles classes de cartes et de bandes bleues à ces listes |
| Pause hors écran | `usePauseOffscreen` (`data-offscreen`) | Fige les animations en boucle hors écran | Chaque nouvelle section est un `<section>` direct de la page pour en bénéficier |
| Mouvement réduit | `prefers-reduced-motion` dans chaque feuille | Tout s'affiche sans animation | Obligatoire dans chaque nouvelle feuille de style |

Constantes communes : courbe `--ease` (`cubic-bezier(.22,.61,.36,1)`) pour les fondus, `cubic-bezier(.22,1,.36,1)` pour les déplacements ; durées entre 0,7 et 1,1 s pour les entrées, 0,3 à 0,45 s pour les survols.

## Éléments graphiques à prévoir
- Plaquette PDF ; photos d'activités et d'événements (offres) ; 2 ou 3 photos d'équipe ; logos clients et partenaires ; photos des réalisations ; icônes des pôles du hero (PRD Q4).

## Questions reportées
> Validées comme reportées par l’utilisateur le 22/10/2026 (« je valide les six documents »). Chaque question se tranche avant la tâche qui en dépend (06-implementation-plan.md) ; le document repasse alors en brouillon jusqu’à revalidation.
- Q1 — Couleurs de succès et d'erreur : à prendre dans la maquette ou à proposer ?
- Q2 — Réception de la maquette des nouvelles pages (lien Figma ou fichiers).

## Historique
| Version | Date | Changement | Validé par |
|---|---|---|---|
| 0.1 | 2026-10-22 | Création | — |
| 1.0 | 2026-10-22 | Validé par l’utilisateur, questions reportées | Fabrice |
