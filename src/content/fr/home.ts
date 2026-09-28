import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'
import { offerSlides } from './offers'

export const home: SiteContent['home'] = {
  hero: {
    title: { lead: 'Façonnons', tail: 'l’Afrique', end: 'de demain.' },
    text: 'Nous accompagnons les États, les institutions et les organisations dans la conception et le déploiement de transformations stratégiques, opérationnelles et technologiques à fort impact.',
    cta: { label: 'Parlons de votre projet', to: '#contact' },
    secondaryCta: { label: 'Nous connaître', to: '#vision' },
    scrollLabel: 'Défiler',
    expandCta: { label: 'Découvrir nos offres', to: '#offres' },
    facts: [
      { icon: 'atom', title: '6 pôles d’offres', text: 'Du conseil stratégique à l’innovation' },
      { icon: 'globe', title: 'Afrique francophone', text: 'Présents au Bénin et en Guinée' },
    ],
  },

  audiences: {
    title: 'Nos interlocuteurs',
    intro:
      'ICES accompagne une diversité d’acteurs publics, privés et institutionnels confrontés à des enjeux stratégiques, opérationnels et technologiques. Nous construisons avec eux des réponses adaptées à leurs réalités, de la réflexion à la mise en œuvre.',
    cards: [
      {
        icon: 'landmark',
        tone: 'blue',
        title: 'États & institutions publiques',
        text: 'Nous accompagnons les États, administrations et institutions dans leurs projets de transformation, de gouvernance et de développement.',
      },
      {
        icon: 'building',
        tone: 'violet',
        title: 'Entreprises & organisations',
        text: 'Nous aidons les entreprises et organisations à structurer leurs projets, renforcer leur performance et déployer des solutions adaptées à leurs enjeux.',
      },
      {
        icon: 'handshake',
        tone: 'coral',
        title: 'Partenaires & acteurs du développement',
        text: 'Nous collaborons avec les partenaires techniques, financiers et institutionnels autour de projets contribuant au développement des territoires et des populations.',
      },
      {
        icon: 'user',
        tone: 'teal',
        title: 'Porteurs de projets & entrepreneurs',
        text: 'Nous accompagnons les initiatives innovantes dans leur structuration, leur développement et leur passage à l’échelle.',
      },
    ],
  },

  vision: {
    label: 'Notre ambition',
    title: 'La complexité devient la norme. Nous choisissons d’en faire un levier.',
    paragraphs: [
      'L’Afrique francophone se trouve à un carrefour critique. Accélération technologique, transition énergétique, recomposition géoéconomique et nouvelles attentes sociétales redessinent les équilibres.',
      'ICES accompagne cette transformation en combinant conseil stratégique, ingénierie de projets, gouvernance, technologies et intelligence des territoires.',
    ],
    ambition: {
      label: 'Notre ambition',
      text: 'Transformer les défis complexes en trajectoires durables, en impacts mesurables et en capacités pérennes pour nos clients et leurs écosystèmes.',
    },
    image: 'photo-1552664730-d307ca884978-w1400.jpg',
    readMore: 'Lire la suite',
    readLess: 'Réduire',
    valuesLabel: 'Nos valeurs',
    valuesIntro:
      'Cinq principes qui guident chacune de nos missions, du diagnostic à la gestion déléguée.',
    values: [
      {
        label: 'Souveraineté',
        tone: 'blue',
        text: 'Nous aidons les États et les organisations à rester maîtres de leurs choix : autonomie décisionnelle, maîtrise des données et valorisation durable de leurs ressources souveraines.',
      },
      {
        label: 'Anticipation',
        tone: 'violet',
        text: 'Façonner l’avenir plutôt que le subir : nous intégrons dès aujourd’hui les ruptures technologiques, énergétiques et géoéconomiques qui redessineront l’Afrique francophone.',
      },
      {
        label: 'Excellence',
        tone: 'gold',
        text: 'Nous diagnostiquons, restructurons et optimisons avec rigueur pour garantir la fiabilité et la qualité des services, sur toute la durée de nos missions.',
      },
      {
        label: 'Innovation',
        tone: 'teal',
        text: 'L’innovation ne se décrète pas, elle s’ingénie : nous traduisons les technologies de rupture en solutions concrètes, adaptées au terrain africain.',
      },
      {
        label: 'Impact',
        tone: 'coral',
        text: 'Chaque mission vise des résultats mesurables et une valeur pérenne pour nos clients, nos partenaires et les populations africaines.',
      },
    ],
    link: { label: 'Découvrir ICES', to: '/#equipe' },
  },

  offers: {
    title: 'Nos offres',
    brochure: {
      label: 'Téléchargez notre plaquette',
      fileName: 'ICES_Plaquette_Afrique_Francophone_2045.docx',
    },
    quoteCta: { label: 'Demandez un devis', to: '#contact' },
    prevLabel: 'Offre précédente',
    nextLabel: 'Offre suivante',
    statusTemplate: 'Offre {n} sur {total}',
    slides: offerSlides,
  },

  expertises: {
    image: 'photo-1487958449943-2429e8be8625-w2000.jpg',
    title: 'Nos expertises',
    intro:
      'Nous ne vendons pas simplement des prestations. Nous concevons et déployons des transformations dans des domaines stratégiques pour les États, les institutions, les entreprises et les territoires.',
    items: [
      {
        icon: 'user',
        title: 'Capital Humain & Organisations',
        image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
        text: 'Transformer les compétences, les organisations et les cultures pour libérer l’intelligence collective.',
      },
      {
        icon: 'gauge',
        title: 'Excellence Opérationnelle & Performance Publique',
        image: 'photo-1454165804606-c3d57bc86b40-w1400.jpg',
        text: 'Optimiser les organisations, les processus et les projets pour renforcer leur efficacité durable.',
      },
      {
        icon: 'shield',
        title: 'Gouvernance & Conformité',
        image: 'photo-1521791136064-7986c2920216-w1400.jpg',
        text: 'Sécuriser les décisions, les risques et les trajectoires dans un environnement en mutation.',
      },
    ],
    link: { label: 'Voir toutes nos expertises', to: '/prestations' },
  },

  targets: {
    title: 'Nos cibles',
    intro:
      'Partenaire stratégique des États, institutions et organisations en Afrique francophone, avec une expertise renforcée sur la gestion des concessions, des mandats institutionnels et des ressources souveraines.',
    link: { label: 'Parlons de votre projet', to: '#contact' },
    items: [
      {
        icon: 'landmark',
        title: 'Gouvernements et administrations',
        text: 'Ministères, administrations centrales et collectivités engagés dans la modernisation de l’action publique.',
        image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
      },
      {
        icon: 'shield',
        title: 'Sociétés d’État et autorités concédantes',
        text: 'Agences de régulation et de gestion des concessions et du patrimoine public.',
        image: 'photo-1473341304170-971dccb5ac1e-w1400.jpg',
      },
      {
        icon: 'globe',
        title: 'Institutions internationales et bailleurs de fonds',
        text: 'Organismes de financement du développement, institutions régionales incluses.',
        image: 'photo-1554224155-6726b3ff858f-w1400.jpg',
      },
      {
        icon: 'building',
        title: 'Entreprises, multinationales et concessionnaires',
        text: 'Groupes et opérateurs qui investissent, exploitent des concessions et se développent en Afrique francophone.',
        image: 'photo-1497366216548-37526070297c-w1400.jpg',
      },
      {
        icon: 'bulb',
        title: 'Écosystèmes d’innovation',
        text: 'Filières stratégiques et porteurs de projets structurants.',
        image: 'photo-1531482615713-2afd69097998-w1400.jpg',
      },
    ],
  },

  realisations: {
    title: 'Missions & Réalisations',
    kicker: 'Sur le terrain',
    cardCta: 'Voir la mission',
    intro:
      'Derrière chaque mission, une problématique, des parties prenantes et un objectif de transformation. Découvrez comment nos expertises, nos offres et nos solutions se traduisent en interventions concrètes au service des organisations et des territoires.',
    works: [
      { image: 'photo-1486325212027-8081e485255e-w900.jpg', label: 'Réalisation 1' },
      { image: 'photo-1479839672679-a46483c0e7c8-w900.jpg', label: 'Réalisation 2' },
      { image: 'photo-1464938050520-ef2270bb8ce8-w900.jpg', label: 'Réalisation 3' },
    ],
    link: { label: 'Voir toutes nos réalisations', to: PENDING_LINK },
  },

  approach: {
    title: 'Notre approche',
    intro:
      'Chaque mission ICES s’appuie sur une méthodologie intégrée et itérative, conçue pour passer de la compréhension des enjeux à la mise en œuvre et à l’amélioration continue.',
    steps: [
      {
        num: '01',
        title: 'Diagnostic',
        text: 'Comprendre les enjeux, cartographier les risques et identifier les potentiels.',
      },
      {
        num: '02',
        title: 'Conception sur-mesure',
        text: 'Co-construire les solutions avec les parties prenantes et scénariser les trajectoires.',
      },
      {
        num: '03',
        title: 'Déploiement intégré',
        text: 'Mettre en œuvre, piloter, transférer les compétences et installer les capacités durables.',
      },
      {
        num: '04',
        title: 'Suivi & déploiement',
        text: 'Mesurer l’impact, optimiser les résultats et capitaliser les enseignements.',
      },
    ],
  },

  news: {
    title: 'Actualités & Événements',
    intro:
      'ICES accompagne également le développement des compétences à travers des formations, des programmes de renforcement des capacités et des initiatives favorisant le partage d’expertise.',
    dotLabelTemplate: 'Afficher l’élément {n}',
    prevLabel: 'Élément précédent',
    nextLabel: 'Élément suivant',
    rotators: [
      {
        label: 'Actualités',
        items: [
          {
            image: 'photo-1541872703-74c5e44368f9-w1200.jpg',
            text: 'ICES poursuit son engagement aux côtés des institutions et organisations africaines pour accompagner des transformations durables, adaptées aux réalités locales et porteuses d’un impact concret.',
            link: { label: 'Lire l’actualité', to: PENDING_LINK },
          },
          {
            image: 'photo-1504711434969-e33886168f5c-w1200.jpg',
            text: '[À remplacer] ICES renforce sa présence en Guinée avec l’ouverture de son bureau de Conakry pour accompagner les acteurs publics et privés.',
            link: { label: 'Lire l’actualité', to: PENDING_LINK },
          },
          {
            image: 'photo-1454165804606-c3d57bc86b40-w1200.jpg',
            text: '[À remplacer] Lancement d’un nouveau programme de renforcement des capacités dédié à la gouvernance des projets publics.',
            link: { label: 'Lire l’actualité', to: PENDING_LINK },
          },
        ],
      },
      {
        label: 'Événements',
        items: [
          {
            image: 'photo-1497366216548-37526070297c-w1200.jpg',
            text: 'ICES organise une rencontre dédiée aux enjeux de transformation des organisations et aux nouvelles opportunités offertes par l’innovation et les technologies en Afrique.',
            link: { label: 'Découvrir l’événement', to: PENDING_LINK },
          },
          {
            image: 'photo-1540575467063-178a50c2df87-w1200.jpg',
            text: '[À remplacer] Atelier sur l’intelligence artificielle au service des administrations publiques africaines.',
            link: { label: 'Découvrir l’événement', to: PENDING_LINK },
          },
          {
            image: 'photo-1475721027785-f74eccf877e2-w1200.jpg',
            text: '[À remplacer] Table ronde : structurer et piloter durablement les concessions de ressources.',
            link: { label: 'Découvrir l’événement', to: PENDING_LINK },
          },
        ],
      },
    ],
  },

  team: {
    title: 'Équipe & Implantation',
    introTitle: 'Une expertise ouverte sur l’Afrique et le monde.',
    introText:
      'Les transformations complexes exigent des expertises multiples. ICES mobilise un réseau d’experts sectoriels, d’ingénieurs, de juristes, d’administrateurs mandataires et de data scientists, en s’appuyant sur des partenariats académiques et technologiques.',
    expertiseLabel: 'Expertise:',
    teamCard: { label: 'Notre équipe', hint: 'Survolez pour découvrir l’équipe' },
    partners: {
      label: 'Partenaires & clients',
      text: 'Ils nous font confiance et nous accompagnent.',
      // Repris de la section « Partenaires & Clients » de ices-consulting.com. Le logo PECB du
      // site en ligne est un fichier corrompu : nom en texte en attendant le bon fichier.
      items: [
        { name: 'PECB', kind: 'Partenaire' },
        { name: 'Groupe OFMAS', kind: 'Client', logo: 'logo-ofmas.png' },
        { name: 'CEPEPE', kind: 'Client', logo: 'logo-cepepe.png' },
      ],
    },
    tabs: [
      {
        label: 'Équipe dirigeante',
        members: [
          {
            name: 'FIOGBE Bernadin',
            role: 'Directeur général',
            photo: 'photo-1507003211169-0a1dd7228f2d-w700.jpg',
            alt: 'Portrait de Bernadin Fiogbe',
            expertise: [
              'Expert sur les Systèmes de Management',
              'CERTIFIED LEAD MANAGER ISO 26000',
              'TRAINER & CERTIFIED LEAD AUDITOR SMI-QSE-SOME-SMRSO',
              'Spécialiste en Gestion de Projets et Programmes',
            ],
          },
          {
            name: 'NIKKI Olivier',
            role: 'Responsable Juridique',
            photo: 'photo-1506794778202-cad84cf45f1d-w700.jpg',
            alt: 'Portrait d’Olivier Nikki',
            expertise: ['[À compléter]'],
          },
        ],
      },
      {
        label: 'Nos experts',
        members: [
          {
            name: '[Nom de l’expert]',
            role: '[Fonction]',
            photo: 'photo-1500648767791-00dcc994a43e-w700.jpg',
            alt: '',
            expertise: ['[À compléter]'],
          },
          {
            name: '[Nom de l’expert]',
            role: '[Fonction]',
            photo: 'photo-1519085360753-af0119f7cbe7-w700.jpg',
            alt: '',
            expertise: ['[À compléter]'],
          },
        ],
      },
    ],
    presence: {
      map: 'presence-map.png',
      mapAlt: 'Carte de l’Afrique : implantations d’ICES au Bénin et en Guinée',
      title: 'Ancrés localement. Connectés à l’Afrique francophone.',
      text: 'Notre connaissance des contextes locaux nourrit notre capacité à accompagner des transformations à l’échelle régionale.',
      places: ['Siège — Bénin', 'Bureau — Guinée'],
      // Pays de l'ancienne carte Figma (le Congo y est marqué « Bientôt »).
      countries: [
        { id: '204', name: 'Bénin', role: 'Siège', lift: 40 },
        { id: '324', name: 'Guinée', role: 'Bureau', lift: 100 },
        { id: '178', name: 'Congo', role: 'Bientôt', lift: 30 },
      ],
      globeHint: 'Faites tourner le globe',
    },
  },
}
