import type { OfferSlide } from '../../types/content'

const photo = (id: string) => `${id}-w1400.jpg`

/**
 * Les 6 segments de la plaquette (« 03 - Nos segments et offres »), dans l'ordre
 * validé en réunion. Chaque axe porte ses composantes indicatives d'offres.
 * Visuels provisoires en attendant ceux des designers.
 */
export const offerSlides: OfferSlide[] = [
  {
    segment: 'Prestations Intellectuelles',
    title: 'Des <em>expertises</em> pour transformer les enjeux en <em>décisions éclairées</em>.',
    text: 'Nous mobilisons nos expertises pour accompagner les organisations dans leurs réflexions stratégiques, leurs études, leurs audits, leurs évaluations et le renforcement des compétences nécessaires à leurs transformations.',
    images: [
      {
        file: photo('photo-1460925895917-afdab827c52f'),
        label: 'Audits & Évaluations',
        services: [
          'Audit diagnostic organisationnel, RH et institutionnel',
          'Audit de gouvernance publique et privée — portefeuilles d’État, conseils d’administration, organes de tutelle',
          'Audit de maturité digitale, transformation numérique et adoption de l’IA',
          'Audit ESG, conformité environnementale et développement durable',
          'Audit et diagnostic de cybersécurité (RGPD, NIS2, ISO 27001, souveraineté numérique)',
          'Audit de performance financière et de gestion budgétaire (secteur public & parapublic)',
          'Due diligence stratégique, financière et technologique (M&A, PPP, investissements publics)',
        ],
      },
      {
        file: photo('photo-1551288049-bebda4e38f71'),
        label: 'Études, Évaluations & Sondages',
        services: [
          'Études de faisabilité technico-économique et financière (infrastructures, énergie, mines, BTP)',
          'Études d’impact socio-économique et environnemental (politiques, programmes, projets)',
          'Évaluation d’impact des politiques publiques, des projets et des stratégies (ex-ante, à mi-parcours, ex-post)',
          'Sondages et enquêtes d’opinion (perception citoyenne, satisfaction des usagers, baromètres institutionnels)',
          'Études sectorielles et analyses de marchés (mines, énergie, agriculture, santé, éducation, numérique)',
          'Études prospectives et analyses stratégiques (scénarios de transformation, ruptures, vision long terme)',
        ],
      },
      {
        file: photo('photo-1542744173-8e7e53415bb0'),
        label: 'Conseil Stratégique & Gouvernance',
        services: [
          'Élaboration de stratégies d’entreprises, d’institutions et d’États',
          'Gouvernance publique et institutionnelle (GovTech, E-Gov, OHADA)',
          'Conseil en régulation, politiques publiques et affaires gouvernementales',
          'Gouvernance des risques, conformité et contrôle interne',
        ],
      },
      {
        file: photo('photo-1524178232363-1fb2b075b655'),
        label: 'Formation & Développement de Capacités',
        services: [
          'Formation en leadership, management et gouvernance (secteurs public & privé)',
          'Academy transformation digitale et intelligence artificielle',
          'Certifications professionnelles (ISO, cybersécurité, PMP, ESG…)',
          'Programmes de renforcement des capacités institutionnelles (bailleurs de fonds)',
        ],
      },
    ],
  },
  {
    segment: 'Mandats de Représentation & Gouvernance Déléguée',
    title: 'Une <em>gouvernance</em> pensée pour renforcer la <em>performance</em>.',
    text: 'Nous accompagnons les institutions et organisations dans la gestion de mandats stratégiques, la structuration de dispositifs de gouvernance et le pilotage d’initiatives visant une performance durable et mesurable.',
    images: [
      {
        file: photo('photo-1497366216548-37526070297c'),
        label: 'Représentation Institutionnelle',
        services: [
          'Mandat de représentation au Conseil d’Administration pour le compte d’États, d’institutions ou d’actionnaires publics',
          'Assistance aux administrateurs mandants (formules Sentinelle, Vigie, Gardien, Flash, Portefeuille)',
          'Reporting et redevabilité structurés auprès de l’autorité mandante',
        ],
      },
      {
        file: photo('photo-1503387762-592deb58ef4e'),
        label: 'Appui au Développement de Pôles Publics',
        services: [
          'Mandat d’appui à la conception et à la mise en œuvre de pôles relevant des services publics (santé, éducation, eau, énergie, logistique)',
          'Pilotage opérationnel délégué de programmes structurants pour le compte de l’État',
          'Coordination multi-acteurs (administrations, opérateurs, partenaires techniques et financiers)',
        ],
      },
      {
        file: photo('photo-1541872703-74c5e44368f9'),
        label: 'Capitalisation Institutionnelle',
        services: [
          'Gestion de la capitalisation : documentation, mémoire institutionnelle et retours d’expérience',
          'Transfert de compétences et de savoir-faire au profit du mandant',
          'Structuration des bases de connaissance pour la continuité des politiques publiques',
        ],
      },
    ],
  },
  {
    segment: 'Ingénierie de Projets & de Financement',
    title:
      'Des <em>projets structurés</em> pour passer de <em>l’ambition</em> à <em>l’action</em>.',
    text: 'Nous accompagnons la conception, la structuration et le pilotage de projets complexes, en intégrant les études de faisabilité, la recherche de financements, la gestion des risques et le suivi de leur mise en œuvre.',
    images: [
      {
        file: photo('photo-1454165804606-c3d57bc86b40'),
        label: 'Gestion de Projets & PMO',
        services: [
          'Management de programmes et projets complexes (multisectoriels, multipartenaires)',
          'Mise en place et animation de PMO d’excellence (Project Management Office)',
          'Contrôle de gestion de projets, reporting bailleurs et suivi-évaluation',
        ],
      },
      {
        file: photo('photo-1554224155-6726b3ff858f'),
        label: 'Levée de Fonds, Structuration & Valorisation',
        services: [
          'Appui à la levée de fonds auprès de bailleurs, fonds d’investissement et institutions de financement',
          'Montage et rédaction de propositions et dossiers de financement',
          'Structuration financière et juridique de projets, d’actifs et de véhicules d’investissement (PPP, fonds souverains)',
          'Valorisation d’actifs, de projets et d’entreprises',
          'Accompagnement des relations avec les partenaires techniques et financiers (PTF)',
        ],
      },
    ],
  },
  {
    segment: 'Solutions Technologiques',
    title: 'Des <em>technologies</em> conçues pour résoudre des <em>problèmes réels</em>.',
    text: "Nous concevons et déployons des solutions technologiques adaptées aux réalités africaines : intelligence artificielle, Data Science, plateformes numériques, IoT, cybersécurité, cloud et outils d'aide à la décision.",
    images: [
      {
        file: photo('photo-1518770660439-4636190af475'),
        label: 'Intelligence Artificielle & Data Science',
        services: [
          'Stratégie d’implémentation IA générative et IA appliquée (secteurs public & privé)',
          'Data governance, architecture Lakehouse et gestion de la donnée',
          'Analytics prédictif, Business Intelligence et tableaux de bord stratégiques',
        ],
      },
      {
        file: photo('photo-1451187580459-43490279c0fa'),
        label: 'Ingénierie & Solutions Technologiques',
        services: [
          'Architecture cloud hybride et multi-cloud (conception, déploiement, optimisation)',
          'Digitalisation des processus organisationnels et des services publics',
          'Solutions IoT industriel (IIoT) et connectivité terrain (sites miniers, énergie)',
          'Cybersécurité zero trust, protection des données et souveraineté numérique',
          'Déploiement de drones (inspection, surveillance, logistique, télédétection minière et agricole)',
        ],
      },
      {
        file: photo('photo-1552664730-d307ca884978'),
        label: 'Conseil Numérique aux Gouvernements',
        services: [
          'Modernisation numérique des administrations et services publics',
          'Stratégies nationales d’intelligence artificielle et de souveraineté numérique',
          'Cybersécurité nationale et protection des infrastructures critiques',
        ],
      },
    ],
  },
  {
    segment: 'Gestion de Concessions',
    title: 'Des <em>concessions structurées</em> pour créer une <em>valeur durable</em>.',
    text: 'Nous accompagnons les acteurs publics et privés dans la structuration, la négociation et le suivi des concessions, en conciliant performance économique, gouvernance, maîtrise des risques et impact à long terme.',
    images: [
      {
        file: photo('photo-1521791136064-7986c2920216'),
        label: 'Structuration & Négociation de Concessions',
        services: [
          'Structuration juridique, financière et fiscale des contrats de concession (mines, ports, énergie, télécoms, agro-industrie)',
          'Négociation et renégociation des conventions minières et accords de partage de production',
          'Montage de PPP et contrats de concession de service public (eau, électricité, transport, corridors logistiques)',
          'Structuration de concessions agricoles, forestières, foncières et halieutiques',
        ],
      },
      {
        file: photo('photo-1551434678-e076c223a692'),
        label: 'Suivi, Contrôle & Audit des Concessions',
        services: [
          'Audit de conformité aux obligations contractuelles et cahiers des charges',
          'Contrôle et certification des redevances, royalties et recettes extractives',
          'Suivi de performance, reporting et tableaux de bord des contrats de concession',
          'Audit de transparence extractive (ITIE/EITI) et gouvernance des ressources naturelles',
        ],
      },
      {
        file: photo('photo-1473341304170-971dccb5ac1e'),
        label: 'Gouvernance ESG des Concessions',
        services: [
          'Suivi environnemental et social (ESIA, PGES, plans de réinstallation)',
          'Gestion des relations avec les communautés riveraines et parties prenantes',
          'Conformité aux standards internationaux (Normes de performance IFC, Principes de l’Équateur, ODD)',
        ],
      },
    ],
  },
  {
    segment: 'Innovation & Entrepreneuriat',
    title: 'Des <em>idées transformées</em> en <em>solutions</em> à <em>fort impact</em>.',
    text: 'Nous soutenons l’innovation et l’entrepreneuriat à travers la recherche appliquée, l’incubation, l’accélération et le développement de solutions répondant aux besoins réels des territoires et des marchés africains.',
    images: [
      {
        file: photo('photo-1532187863486-abf9dbad1b69'),
        label: 'Recherche & Développement Appliqués',
        services: [
          'R&D collaborative et co-innovation avec les écosystèmes académiques et industriels',
          'Valorisation de la recherche et transfert technologique',
          'Protection intellectuelle stratégique (brevets, marques, propriété industrielle)',
        ],
      },
      {
        file: photo('photo-1522071820081-009f0129c71c'),
        label: 'Accompagnement Entrepreneurial & Incubation',
        services: [
          'Détection, sélection et accompagnement de porteurs de projets innovants',
          'Incubation de startups et de PME à fort potentiel',
          'Accompagnement à l’accès aux financements (capital-risque, fonds d’amorçage, ZLECAf)',
        ],
      },
      {
        file: photo('photo-1531482615713-2afd69097998'),
        label: 'Plateformes & Solutions Propriétaires Africaines',
        services: [
          'Conception et déploiement de plateformes numériques complexes adaptées aux défis africains',
          'Solutions souveraines intégrant transfert de compétences et capitalisation locale obligatoires',
          'Plateformes d’intelligence décisionnelle pour États et institutions',
        ],
      },
    ],
  },
]
