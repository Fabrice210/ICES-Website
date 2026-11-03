import type { SiteContent } from '../../types/content'

/*
 * Pages légales. Forme juridique, RCCM, IFU, durée de la société et directeur de la
 * publication ont été fournis par ICES le 4 novembre 2026. Reste à `null` ce qu'ICES n'a pas
 * encore fourni (durée de conservation des données) : affiché « À compléter » en
 * développement, masqué en production tant qu'il manque.
 * Textes à faire relire par un juriste avant la mise en ligne.
 */

const updated = '2 novembre 2026'

export const legal: SiteContent['legal'] = {
  labels: {
    summary: 'Sommaire',
    updated: 'Dernière mise à jour',
    toComplete: 'À compléter',
    related: 'Voir aussi',
    privacyLink: 'Lire notre politique de confidentialité',
  },
  pages: {
    'mentions-legales': {
      metaTitle: 'Mentions légales · ICES',
      description:
        'Mentions légales du site ices-consulting.com : éditeur, directeur de la publication, hébergeur, propriété intellectuelle et droit applicable.',
      tag: 'Informations légales',
      title: 'Mentions légales',
      text: 'Qui édite ce site, qui l’héberge et dans quelles conditions vous pouvez l’utiliser.',
      image: 'photo-1486406146926-c627a92ad1ab-w2000.jpg',
      updated: '4 novembre 2026',
      sections: [
        {
          id: 'editeur',
          title: 'Éditeur du site',
          blocks: [
            'Le site ices-consulting.com est édité par ICES, cabinet de conseil stratégique, d’ingénierie de projets, de gouvernance et de technologies.',
            {
              facts: [
                { label: 'Dénomination', value: 'ICES' },
                { label: 'Forme juridique', value: 'Société à responsabilité limitée (SARL)' },
                { label: 'Siège social', value: 'Quartier Akogbato Fidjrossè, Cotonou, Bénin' },
                { label: 'RCCM', value: 'Cotonou, RB/COT/25 B 41586' },
                { label: 'IFU', value: '3202588798784' },
                {
                  label: 'Durée de la société',
                  value: '99 ans, du 24 novembre 2025 au 24 novembre 2124',
                },
                { label: 'Téléphone', value: '+229 01 66 82 17 71' },
                { label: 'E-mail', value: 'contact@ices-consulting.com' },
              ],
            },
            'Bureau en Guinée : Conakry, Guinée. Téléphone : +224 614 89 76 11. E-mail : [contact-gn@ices-consulting.com](mailto:contact-gn@ices-consulting.com).',
          ],
        },
        {
          id: 'publication',
          title: 'Directeur de la publication',
          blocks: [
            { facts: [{ label: 'Nom et fonction', value: 'Bernadin Jean-Marie Fiogbe, gérant' }] },
          ],
        },
        {
          id: 'hebergement',
          title: 'Hébergement',
          blocks: [
            'Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis ([vercel.com](https://vercel.com)).',
          ],
        },
        {
          id: 'propriete',
          title: 'Propriété intellectuelle',
          blocks: [
            'Les textes, la charte graphique, le logo et l’emblème ICES, ainsi que l’organisation du site, appartiennent à ICES. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable d’ICES est interdite.',
            'Les logos des clients et partenaires restent la propriété de leurs titulaires respectifs.',
            'Les photographies d’illustration proviennent de la banque d’images Unsplash et sont utilisées selon sa licence.',
          ],
        },
        {
          id: 'liens',
          title: 'Liens vers d’autres sites',
          blocks: [
            'Le site peut contenir des liens vers des sites tiers. ICES n’en contrôle pas le contenu et décline toute responsabilité à leur sujet.',
            'Un lien vers ce site peut être créé sans autorisation, à condition de ne pas l’intégrer dans les pages d’un autre site et de ne pas porter atteinte à l’image d’ICES.',
          ],
        },
        {
          id: 'responsabilite',
          title: 'Responsabilité',
          blocks: [
            'ICES veille à l’exactitude des informations publiées, sans pouvoir en garantir l’exhaustivité. Elles sont données à titre indicatif et ne constituent pas un conseil personnalisé. ICES ne saurait être tenu responsable d’une interruption du site ou d’un dommage lié à son utilisation.',
          ],
        },
        {
          id: 'donnees',
          title: 'Données personnelles et cookies',
          blocks: [
            'La façon dont nous traitons les informations que vous nous confiez est décrite dans notre [politique de confidentialité](/confidentialite). Le site n’utilise pas de cookies : voir la page [Cookies](/cookies).',
          ],
        },
        {
          id: 'droit',
          title: 'Droit applicable',
          blocks: [
            'Les présentes mentions sont régies par le droit béninois. Pour toute question, écrivez-nous à [contact@ices-consulting.com](mailto:contact@ices-consulting.com).',
          ],
        },
      ],
    },

    confidentialite: {
      metaTitle: 'Politique de confidentialité · ICES',
      description:
        'Quelles données ICES recueille par ses formulaires, pourquoi, combien de temps, avec qui elles sont partagées et comment exercer vos droits.',
      tag: 'Données personnelles',
      title: 'Politique de confidentialité',
      text: 'Ce que nous faisons des informations que vous nous confiez, et comment garder la main dessus.',
      image: 'photo-1518770660439-4636190af475-w1400.jpg',
      updated,
      sections: [
        {
          id: 'responsable',
          title: 'Responsable du traitement',
          blocks: [
            'ICES, dont le siège est situé Quartier Akogbato Fidjrossè, à Cotonou (Bénin), est responsable des données recueillies sur ce site. Pour toute question : [contact@ices-consulting.com](mailto:contact@ices-consulting.com).',
          ],
        },
        {
          id: 'donnees',
          title: 'Données recueillies',
          blocks: [
            'Nous ne recueillons que les informations que vous saisissez vous-même dans nos formulaires. Le site ne propose pas de compte utilisateur et n’utilise aucun outil de mesure d’audience ni de publicité.',
            {
              list: [
                'Formulaire de contact : prénom, nom, adresse e-mail, et si vous les indiquez, pays, téléphone, type de demande et message.',
                'Formulaire « Devenir partenaire » : nom, secteur et taille de l’entreprise, prénom et nom du contact, adresse e-mail professionnelle, et si vous les indiquez, téléphone, site internet et motivations.',
              ],
            },
            'Comme tout site, l’hébergeur enregistre des journaux techniques (adresse IP, date, page demandée) pour assurer la sécurité et le bon fonctionnement du service.',
          ],
        },
        {
          id: 'finalites',
          title: 'Pourquoi nous les utilisons',
          blocks: [
            {
              list: [
                'Répondre à votre demande de contact, de devis, de formation ou de rendez-vous.',
                'Étudier votre candidature de partenariat et revenir vers vous.',
                'Assurer la sécurité du site et prévenir les envois abusifs.',
              ],
            },
            'Ces traitements reposent sur votre consentement, donné en cochant la case prévue avant l’envoi du formulaire. Vos données ne sont jamais vendues ni utilisées pour de la prospection sans votre accord.',
          ],
        },
        {
          id: 'destinataires',
          title: 'Qui y a accès',
          blocks: [
            'Vos messages sont transmis par e-mail à l’équipe ICES concernée, au Bénin ou en Guinée. Seules les personnes chargées de traiter votre demande y ont accès.',
            'Nous faisons appel à deux prestataires techniques, qui agissent sur nos instructions :',
            {
              list: [
                'Vercel Inc. (États-Unis), hébergeur du site ;',
                'Resend (États-Unis), service d’envoi des e-mails issus des formulaires.',
              ],
            },
            'Ces prestataires étant établis hors du Bénin, vos données peuvent être transférées à l’étranger. Nous ne retenons que des prestataires qui s’engagent à les protéger.',
          ],
        },
        {
          id: 'conservation',
          title: 'Durée de conservation',
          blocks: [
            'Le site lui-même ne conserve aucune des informations que vous envoyez : elles sont transmises par e-mail puis gardées dans la messagerie d’ICES, le temps nécessaire au traitement de votre demande et au suivi de la relation qui en découle.',
            { facts: [{ label: 'Durée maximale de conservation', value: null }] },
          ],
        },
        {
          id: 'droits',
          title: 'Vos droits',
          blocks: [
            'Conformément à la loi n° 2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin, vous disposez des droits suivants sur vos données :',
            {
              list: [
                'y accéder et en obtenir une copie ;',
                'les faire rectifier ou compléter ;',
                'en demander l’effacement ;',
                'vous opposer à leur traitement ou retirer votre consentement à tout moment.',
              ],
            },
            'Pour exercer ces droits, écrivez à [contact@ices-consulting.com](mailto:contact@ices-consulting.com) en précisant votre demande. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l’Autorité de protection des données à caractère personnel (APDP) du Bénin. Les personnes situées dans l’Union européenne bénéficient en outre des droits prévus par le règlement général sur la protection des données (RGPD).',
          ],
        },
        {
          id: 'securite',
          title: 'Sécurité',
          blocks: [
            'Le site est servi exclusivement en HTTPS : les informations que vous saisissez sont chiffrées pendant leur transmission. Les formulaires sont vérifiés côté serveur et protégés contre les envois automatisés.',
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies',
          blocks: [
            'Le site ne dépose aucun cookie. Seul votre choix de langue est mémorisé dans votre navigateur : le détail figure sur la page [Cookies](/cookies).',
          ],
        },
        {
          id: 'modifications',
          title: 'Modifications',
          blocks: [
            'Cette politique peut évoluer, par exemple si un nouveau service est ajouté au site. La date de dernière mise à jour figure en haut de la page.',
          ],
        },
      ],
    },

    cookies: {
      metaTitle: 'Cookies · ICES',
      description:
        'Le site ICES ne dépose aucun cookie et n’utilise aucun traceur publicitaire ou de mesure d’audience. Seul votre choix de langue est mémorisé.',
      tag: 'Données personnelles',
      title: 'Cookies',
      text: 'Pas de cookie, pas de traceur : seul votre choix de langue est gardé dans votre navigateur.',
      image: 'photo-1460925895917-afdab827c52f-w1400.jpg',
      updated,
      sections: [
        {
          id: 'aucun-cookie',
          title: 'Aucun cookie sur ce site',
          blocks: [
            'Un cookie est un petit fichier qu’un site dépose dans votre navigateur. Le site ICES n’en dépose aucun : pas de mesure d’audience, pas de publicité, pas de bouton de réseau social intégré. Les polices de caractères et les images sont servies par le site lui-même, sans faire appel à un service tiers.',
          ],
        },
        {
          id: 'langue',
          title: 'Votre choix de langue',
          blocks: [
            'Quand vous passez le site en français ou en anglais, ce choix est enregistré dans le stockage local de votre navigateur, pour que la langue reste la même à votre prochaine visite.',
            {
              facts: [
                { label: 'Nom', value: 'ices-lang' },
                { label: 'Valeur', value: '« fr » ou « en »' },
                { label: 'Finalité', value: 'Mémoriser la langue du site' },
                { label: 'Durée', value: 'Jusqu’à ce que vous l’effaciez' },
              ],
            },
            'Cette information reste sur votre appareil : elle n’est ni transmise à ICES ni partagée avec un tiers.',
          ],
        },
        {
          id: 'consentement',
          title: 'Pourquoi aucun bandeau ne s’affiche',
          blocks: [
            'Le choix de langue est strictement nécessaire à un service que vous demandez vous-même : il ne requiert pas votre consentement préalable. C’est pourquoi le site n’affiche pas de bandeau de cookies.',
          ],
        },
        {
          id: 'effacer',
          title: 'L’effacer',
          blocks: [
            'Vous pouvez effacer cette information à tout moment en supprimant les données de navigation du site dans les réglages de votre navigateur. Le site s’affichera alors de nouveau en français.',
          ],
        },
        {
          id: 'evolution',
          title: 'Évolution',
          blocks: [
            'Si un outil de mesure d’audience ou un autre traceur était ajouté, cette page serait mise à jour et votre accord vous serait demandé avant tout dépôt. Pour en savoir plus, lisez notre [politique de confidentialité](/confidentialite).',
          ],
        },
      ],
    },
  },
}
