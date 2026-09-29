import type { SiteContent } from '../../types/content'

export const contact: SiteContent['contact'] = {
  title: 'Contact',
  headline: 'Vous avez des questions, nous avons des réponses',
  intro:
    'Un projet de transformation, un besoin d’accompagnement ou une idée de partenariat : nos équipes au Bénin et en Guinée vous répondent sous 48 heures ouvrées.',
  image: 'contact-office.jpg',
  offices: [
    {
      title: 'Siège — Bénin',
      website: 'www.ices-consulting.com',
      phone: { label: '+229 01 66 82 17 71', href: 'tel:+2290166821771' },
      email: 'contact@ices-consulting.com',
      address: ['Adresse : Quartier Akogbato Fidjrossè', 'Cotonou, Bénin'],
    },
    {
      title: 'Bureau — Guinée',
      website: 'www.ices-consulting.com',
      phone: { label: '+224 614 89 76 11', href: 'tel:+224614897611' },
      email: 'contact-gn@ices-consulting.com',
      address: ['Adresse : Conakry, Guinée'],
    },
  ],
  socialsLabel: 'Réseaux sociaux',
  form: {
    title: 'Parlons de votre besoin',
    subtitle: 'Notre équipe vous accompagne, du premier échange à la mise en œuvre.',
    firstName: 'Prénom*',
    lastName: 'Nom*',
    country: 'Pays',
    phone: 'Téléphone',
    email: 'Adresse email*',
    typeLabel: 'Type de demande',
    types: ['Conseil', 'Devis', 'Partenariat', 'Formation', 'Autre'],
    message: 'Votre message*',
    consent: 'J’accepte que mes informations soient utilisées par ICES pour traiter ma demande.',
    submit: 'Envoyer',
    success: 'Message envoyé. Nous revenons vers vous sous 48 heures ouvrées.',
  },
}

export const partner: SiteContent['partner'] = {
  title: 'Devenir Partenaire',
  subtitle: 'Unissons nos expertises pour accompagner le développement et l’innovation en Afrique.',
  closeLabel: 'Fermer',
  fields: {
    company: { label: 'Nom de l’entreprise', placeholder: 'Ex: Sterling Group' },
    sector: {
      label: 'Secteur d’activité',
      placeholder: 'Sélectionnez votre secteur',
      options: [
        'Institution publique / Administration',
        'Banque, finance & assurance',
        'Énergie & ressources naturelles',
        'Technologies & numérique',
        'Conseil & ingénierie',
        'Éducation & recherche',
        'ONG & coopération internationale',
        'Industrie & BTP',
        'Autre',
      ],
    },
    size: {
      label: 'Taille de l’entreprise',
      placeholder: 'Ex: 10 - 49 collaborateurs',
      options: [
        '1 - 9 collaborateurs',
        '10 - 49 collaborateurs',
        '50 - 249 collaborateurs',
        '250 - 999 collaborateurs',
        '1 000 collaborateurs et plus',
      ],
    },
    firstName: { label: 'Prénom du contact', placeholder: 'Ex: Jean' },
    lastName: { label: 'Nom du contact', placeholder: 'Ex: Dupont' },
    email: { label: 'Email professionnel', placeholder: 'Ex: j.dupont@entreprise.com' },
    phone: { label: 'Numéro de téléphone', placeholder: 'Ex: +229 01 00 00 00' },
    website: {
      label: 'Site internet de l’entreprise',
      optional: '(Optionnel)',
      placeholder: 'Ex: https://www.entreprise.com',
    },
    motivation: {
      label: 'Pourquoi souhaitez-vous devenir partenaire ?',
      placeholder: 'Présentez brièvement vos motivations et vos domaines de synergie potentiels...',
    },
    consent:
      'J’accepte que les informations saisies soient exploitées par ICES dans le cadre exclusif de l’évaluation de notre candidature.',
  },
  submit: 'Soumettre ma candidature',
  note: 'Chaque candidature est étudiée sous 48 heures ouvrées par nos équipes de développement.',
  success: {
    title: 'Candidature envoyée',
    text: 'Merci. Nos équipes étudient votre candidature et reviennent vers vous sous 48 heures ouvrées.',
    close: 'Fermer',
  },
}
