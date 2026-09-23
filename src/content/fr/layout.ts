import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'

const navLinks = [
  { label: 'Nos offres', to: '/#offres' },
  { label: 'Incubation', to: '/#offres' },
  { label: 'Réalisations', to: '/#realisations' },
  { label: 'Formations', to: '/#actualites' },
]

export const meta: SiteContent['meta'] = {
  homeTitle: 'ICES — Façonnons l’Afrique de demain',
  prestationsTitle: 'Nos expertises — ICES',
}

export const languages: SiteContent['languages'] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export const header: SiteContent['header'] = {
  partnerLabel: 'Devenir partenaire',
  home: {
    links: [{ label: 'Présentation', to: '/#vision' }, ...navLinks],
    cta: { label: 'Demandez un devis', to: '#contact' },
    showPartnerButton: true,
  },
  prestations: {
    dropdown: {
      label: 'Présentation',
      links: [
        { label: 'Notre vision', to: '/#vision' },
        { label: 'Notre approche', to: '/#approche' },
        { label: 'Équipe & implantation', to: '/#equipe' },
      ],
    },
    links: navLinks,
    cta: { label: 'Prendre rendez-vous', to: '#contact' },
    showPartnerButton: false,
  },
}

export const footer: SiteContent['footer'] = {
  brandText:
    'Conseil stratégique, ingénierie de projets, gouvernance et technologies au service des transformations durables de l’Afrique francophone.',
  columns: [
    {
      title: 'SOLUTIONS',
      links: [
        { label: 'Expertises', to: '/prestations' },
        { label: 'Offres', to: '/#offres' },
        { label: 'Solutions', to: '/#offres' },
      ],
    },
    {
      title: 'RESSOURCES',
      links: [
        { label: 'Réalisations', to: '/#realisations' },
        { label: 'Formations', to: '/#actualites' },
        { label: 'Publications', to: '/#actualites' },
      ],
    },
  ],
  company: {
    title: 'SOCIÉTÉ',
    links: [
      { label: 'À propos', to: '/#vision' },
      { label: 'Carrières', to: PENDING_LINK },
      { label: 'Contact', to: '#contact' },
    ],
  },
  places: {
    title: 'NOS IMPLANTATIONS',
    items: [
      { city: 'Bénin — Cotonou', email: 'contact@ices-consulting.com' },
      { city: 'Guinée — Conakry', email: 'contact-gn@ices-consulting.com' },
    ],
  },
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: PENDING_LINK },
    { label: 'Twitter / X', icon: 'twitter', href: PENDING_LINK },
  ],
  copyright: '© 2025 ICES. Tous droits réservés.',
  legal: [
    { label: 'Mentions légales', to: PENDING_LINK },
    { label: 'Politique de confidentialité', to: PENDING_LINK },
    { label: 'Cookies', to: PENDING_LINK },
  ],
}
