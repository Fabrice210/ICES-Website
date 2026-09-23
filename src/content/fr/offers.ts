import type { OfferSlide } from '../../types/content'

const photo = (id: string) => `${id}-w1400.jpg`

/** Les 6 offres du slider (repris du tableau OFFERS de l'original). */
export const offerSlides: OfferSlide[] = [
  {
    title: 'Des <em>technologies</em> conçues pour résoudre des <em>problèmes réels</em>.',
    text: "Nous concevons et déployons des solutions technologiques adaptées aux réalités africaines : intelligence artificielle, Data Science, plateformes numériques, IoT, cybersécurité, cloud et outils d'aide à la décision.",
    images: [
      { file: photo('photo-1518770660439-4636190af475'), label: 'Intelligence Artificielle & Data Science' },
      { file: photo('photo-1451187580459-43490279c0fa'), label: 'Ingénierie & Solutions Technologiques' },
      { file: photo('photo-1552664730-d307ca884978'), label: 'Conseil Numérique aux Gouvernements' },
    ],
  },
  {
    title: 'Des <em>expertises</em> pour transformer les enjeux en <em>décisions éclairées</em>.',
    text: 'Nous mobilisons nos expertises pour accompagner les organisations dans leurs réflexions stratégiques, leurs études, leurs audits, leurs évaluations et le renforcement des compétences nécessaires à leurs transformations.',
    images: [
      { file: photo('photo-1460925895917-afdab827c52f'), label: 'Audits & Évaluations' },
      { file: photo('photo-1551288049-bebda4e38f71'), label: 'Études, Évaluations & Sondages' },
      { file: photo('photo-1542744173-8e7e53415bb0'), label: 'Conseil Stratégique & Gouvernance' },
      { file: photo('photo-1524178232363-1fb2b075b655'), label: 'Formation & Développement de Capacités' },
    ],
  },
  {
    title: 'Des <em>projets structurés</em> pour passer de <em>l’ambition</em> à <em>l’action</em>.',
    text: 'Nous accompagnons la conception, la structuration et le pilotage de projets complexes, en intégrant les études de faisabilité, la recherche de financements, la gestion des risques et le suivi de leur mise en œuvre.',
    images: [
      { file: photo('photo-1454165804606-c3d57bc86b40'), label: 'Gestion de Projets & PMO' },
      { file: photo('photo-1554224155-6726b3ff858f'), label: 'Levée de Fonds, Structuration & Valorisation' },
    ],
  },
  {
    title: 'Une <em>gouvernance</em> pensée pour renforcer la <em>performance</em>.',
    text: 'Nous accompagnons les institutions et organisations dans la gestion de mandats stratégiques, la structuration de dispositifs de gouvernance et le pilotage d’initiatives visant une performance durable et mesurable.',
    images: [
      { file: photo('photo-1497366216548-37526070297c'), label: 'Représentation Institutionnelle' },
      { file: photo('photo-1503387762-592deb58ef4e'), label: 'Appui au Développement de Pôles Publics' },
      { file: photo('photo-1541872703-74c5e44368f9'), label: 'Capitalisation Institutionnelle' },
    ],
  },
  {
    title: 'Des <em>concessions structurées</em> pour créer une <em>valeur durable</em>.',
    text: 'Nous accompagnons les acteurs publics et privés dans la structuration, la négociation et le suivi des concessions, en conciliant performance économique, gouvernance, maîtrise des risques et impact à long terme.',
    images: [
      { file: photo('photo-1521791136064-7986c2920216'), label: 'Structuration & Négociation de Concessions' },
      { file: photo('photo-1551434678-e076c223a692'), label: 'Suivi, Contrôle & Audit des Concessions' },
      { file: photo('photo-1473341304170-971dccb5ac1e'), label: 'Gouvernance ESG des Concessions' },
    ],
  },
  {
    title: 'Des <em>idées transformées</em> en <em>solutions</em> à <em>fort impact</em>.',
    text: 'Nous soutenons l’innovation et l’entrepreneuriat à travers la recherche appliquée, l’incubation, l’accélération et le développement de solutions répondant aux besoins réels des territoires et des marchés africains.',
    images: [
      { file: photo('photo-1532187863486-abf9dbad1b69'), label: 'Recherche & Développement Appliqués' },
      { file: photo('photo-1522071820081-009f0129c71c'), label: 'Accompagnement Entrepreneurial & Incubation' },
      { file: photo('photo-1531482615713-2afd69097998'), label: 'Plateformes & Solutions Propriétaires Africaines' },
    ],
  },
]
