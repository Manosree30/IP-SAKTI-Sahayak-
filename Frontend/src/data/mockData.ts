import { 
  AuthoritativeSource, 
  EvidenceDocument, 
  AnalysisRecord, 
  FormulationInput, 
  CitationItem 
} from '../types';

export const AUTHORITATIVE_SOURCES: AuthoritativeSource[] = [
  {
    id: 'wipo',
    code: 'WIPO',
    name: 'WIPO',
    fullName: 'World Intellectual Property Organization',
    description: 'Intergovernmental body administering international IP treaties and traditional knowledge protection frameworks.',
    sourceType: 'International Organization',
    url: 'https://www.wipo.int/tk/en/',
    logoType: 'wipo'
  },
  {
    id: 'ipindia',
    code: 'IP India',
    name: 'IP India',
    fullName: 'Intellectual Property India',
    description: 'Office of Controller General of Patents, Designs & Trade Marks (CGPDTM), administering Indian patent legislation.',
    sourceType: 'National Patent Authority',
    url: 'https://ipindia.gov.in/',
    logoType: 'ipindia'
  },
  {
    id: 'ayush',
    code: 'Ministry of AYUSH',
    name: 'Ministry of AYUSH',
    fullName: 'Ministry of Ayush, Government of India',
    description: 'Nodal ministry for development of Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homoeopathy.',
    sourceType: 'Government Ministry',
    url: 'https://ayush.gov.in/',
    logoType: 'ayush'
  },
  {
    id: 'tkdl',
    code: 'TKDL',
    name: 'TKDL',
    fullName: 'Traditional Knowledge Digital Library',
    description: 'Pioneering Indian database documenting classical formulations from authoritative texts to prevent biopiracy.',
    sourceType: 'Digital Prior Art Library',
    url: 'https://www.tkdl.res.in/',
    logoType: 'tkdl'
  },
  {
    id: 'pcimh',
    code: 'PCIM&H',
    name: 'PCIM&H',
    fullName: 'Pharmacopoeia Commission for Indian Medicine & Homoeopathy',
    description: 'Autonomous body under Ministry of Ayush setting legal standards for Ayurvedic Pharmacopoeia of India (API).',
    sourceType: 'Pharmacopoeial Authority',
    url: 'https://pcimh.gov.in/',
    logoType: 'pcimh'
  },
  {
    id: 'who',
    code: 'WHO',
    name: 'WHO',
    fullName: 'World Health Organization',
    description: 'Global Traditional Medicine Centre (GTMC) in Jamnagar, India, advancing safety and regulatory evidence.',
    sourceType: 'Global Health Body',
    url: 'https://www.who.int/initiatives/who-global-traditional-medicine-centre',
    logoType: 'who'
  }
];

export const HOW_IT_WORKS_STEPS = [
  { id: 'query', stepNumber: '01', title: 'User Query', desc: 'Formulation & claim inputs', icon: 'User' },
  { id: 'lang', stepNumber: '02', title: 'Language Detection', desc: 'Multilingual query parsing', icon: 'Languages' },
  { id: 'intent', stepNumber: '03', title: 'Intent Detection', desc: 'Patent vs. regulatory goals', icon: 'Target' },
  { id: 'route', stepNumber: '04', title: 'Domain Routing', desc: 'TKDL, AYUSH, NBA paths', icon: 'GitFork' },
  { id: 'retrieve', stepNumber: '05', title: 'Evidence Retrieval', desc: 'Authoritative acts & corpus', icon: 'Search' },
  { id: 'rerank', stepNumber: '06', title: 'Reranking', desc: 'Semantic relevance weighing', icon: 'SlidersHorizontal' },
  { id: 'citation', stepNumber: '07', title: 'Citation Verification', desc: 'Source & section checks', icon: 'ShieldCheck' },
  { id: 'guidance', stepNumber: '08', title: 'AI Guidance', desc: 'Actionable intelligence report', icon: 'Sparkles' },
];

export const INITIAL_EVIDENCE_DOCUMENTS: EvidenceDocument[] = [
  {
    id: 'doc-1',
    authority: 'IP India',
    documentTitle: 'Patents Act, 1970 — Section 3(p)',
    domain: 'Patent',
    country: 'India',
    documentType: 'Statutory Act',
    lastUpdated: 'Jan 15, 2024',
    sourceUrl: 'https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_31_1_patent-act-1970-11march2015.pdf',
    description: 'Inventions which in effect are traditional knowledge or an aggregation or duplication of known properties of traditionally known component are not patentable.',
    keySections: 'Section 3(p), Section 3(e) (admixture), Section 10(4)(ii)(D) (disclosure of biological source).',
    verified: true
  },
  {
    id: 'doc-2',
    authority: 'Ministry of AYUSH',
    documentTitle: 'Drugs and Cosmetics Rules, 1945 — Rule 158B',
    domain: 'AYUSH Regulation',
    country: 'India',
    documentType: 'Regulatory Notification',
    lastUpdated: 'Dec 12, 2023',
    sourceUrl: 'https://ayush.gov.in/',
    description: 'Regulatory requirements for issue of license for manufacturing Ayurvedic, Siddha, or Unani medicines including safety and proof of effectiveness data.',
    keySections: 'Rule 158B, Schedule T (Good Manufacturing Practices - GMP standards for ASU drugs).',
    verified: true
  },
  {
    id: 'doc-3',
    authority: 'TKDL',
    documentTitle: 'Traditional Knowledge Digital Library Guidelines & Prior Art Corpus',
    domain: 'Traditional Knowledge',
    country: 'India',
    documentType: 'Prior Art Repository',
    lastUpdated: 'Nov 10, 2023',
    sourceUrl: 'https://www.tkdl.res.in/',
    description: 'Digital classification based on classical texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Sharangadhara Samhita) mapped to IPC classifications.',
    keySections: 'IPC A61K 36/00, Sloka cross-referencing, Classical therapeutic indications (Rasayana, Deepana, Pachana).',
    verified: true
  },
  {
    id: 'doc-4',
    authority: 'National Biodiversity Authority',
    documentTitle: 'Biological Diversity Act, 2002 — Section 6',
    domain: 'Biodiversity',
    country: 'India',
    documentType: 'Statute & Gazette',
    lastUpdated: 'Feb 20, 2024',
    sourceUrl: 'http://nbaindia.org/',
    description: 'Mandates prior approval from National Biodiversity Authority before applying for any intellectual property right involving biological resources obtained from India.',
    keySections: 'Section 6(1), Section 3 (foreign entities), Form III application guidelines, Access and Benefit Sharing (ABS).',
    verified: true
  },
  {
    id: 'doc-5',
    authority: 'WIPO',
    documentTitle: 'WIPO Intergovernmental Committee on Intellectual Property and Genetic Resources',
    domain: 'International',
    country: 'International',
    documentType: 'Treaty & Guidelines',
    lastUpdated: 'May 24, 2024',
    sourceUrl: 'https://www.wipo.int/tk/en/',
    description: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge adopted to ensure mandatory disclosure in patent applications.',
    keySections: 'Mandatory origin disclosure requirements, defensive protection mechanisms.',
    verified: true
  },
  {
    id: 'doc-6',
    authority: 'PCIM&H',
    documentTitle: 'Ayurvedic Pharmacopoeia of India (API) Part I & II Standards',
    domain: 'AYUSH Regulation',
    country: 'India',
    documentType: 'Pharmacopoeial Standard',
    lastUpdated: 'Aug 14, 2023',
    sourceUrl: 'https://pcimh.gov.in/',
    description: 'Quality standards, identity, purity, assay methods and microbial limits for Ayurvedic single and compound formulations.',
    keySections: 'Volume I to IX monographs, thin layer chromatography (TLC/HPTLC) fingerprinting protocols.',
    verified: true
  },
  {
    id: 'doc-7',
    authority: 'WHO',
    documentTitle: 'WHO Traditional Medicine Strategy: 2025–2034',
    domain: 'International',
    country: 'Global',
    documentType: 'Strategy Paper',
    lastUpdated: 'Jan 18, 2024',
    sourceUrl: 'https://www.who.int/initiatives/who-global-traditional-medicine-centre',
    description: 'Strategic directions for member states on integrating safe, evidence-based traditional and complementary medicine into regulatory frameworks.',
    keySections: 'Quality assurance, clinical validation standards, cross-border regulatory harmonization.',
    verified: true
  }
];

export const DEFAULT_FORMULATION: FormulationInput = {
  productName: 'Herbal Immunity Formulation',
  ingredients: 'Ashwagandha (Withania somnifera), Turmeric (Curcuma longa), Neem (Azadirachta indica), Black Pepper (Piper nigrum)',
  purpose: 'Immunity boosting, systemic anti-inflammatory, and antioxidant cellular defense',
  claims: 'Synergistic bioavailability enhancement, adaptogenic stamina, antioxidant cellular protection',
  dosageForm: 'Standardized Aqueous-Ethanolic Extract Tablet (500mg)',
  targetCountry: 'India',
  additionalCountries: ['USA', 'European Union', 'Japan'],
  question: 'Can this formulation be patented under Indian patent law and what AYUSH and Biodiversity approvals are required before commercialization?'
};

export const INITIAL_ANALYSIS_RESULT: AnalysisRecord = {
  id: 'analysis-herbal-immunity',
  productName: 'Herbal Immunity Formulation',
  date: 'Today, 10:42 AM',
  ingredients: ['Ashwagandha (Withania somnifera)', 'Turmeric (Curcuma longa)', 'Neem (Azadirachta indica)', 'Black Pepper (Piper nigrum)'],
  purpose: 'Immunity boosting and cellular protection',
  dosageForm: 'Tablet (500mg)',
  targetCountry: 'India',
  additionalCountries: ['USA', 'EU', 'Japan'],
  question: 'Can this formulation be patented and what regulatory requirements should I consider?',
  overallStatus: 'Review Recommended',
  overallConfidence: 'Strong',
  overallFinding: 'The retrieved evidence indicates that additional patentability and traditional-knowledge checks should be performed before filing.',
  createdAt: '2026-09-06T10:42:00Z',
  domains: {
    patent: {
      id: 'patent',
      title: 'Patent',
      iconName: 'ShieldAlert',
      finding: 'Patentability considerations identified under Section 3(p) & 3(e).',
      status: 'Prior Review Recommended',
      evidenceStrength: 'Strong',
      sourceCount: 4,
      whyThisMatters: 'Under the Indian Patents Act 1970, Section 3(p) bars inventions that are an aggregation or duplication of known properties of traditionally known components. Section 3(e) further prevents claims that are a mere admixture without demonstrated synergistic unexpected technical effect.',
      recommendedChecks: [
        'Search for similar formulations in TKDL before submitting patent claims',
        'Verify novelty and non-obvious inventive step through quantitative synergy assays',
        'Ensure biological material origin disclosure is ready for Section 10(4)(ii)(D)'
      ],
      nextSteps: [
        'Review relevant patent database prior-art citations',
        'Perform in-vitro combination synergy indexing (Chou-Talalay method or equivalent)',
        'Consult registered patent attorney specializing in ASU & life sciences'
      ],
      citations: [
        {
          id: 'cit-1',
          authority: 'IP India',
          document: 'Patents Act, 1970',
          section: 'Section 3, Paragraph (p)',
          evidencePassage: '"The following are not inventions within the meaning of this Act: (p) an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components."',
          evidenceStrength: 'Strong',
          url: 'https://ipindia.gov.in/',
          verified: true,
          type: 'Statutory Act'
        },
        {
          id: 'cit-2',
          authority: 'IP India',
          document: 'Guidelines for Processing of Patent Applications Relating to Traditional Knowledge and Biological Material',
          section: 'Clause 5.2 — Synergistic Effect Requirement',
          evidencePassage: '"Mere combination of two or more known herbs with known therapeutic properties will not be considered patentable unless unexpected synergistic efficacy is quantitatively substantiated by comparative experimental data against individual constituents."',
          evidenceStrength: 'Strong',
          url: 'https://ipindia.gov.in/',
          verified: true,
          type: 'Office Guidelines'
        }
      ]
    },
    tk: {
      id: 'tk',
      title: 'Traditional Knowledge',
      iconName: 'BookOpen',
      finding: 'Potential traditional knowledge overlap identified in classical texts.',
      status: 'Potential TKDL Overlap',
      evidenceStrength: 'Strong',
      sourceCount: 5,
      whyThisMatters: 'Ashwagandha (Rasayana, Balya) and Haridra (Turmeric - Vishaghna, Kushtaghna) have extensive documentation in classical compendiums including Charaka Samhita and Ashtanga Hridaya. Prior art references to combining Withania somnifera and Curcuma longa are indexed in TKDL.',
      recommendedChecks: [
        'Search TKDL entries for Withania somnifera + Curcuma longa co-administration',
        'Examine classical formulations such as Haridra Khanda and Ashwagandharishta',
        'Check specific classical decoction/anupana methods to differentiate from traditional methods'
      ],
      nextSteps: [
        'Submit formal TKDL pre-grant prior art clearance request',
        'Draft novelty claims focused strictly on novel extraction fraction or proprietary delivery matrix rather than raw herbal combination',
        'Document non-classical therapeutic mechanism'
      ],
      citations: [
        {
          id: 'cit-3',
          authority: 'TKDL',
          document: 'Traditional Knowledge Digital Library',
          section: 'Page 01, Classical Compendium Reference',
          evidencePassage: '"Similar formulation found in traditional records: Withania somnifera documented as Rasayana; Curcuma longa documented as Vishaghna & Shothahara. Combined administration references noted in classical Samhitas."',
          evidenceStrength: 'Strong',
          url: 'https://www.tkdl.res.in/',
          verified: true,
          type: 'Classical Archive'
        },
        {
          id: 'cit-4',
          authority: 'Charaka Samhita',
          document: 'Chikitsa Sthana — Chapter 1 (Rasayana Adhyaya)',
          section: 'Sloka 2.14-2.18',
          evidencePassage: '"Documenting revitalizing properties and longevity formulations incorporating Withania somnifera with warming spices for enhanced assimilation."',
          evidenceStrength: 'Moderate',
          url: 'https://www.tkdl.res.in/',
          verified: true,
          type: 'Classical Ayurvedic Text'
        }
      ]
    },
    ayush: {
      id: 'ayush',
      title: 'AYUSH Regulation',
      iconName: 'Building2',
      finding: 'Standard ASU manufacturing guidelines and Rule 158B apply.',
      status: 'Standard Guidelines Apply',
      evidenceStrength: 'Moderate',
      sourceCount: 3,
      whyThisMatters: 'For commercial marketing in India, manufacturing requires a valid license under Drugs and Cosmetics Rules 1945. Depending on whether this is classified as a Classical Ayurvedic Medicine (Form 25D) or Proprietary Ayurvedic Medicine (Form 25E), safety trial or textual citation requirements differ.',
      recommendedChecks: [
        'Determine license category: Classical (Rule 158B Table A) vs. Ayurvedic Proprietary Medicine (Table B)',
        'Verify compliance with Schedule T Good Manufacturing Practices (GMP)',
        'Check heavy metals, microbial load, and pesticide residue limits under API standards'
      ],
      nextSteps: [
        'Prepare Form 24D/25D license dossier for State Licensing Authority (SLA)',
        'Conduct stability studies as per Ministry of Ayush Pharmacopoeial guidelines',
        'Finalize label text avoiding prohibited claims under Drugs and Magic Remedies Act'
      ],
      citations: [
        {
          id: 'cit-5',
          authority: 'Ministry of AYUSH',
          document: 'AYUSH Guidelines & Drugs and Cosmetics Rules 1945',
          section: 'Rule 158B & Schedule T',
          evidencePassage: '"Requirements for herbal formulations: Proof of effectiveness required for proprietary Ayurvedic medicines. Standardized extracts must meet identity and heavy metal criteria specified in Ayurvedic Pharmacopoeia of India."',
          evidenceStrength: 'Moderate',
          url: 'https://ayush.gov.in/',
          verified: true,
          type: 'Regulatory Rules'
        }
      ]
    },
    biodiversity: {
      id: 'biodiversity',
      title: 'Biodiversity',
      iconName: 'Leaf',
      finding: 'Biological resource approval required under Biological Diversity Act.',
      status: 'Check Required',
      evidenceStrength: 'Strong',
      sourceCount: 2,
      whyThisMatters: 'Section 6 of the Biological Diversity Act 2002 mandates that any person applying for any IPR in or outside India for an invention based on biological resources obtained from India must obtain prior approval of the National Biodiversity Authority (NBA Form III).',
      recommendedChecks: [
        'Verify whether biological raw materials (Withania, Curcuma, Azadirachta) are sourced within India',
        'Review Section 6(1) approval requirements before filing patent grant request',
        'Determine benefit-sharing obligations with State Biodiversity Boards (SBB)'
      ],
      nextSteps: [
        'File NBA Form III with National Biodiversity Authority concurrently with patent application',
        'Obtain sourcing certificates and traceability records from licensed agricultural cultivators',
        'Verify whether any species used falls under threatened/endangered notifications'
      ],
      citations: [
        {
          id: 'cit-6',
          authority: 'National Biodiversity Authority',
          document: 'Biological Diversity Act, 2002',
          section: 'Section 6(1) & NBA Guidelines',
          evidencePassage: '"No person shall apply for any intellectual property right, by whatever name called, in or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining the previous approval of National Biodiversity Authority."',
          evidenceStrength: 'Strong',
          url: 'http://nbaindia.org/',
          verified: true,
          type: 'Statutory Act'
        }
      ]
    },
    international: {
      id: 'international',
      title: 'International',
      iconName: 'Globe',
      finding: 'Export classification and target market supplement regulations apply.',
      status: 'Research Required',
      evidenceStrength: 'Moderate',
      sourceCount: 2,
      whyThisMatters: 'In the USA (FDA DSHEA 1994), formulations are regulated as Dietary Supplements with strict structure/function claim boundaries and cGMP (21 CFR Part 111). In the EU, Traditional Herbal Medicinal Products Directive (Directive 2004/24/EC) requires 30-year traditional use evidence (including 15 years in EU).',
      recommendedChecks: [
        'Review US FDA dietary supplement ingredient safety notifications (NDI status)',
        'Check EU Novel Foods Catalogue for Azadirachta indica and Piper nigrum extracts',
        'Ensure packaging claims adhere to FTC and FDA structure-function guidelines'
      ],
      nextSteps: [
        'Conduct US FDA 21 CFR Part 111 cGMP compliance audit',
        'Review international patent filing via PCT (Patent Cooperation Treaty) Chapter I',
        'Check country-specific prohibited botanicals lists (e.g. Health Canada, EFSA)'
      ],
      citations: [
        {
          id: 'cit-7',
          authority: 'WIPO & US FDA',
          document: 'International Traditional Herbal Regulations & DSHEA 1994',
          section: '21 U.S.C. 321(ff) / WIPO IGC Guidelines',
          evidencePassage: '"Botanical formulations imported into target markets must satisfy dietary supplement safety notifications, absence of adulteration, and substantiated structure/function claim documentation without disease treatment assertions."',
          evidenceStrength: 'Moderate',
          url: 'https://www.wipo.int/tk/en/',
          verified: true,
          type: 'International Standards'
        }
      ]
    }
  }
};

export const INITIAL_MY_ANALYSES: AnalysisRecord[] = [
  INITIAL_ANALYSIS_RESULT,
  {
    id: 'analysis-skincare-blend',
    productName: 'Skin Care Herbal Blend',
    date: 'Yesterday, 3:15 PM',
    ingredients: ['Manjistha (Rubia cordifolia)', 'Lodhra (Symplocos racemosa)', 'Sandalwood (Santalum album)', 'Aloe Vera'],
    purpose: 'Dermatological soothing, blemish reduction, and complexion brightening',
    dosageForm: 'Topical Lepa / Gel Cream (50g)',
    targetCountry: 'India',
    additionalCountries: ['USA', 'UK'],
    question: 'Can novel cold-extract topical formulation be patented without Section 3(p) objections?',
    overallStatus: 'Review Recommended',
    overallConfidence: 'Moderate',
    overallFinding: 'Formulation possesses documented classical prior art in Ashtanga Hridaya. Novelty must be established strictly via formulation process or topical delivery micro-emulsion.',
    createdAt: '2026-09-05T15:15:00Z',
    domains: { ...INITIAL_ANALYSIS_RESULT.domains }
  },
  {
    id: 'analysis-digestive-churna',
    productName: 'Digestive Churna Blend',
    date: '3 days ago',
    ingredients: ['Hing (Ferula foetida)', 'Ajwain (Trachyspermum ammi)', 'Saunf (Foeniculum vulgare)', 'Saindhava Lavana'],
    purpose: 'Carminative, digestive fire (Agni) stimulation, flatulence relief',
    dosageForm: 'Effervescent Granules Sachet',
    targetCountry: 'India',
    additionalCountries: ['UAE', 'Singapore'],
    question: 'What AYUSH licensing route is appropriate for effervescent granules of classical Hingwashtak components?',
    overallStatus: 'Assessment Available',
    overallConfidence: 'Strong',
    overallFinding: 'Clear regulatory route under Ayurvedic Proprietary Medicine with modified dosage form under Rule 158B. Documented TKDL overlap indicates composition requires novelty beyond classical mixture.',
    createdAt: '2026-09-03T11:20:00Z',
    domains: { ...INITIAL_ANALYSIS_RESULT.domains }
  },
  {
    id: 'analysis-joint-care-oil',
    productName: 'Joint Care Medicated Oil',
    date: '5 days ago',
    ingredients: ['Mahanarayan Taila Base', 'Shallaki (Boswellia serrata)', 'Nirgundi (Vitex negundo)', 'Camphor'],
    purpose: 'Musculoskeletal comfort, joint stiffness relief, targeted local massage',
    dosageForm: 'Topical Medicated Taila (100ml)',
    targetCountry: 'India',
    additionalCountries: ['Canada'],
    question: 'Does inclusion of Boswellia serrata standardized extract require NBA prior approval for commercial export?',
    overallStatus: 'Further Research Needed',
    overallConfidence: 'Insufficient',
    overallFinding: 'Biological Diversity Act Section 6 applies due to commercial export intent. Boswellia sourcing traceability documentation required.',
    createdAt: '2026-09-01T09:00:00Z',
    domains: { ...INITIAL_ANALYSIS_RESULT.domains }
  }
];

export const QUICK_QUESTIONS = [
  'Can this formulation be patented?',
  'What traditional knowledge may be relevant?',
  'What AYUSH regulations apply to my product?',
  'Does biodiversity regulation (NBA) apply?',
  'What should I check before entering international markets?'
];
