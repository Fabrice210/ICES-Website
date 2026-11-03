import type { SiteContent } from '../../types/content'

/* Incubation, News & Events and Training pages (see the French file for sources). */
export const subpages: SiteContent['subpages'] = {
  incubation: {
    hero: {
      tag: 'Incubation',
      image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
      title: 'Ideas turned into high-impact solutions.',
      text: 'ICES identifies, selects and supports innovative project leaders, startups and high-potential SMEs, from application to independence.',
    },
    program: {
      title: 'The incubation programme',
      lead: 'Every startup is followed on Incub-OS, the ICES incubation platform: coaching, training plan, milestones and indicators are shared between the centre team and the founders.',
      pillars: [
        {
          icon: 'users',
          tone: 'teal',
          title: 'Scouting & selection',
          text: 'Scouting, selection and support of innovative project leaders, in cohorts and on application.',
        },
        {
          icon: 'rocket',
          tone: 'indigo',
          title: 'Incubation',
          text: 'Incubation of startups and high-potential SMEs: coaching, training and milestone tracking.',
        },
        {
          icon: 'landmark',
          tone: 'gold',
          title: 'Access to funding',
          text: 'Support in accessing funding: venture capital, seed funds, AfCFTA.',
        },
      ],
    },
    stats: {
      startups: 'Startups supported',
      cohorts: 'Cohorts',
      alumni: 'Graduated startups',
      partners: 'Partners',
    },
    journey: {
      label: 'The journey',
      title: 'From application to independence.',
      text: 'A four-stage journey, tracked end to end on the Incub-OS platform.',
      steps: [
        { title: 'Application', text: 'The project leader applies online for an open cohort.' },
        { title: 'Selection', text: 'Applications are shortlisted, then assessed by a jury.' },
        { title: 'Incubation', text: 'Coaching, a personalised training plan and milestones followed with a dedicated coach.' },
        { title: 'Graduation', text: 'The graduated startup keeps a workspace to steer its growth independently.' },
      ],
    },
    cohorts: {
      title: 'Our cohorts',
      lead: 'Cohorts and their calendar, kept up to date from the Incub-OS platform.',
      open: 'Applications open',
      closed: 'Applications closed',
      seats: '{n} places left',
      closing: 'Application deadline',
      start: 'Programme start',
      apply: 'Apply',
      loading: 'Loading cohorts…',
      empty: 'No cohort is open right now. Write to us to hear about the next one.',
      emptyCta: { label: 'Keep me informed', to: '#contact' },
    },
    alumni: {
      title: 'They went through the programme',
      lead: 'Startups that graduated from the incubation programme.',
    },
    cta: {
      title: 'Leading an innovative project?',
      text: 'Join a cohort, or support the programme by becoming a partner.',
      apply: { label: 'See the cohorts', to: '#cohortes' },
      partner: { label: 'Become a partner', to: '#contact' },
    },
  },
  news: {
    hero: {
      tag: 'News & Events',
      image: 'photo-1540575467063-178a50c2df87-w1200.jpg',
      title: 'Sharing expertise, moving transformations forward.',
      text: 'ICES news and the events we organise around transformation challenges in Africa.',
    },
    filtersLabel: 'Filter by type',
    all: 'All',
    featured: 'Featured',
    empty: 'New stories and new events will be announced soon.',
    emptyCta: { label: 'Write to us', to: '#contact' },
    cta: {
      title: 'Organise an event with ICES?',
      text: 'Conference, workshop or round table: let’s design an event around your challenges together.',
      link: { label: 'Contact us', to: '#contact' },
    },
  },
  training: {
    hero: {
      tag: 'Training',
      image: 'photo-1524178232363-1fb2b075b655-w1400.jpg',
      title: 'Building the skills that drive transformation.',
      text: 'ICES designs training and capacity-building programmes for the public and private sectors.',
    },
    goals: {
      title: 'Choose by objective',
      lead: 'Four families of programmes, tailored to your organisation and your teams.',
      request: 'Request the programme',
      cards: [
        {
          icon: 'users',
          tone: 'navy',
          title: 'Lead & govern',
          text: 'Leadership, management and governance training for the public and private sectors.',
        },
        {
          icon: 'bot',
          tone: 'indigo',
          title: 'Digital transformation & AI',
          text: 'Digital transformation and artificial intelligence academy.',
        },
        {
          icon: 'check',
          tone: 'green',
          title: 'Professional certifications',
          text: 'Preparation for ISO, cybersecurity, PMP, ESG certifications…',
        },
        {
          icon: 'landmark',
          tone: 'orange',
          title: 'Capacity building',
          text: 'Institutional capacity-building programmes, with funding partners.',
        },
      ],
    },
    formats: {
      title: 'Programmes built around you',
      lead: 'Every programme starts from your challenges, your teams and your context.',
      items: [
        {
          title: 'For your organisation',
          text: 'A programme designed with you, for your teams, on your premises or remotely.',
        },
        {
          title: 'With your partners',
          text: 'Capacity-building programmes run with funding partners and institutions.',
        },
      ],
    },
    cta: {
      title: 'Let’s build your programme.',
      text: 'Tell us who to train and on which challenges: we will come back to you with a proposal.',
      request: { label: 'Request a programme', to: '#contact' },
      brochure: 'Download our brochure',
    },
  },
}
