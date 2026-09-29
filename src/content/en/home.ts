import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'
import { offerSlides } from './offers'

export const home: SiteContent['home'] = {
  hero: {
    title: { lead: 'Shaping', tail: 'Africa’s', end: 'future.' },
    text: 'We support governments, institutions and organisations in designing and delivering high-impact strategic, operational and technological transformations.',
    cta: { label: 'Let’s talk about your project', to: '#contact' },
    secondaryCta: { label: 'About us', to: '#vision' },
    scrollLabel: 'Scroll',
    expandCta: { label: 'Explore our offers', to: '#offres' },
    facts: [
      { icon: 'atom', title: '6 offer areas', text: 'From strategic consulting to innovation' },
      { icon: 'globe', title: 'French-speaking Africa', text: 'Based in Benin and Guinea' },
    ],
  },

  audiences: {
    title: 'Who we work with',
    intro:
      'ICES supports a wide range of public, private and institutional actors facing strategic, operational and technological challenges. Together, we build responses tailored to their realities, from thinking to delivery.',
    cards: [
      {
        icon: 'landmark',
        tone: 'blue',
        title: 'Governments & public institutions',
        text: 'We support governments, administrations and institutions in their transformation, governance and development projects.',
      },
      {
        icon: 'building',
        tone: 'violet',
        title: 'Companies & organisations',
        text: 'We help companies and organisations structure their projects, strengthen their performance and deploy solutions suited to their challenges.',
      },
      {
        icon: 'handshake',
        tone: 'coral',
        title: 'Partners & development actors',
        text: 'We work with technical, financial and institutional partners on projects that contribute to the development of territories and communities.',
      },
      {
        icon: 'user',
        tone: 'teal',
        title: 'Project leaders & entrepreneurs',
        text: 'We support innovative initiatives as they structure, grow and scale.',
      },
    ],
  },

  vision: {
    label: 'Our ambition',
    title: 'Complexity is becoming the norm. We choose to make it a lever.',
    paragraphs: [
      'French-speaking Africa stands at a critical crossroads. Accelerating technology, the energy transition, geo-economic realignment and new societal expectations are reshaping the balance.',
      'ICES supports this transformation by combining strategic consulting, project engineering, governance, technology and territorial intelligence.',
    ],
    ambition: {
      label: 'Our ambition',
      text: 'Turning complex challenges into sustainable trajectories, measurable impact and lasting capabilities for our clients and their ecosystems.',
    },
    image: 'photo-1552664730-d307ca884978-w1400.jpg',
    readMore: 'Read more',
    readLess: 'Show less',
    valuesLabel: 'Our values',
    valuesIntro:
      'Five principles that guide every mission, from diagnosis to delegated management.',
    values: [
      {
        label: 'Sovereignty',
        tone: 'blue',
        text: 'We help governments and organisations stay in control of their choices: decision-making autonomy, data control and the sustainable development of their sovereign resources.',
      },
      {
        label: 'Foresight',
        tone: 'violet',
        text: 'Shaping the future rather than enduring it: we are already factoring in the technological, energy and geo-economic disruptions that will reshape French-speaking Africa.',
      },
      {
        label: 'Excellence',
        tone: 'gold',
        text: 'We diagnose, restructure and optimise rigorously to guarantee reliable, high-quality services throughout our missions.',
      },
      {
        label: 'Innovation',
        tone: 'teal',
        text: 'Innovation is not decreed, it is engineered: we turn breakthrough technologies into concrete solutions suited to African realities.',
      },
      {
        label: 'Impact',
        tone: 'coral',
        text: 'Every mission aims for measurable results and lasting value for our clients, our partners and African communities.',
      },
    ],
    link: { label: 'Discover ICES', to: '/#equipe' },
  },

  offers: {
    title: 'Our offers',
    brochure: {
      label: 'Download our brochure',
      fileName: 'ICES_Plaquette_Afrique_Francophone_2045.docx',
    },
    quoteCta: { label: 'Request a quote', to: '#contact' },
    prevLabel: 'Previous offer',
    nextLabel: 'Next offer',
    statusTemplate: 'Offer {n} of {total}',
    slides: offerSlides,
  },

  expertises: {
    image: 'photo-1487958449943-2429e8be8625-w2000.jpg',
    title: 'Our expertise',
    intro:
      'We don’t just sell services. We design and deliver transformations in strategic fields for governments, institutions, companies and territories.',
    items: [
      {
        icon: 'user',
        title: 'Human Capital & Organisations',
        image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
        text: 'Transforming skills, organisations and cultures to unlock collective intelligence.',
      },
      {
        icon: 'gauge',
        title: 'Operational Excellence & Public Performance',
        image: 'photo-1454165804606-c3d57bc86b40-w1400.jpg',
        text: 'Optimising organisations, processes and projects to build lasting efficiency.',
      },
      {
        icon: 'shield',
        title: 'Governance & Compliance',
        image: 'photo-1521791136064-7986c2920216-w1400.jpg',
        text: 'Securing decisions, risks and trajectories in a changing environment.',
      },
    ],
    link: { label: 'See all our expertise', to: '/prestations' },
  },

  targets: {
    title: 'Who we serve',
    intro:
      'A strategic partner to governments, institutions and organisations in French-speaking Africa, with deep expertise in concessions, institutional mandates and sovereign resources.',
    link: { label: 'Let’s talk about your project', to: '#contact' },
    items: [
      {
        icon: 'landmark',
        title: 'Governments and administrations',
        text: 'Ministries, central administrations and local authorities modernising public action.',
        image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
      },
      {
        icon: 'shield',
        title: 'State-owned companies and granting authorities',
        text: 'Regulatory agencies and bodies managing concessions and public assets.',
        image: 'photo-1473341304170-971dccb5ac1e-w1400.jpg',
      },
      {
        icon: 'globe',
        title: 'International institutions and donors',
        text: 'Development finance institutions, including regional institutions.',
        image: 'photo-1554224155-6726b3ff858f-w1400.jpg',
      },
      {
        icon: 'building',
        title: 'Companies, multinationals and concession holders',
        text: 'Groups and operators investing, running concessions and growing in French-speaking Africa.',
        image: 'photo-1497366216548-37526070297c-w1400.jpg',
      },
      {
        icon: 'bulb',
        title: 'Innovation ecosystems',
        text: 'Strategic sectors and leaders of structuring projects.',
        image: 'photo-1531482615713-2afd69097998-w1400.jpg',
      },
    ],
  },

  realisations: {
    title: 'Missions & Projects',
    kicker: 'In the field',
    cardCta: 'View the mission',
    intro:
      'Behind every mission lies a challenge, stakeholders and a transformation goal. See how our expertise, offers and solutions turn into concrete interventions serving organisations and territories.',
    works: [
      { image: 'photo-1486325212027-8081e485255e-w900.jpg', label: 'Project 1' },
      { image: 'photo-1479839672679-a46483c0e7c8-w900.jpg', label: 'Project 2' },
      { image: 'photo-1464938050520-ef2270bb8ce8-w900.jpg', label: 'Project 3' },
    ],
    link: { label: 'See all our projects', to: PENDING_LINK },
  },

  approach: {
    title: 'Our approach',
    intro:
      'Every ICES mission relies on an integrated, iterative methodology designed to move from understanding the challenges to delivery and continuous improvement.',
    steps: [
      {
        num: '01',
        title: 'Diagnosis',
        text: 'Understand the challenges, map the risks and identify the potential.',
      },
      {
        num: '02',
        title: 'Tailored design',
        text: 'Co-build solutions with stakeholders and plan the trajectories.',
      },
      {
        num: '03',
        title: 'Integrated delivery',
        text: 'Implement, steer, transfer skills and build lasting capabilities.',
      },
      {
        num: '04',
        title: 'Monitoring & scaling',
        text: 'Measure impact, optimise results and capitalise on lessons learned.',
      },
    ],
  },

  news: {
    title: 'News & Events',
    intro:
      'ICES also supports skills development through training, capacity-building programmes and initiatives that encourage knowledge sharing.',
    dotLabelTemplate: 'Show item {n}',
    prevLabel: 'Previous item',
    nextLabel: 'Next item',
    rotators: [
      {
        label: 'News',
        items: [
          {
            image: 'photo-1541872703-74c5e44368f9-w1200.jpg',
            text: 'ICES continues its commitment alongside African institutions and organisations, supporting sustainable transformations adapted to local realities and delivering concrete impact.',
            link: { label: 'Read the news', to: PENDING_LINK },
          },
          {
            image: 'photo-1504711434969-e33886168f5c-w1200.jpg',
            text: '[To be replaced] ICES strengthens its presence in Guinea by opening its Conakry office to support public and private actors.',
            link: { label: 'Read the news', to: PENDING_LINK },
          },
          {
            image: 'photo-1454165804606-c3d57bc86b40-w1200.jpg',
            text: '[To be replaced] Launch of a new capacity-building programme dedicated to the governance of public projects.',
            link: { label: 'Read the news', to: PENDING_LINK },
          },
        ],
      },
      {
        label: 'Events',
        items: [
          {
            image: 'photo-1497366216548-37526070297c-w1200.jpg',
            text: 'ICES hosts a meeting on organisational transformation and the new opportunities offered by innovation and technology in Africa.',
            link: { label: 'Discover the event', to: PENDING_LINK },
          },
          {
            image: 'photo-1540575467063-178a50c2df87-w1200.jpg',
            text: '[To be replaced] Workshop on artificial intelligence serving African public administrations.',
            link: { label: 'Discover the event', to: PENDING_LINK },
          },
          {
            image: 'photo-1475721027785-f74eccf877e2-w1200.jpg',
            text: '[To be replaced] Round table: structuring and sustainably managing resource concessions.',
            link: { label: 'Discover the event', to: PENDING_LINK },
          },
        ],
      },
    ],
  },

  team: {
    title: 'Team & Locations',
    introTitle: 'Expertise open to Africa and the world.',
    introText:
      'Complex transformations call for many kinds of expertise. ICES brings together a network of sector experts, engineers, lawyers, appointed directors and data scientists, backed by academic and technology partnerships.',
    expertiseLabel: 'Expertise:',
    teamCard: { label: 'Our team', hint: 'Hover to meet the team' },
    partners: {
      label: 'Partners & clients',
      text: 'They trust us and work alongside us.',
      items: [
        { name: 'PECB', kind: 'Partner' },
        { name: 'Groupe OFMAS', kind: 'Client', logo: 'logo-ofmas.png' },
        { name: 'CEPEPE', kind: 'Client', logo: 'logo-cepepe.png' },
      ],
    },
    tabs: [
      {
        label: 'Leadership team',
        members: [
          {
            name: 'FIOGBE Bernadin',
            role: 'Chief Executive Officer',
            photo: 'photo-1507003211169-0a1dd7228f2d-w700.jpg',
            alt: 'Portrait of Bernadin Fiogbe',
            expertise: [
              'Management Systems expert',
              'CERTIFIED LEAD MANAGER ISO 26000',
              'TRAINER & CERTIFIED LEAD AUDITOR SMI-QSE-SOME-SMRSO',
              'Project and Programme Management specialist',
            ],
          },
          {
            name: 'NIKKI Olivier',
            role: 'Head of Legal',
            photo: 'photo-1506794778202-cad84cf45f1d-w700.jpg',
            alt: 'Portrait of Olivier Nikki',
            expertise: ['[To be completed]'],
          },
        ],
      },
      {
        label: 'Our experts',
        members: [
          {
            name: '[Expert name]',
            role: '[Position]',
            photo: 'photo-1500648767791-00dcc994a43e-w700.jpg',
            alt: '',
            expertise: ['[To be completed]'],
          },
          {
            name: '[Expert name]',
            role: '[Position]',
            photo: 'photo-1519085360753-af0119f7cbe7-w700.jpg',
            alt: '',
            expertise: ['[To be completed]'],
          },
        ],
      },
    ],
    presence: {
      map: 'presence-map.png',
      mapAlt: 'Map of Africa: ICES locations in Benin and Guinea',
      title: 'Locally rooted. Connected to French-speaking Africa.',
      text: 'Our knowledge of local contexts drives our ability to support transformations at regional scale.',
      places: ['Head office — Benin', 'Office — Guinea'],
      lead: {
        before: 'Based',
        after:
          ', we work closely with institutions, companies and territories. This in-depth knowledge of local contexts, stakeholders and realities on the ground drives our ability to design and deliver sustainable transformations across French-speaking Africa.',
      },
      listLabel: 'Our locations',
      countries: [
        { id: '204', name: 'Benin', prep: 'in', role: 'Head office', place: 'Cotonou' },
        { id: '324', name: 'Guinea', prep: 'in', role: 'Office', place: 'Conakry' },
        { id: '178', name: 'Congo', prep: 'in', role: 'Coming soon', place: 'Next location' },
      ],
      globeHint: 'Drag to spin the globe',
    },
  },
}
