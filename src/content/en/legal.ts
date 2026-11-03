import type { SiteContent } from '../../types/content'

/*
 * Legal pages. Legal form, RCCM, IFU, company term and publication director were provided
 * by ICES on 4 November 2026. What ICES has not provided yet (data retention period) stays
 * `null`: shown as "To be completed" in development and hidden in production while missing. To be reviewed by a lawyer before going live.
 */

const updated = '2 November 2026'

export const legal: SiteContent['legal'] = {
  labels: {
    summary: 'Contents',
    updated: 'Last updated',
    toComplete: 'To be completed',
    related: 'See also',
    privacyLink: 'Read our privacy policy',
  },
  pages: {
    'mentions-legales': {
      metaTitle: 'Legal notice · ICES',
      description:
        'Legal notice of ices-consulting.com: publisher, publication director, host, intellectual property and governing law.',
      tag: 'Legal information',
      title: 'Legal notice',
      text: 'Who publishes this website, who hosts it and on what terms you may use it.',
      image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
      updated: '4 November 2026',
      sections: [
        {
          id: 'editeur',
          title: 'Publisher',
          blocks: [
            'The ices-consulting.com website is published by ICES, a firm specialising in strategic consulting, project engineering, governance and technology.',
            {
              facts: [
                { label: 'Name', value: 'ICES' },
                { label: 'Legal form', value: 'Limited liability company (SARL)' },
                {
                  label: 'Registered office',
                  value: 'Quartier Akogbato Fidjrossè, Cotonou, Benin',
                },
                { label: 'RCCM', value: 'Cotonou, RB/COT/25 B 41586' },
                { label: 'IFU', value: '3202588798784' },
                {
                  label: 'Company term',
                  value: '99 years, from 24 November 2025 to 24 November 2124',
                },
                { label: 'Phone', value: '+229 01 66 82 17 71' },
                { label: 'Email', value: 'contact@ices-consulting.com' },
              ],
            },
            'Office in Guinea: Conakry, Guinea. Phone: +224 614 89 76 11. Email: [contact-gn@ices-consulting.com](mailto:contact-gn@ices-consulting.com).',
          ],
        },
        {
          id: 'publication',
          title: 'Publication director',
          blocks: [
            {
              facts: [
                {
                  label: 'Name and position',
                  value: 'Bernadin Jean-Marie Fiogbe, managing director (gérant)',
                },
              ],
            },
          ],
        },
        {
          id: 'hebergement',
          title: 'Hosting',
          blocks: [
            'The website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States ([vercel.com](https://vercel.com)).',
          ],
        },
        {
          id: 'propriete',
          title: 'Intellectual property',
          blocks: [
            'The texts, visual identity, ICES logo and emblem, and the structure of the website belong to ICES. Any full or partial reproduction, display or adaptation without the prior written consent of ICES is prohibited.',
            'Client and partner logos remain the property of their respective owners.',
            'Illustrative photographs come from the Unsplash image library and are used under its licence.',
          ],
        },
        {
          id: 'liens',
          title: 'Links to other websites',
          blocks: [
            'The website may contain links to third-party websites. ICES has no control over their content and accepts no responsibility for it.',
            'You may link to this website without permission, provided it is not framed within another website and does not harm the image of ICES.',
          ],
        },
        {
          id: 'responsabilite',
          title: 'Liability',
          blocks: [
            'ICES takes care to publish accurate information but cannot guarantee that it is complete. It is provided for information only and does not constitute personalised advice. ICES cannot be held liable for any interruption of the website or any damage resulting from its use.',
          ],
        },
        {
          id: 'donnees',
          title: 'Personal data and cookies',
          blocks: [
            'How we handle the information you share with us is explained in our [privacy policy](/confidentialite). The website does not use cookies: see the [Cookies](/cookies) page.',
          ],
        },
        {
          id: 'droit',
          title: 'Governing law',
          blocks: [
            'This legal notice is governed by Beninese law. For any question, write to [contact@ices-consulting.com](mailto:contact@ices-consulting.com).',
          ],
        },
      ],
    },

    confidentialite: {
      metaTitle: 'Privacy policy · ICES',
      description:
        'What data ICES collects through its forms, why, for how long, who it is shared with and how to exercise your rights.',
      tag: 'Personal data',
      title: 'Privacy policy',
      text: 'What we do with the information you share with us, and how you stay in control of it.',
      image: 'photo-1518770660439-4636190af475-w1400.jpg',
      updated,
      sections: [
        {
          id: 'responsable',
          title: 'Data controller',
          blocks: [
            'ICES, whose registered office is in Quartier Akogbato Fidjrossè, Cotonou (Benin), is responsible for the data collected on this website. For any question: [contact@ices-consulting.com](mailto:contact@ices-consulting.com).',
          ],
        },
        {
          id: 'donnees',
          title: 'Data we collect',
          blocks: [
            'We only collect the information you enter yourself in our forms. The website has no user accounts and uses no audience measurement or advertising tools.',
            {
              list: [
                'Contact form: first name, last name, email address, and if you provide them, country, phone, type of request and message.',
                '“Become a partner” form: company name, sector and size, contact’s first and last name, business email address, and if you provide them, phone, website and motivation.',
              ],
            },
            'Like any website, the host keeps technical logs (IP address, date, page requested) to keep the service secure and running.',
          ],
        },
        {
          id: 'finalites',
          title: 'Why we use it',
          blocks: [
            {
              list: [
                'To answer your request for contact, a quote, training or a meeting.',
                'To review your partnership application and get back to you.',
                'To keep the website secure and prevent abusive submissions.',
              ],
            },
            'This processing is based on your consent, given by ticking the box before you send the form. Your data is never sold or used for marketing without your agreement.',
          ],
        },
        {
          id: 'destinataires',
          title: 'Who can access it',
          blocks: [
            'Your messages are sent by email to the relevant ICES team, in Benin or Guinea. Only the people handling your request can access them.',
            'We use two technical providers, acting on our instructions:',
            {
              list: [
                'Vercel Inc. (United States), which hosts the website;',
                'Resend (United States), which sends the emails generated by the forms.',
              ],
            },
            'As these providers are based outside Benin, your data may be transferred abroad. We only use providers that commit to protecting it.',
          ],
        },
        {
          id: 'conservation',
          title: 'How long we keep it',
          blocks: [
            'The website itself stores none of the information you send: it is forwarded by email and kept in the ICES mailbox for as long as needed to handle your request and the relationship that follows.',
            { facts: [{ label: 'Maximum retention period', value: null }] },
          ],
        },
        {
          id: 'droits',
          title: 'Your rights',
          blocks: [
            'Under Law No. 2017-20 of 20 April 2018 on the Digital Code of the Republic of Benin, you have the following rights over your data:',
            {
              list: [
                'to access it and obtain a copy;',
                'to have it corrected or completed;',
                'to have it erased;',
                'to object to its processing or withdraw your consent at any time.',
              ],
            },
            'To exercise these rights, write to [contact@ices-consulting.com](mailto:contact@ices-consulting.com) stating your request. If you believe your rights have not been respected, you may contact Benin’s personal data protection authority (APDP). People located in the European Union also have the rights provided by the General Data Protection Regulation (GDPR).',
          ],
        },
        {
          id: 'securite',
          title: 'Security',
          blocks: [
            'The website is served over HTTPS only: the information you enter is encrypted in transit. Forms are checked on the server and protected against automated submissions.',
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies',
          blocks: [
            'The website sets no cookies. Only your language choice is remembered in your browser: details are on the [Cookies](/cookies) page.',
          ],
        },
        {
          id: 'modifications',
          title: 'Changes',
          blocks: [
            'This policy may change, for example if a new service is added to the website. The date of the last update is shown at the top of the page.',
          ],
        },
      ],
    },

    cookies: {
      metaTitle: 'Cookies · ICES',
      description:
        'The ICES website sets no cookies and uses no advertising or audience-measurement trackers. Only your language choice is remembered.',
      tag: 'Personal data',
      title: 'Cookies',
      text: 'No cookies, no trackers: only your language choice is kept in your browser.',
      image: 'photo-1460925895917-afdab827c52f-w1400.jpg',
      updated,
      sections: [
        {
          id: 'aucun-cookie',
          title: 'No cookies on this website',
          blocks: [
            'A cookie is a small file that a website stores in your browser. The ICES website sets none: no audience measurement, no advertising, no embedded social media buttons. Fonts and images are served by the website itself, without any third-party service.',
          ],
        },
        {
          id: 'langue',
          title: 'Your language choice',
          blocks: [
            'When you switch the website to French or English, this choice is saved in your browser’s local storage so the language stays the same on your next visit.',
            {
              facts: [
                { label: 'Name', value: 'ices-lang' },
                { label: 'Value', value: '“fr” or “en”' },
                { label: 'Purpose', value: 'Remember the website language' },
                { label: 'Duration', value: 'Until you delete it' },
              ],
            },
            'This information stays on your device: it is neither sent to ICES nor shared with anyone.',
          ],
        },
        {
          id: 'consentement',
          title: 'Why no banner is shown',
          blocks: [
            'The language choice is strictly necessary for a service you request yourself, so it does not require your prior consent. That is why the website shows no cookie banner.',
          ],
        },
        {
          id: 'effacer',
          title: 'Deleting it',
          blocks: [
            'You can delete this information at any time by clearing the website’s browsing data in your browser settings. The website will then be shown in French again.',
          ],
        },
        {
          id: 'evolution',
          title: 'Future changes',
          blocks: [
            'If an audience-measurement tool or any other tracker were added, this page would be updated and your consent would be requested first. To learn more, read our [privacy policy](/confidentialite).',
          ],
        },
      ],
    },
  },
}
