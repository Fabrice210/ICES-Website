import type { SiteContent } from '../../types/content'

/*
 * Pages Incubation, Actualités & Événements et Formations.
 * Rien n'est inventé : les piliers de l'incubation et les familles de formation reprennent
 * les offres déjà au site (offers.ts) ; les cohortes, chiffres et alumni viennent de l'API
 * publique d'Incub-OS (services/incubos.ts) ; les actualités, de la rubrique de l'accueil.
 */
export const subpages: SiteContent['subpages'] = {
  incubation: {
    hero: {
      tag: 'Incubation',
      image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
      title: 'Des idées transformées en solutions à fort impact.',
      text: 'ICES détecte, sélectionne et accompagne les porteurs de projets innovants, startups et PME à fort potentiel, de la candidature jusqu’à leur autonomie.',
    },
    program: {
      title: 'Le programme d’incubation',
      lead: 'Chaque startup est suivie sur Incub-OS, la plateforme d’incubation d’ICES : coaching, plan de formation, jalons et indicateurs sont partagés entre l’équipe du centre et les fondateurs.',
      pillars: [
        {
          icon: 'users',
          tone: 'teal',
          title: 'Détection & sélection',
          text: 'Détection, sélection et accompagnement de porteurs de projets innovants, par cohortes et sur dossier.',
        },
        {
          icon: 'rocket',
          tone: 'indigo',
          title: 'Incubation',
          text: 'Incubation de startups et de PME à fort potentiel : coaching, formations et suivi des jalons.',
        },
        {
          icon: 'landmark',
          tone: 'gold',
          title: 'Accès aux financements',
          text: 'Accompagnement à l’accès aux financements : capital-risque, fonds d’amorçage, ZLECAf.',
        },
      ],
    },
    stats: {
      startups: 'Startups accompagnées',
      cohorts: 'Cohortes',
      alumni: 'Startups diplômées',
      partners: 'Partenaires',
    },
    journey: {
      label: 'Le parcours',
      title: 'De la candidature à l’autonomie.',
      text: 'Un parcours en quatre temps, suivi de bout en bout sur la plateforme Incub-OS.',
      steps: [
        { title: 'Candidature', text: 'Le porteur de projet dépose son dossier en ligne pour une cohorte ouverte.' },
        { title: 'Sélection', text: 'Les dossiers sont présélectionnés, puis évalués par un jury.' },
        { title: 'Incubation', text: 'Coaching, plan de formation personnalisé et jalons suivis avec un coach référent.' },
        { title: 'Graduation', text: 'La startup diplômée garde un espace pour piloter sa croissance en autonomie.' },
      ],
    },
    cohorts: {
      title: 'Nos cohortes',
      lead: 'Les cohortes et leur calendrier, à jour depuis la plateforme Incub-OS.',
      open: 'Candidatures ouvertes',
      closed: 'Candidatures closes',
      seats: '{n} places restantes',
      closing: 'Clôture des candidatures',
      start: 'Début du programme',
      apply: 'Candidater',
      loading: 'Chargement des cohortes…',
      empty: 'Aucune cohorte n’est ouverte pour le moment. Écrivez-nous pour être informé de la prochaine.',
      emptyCta: { label: 'Être informé', to: '#contact' },
    },
    alumni: {
      title: 'Ils sont passés par le programme',
      lead: 'Startups diplômées du programme d’incubation.',
    },
    cta: {
      title: 'Vous portez un projet innovant ?',
      text: 'Rejoignez une cohorte, ou soutenez le programme en devenant partenaire.',
      apply: { label: 'Voir les cohortes', to: '#cohortes' },
      partner: { label: 'Devenir partenaire', to: '#contact' },
    },
  },
  news: {
    hero: {
      tag: 'Actualités & Événements',
      image: 'photo-1540575467063-178a50c2df87-w1200.jpg',
      title: 'Partager l’expertise, faire avancer les transformations.',
      text: 'Les actualités d’ICES et les rencontres que nous organisons autour des enjeux de transformation en Afrique.',
    },
    filtersLabel: 'Filtrer par type',
    all: 'Tout',
    featured: 'À la une',
    empty: 'De nouvelles actualités et de nouveaux rendez-vous seront bientôt annoncés.',
    emptyCta: { label: 'Nous écrire', to: '#contact' },
    cta: {
      title: 'Organiser une rencontre avec ICES ?',
      text: 'Conférence, atelier ou table ronde : construisons ensemble un rendez-vous autour de vos enjeux.',
      link: { label: 'Nous contacter', to: '#contact' },
    },
  },
  training: {
    hero: {
      tag: 'Formations',
      image: 'photo-1524178232363-1fb2b075b655-w1400.jpg',
      title: 'Développer les compétences qui font les transformations.',
      text: 'ICES conçoit des formations et des programmes de renforcement des capacités pour les secteurs public et privé.',
    },
    goals: {
      title: 'Choisir selon votre objectif',
      lead: 'Quatre familles de programmes, adaptées à votre organisation et à vos équipes.',
      request: 'Demander le programme',
      cards: [
        {
          icon: 'users',
          tone: 'navy',
          title: 'Diriger & gouverner',
          text: 'Formation en leadership, management et gouvernance, pour les secteurs public et privé.',
        },
        {
          icon: 'bot',
          tone: 'indigo',
          title: 'Transformation digitale & IA',
          text: 'Academy transformation digitale et intelligence artificielle.',
        },
        {
          icon: 'check',
          tone: 'green',
          title: 'Certifications professionnelles',
          text: 'Préparation aux certifications ISO, cybersécurité, PMP, ESG…',
        },
        {
          icon: 'landmark',
          tone: 'orange',
          title: 'Renforcement des capacités',
          text: 'Programmes de renforcement des capacités institutionnelles, avec les bailleurs de fonds.',
        },
      ],
    },
    formats: {
      title: 'Des programmes à votre mesure',
      lead: 'Chaque programme part de vos enjeux, de vos équipes et de votre contexte.',
      items: [
        {
          title: 'Pour votre organisation',
          text: 'Un programme conçu avec vous, pour vos équipes, dans vos locaux ou à distance.',
        },
        {
          title: 'Avec vos partenaires',
          text: 'Des programmes de renforcement des capacités menés avec les bailleurs de fonds et les institutions.',
        },
      ],
    },
    cta: {
      title: 'Construisons votre programme.',
      text: 'Dites-nous qui former et sur quels enjeux : nous revenons vers vous avec une proposition.',
      request: { label: 'Demander un programme', to: '#contact' },
      brochure: 'Téléchargez notre plaquette',
    },
  },
}
