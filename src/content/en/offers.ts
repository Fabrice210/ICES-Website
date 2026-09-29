import type { OfferSlide } from '../../types/content'

const photo = (id: string) => `${id}-w1400.jpg`

/**
 * The 6 brochure segments (« 03 - Nos segments et offres »), in the order validated
 * in the meeting. English version of content/fr/offers.ts (same images).
 */
export const offerSlides: OfferSlide[] = [
  {
    segment: 'Intellectual Services',
    title: '<em>Expertise</em> that turns challenges into <em>informed decisions</em>.',
    text: 'We bring our expertise to support organisations in their strategic thinking, studies, audits, evaluations and the capacity building their transformations require.',
    images: [
      {
        file: photo('photo-1460925895917-afdab827c52f'),
        label: 'Audits & Evaluations',
        services: [
          'Organisational, HR and institutional diagnostic audits',
          'Public and private governance audits — state portfolios, boards, supervisory bodies',
          'Digital maturity, digital transformation and AI adoption audits',
          'ESG, environmental compliance and sustainable development audits',
          'Cybersecurity audit and diagnosis (GDPR, NIS2, ISO 27001, digital sovereignty)',
          'Financial performance and budget management audits (public & para-public sector)',
          'Strategic, financial and technology due diligence (M&A, PPP, public investment)',
        ],
      },
      {
        file: photo('photo-1551288049-bebda4e38f71'),
        label: 'Studies, Evaluations & Surveys',
        services: [
          'Technical, economic and financial feasibility studies (infrastructure, energy, mining, construction)',
          'Socio-economic and environmental impact studies (policies, programmes, projects)',
          'Impact evaluation of public policies, projects and strategies (ex-ante, mid-term, ex-post)',
          'Surveys and opinion polls (citizen perception, user satisfaction, institutional barometers)',
          'Sector studies and market analyses (mining, energy, agriculture, health, education, digital)',
          'Foresight studies and strategic analyses (transformation scenarios, disruptions, long-term vision)',
        ],
      },
      {
        file: photo('photo-1542744173-8e7e53415bb0'),
        label: 'Strategic Consulting & Governance',
        services: [
          'Strategy development for companies, institutions and governments',
          'Public and institutional governance (GovTech, E-Gov, OHADA)',
          'Advice on regulation, public policy and government affairs',
          'Risk governance, compliance and internal control',
        ],
      },
      {
        file: photo('photo-1524178232363-1fb2b075b655'),
        label: 'Training & Capacity Building',
        services: [
          'Leadership, management and governance training (public & private sectors)',
          'Digital transformation and artificial intelligence academy',
          'Professional certifications (ISO, cybersecurity, PMP, ESG…)',
          'Institutional capacity-building programmes (donors)',
        ],
      },
    ],
  },
  {
    segment: 'Representation Mandates & Delegated Governance',
    title: '<em>Governance</em> designed to strengthen <em>performance</em>.',
    text: 'We support institutions and organisations in managing strategic mandates, structuring governance frameworks and steering initiatives aimed at sustainable, measurable performance.',
    images: [
      {
        file: photo('photo-1497366216548-37526070297c'),
        label: 'Institutional Representation',
        services: [
          'Board representation mandates on behalf of governments, institutions or public shareholders',
          'Support for appointing directors (Sentinelle, Vigie, Gardien, Flash, Portfolio packages)',
          'Structured reporting and accountability to the appointing authority',
        ],
      },
      {
        file: photo('photo-1503387762-592deb58ef4e'),
        label: 'Support for Public Service Hubs',
        services: [
          'Mandates to support the design and delivery of public service hubs (health, education, water, energy, logistics)',
          'Delegated operational management of structuring programmes on behalf of the State',
          'Multi-stakeholder coordination (administrations, operators, technical and financial partners)',
        ],
      },
      {
        file: photo('photo-1541872703-74c5e44368f9'),
        label: 'Institutional Knowledge Management',
        services: [
          'Knowledge capitalisation: documentation, institutional memory and lessons learned',
          'Transfer of skills and know-how to the principal',
          'Structuring knowledge bases for the continuity of public policies',
        ],
      },
    ],
  },
  {
    segment: 'Project & Financing Engineering',
    title: '<em>Structured projects</em> to move from <em>ambition</em> to <em>action</em>.',
    text: 'We support the design, structuring and management of complex projects, covering feasibility studies, fundraising, risk management and implementation monitoring.',
    images: [
      {
        file: photo('photo-1454165804606-c3d57bc86b40'),
        label: 'Project Management & PMO',
        services: [
          'Management of complex programmes and projects (multi-sector, multi-partner)',
          'Setting up and running high-performance PMOs (Project Management Office)',
          'Project control, donor reporting and monitoring & evaluation',
        ],
      },
      {
        file: photo('photo-1554224155-6726b3ff858f'),
        label: 'Fundraising, Structuring & Valuation',
        services: [
          'Fundraising support with donors, investment funds and financing institutions',
          'Preparing and writing funding proposals and applications',
          'Financial and legal structuring of projects, assets and investment vehicles (PPP, sovereign funds)',
          'Valuation of assets, projects and companies',
          'Support for relations with technical and financial partners',
        ],
      },
    ],
  },
  {
    segment: 'Technology Solutions',
    title: '<em>Technology</em> designed to solve <em>real problems</em>.',
    text: 'We design and deploy technology solutions suited to African realities: artificial intelligence, data science, digital platforms, IoT, cybersecurity, cloud and decision-support tools.',
    images: [
      {
        file: photo('photo-1518770660439-4636190af475'),
        label: 'Artificial Intelligence & Data Science',
        services: [
          'Generative and applied AI implementation strategy (public & private sectors)',
          'Data governance, Lakehouse architecture and data management',
          'Predictive analytics, business intelligence and strategic dashboards',
        ],
      },
      {
        file: photo('photo-1451187580459-43490279c0fa'),
        label: 'Engineering & Technology Solutions',
        services: [
          'Hybrid and multi-cloud architecture (design, deployment, optimisation)',
          'Digitalisation of organisational processes and public services',
          'Industrial IoT (IIoT) and field connectivity (mining sites, energy)',
          'Zero-trust cybersecurity, data protection and digital sovereignty',
          'Drone deployment (inspection, surveillance, logistics, mining and agricultural remote sensing)',
        ],
      },
      {
        file: photo('photo-1552664730-d307ca884978'),
        label: 'Digital Advisory for Governments',
        services: [
          'Digital modernisation of administrations and public services',
          'National artificial intelligence and digital sovereignty strategies',
          'National cybersecurity and critical infrastructure protection',
        ],
      },
    ],
  },
  {
    segment: 'Concession Management',
    title: '<em>Structured concessions</em> that create <em>lasting value</em>.',
    text: 'We support public and private actors in structuring, negotiating and monitoring concessions, balancing economic performance, governance, risk control and long-term impact.',
    images: [
      {
        file: photo('photo-1521791136064-7986c2920216'),
        label: 'Concession Structuring & Negotiation',
        services: [
          'Legal, financial and tax structuring of concession contracts (mining, ports, energy, telecoms, agribusiness)',
          'Negotiation and renegotiation of mining conventions and production-sharing agreements',
          'Structuring PPPs and public service concession contracts (water, electricity, transport, logistics corridors)',
          'Structuring agricultural, forestry, land and fisheries concessions',
        ],
      },
      {
        file: photo('photo-1551434678-e076c223a692'),
        label: 'Concession Monitoring, Control & Audit',
        services: [
          'Audit of compliance with contractual obligations and specifications',
          'Control and certification of fees, royalties and extractive revenues',
          'Performance monitoring, reporting and dashboards for concession contracts',
          'Extractive transparency audits (EITI) and natural resource governance',
        ],
      },
      {
        file: photo('photo-1473341304170-971dccb5ac1e'),
        label: 'ESG Governance of Concessions',
        services: [
          'Environmental and social monitoring (ESIA, ESMP, resettlement plans)',
          'Managing relations with local communities and stakeholders',
          'Compliance with international standards (IFC Performance Standards, Equator Principles, SDGs)',
        ],
      },
    ],
  },
  {
    segment: 'Innovation & Entrepreneurship',
    title: '<em>Ideas transformed</em> into <em>high-impact</em> <em>solutions</em>.',
    text: 'We support innovation and entrepreneurship through applied research, incubation, acceleration and the development of solutions that meet the real needs of African territories and markets.',
    images: [
      {
        file: photo('photo-1532187863486-abf9dbad1b69'),
        label: 'Applied Research & Development',
        services: [
          'Collaborative R&D and co-innovation with academic and industrial ecosystems',
          'Research valorisation and technology transfer',
          'Strategic intellectual property protection (patents, trademarks, industrial property)',
        ],
      },
      {
        file: photo('photo-1522071820081-009f0129c71c'),
        label: 'Entrepreneurship Support & Incubation',
        services: [
          'Identifying, selecting and supporting innovative project leaders',
          'Incubating high-potential startups and SMEs',
          'Support in accessing funding (venture capital, seed funds, AfCFTA)',
        ],
      },
      {
        file: photo('photo-1531482615713-2afd69097998'),
        label: 'African Proprietary Platforms & Solutions',
        services: [
          'Designing and deploying complex digital platforms suited to African challenges',
          'Sovereign solutions with mandatory skills transfer and local capitalisation',
          'Decision intelligence platforms for governments and institutions',
        ],
      },
    ],
  },
]
