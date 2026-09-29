import type { SiteContent } from '../../types/content'

export const contact: SiteContent['contact'] = {
  title: 'Contact',
  headline: 'You have questions, we have answers',
  intro:
    'A transformation project, a need for support or a partnership idea: our teams in Benin and Guinea reply within 48 working hours.',
  image: 'contact-office.jpg',
  offices: [
    {
      title: 'Head office — Benin',
      website: 'www.ices-consulting.com',
      phone: { label: '+229 01 66 82 17 71', href: 'tel:+2290166821771' },
      email: 'contact@ices-consulting.com',
      address: ['Address: Quartier Akogbato Fidjrossè', 'Cotonou, Benin'],
    },
    {
      title: 'Office — Guinea',
      website: 'www.ices-consulting.com',
      phone: { label: '+224 614 89 76 11', href: 'tel:+224614897611' },
      email: 'contact-gn@ices-consulting.com',
      address: ['Address: Conakry, Guinea'],
    },
  ],
  socialsLabel: 'Social media',
  form: {
    title: 'Tell us what you need',
    subtitle: 'Our team supports you from the first conversation to delivery.',
    firstName: 'First name*',
    lastName: 'Last name*',
    country: 'Country',
    phone: 'Phone',
    email: 'Email address*',
    typeLabel: 'Type of request',
    types: ['Consulting', 'Quote', 'Partnership', 'Training', 'Other'],
    message: 'Your message*',
    consent: 'I agree that ICES may use my information to process my request.',
    submit: 'Send',
    success: 'Message sent. We will get back to you within 48 working hours.',
  },
}

export const partner: SiteContent['partner'] = {
  title: 'Become a Partner',
  subtitle: 'Let’s combine our expertise to support development and innovation in Africa.',
  closeLabel: 'Close',
  fields: {
    company: { label: 'Company name', placeholder: 'E.g. Sterling Group' },
    sector: {
      label: 'Business sector',
      placeholder: 'Select your sector',
      options: [
        'Public institution / Administration',
        'Banking, finance & insurance',
        'Energy & natural resources',
        'Technology & digital',
        'Consulting & engineering',
        'Education & research',
        'NGO & international cooperation',
        'Industry & construction',
        'Other',
      ],
    },
    size: {
      label: 'Company size',
      placeholder: 'E.g. 10 - 49 employees',
      options: [
        '1 - 9 employees',
        '10 - 49 employees',
        '50 - 249 employees',
        '250 - 999 employees',
        '1,000 employees or more',
      ],
    },
    firstName: { label: 'Contact first name', placeholder: 'E.g. John' },
    lastName: { label: 'Contact last name', placeholder: 'E.g. Smith' },
    email: { label: 'Business email', placeholder: 'E.g. j.smith@company.com' },
    phone: { label: 'Phone number', placeholder: 'E.g. +229 01 00 00 00' },
    website: {
      label: 'Company website',
      optional: '(Optional)',
      placeholder: 'E.g. https://www.company.com',
    },
    motivation: {
      label: 'Why would you like to become a partner?',
      placeholder: 'Briefly describe your motivations and potential areas of synergy...',
    },
    consent:
      'I agree that the information provided may be used by ICES solely to assess our application.',
  },
  submit: 'Submit my application',
  note: 'Every application is reviewed within 48 working hours by our business development teams.',
  success: {
    title: 'Application sent',
    text: 'Thank you. Our teams are reviewing your application and will get back to you within 48 working hours.',
    close: 'Close',
  },
}
