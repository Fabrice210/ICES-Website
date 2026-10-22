import type { IconName } from '../components/icons/icons'

/**
 * `to` suit trois formes : route interne ('/', '/prestations#domaines'),
 * ancre de la page courante ('#contact'), ou lien externe/mailto/tel.
 * `PENDING_LINK` marque une destination que le client doit encore fournir.
 */
export interface LinkItem {
  label: string
  to: string
}

/** Teintes de la palette ICES (cf. styles/enhancements/tones.css). */
export type Tone =
  | 'blue'
  | 'navy'
  | 'indigo'
  | 'violet'
  | 'plum'
  | 'burgundy'
  | 'coral'
  | 'orange'
  | 'gold'
  | 'green'
  | 'teal'

export interface IconCard {
  icon: IconName
  title: string
  text: string
  /** Couleur d'accent de la carte (Interlocuteurs ; survol des domaines). */
  tone?: Tone
  /** Photo de la carte (Nos expertises). */
  image?: string
}

export interface HeaderVariant {
  dropdown?: { label: string; links: LinkItem[] }
  links: LinkItem[]
  cta: LinkItem
  showPartnerButton: boolean
}

export interface OfferSlide {
  /** Nom du segment dans la plaquette (ex. « Prestations Intellectuelles »). */
  segment: string
  /** Les segments entre <em>…</em> sont rendus en bleu (cf. renderEmphasis). */
  title: string
  text: string
  /** Un visuel par axe de services ; `services` = composantes indicatives de la plaquette. */
  images: { file: string; label: string; services: string[] }[]
}

export interface RotatorItem {
  image: string
  text: string
  link: LinkItem
}

export interface TeamMember {
  name: string
  role: string
  photo: string
  alt: string
  expertise: string[]
}

export interface Office {
  title: string
  website: string
  phone: { label: string; href: string }
  email: string
  address: string[]
}

export interface Stat {
  value: string
  label: string
}

/** Offres qui classent les réalisations (filtres de la page Réalisations). */
export type OfferKey =
  'tech' | 'expertise' | 'projets' | 'gouvernance' | 'concessions' | 'innovation'

/** Une mission menée par ICES : carte de la liste et page `/realisations/:slug`. */
export interface Realisation {
  /** Identique en FR et en EN : c'est l'adresse de la page. */
  slug: string
  offer: OfferKey
  title: string
  client: string
  country: string
  year: string
  duration: string
  image: string
  excerpt: string
  context: string
  challenges: string[]
  actions: string[]
  /** `✓` comme valeur : résultat qualitatif, affiché avec une coche. */
  results: Stat[]
  resultsNote?: string
  quote?: { text: string; cite: string }
}

export interface SiteContent {
  meta: { homeTitle: string; prestationsTitle: string; realisationsTitle: string }
  languages: { code: 'fr' | 'en'; label: string }[]
  header: { home: HeaderVariant; prestations: HeaderVariant; partnerLabel: string }
  footer: {
    brandText: string
    columns: { title: string; links: LinkItem[] }[]
    company: { title: string; links: LinkItem[] }
    places: { title: string; items: { city: string; email: string }[] }
    socials: { label: string; icon: IconName; href: string }[]
    copyright: string
    legal: LinkItem[]
    /** Bouton de retour en haut de page. */
    backToTop: string
  }
  home: {
    /** Titre découpé autour de la pilule d'images : « lead [pilule] tail / end ». */
    hero: {
      title: { lead: string; tail: string; end: string }
      text: string
      cta: LinkItem
      secondaryCta: LinkItem
      scrollLabel: string
      /** Lien affiché quand la pilule occupe tout l'écran. */
      expandCta: LinkItem
      /** Repères fixes de la colonne de droite (tirés de la plaquette). */
      facts: { icon: IconName; title: string; text: string }[]
    }
    audiences: { title: string; intro: string; cards: IconCard[] }
    vision: {
      label: string
      title: string
      paragraphs: string[]
      /** Phrase qui justifie la création d'ICES, mise en valeur à part. */
      ambition: { label: string; text: string }
      /** Photo en arche à côté du texte (provisoire en attendant les visuels). */
      image: string
      /** Mobile : texte coupé, bouton pour le déplier / replier. */
      readMore: string
      readLess: string
      valuesLabel: string
      /** Phrase courte à côté du titre « Nos valeurs ». */
      valuesIntro: string
      values: { label: string; text: string; tone: Tone }[]
      link: LinkItem
    }
    offers: {
      title: string
      brochure: { label: string; fileName: string }
      quoteCta: LinkItem
      prevLabel: string
      nextLabel: string
      statusTemplate: string
      slides: OfferSlide[]
    }
    expertises: { image: string; title: string; intro: string; items: IconCard[]; link: LinkItem }
    /** Nos cibles (plaquette, « 01 - Notre mission ») : une carte photo par cible. */
    targets: {
      title: string
      intro: string
      link: LinkItem
      items: { icon: IconName; title: string; text?: string; image: string }[]
    }
    realisations: {
      title: string
      /** Petite étiquette au-dessus de l'intro (colonne de droite de l'en-tête). */
      kicker: string
      intro: string
      /** Libellé en bas de chaque carte de réalisation. */
      cardCta: string
      /** Nombre de réalisations (les premières de `realisations.items`) montrées en cartes. */
      count: number
      link: LinkItem
    }
    approach: {
      title: string
      intro: string
      steps: { num: string; title: string; text: string }[]
    }
    news: {
      title: string
      intro: string
      rotators: { label: string; items: RotatorItem[] }[]
      dotLabelTemplate: string
      prevLabel: string
      nextLabel: string
    }
    team: {
      title: string
      introTitle: string
      introText: string
      expertiseLabel: string
      /** Carte équipe : étiquette et consigne (les portraits défilent au survol). */
      teamCard: { label: string; hint: string }
      /** Carte partenaires : les logos défilent en continu. */
      partners: {
        label: string
        text: string
        /** Logos (src/assets/images) ; sans logo, le nom s'affiche en texte. */
        items: { name: string; kind: string; logo?: string }[]
      }
      tabs: { label: string; members: TeamMember[] }[]
      presence: {
        map: string
        mapAlt: string
        title: string
        text: string
        places: string[]
        /** Paragraphe : {country} est remplacé par le pays actif (animé, en bleu). */
        lead: { before: string; after: string }
        /** Titre de la liste des implantations. */
        listLabel: string
        /**
         * Pays marqués sur le globe (id numérique ISO 3166 de world-atlas) ; prep : « au » / « en »
         * devant le nom dans le paragraphe ; place : ville ou précision.
         */
        countries: { id: string; name: string; prep: string; role: string; place: string }[]
        /** Consigne d'interaction sous le globe. */
        globeHint: string
      }
    }
  }
  prestations: {
    hero: { image: string; title: string; text: string; cta: LinkItem }
    domains: { label: string; title: string; intro: string[]; cards: IconCard[] }
    positioning: {
      image: string
      label: string
      title: string
      text: string
      cta: LinkItem
      stats: Stat[]
    }
  }
  realisations: {
    hero: { image: string; title: string; text: string; cta: LinkItem }
    list: {
      label: string
      title: string
      intro: string
      filtersLabel: string
      all: string
      /** {n} est remplacé par le nombre de réalisations affichées. */
      count: { one: string; many: string }
      empty: string
    }
    band: { label: string; title: string; text: string; cta: LinkItem; stats: Stat[] }
    offers: Record<OfferKey, string>
    cardCta: string
    detail: {
      back: LinkItem
      context: string
      challenges: string
      actions: string
      results: string
      facts: {
        title: string
        client: string
        country: string
        offer: string
        year: string
        duration: string
      }
      similar: { title: string; text: string; cta: LinkItem }
      pagerLabel: string
      prev: string
      next: string
      others: string
      allLink: LinkItem
    }
    items: Realisation[]
  }
  contact: {
    title: string
    /** Grand titre sur la photo et phrase d'accroche. */
    headline: string
    intro: string
    image: string
    offices: Office[]
    socialsLabel: string
    form: {
      title: string
      subtitle: string
      firstName: string
      lastName: string
      country: string
      phone: string
      email: string
      typeLabel: string
      types: string[]
      message: string
      consent: string
      submit: string
      success: string
    }
  }
  partner: {
    title: string
    subtitle: string
    closeLabel: string
    fields: {
      company: { label: string; placeholder: string }
      sector: { label: string; placeholder: string; options: string[] }
      size: { label: string; placeholder: string; options: string[] }
      firstName: { label: string; placeholder: string }
      lastName: { label: string; placeholder: string }
      email: { label: string; placeholder: string }
      phone: { label: string; placeholder: string }
      website: { label: string; optional: string; placeholder: string }
      motivation: { label: string; placeholder: string }
      consent: string
    }
    submit: string
    note: string
    success: { title: string; text: string; close: string }
  }
}
