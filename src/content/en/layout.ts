import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'

const navLinks = [
  { label: 'Our offers', to: '/#offres' },
  { label: 'Incubation', to: '/#offres' },
  { label: 'Projects', to: '/#realisations' },
  { label: 'Training', to: '/#actualites' },
]

export const meta: SiteContent['meta'] = {
  homeTitle: 'ICES · Shaping Africa’s future',
  prestationsTitle: 'Our expertise · ICES',
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
        { label: 'Solutions', to: '/#offres' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Projects', to: '/#realisations' },
        { label: 'Training', to: '/#actualites' },
        { label: 'Publications', to: '/#actualites' },
      ],
    },
  ],
  company: {
    title: 'COMPANY',
    links: [
      { label: 'About us', to: '/#vision' },
      { label: 'Careers', to: PENDING_LINK },
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
    { label: 'Twitter / X', icon: 'twitter', href: PENDING_LINK },
  ],
  copyright: '© 2025 ICES. All rights reserved.',
  backToTop: 'Back to top',
  legal: [
    { label: 'Legal notice', to: PENDING_LINK },
    { label: 'Privacy policy', to: PENDING_LINK },
    { label: 'Cookies', to: PENDING_LINK },
  ],
}
