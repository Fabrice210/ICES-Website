import type { SiteContent } from '../../types/content'

/**
 * Page Réalisations : textes et missions repris de la maquette ices-site-complet_1.html.
 * Les entrées marquées « EXEMPLE » le sont dans la maquette : à remplacer par les
 * missions fournies par l'équipe ICES.
 */
export const realisations: SiteContent['realisations'] = {
  hero: {
    image: 'photo-1487958449943-2429e8be8625-w2000.jpg',
    title: 'Des missions concrètes, des transformations mesurables.',
    text: 'Derrière chaque mission, une problématique, des parties prenantes et un objectif de transformation. Découvrez comment nos expertises se traduisent en interventions sur le terrain.',
    cta: { label: 'Explorer nos missions', to: '#liste-realisations' },
  },
  list: {
    label: 'Missions & Réalisations',
    title: 'Nos expertises, à l’épreuve du terrain.',
    intro:
      'États, institutions, entreprises et porteurs de projets : chaque mission est conduite selon notre approche intégrée, du diagnostic au suivi de l’impact. Filtrez par offre pour découvrir les interventions qui vous concernent.',
    filtersLabel: 'Filtrer les réalisations',
    all: 'Toutes',
    count: { one: '{n} réalisation', many: '{n} réalisations' },
    empty: 'Aucune réalisation publiée pour cette offre pour le moment.',
  },
  band: {
    label: 'Votre projet',
    title: 'Un enjeu comparable ? Construisons ensemble la réponse.',
    text: 'Chaque mission commence par un diagnostic partagé. Présentez-nous votre contexte : nous revenons vers vous avec une première lecture et une proposition d’approche.',
    cta: { label: 'Demandez un devis', to: '#contact' },
    stats: [
      { value: '10', label: 'Domaines d’expertise' },
      { value: '6', label: 'Offres intégrées' },
      { value: '4', label: 'Temps : diagnostic, conception, déploiement, suivi' },
      { value: '2', label: 'Implantations (Bénin · Guinée)' },
    ],
  },
  offers: {
    tech: 'Technologies',
    expertise: 'Études & expertises',
    projets: 'Projets',
    gouvernance: 'Gouvernance',
    concessions: 'Concessions',
    innovation: 'Innovation & incubation',
  },
  cardCta: 'Voir la mission',
  detail: {
    back: { label: 'Réalisations', to: '/realisations' },
    context: 'Contexte',
    challenges: 'Enjeux',
    actions: 'Notre intervention',
    results: 'Résultats',
    facts: {
      title: 'Fiche mission',
      client: 'Client',
      country: 'Pays',
      offer: 'Offre',
      year: 'Année',
      duration: 'Durée',
    },
    similar: {
      title: 'Un projet similaire ?',
      text: 'Présentez-nous votre contexte, nous revenons vers vous avec une première lecture.',
      cta: { label: 'Parlons-en', to: '#contact' },
    },
    pagerLabel: 'Autres réalisations',
    prev: 'Précédent',
    next: 'Suivant',
    others: 'Autres réalisations',
    allLink: { label: 'Toutes nos réalisations', to: '/realisations' },
  },
  items: [
    {
      slug: 'incubos-plateforme-incubation',
      offer: 'innovation',
      title: 'Incub’OS : concevoir la plateforme intégrée de gestion d’incubation',
      client: 'Centres d’incubation et startups',
      country: 'Bénin',
      year: '2026',
      duration: 'Étude, cadrage et spécification',
      image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
      excerpt:
        'Une solution unique qui relie la gestion du centre d’incubation au suivi de chaque startup, de la candidature à la croissance.',
      context:
        'Les centres d’incubation d’Afrique de l’Ouest pilotent encore leurs activités avec des outils hétérogènes : tableurs pour le suivi des incubés, dossiers papier pour les candidatures, messageries pour la coordination. Côté startups, le suivi des objectifs, du business model et des finances est tout aussi fragmenté.',
      challenges: [
        'Données dispersées sur des supports non synchronisés et historique des parcours difficile à reconstituer.',
        'Aucune visibilité en temps réel sur l’avancement des projets incubés.',
        'Mesure d’impact non systématisée pour les financeurs et partenaires.',
        'Rupture de suivi au moment où la startup quitte l’incubateur.',
      ],
      actions: [
        'Études de l’existant et cartographie des acteurs : direction, chargés de programme, coachs, incubés, partenaires, intervenants.',
        'Conception d’une architecture en deux volets sur une base commune : gestion du centre (LGCI) et suivi startup (LSS).',
        'Rédaction du cahier des modules : 13 modules côté centre, 12 côté startup et 7 modules transversaux, priorisés selon la méthode MoSCoW.',
        'Exigences adaptées au terrain : mobile-first, fonctionnement hors connexion, mobile money, français et anglais.',
      ],
      results: [
        { value: '32', label: 'modules spécifiés sur les deux volets' },
        { value: '−70 %', label: 'de temps de reporting visé grâce à l’automatisation' },
        { value: '> 80 %', label: 'd’utilisateurs actifs visés trois mois après déploiement' },
      ],
      resultsNote: 'Objectifs fixés pour la plateforme, à mesurer après déploiement.',
      quote: {
        text: 'Une donnée saisie une fois doit être visible partout où elle est utile, avec les bons droits d’accès.',
        cite: 'Principe directeur d’Incub’OS',
      },
    },
    {
      // EXEMPLE — à remplacer
      slug: 'diagnostic-organisationnel-administration',
      offer: 'expertise',
      title:
        'Diagnostic organisationnel et feuille de route de transformation d’une administration',
      client: 'Administration publique',
      country: 'Bénin',
      year: '2025',
      duration: '6 mois',
      image: 'photo-1541872703-74c5e44368f9-w1400.jpg',
      excerpt:
        'Cartographier les processus, objectiver les dysfonctionnements et bâtir une trajectoire de transformation partagée.',
      context:
        'Confrontée à une hausse de la demande de services et à des circuits de décision allongés, l’administration souhaitait disposer d’une lecture objective de son organisation avant d’engager un programme de modernisation.',
      challenges: [
        'Processus peu documentés et responsabilités parfois redondantes.',
        'Absence d’indicateurs partagés pour piloter la qualité de service.',
        'Nécessité d’embarquer les équipes dans la démarche.',
      ],
      actions: [
        'Entretiens, ateliers participatifs et cartographie des processus clés.',
        'Analyse des écarts entre l’organisation actuelle et les missions attendues.',
        'Co-construction d’une feuille de route priorisée avec les directions concernées.',
        'Mise en place d’un tableau de bord de suivi de la transformation.',
      ],
      results: [
        { value: '✓', label: 'Processus clés cartographiés et validés' },
        { value: '✓', label: 'Feuille de route priorisée et adoptée' },
        { value: '✓', label: 'Indicateurs de pilotage partagés' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'pmo-programme-investissement',
      offer: 'projets',
      title: 'Mise en place d’un PMO pour un programme d’investissement public',
      client: 'Institution publique',
      country: 'Guinée',
      year: '2025',
      duration: '12 mois',
      image: 'photo-1454165804606-c3d57bc86b40-w1400.jpg',
      excerpt:
        'Structurer la gouvernance, les outils et les rituels de pilotage d’un portefeuille de projets.',
      context:
        'Un portefeuille de projets d’investissement aux calendriers serrés nécessitait une coordination renforcée entre les parties prenantes et une meilleure visibilité sur l’avancement physique et financier.',
      challenges: [
        'Multiplicité des intervenants et des sources d’information.',
        'Retards difficiles à anticiper faute d’alertes précoces.',
        'Reporting aux partenaires techniques et financiers chronophage.',
      ],
      actions: [
        'Définition de la gouvernance du programme et des instances de décision.',
        'Déploiement d’outils de planification, de suivi des risques et de reporting.',
        'Accompagnement des équipes projet et transfert de compétences.',
      ],
      results: [
        { value: '✓', label: 'Gouvernance et instances formalisées' },
        { value: '✓', label: 'Reporting consolidé et régulier' },
        { value: '✓', label: 'Équipes formées aux outils de pilotage' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'tableau-de-bord-decisionnel',
      offer: 'tech',
      title: 'Système de suivi-évaluation et tableau de bord décisionnel',
      client: 'Organisation de développement',
      country: 'Bénin',
      year: '2025',
      duration: '5 mois',
      image: 'photo-1551288049-bebda4e38f71-w1400.jpg',
      excerpt:
        'Collecter, fiabiliser et visualiser les données de terrain pour éclairer les décisions.',
      context:
        'Les données des projets étaient collectées sur des supports multiples et consolidées manuellement, ce qui retardait les analyses et fragilisait la qualité de l’information remontée aux décideurs.',
      challenges: [
        'Collecte terrain sur des zones à faible connectivité.',
        'Indicateurs hétérogènes entre projets.',
        'Besoin d’une lecture rapide pour la direction.',
      ],
      actions: [
        'Harmonisation du cadre d’indicateurs et des définitions.',
        'Outils de collecte mobile utilisables hors connexion.',
        'Conception d’un tableau de bord décisionnel et formation des utilisateurs.',
      ],
      results: [
        { value: '✓', label: 'Cadre d’indicateurs harmonisé' },
        { value: '✓', label: 'Collecte numérique déployée' },
        { value: '✓', label: 'Tableau de bord utilisé en comité de direction' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'strategie-transformation-numerique',
      offer: 'tech',
      title: 'Stratégie de transformation numérique et feuille de route des services en ligne',
      client: 'Institution publique',
      country: 'Guinée',
      year: '2025',
      duration: '6 mois',
      image: 'photo-1552664730-d307ca884978-w1400.jpg',
      excerpt:
        'Définir une trajectoire numérique souveraine, priorisée et finançable pour les services aux usagers.',
      context:
        'L’institution souhaitait dématérialiser plusieurs services aux usagers tout en gardant la maîtrise de ses données et en tenant compte des contraintes de connectivité.',
      challenges: [
        'Systèmes existants peu interopérables.',
        'Enjeux de souveraineté et de sécurité des données.',
        'Capacités internes à renforcer pour piloter les projets numériques.',
      ],
      actions: [
        'Diagnostic de maturité numérique et cartographie des systèmes.',
        'Priorisation des services à dématérialiser selon la valeur pour l’usager.',
        'Feuille de route chiffrée, gouvernance et plan de renforcement des compétences.',
      ],
      results: [
        { value: '✓', label: 'Maturité numérique objectivée' },
        { value: '✓', label: 'Feuille de route priorisée et chiffrée' },
        { value: '✓', label: 'Gouvernance du numérique définie' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'structuration-concession-ressources',
      offer: 'concessions',
      title: 'Structuration et négociation d’une concession de ressources',
      client: 'Autorité publique',
      country: 'Guinée',
      year: '2024',
      duration: '9 mois',
      image: 'photo-1521791136064-7986c2920216-w1400.jpg',
      excerpt:
        'Concilier performance économique, maîtrise des risques et retombées durables pour le territoire.',
      context:
        'L’autorité concédante souhaitait sécuriser les termes d’une concession de long terme en équilibrant attractivité pour l’opérateur et préservation des intérêts publics.',
      challenges: [
        'Asymétrie d’information entre concédant et opérateur.',
        'Engagements environnementaux et sociaux à rendre vérifiables.',
        'Mécanismes de suivi à prévoir dès la signature.',
      ],
      actions: [
        'Analyse économique et financière des scénarios de concession.',
        'Appui à la négociation et à la rédaction des clauses clés.',
        'Conception du dispositif de suivi, de contrôle et de reporting ESG.',
      ],
      results: [
        { value: '✓', label: 'Termes de la concession sécurisés' },
        { value: '✓', label: 'Engagements ESG mesurables' },
        { value: '✓', label: 'Dispositif de suivi opérationnel' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'gouvernance-esg-operateur',
      offer: 'gouvernance',
      title: 'Cadre de gouvernance et de conformité pour un opérateur stratégique',
      client: 'Entreprise publique',
      country: 'Bénin',
      year: '2024',
      duration: '4 mois',
      image: 'photo-1497366216548-37526070297c-w1400.jpg',
      excerpt:
        'Clarifier les rôles, sécuriser les décisions et installer une culture de la conformité.',
      context:
        'Dans un contexte d’exigences réglementaires accrues, l’opérateur souhaitait moderniser sa gouvernance et renforcer la maîtrise de ses risques.',
      challenges: [
        'Chartes et délégations de pouvoir à actualiser.',
        'Cartographie des risques incomplète.',
        'Besoin d’outils simples pour les organes de gouvernance.',
      ],
      actions: [
        'Revue des instances, chartes et délégations.',
        'Cartographie des risques et plan de maîtrise associé.',
        'Formation des administrateurs et des responsables.',
      ],
      results: [
        { value: '✓', label: 'Chartes et délégations actualisées' },
        { value: '✓', label: 'Risques cartographiés et suivis' },
        { value: '✓', label: 'Administrateurs formés' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'systeme-management-integre-qse',
      offer: 'gouvernance',
      title: 'Déploiement d’un système de management intégré qualité, sécurité, environnement',
      client: 'Entreprise industrielle',
      country: 'Bénin',
      year: '2024',
      duration: '8 mois',
      image: 'photo-1503387762-592deb58ef4e-w1400.jpg',
      excerpt:
        'Accompagner une organisation vers un système de management intégré, du diagnostic à l’audit.',
      context:
        'L’entreprise souhaitait structurer ses pratiques qualité, sécurité et environnement au sein d’un système unique, lisible pour ses équipes et ses clients.',
      challenges: [
        'Pratiques existantes hétérogènes selon les sites.',
        'Documentation à rationaliser.',
        'Appropriation par les équipes opérationnelles.',
      ],
      actions: [
        'Diagnostic initial au regard des référentiels applicables.',
        'Conception et documentation du système intégré.',
        'Formation des équipes et audits internes à blanc.',
      ],
      results: [
        { value: '✓', label: 'Système intégré documenté' },
        { value: '✓', label: 'Auditeurs internes formés' },
        { value: '✓', label: 'Organisation prête pour l’audit' },
      ],
    },
    {
      // EXEMPLE — à remplacer
      slug: 'renforcement-capacites-gestion-projets',
      offer: 'expertise',
      title: 'Programme de renforcement des capacités en gestion de projets',
      client: 'Ministère sectoriel',
      country: 'Guinée',
      year: '2024',
      duration: '3 mois',
      image: 'photo-1524178232363-1fb2b075b655-w1400.jpg',
      excerpt: 'Former les équipes aux méthodes et outils de pilotage de projets publics.',
      context:
        'Pour accompagner un nouveau cycle de projets, le ministère souhaitait doter ses cadres d’un socle commun de méthodes et d’outils de gestion de projets.',
      challenges: [
        'Niveaux de pratique très variables entre les participants.',
        'Nécessité d’ancrer la formation dans des cas réels.',
      ],
      actions: [
        'Diagnostic des besoins et parcours de formation modulaire.',
        'Ateliers pratiques sur les projets en cours des participants.',
        'Coaching post-formation et évaluation des acquis.',
      ],
      results: [
        { value: '✓', label: 'Parcours modulaire conçu sur mesure' },
        { value: '✓', label: 'Mise en pratique sur des projets réels' },
        { value: '✓', label: 'Acquis évalués à l’issue du programme' },
      ],
    },
  ],
}
