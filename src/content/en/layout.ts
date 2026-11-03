import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'

const navLinks = [
  { label: 'Our offers', to: '/#offres' },
  { label: 'Incubation', to: '/incubation' },
  // Masqué pour le moment : { label: 'Projects', to: '/realisations' },
  { label: 'Training', to: '/formations' },
]

export const meta: SiteContent['meta'] = {
  homeTitle: 'ICES · Shaping Africa’s future',
  prestationsTitle: 'Our expertise · ICES',
  realisationsTitle: 'Projects · ICES',
  incubationTitle: 'Incubation · ICES',
  newsTitle: 'News & Events · ICES',
  trainingTitle: 'Training · ICES',
}

export const languages: SiteContent['languages'] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export const header: SiteContent['header'] = {
  partnerLabel: 'Become a partner',
  home: {
    links: [{ label: 'About', to: '/#vision' }, ...navLinks],
    cta: { label: 'Request a quote', to: '#contact' },
    showPartnerButton: true,
  },
  prestations: {
    dropdown: {
      label: 'About',
      links: [
        { label: 'Our ambition', to: '/#vision' },
        { label: 'Our approach', to: '/#approche' },
        { label: 'Team & locations', to: '/#equipe' },
      ],
    },
    links: navLinks,
    cta: { label: 'Book a meeting', to: '#contact' },
    showPartnerButton: false,
  },
}

export const footer: SiteContent['footer'] = {
  brandText:
    'Strategic consulting, project engineering, governance and technology serving the sustainable transformation of French-speaking Africa.',
  columns: [
    {
      title: 'SOLUTIONS',
      links: [
        { label: 'Expertise', to: '/prestations' },
        { label: 'Offers', to: '/#offres' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        // Masqué pour le moment : { label: 'Projects', to: '/realisations' },
        { label: 'Training', to: '/formations' },
        { label: 'Events', to: '/actualites' },
      ],
    },
  ],
  company: {
    title: 'COMPANY',
    links: [
      { label: 'About us', to: '/#vision' },
      { label: 'Contact', to: '#contact' },
    ],
  },
  places: {
    title: 'OUR LOCATIONS',
    items: [
      { city: 'Benin — Cotonou', email: 'contact@ices-consulting.com' },
      { city: 'Guinea — Conakry', email: 'contact-gn@ices-consulting.com' },
    ],
  },
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: PENDING_LINK },
    { label: 'Facebook', icon: 'facebook', href: PENDING_LINK },
    { label: 'Instagram', icon: 'instagram', href: PENDING_LINK },
  ],
  copyright: '© 2025 ICES. All rights reserved.',
  backToTop: 'Back to top',
  legal: [
    { label: 'Legal notice', to: '/mentions-legales' },
    { label: 'Privacy policy', to: '/confidentialite' },
    { label: 'Cookies', to: '/cookies' },
  ],
}
