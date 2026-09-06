export type Language = 'en' | 'ta' | 'hi';

export type Theme = 'light' | 'dark' | 'system';

export type ResponsePreference = 'concise' | 'balanced' | 'detailed';

export type Screen = 
  | 'landing'
  | 'dashboard'
  | 'ask'
  | 'product_analysis'
  | 'analysis_progress'
  | 'intelligence_report'
  | 'evidence_audit'
  | 'sources'
  | 'history'
  | 'settings'
  | 'login'
  | 'signup'
  | 'forgot_password';

export type Domain = 
  | 'all'
  | 'patentability'
  | 'ip'
  | 'traditional_knowledge'
  | 'ayush_regulations'
  | 'biodiversity'
  | 'international';

export type EvidenceStrength = 'Strong' | 'Moderate' | 'Insufficient';

export type VerificationStatus = 'Verified' | 'Requires Review' | 'Flagged Discrepancy';

export type AuthorityTier = 
  | 'Tier 1 Statutory Authority'
  | 'Tier 1 International Treaty'
  | 'Tier 2 Classical Ayurvedic Canon'
  | 'Tier 2 Pharmacopoeial Standard'
  | 'Tier 3 Peer Consensus / Precedent';

export interface EvidenceItem {
  id: string;
  source: string;
  document: string;
  section: string;
  claim: string;
  evidencePassage: string;
  authority: string;
  authorityTier: AuthorityTier;
  evidenceStrength: EvidenceStrength;
  verificationStatus: VerificationStatus;
  jurisdiction: string;
  verifiedDate: string;
  auditNotes?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  domain?: string;
  confidenceReasoning: string;
}

export interface ReportSection {
  domainKey: 'ip' | 'traditional_knowledge' | 'ayush_regulations' | 'biodiversity' | 'international';
  domainName: string;
  claim: string;
  finding: string;
  legalRisk: 'Low' | 'Moderate' | 'High' | 'Critical Prior Art Conflict';
  statutoryBasis: string;
  evidence: EvidenceItem[];
}

export interface IntelligenceReport {
  id: string;
  title: string;
  queryOrProduct: string;
  isProductAnalysis: boolean;
  productDetails?: {
    productName: string;
    ingredients: string[];
    purpose: string;
    dosageForm: string;
    targetCountry: string;
  };
  timestamp: string;
  language: Language;
  responsePreference: ResponsePreference;
  executiveFinding: {
    verdict: string;
    summary: string;
    riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical Prior Art Conflict';
    primaryStatutes: string[];
    actionRecommendation: string;
  };
  evidenceStrengthSummary: {
    strongCount: number;
    moderateCount: number;
    insufficientCount: number;
    totalSourcesQueried: number;
  };
  sections: {
    ip: ReportSection;
    traditionalKnowledge: ReportSection;
    ayushRegulatory: ReportSection;
    biodiversity: ReportSection;
    international: ReportSection;
  };
  auditTrails: {
    supportedClaimsCount: number;
    requiresReviewCount: number;
    flaggedCount?: number;
    humanAudited: boolean;
    auditedBy?: string;
    auditTimestamp?: string;
  };
}

export interface PipelineStage {
  step: number;
  code: string;
  name: string;
  detail: string;
  status: 'pending' | 'active' | 'completed';
  latencyMs?: number;
  artifactsFound?: number;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  acronym: string;
  category: string;
  domain?: 'IP' | 'Traditional Knowledge' | 'AYUSH' | 'Biodiversity' | 'International';
  jurisdiction: string;
  tier: AuthorityTier;
  authorityTier?: string;
  totalRecords: string;
  lastUpdated: string;
  coverage: string;
  description: string;
  officialUrl?: string;
  keyActs?: string[];
  keyTreatises?: string[];
  status: 'Active Indexed' | 'Synchronized' | 'Direct Gateway' | string;
}
