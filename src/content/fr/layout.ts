import type { SiteContent } from '../../types/content'
import { PENDING_LINK } from '../links'

const navLinks = [
  { label: 'Nos offres', to: '/#offres' },
  { label: 'Incubation', to: '/incubation' },
  // Masqué pour le moment : { label: 'Réalisations', to: '/realisations' },
  { label: 'Formations', to: '/formations' },
]

export const meta: SiteContent['meta'] = {
  homeTitle: 'ICES · Façonnons l’Afrique de demain',
  prestationsTitle: 'Nos expertises · ICES',
  realisationsTitle: 'Réalisations · ICES',
  incubationTitle: 'Incubation · ICES',
  newsTitle: 'Actualités & Événements · ICES',
  trainingTitle: 'Formations · ICES',
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
        { label: 'Notre ambition', to: '/#vision' },
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
      ],
    },
    {
      title: 'RESSOURCES',
      links: [
        // Masqué pour le moment : { label: 'Réalisations', to: '/realisations' },
        { label: 'Formations', to: '/formations' },
        { label: 'Événements', to: '/actualites' },
      ],
    },
  ],
  company: {
    title: 'SOCIÉTÉ',
    links: [
      { label: 'À propos', to: '/#vision' },
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
    { label: 'Facebook', icon: 'facebook', href: PENDING_LINK },
    { label: 'Instagram', icon: 'instagram', href: PENDING_LINK },
  ],
  copyright: '© 2025 ICES. Tous droits réservés.',
  backToTop: 'Haut de page',
  legal: [
    { label: 'Mentions légales', to: '/mentions-legales' },
    { label: 'Politique de confidentialité', to: '/confidentialite' },
    { label: 'Cookies', to: '/cookies' },
  ],
}
