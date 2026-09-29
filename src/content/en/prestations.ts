import type { SiteContent } from '../../types/content'

export const prestations: SiteContent['prestations'] = {
  hero: {
    image: 'photo-1480714378408-67cf0d13bc1b-w2000.jpg',
    title: 'Concrete solutions to turn your challenges into results.',
    text: 'ICES supports governments, institutions and organisations with services tailored to their strategic, operational and technological challenges, from design to delivery.',
    cta: { label: 'Explore our segments', to: '#domaines' },
  },
  domains: {
    label: 'Our areas of expertise',
    title: 'Complementary expertise, designed for sustainable transformation.',
    intro: [
      'We work in 10 key fields to address the continent’s strategic, economic, social and environmental challenges.',
      'Our approach combines consulting, engineering, governance and technology to turn complex challenges into concrete, sustainable solutions suited to local realities.',
    ],
    cards: [
      {
        icon: 'user',
        tone: 'coral',
        title: 'Human Capital & Organisations',
        text: 'Transforming skills, organisations and cultures to unlock collective intelligence.',
      },
      {
        icon: 'gauge',
        tone: 'gold',
        title: 'Operational Excellence & Public Performance',
        text: 'Optimising organisations, processes and projects to build lasting efficiency.',
      },
      {
        icon: 'shield',
        tone: 'navy',
        title: 'Governance & Compliance',
        text: 'Securing decisions, risks and trajectories in a changing environment.',
      },
      {
        icon: 'globe',
        tone: 'burgundy',
        title: 'Sovereignty & Resilience',
        text: 'Strengthening nations’ strategic autonomy, foresight and resilience.',
      },
      {
        icon: 'bulb',
        tone: 'teal',
        title: 'Innovation & Ecosystems',
        text: 'Turning research, innovation and entrepreneurship into value drivers.',
      },
      {
        icon: 'bot',
        tone: 'indigo',
        title: 'Digital & Sovereign AI',
        text: 'Accelerating digital transformation while strengthening control over data and technology.',
      },
      {
        icon: 'sprout',
        tone: 'green',
        title: 'Sustainable Growth & ESG',
        text: 'Building growth models compatible with environmental, social and economic challenges.',
      },
      {
        icon: 'atom',
        tone: 'violet',
        title: 'Emerging Technologies',
        text: 'Turning breakthrough technologies into concrete solutions suited to African realities.',
      },
      {
        icon: 'landmark',
        tone: 'orange',
        title: 'Concessions & Sovereign Resources',
        text: 'Structuring, negotiating and sustainably managing concessions and resource development.',
      },
      {
        icon: 'handshake',
        tone: 'plum',
        title: 'Mandates & Delegated Governance',
        text: 'Representing, steering and supporting principals in their strategic and institutional missions.',
      },
    ],
  },
  positioning: {
    image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
    label: 'Our positioning',
    title: 'Every field, an expertise. Every expertise, an impact.',
    text: 'Our teams combine know-how, field experience and collective intelligence to deliver tailored solutions that match our clients’ realities and ambitions.',
    cta: { label: 'Request a quote', to: '#contact' },
    stats: [
      { value: '10', label: 'Areas of expertise' },
      { value: '6', label: 'Sectors of activity' },
      { value: '2', label: 'Locations (Benin · Guinea)' },
      { value: '20', label: 'Strategic horizon' },
    ],
  },
}
