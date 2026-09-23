import type { SiteContent } from '../../types/content'

export const prestations: SiteContent['prestations'] = {
  hero: {
    image: 'photo-1480714378408-67cf0d13bc1b-w2000.jpg',
    title: 'Des solutions concrètes pour transformer vos enjeux en résultats.',
    text: 'ICES accompagne les États, institutions et organisations à travers des prestations adaptées à leurs enjeux stratégiques, opérationnels et technologiques, de la conception à la mise en œuvre.',
    cta: { label: 'Découvrir nos segments', to: '#domaines' },
  },
  domains: {
    label: 'Nos domaines d’expertise',
    title: 'Des expertises complémentaires, pensées pour des transformations durables.',
    intro: [
      'Nous intervenons dans 10 domaines clés pour répondre aux enjeux stratégiques, économiques, sociaux et environnementaux du continent.',
      'Notre approche combine conseil, ingénierie, gouvernance et technologies afin de transformer les enjeux complexes en solutions concrètes, durables et adaptées aux réalités locales.',
    ],
    cards: [
      { icon: 'user', tone: 'coral', title: 'Capital Humain & Organisations', text: 'Transformer les compétences, les organisations et les cultures pour libérer l’intelligence collective.' },
      { icon: 'gauge', tone: 'gold', title: 'Excellence Opérationnelle & Performance Publique', text: 'Optimiser les organisations, les processus et les projets pour renforcer leur efficacité durable.' },
      { icon: 'shield', tone: 'navy', title: 'Gouvernance & Conformité', text: 'Sécuriser les décisions, les risques et les trajectoires dans un environnement en mutation.' },
      { icon: 'globe', tone: 'burgundy', title: 'Souveraineté & Résilience', text: 'Renforcer l’autonomie stratégique, la capacité d’anticipation et la résilience des nations.' },
      { icon: 'bulb', tone: 'teal', title: 'Innovation & Écosystèmes', text: 'Transformer la recherche, l’innovation et l’entrepreneuriat en leviers de valeur.' },
      { icon: 'bot', tone: 'indigo', title: 'Digital & IA Souveraine', text: 'Accélérer la transformation numérique tout en renforçant la maîtrise des données et des technologies.' },
      { icon: 'sprout', tone: 'green', title: 'Croissance Durable & ESG', text: 'Construire des modèles de croissance compatibles avec les enjeux environnementaux, sociaux et économiques.' },
      { icon: 'atom', tone: 'violet', title: 'Technologies Émergentes', text: 'Transformer les technologies de rupture en solutions concrètes adaptées aux réalités africaines.' },
      { icon: 'landmark', tone: 'orange', title: 'Concessions & Ressources Souveraines', text: 'Structurer, négocier et piloter durablement les concessions et la valorisation des ressources.' },
      { icon: 'handshake', tone: 'plum', title: 'Mandats & Gouvernance Déléguée', text: 'Représenter, piloter et accompagner les mandants dans leurs missions stratégiques et institutionnelles.' },
    ],
  },
  positioning: {
    image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
    label: 'Notre positionnement',
    title: 'Chaque domaine, une expertise. Chaque expertise, un impact.',
    text: 'Nos équipes combinent savoir-faire, expérience terrain et intelligence collective pour apporter des solutions sur mesure, adaptées aux réalités et aux ambitions de nos clients.',
    cta: { label: 'Demandez un devis', to: '#contact' },
    stats: [
      { value: '10', label: 'Domaines d’expertise' },
      { value: '6', label: 'Secteurs d’intervention' },
      { value: '2', label: 'Implantations (Bénin · Guinée)' },
      { value: '20', label: 'Horizon stratégique' },
    ],
  },
}
