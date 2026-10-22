import type { SiteContent } from '../../types/content'

/**
 * Projects page: English version of src/content/fr/realisations.ts (same slugs).
 * Entries marked "EXAMPLE" are examples in the mock-up, to be replaced by ICES.
 */
export const realisations: SiteContent['realisations'] = {
  hero: {
    image: 'photo-1487958449943-2429e8be8625-w2000.jpg',
    title: 'Concrete missions, measurable transformations.',
    text: 'Behind every mission lies a challenge, stakeholders and a transformation goal. See how our expertise translates into interventions in the field.',
    cta: { label: 'Explore our missions', to: '#liste-realisations' },
  },
  list: {
    label: 'Missions & Projects',
    title: 'Our expertise, put to the test in the field.',
    intro:
      'Governments, institutions, companies and project leaders: every mission follows our integrated approach, from diagnosis to impact monitoring. Filter by offer to find the interventions that concern you.',
    filtersLabel: 'Filter projects',
    all: 'All',
    count: { one: '{n} project', many: '{n} projects' },
    empty: 'No project published for this offer yet.',
  },
  band: {
    label: 'Your project',
    title: 'A similar challenge? Let’s build the answer together.',
    text: 'Every mission starts with a shared diagnosis. Tell us about your context: we will come back to you with a first reading and a proposed approach.',
    cta: { label: 'Request a quote', to: '#contact' },
    stats: [
      { value: '10', label: 'Areas of expertise' },
      { value: '6', label: 'Integrated offers' },
      { value: '4', label: 'Stages: diagnosis, design, deployment, follow-up' },
      { value: '2', label: 'Offices (Benin · Guinea)' },
    ],
  },
  offers: {
    tech: 'Technologies',
    expertise: 'Studies & expertise',
    projets: 'Projects',
    gouvernance: 'Governance',
    concessions: 'Concessions',
    innovation: 'Innovation & incubation',
  },
  cardCta: 'View the mission',
  detail: {
    back: { label: 'Projects', to: '/realisations' },
    context: 'Context',
    challenges: 'Challenges',
    actions: 'Our intervention',
    results: 'Results',
    facts: {
      title: 'Mission sheet',
      client: 'Client',
      country: 'Country',
      offer: 'Offer',
      year: 'Year',
      duration: 'Duration',
    },
    similar: {
      title: 'A similar project?',
      text: 'Tell us about your context, we will come back to you with a first reading.',
      cta: { label: 'Let’s talk', to: '#contact' },
    },
    pagerLabel: 'Other projects',
    prev: 'Previous',
    next: 'Next',
    others: 'Other projects',
    allLink: { label: 'All our projects', to: '/realisations' },
  },
  items: [
    {
      slug: 'incubos-plateforme-incubation',
      offer: 'innovation',
      title: 'Incub’OS: designing the integrated incubation management platform',
      client: 'Incubation centres and startups',
      country: 'Benin',
      year: '2026',
      duration: 'Study, scoping and specification',
      image: 'photo-1522071820081-009f0129c71c-w1400.jpg',
      excerpt:
        'A single solution linking the management of the incubation centre with the follow-up of each startup, from application to growth.',
      context:
        'Incubation centres in West Africa still run their activities with scattered tools: spreadsheets to follow incubatees, paper files for applications, messaging apps for coordination. On the startup side, tracking objectives, the business model and finances is just as fragmented.',
      challenges: [
        'Data spread across unsynchronised media and journey histories hard to rebuild.',
        'No real-time visibility on the progress of incubated projects.',
        'Impact measurement not systematised for funders and partners.',
        'Follow-up breaks off when the startup leaves the incubator.',
      ],
      actions: [
        'Study of the existing situation and stakeholder mapping: management, programme officers, coaches, incubatees, partners, speakers.',
        'Design of a two-part architecture on a common base: centre management (LGCI) and startup follow-up (LSS).',
        'Writing of the module specification: 13 modules for the centre, 12 for the startup and 7 cross-cutting modules, prioritised with the MoSCoW method.',
        'Requirements suited to the field: mobile-first, offline operation, mobile money, French and English.',
      ],
      results: [
        { value: '32', label: 'modules specified across both parts' },
        { value: '−70 %', label: 'reporting time targeted through automation' },
        { value: '> 80 %', label: 'active users targeted three months after deployment' },
      ],
      resultsNote: 'Targets set for the platform, to be measured after deployment.',
      quote: {
        text: 'Data entered once must be visible wherever it is useful, with the right access rights.',
        cite: 'Guiding principle of Incub’OS',
      },
    },
    {
      // EXAMPLE — to be replaced
      slug: 'diagnostic-organisationnel-administration',
      offer: 'expertise',
      title: 'Organisational diagnosis and transformation roadmap for a public administration',
      client: 'Public administration',
      country: 'Benin',
      year: '2025',
      duration: '6 months',
      image: 'photo-1541872703-74c5e44368f9-w1400.jpg',
      excerpt:
        'Mapping processes, objectifying dysfunctions and building a shared transformation path.',
      context:
        'Facing rising demand for services and longer decision chains, the administration wanted an objective reading of its organisation before launching a modernisation programme.',
      challenges: [
        'Poorly documented processes and sometimes overlapping responsibilities.',
        'No shared indicators to steer service quality.',
        'Need to bring teams on board.',
      ],
      actions: [
        'Interviews, participatory workshops and mapping of key processes.',
        'Gap analysis between the current organisation and the expected missions.',
        'Co-construction of a prioritised roadmap with the departments concerned.',
        'Set-up of a dashboard to monitor the transformation.',
      ],
      results: [
        { value: '✓', label: 'Key processes mapped and validated' },
        { value: '✓', label: 'Prioritised roadmap adopted' },
        { value: '✓', label: 'Shared steering indicators' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'pmo-programme-investissement',
      offer: 'projets',
      title: 'Setting up a PMO for a public investment programme',
      client: 'Public institution',
      country: 'Guinea',
      year: '2025',
      duration: '12 months',
      image: 'photo-1454165804606-c3d57bc86b40-w1400.jpg',
      excerpt: 'Structuring the governance, tools and steering routines of a project portfolio.',
      context:
        'A portfolio of investment projects with tight schedules needed stronger coordination between stakeholders and better visibility on physical and financial progress.',
      challenges: [
        'Many stakeholders and sources of information.',
        'Delays hard to anticipate for lack of early warnings.',
        'Time-consuming reporting to technical and financial partners.',
      ],
      actions: [
        'Definition of programme governance and decision-making bodies.',
        'Deployment of planning, risk monitoring and reporting tools.',
        'Support for project teams and skills transfer.',
      ],
      results: [
        { value: '✓', label: 'Governance and bodies formalised' },
        { value: '✓', label: 'Consolidated, regular reporting' },
        { value: '✓', label: 'Teams trained in steering tools' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'tableau-de-bord-decisionnel',
      offer: 'tech',
      title: 'Monitoring and evaluation system and decision-making dashboard',
      client: 'Development organisation',
      country: 'Benin',
      year: '2025',
      duration: '5 months',
      image: 'photo-1551288049-bebda4e38f71-w1400.jpg',
      excerpt: 'Collecting, securing and visualising field data to inform decisions.',
      context:
        'Project data was collected on multiple media and consolidated by hand, which delayed analysis and weakened the quality of information reaching decision-makers.',
      challenges: [
        'Field collection in areas with poor connectivity.',
        'Indicators differing from one project to another.',
        'Management needed a quick read.',
      ],
      actions: [
        'Harmonisation of the indicator framework and definitions.',
        'Mobile collection tools that work offline.',
        'Design of a decision-making dashboard and user training.',
      ],
      results: [
        { value: '✓', label: 'Harmonised indicator framework' },
        { value: '✓', label: 'Digital collection deployed' },
        { value: '✓', label: 'Dashboard used by the executive committee' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'strategie-transformation-numerique',
      offer: 'tech',
      title: 'Digital transformation strategy and roadmap for online services',
      client: 'Public institution',
      country: 'Guinea',
      year: '2025',
      duration: '6 months',
      image: 'photo-1552664730-d307ca884978-w1400.jpg',
      excerpt: 'Defining a sovereign, prioritised and fundable digital path for services to users.',
      context:
        'The institution wanted to digitise several user services while keeping control of its data and taking connectivity constraints into account.',
      challenges: [
        'Existing systems with little interoperability.',
        'Data sovereignty and security issues.',
        'In-house capacity to strengthen to steer digital projects.',
      ],
      actions: [
        'Digital maturity assessment and systems mapping.',
        'Prioritisation of services to digitise according to their value for users.',
        'Costed roadmap, governance and skills development plan.',
      ],
      results: [
        { value: '✓', label: 'Digital maturity objectified' },
        { value: '✓', label: 'Prioritised, costed roadmap' },
        { value: '✓', label: 'Digital governance defined' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'structuration-concession-ressources',
      offer: 'concessions',
      title: 'Structuring and negotiating a resource concession',
      client: 'Public authority',
      country: 'Guinea',
      year: '2024',
      duration: '9 months',
      image: 'photo-1521791136064-7986c2920216-w1400.jpg',
      excerpt:
        'Reconciling economic performance, risk control and lasting benefits for the territory.',
      context:
        'The granting authority wanted to secure the terms of a long-term concession, balancing attractiveness for the operator with the protection of public interests.',
      challenges: [
        'Information asymmetry between grantor and operator.',
        'Environmental and social commitments to make verifiable.',
        'Monitoring mechanisms to plan from signature.',
      ],
      actions: [
        'Economic and financial analysis of concession scenarios.',
        'Support for negotiation and drafting of key clauses.',
        'Design of the monitoring, control and ESG reporting system.',
      ],
      results: [
        { value: '✓', label: 'Concession terms secured' },
        { value: '✓', label: 'Measurable ESG commitments' },
        { value: '✓', label: 'Operational monitoring system' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'gouvernance-esg-operateur',
      offer: 'gouvernance',
      title: 'Governance and compliance framework for a strategic operator',
      client: 'State-owned company',
      country: 'Benin',
      year: '2024',
      duration: '4 months',
      image: 'photo-1497366216548-37526070297c-w1400.jpg',
      excerpt: 'Clarifying roles, securing decisions and building a culture of compliance.',
      context:
        'With stricter regulatory requirements, the operator wanted to modernise its governance and strengthen its risk management.',
      challenges: [
        'Charters and delegations of authority to update.',
        'Incomplete risk map.',
        'Governing bodies needed simple tools.',
      ],
      actions: [
        'Review of bodies, charters and delegations.',
        'Risk mapping and related control plan.',
        'Training of board members and managers.',
      ],
      results: [
        { value: '✓', label: 'Charters and delegations updated' },
        { value: '✓', label: 'Risks mapped and monitored' },
        { value: '✓', label: 'Board members trained' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'systeme-management-integre-qse',
      offer: 'gouvernance',
      title: 'Deploying an integrated quality, safety and environment management system',
      client: 'Industrial company',
      country: 'Benin',
      year: '2024',
      duration: '8 months',
      image: 'photo-1503387762-592deb58ef4e-w1400.jpg',
      excerpt:
        'Guiding an organisation towards an integrated management system, from diagnosis to audit.',
      context:
        'The company wanted to structure its quality, safety and environment practices within a single system, clear for its teams and its clients.',
      challenges: [
        'Existing practices varying from site to site.',
        'Documentation to streamline.',
        'Buy-in from operational teams.',
      ],
      actions: [
        'Initial diagnosis against the applicable standards.',
        'Design and documentation of the integrated system.',
        'Team training and mock internal audits.',
      ],
      results: [
        { value: '✓', label: 'Integrated system documented' },
        { value: '✓', label: 'Internal auditors trained' },
        { value: '✓', label: 'Organisation ready for audit' },
      ],
    },
    {
      // EXAMPLE — to be replaced
      slug: 'renforcement-capacites-gestion-projets',
      offer: 'expertise',
      title: 'Project management capacity-building programme',
      client: 'Line ministry',
      country: 'Guinea',
      year: '2024',
      duration: '3 months',
      image: 'photo-1524178232363-1fb2b075b655-w1400.jpg',
      excerpt: 'Training teams in the methods and tools for steering public projects.',
      context:
        'To support a new cycle of projects, the ministry wanted to give its staff a common foundation of project management methods and tools.',
      challenges: [
        'Very different levels of practice among participants.',
        'Need to anchor the training in real cases.',
      ],
      actions: [
        'Needs assessment and modular training path.',
        'Practical workshops on the participants’ ongoing projects.',
        'Post-training coaching and assessment of learning.',
      ],
      results: [
        { value: '✓', label: 'Tailor-made modular path' },
        { value: '✓', label: 'Practice on real projects' },
        { value: '✓', label: 'Learning assessed at the end of the programme' },
      ],
    },
  ],
}
