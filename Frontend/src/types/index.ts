export type NavigationTab = 
  | 'dashboard' 
  | 'analyze' 
  | 'processing' 
  | 'results' 
  | 'detailed' 
  | 'ask-ai' 
  | 'analyses' 
  | 'evidence' 
  | 'research' 
  | 'settings';

export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';

export type EvidenceStrength = 'Strong' | 'Moderate' | 'Insufficient';

export type AnalysisStatus = 'Review Recommended' | 'Assessment Available' | 'Further Research Needed' | 'Check Required';

export interface FormulationInput {
  productName: string;
  ingredients: string;
  purpose: string;
  claims: string;
  dosageForm: string;
  targetCountry: string;
  additionalCountries: string[];
  question: string;
}

export interface CitationItem {
  id: string;
  authority: string;
  document: string;
  section: string;
  evidencePassage: string;
  evidenceStrength: EvidenceStrength;
  url?: string;
  verified: boolean;
  type: string;
}

export interface DomainAnalysis {
  id: string;
  title: string;
  iconName: string;
  finding: string;
  status: string;
  evidenceStrength: EvidenceStrength;
  sourceCount: number;
  whyThisMatters: string;
  recommendedChecks: string[];
  nextSteps: string[];
  citations: CitationItem[];
}

export interface AnalysisRecord {
  id: string;
  productName: string;
  date: string;
  ingredients: string[];
  purpose: string;
  dosageForm: string;
  targetCountry: string;
  additionalCountries: string[];
  question: string;
  overallStatus: AnalysisStatus;
  overallConfidence: EvidenceStrength;
  overallFinding: string;
  domains: Record<string, DomainAnalysis>;
  createdAt: string;
}

export interface EvidenceDocument {
  id: string;
  authority: string;
  documentTitle: string;
  domain: string;
  country: string;
  documentType: string;
  lastUpdated: string;
  sourceUrl: string;
  description: string;
  keySections: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  domain?: string;
  finding?: string;
  evidenceStrength?: EvidenceStrength;
  citations?: CitationItem[];
  suggestedQuestions?: string[];
}

export interface AuthoritativeSource {
  id: string;
  name: string;
  code: string;
  fullName: string;
  description: string;
  sourceType: string;
  url: string;
  logoType: 'wipo' | 'ipindia' | 'ayush' | 'tkdl' | 'pcimh' | 'who';
}
