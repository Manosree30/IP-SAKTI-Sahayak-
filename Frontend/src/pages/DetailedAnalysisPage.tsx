import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  Building2, 
  Leaf, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CitationItem } from '../types';

export const DetailedAnalysisPage: React.FC = () => {
  const { 
    currentAnalysis, 
    selectedDomainKey, 
    setSelectedDomainKey, 
    setCurrentTab,
    selectedDomain 
  } = useApp();

  const [activeCitationModal, setActiveCitationModal] = useState<CitationItem | null>(null);

  const domainTabs = [
    { key: 'patent', label: 'Patent', icon: ShieldAlert },
    { key: 'tk', label: 'Traditional Knowledge', icon: BookOpen },
    { key: 'ayush', label: 'AYUSH Regulation', icon: Building2 },
    { key: 'biodiversity', label: 'Biodiversity', icon: Leaf },
    { key: 'international', label: 'International', icon: Globe },
  ];

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header with Back Button and Breadcrumb */}
      <div className="border-b border-[#E6D3B3] pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentTab('results')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8E241C] hover:text-[#5C1611] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results Overview</span>
          </button>

          <span className="text-xs text-[#8C6D5F]">
            Product: <strong className="text-[#3A160F]">{currentAnalysis.productName}</strong>
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
            Detailed Analysis & Authoritative Evidence
          </h1>
          <p className="text-xs sm:text-sm text-[#63483D] mt-1">
            Examine statutory acts, classical slokas, and regulatory guidelines grounding each domain assessment.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {domainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedDomainKey === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                onClick={() => setSelectedDomainKey(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#8E241C] text-[#FFF7EC] shadow-sm'
                    : 'bg-[#FFFDF9] text-[#523326] border border-[#E0CFB3] hover:border-[#8E241C]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-Column Layout: Left (AI Guidance) | Right (Evidence & Citations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: AI Guidance */}
        <div className="lg:col-span-6 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#8E241C]/10 text-[#8E241C] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#8E241C]" />
              </div>
              <h2 className="font-serif text-lg font-bold text-[#3A160F]">
                AI Guidance — {selectedDomain.title}
              </h2>
            </div>
            <span className="text-[10px] font-semibold bg-[#8E241C]/10 text-[#8E241C] px-2.5 py-1 rounded-full">
              {selectedDomain.status}
            </span>
          </div>

          {/* Key Finding */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E241C] block">
              Key Finding
            </span>
            <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] text-sm text-[#3A160F] font-serif leading-relaxed">
              {selectedDomain.finding}
            </div>
          </div>

          {/* Why This Matters */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A160F] block">
              Why This Matters
            </span>
            <p className="text-xs sm:text-sm text-[#523326] leading-relaxed">
              {selectedDomain.whyThisMatters}
            </p>
          </div>

          {/* Recommended Checks */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A160F] block">
              Recommended Checks
            </span>
            <ul className="space-y-2">
              {selectedDomain.recommendedChecks.map((check, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A261B]">
                  <div className="w-4 h-4 rounded-full bg-[#2E6B20]/15 text-[#2E6B20] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B20]" />
                  </div>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="space-y-2 pt-2 border-t border-[#EAE0D0]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A160F] block">
              Next Action Steps
            </span>
            <div className="space-y-2">
              {selectedDomain.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#523326] p-2.5 rounded-xl bg-[#FAF4EB] border border-[#E8DEC8]">
                  <span className="w-5 h-5 rounded-full bg-[#8E241C] text-[#FFF7EC] font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence & Citations */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2E6B20]/10 text-[#2E6B20] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#2E6B20]" />
                </div>
                <h2 className="font-serif text-lg font-bold text-[#3A160F]">
                  Evidence & Citations
                </h2>
              </div>
              <span className="text-xs text-[#8C6D5F]">
                {selectedDomain.citations.length} Authoritative Citations
              </span>
            </div>

            {/* List of Citation Cards */}
            <div className="space-y-4">
              {selectedDomain.citations.map((citation) => (
                <div
                  key={citation.id}
                  className="bg-[#FAF4EB] rounded-2xl p-5 border border-[#E0CFB3] space-y-3 shadow-xs"
                >
                  {/* Top: Authority & Badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-serif text-[#8E241C]">
                          {citation.authority}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2E6B20]/10 text-[#2E6B20] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Statutory Citation</span>
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#3A160F] mt-0.5">
                        {citation.document}
                      </h4>
                      <p className="text-[11px] text-[#8C6D5F]">
                        {citation.section} • {citation.type}
                      </p>
                    </div>

                    <span className="text-[10px] font-semibold bg-[#EFE0C5] text-[#3A160F] px-2 py-1 rounded border border-[#D8C2A0]">
                      {citation.evidenceStrength}
                    </span>
                  </div>

                  {/* Exact Quoted Passage */}
                  <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E6D8C3] text-xs text-[#3A160F] font-serif italic leading-relaxed">
                    {citation.evidencePassage}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveCitationModal(citation)}
                      className="text-xs font-semibold text-[#8E241C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Inspect Statute Extract</span>
                    </button>

                    {citation.url ? (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3A160F] hover:text-[#8E241C] transition-colors"
                      >
                        <span>Open Official Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#8C6D5F] italic">
                        Reference in archival repository
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual distinction note */}
          <div className="p-4 rounded-2xl bg-[#EFE0C5]/70 border border-[#D8C2A0] flex items-center gap-3 text-xs text-[#523326]">
            <Info className="w-4 h-4 text-[#8E241C] flex-shrink-0" />
            <p>
              <strong>Methodology Distinction:</strong> The left panel presents AI synthesized strategic interpretation. The right panel contains unaltered text excerpts from gazettes, classical Samhitas, and statutory records.
            </p>
          </div>
        </div>
      </div>

      {/* Citation Detail Modal */}
      {activeCitationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF4EB] rounded-3xl max-w-lg w-full p-6 border border-[#B8955A] shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-[#E6D3B3] pb-3">
              <div>
                <span className="text-xs font-bold text-[#8E241C] uppercase tracking-wider">
                  {activeCitationModal.authority}
                </span>
                <h3 className="font-serif text-base font-bold text-[#3A160F]">
                  {activeCitationModal.document}
                </h3>
              </div>
              <button
                onClick={() => setActiveCitationModal(null)}
                className="text-xs font-bold text-[#8C6D5F] hover:text-[#3A160F] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4A261B]">
              <div>
                <strong className="block text-[#8C6D5F]">Section / Reference:</strong>
                <span>{activeCitationModal.section}</span>
              </div>
              <div>
                <strong className="block text-[#8C6D5F]">Official Statute Extract:</strong>
                <p className="mt-1 p-3 rounded-xl bg-[#FFFDF9] border border-[#D8C2A0] font-serif italic text-sm text-[#2B1A14]">
                  {activeCitationModal.evidencePassage}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#2E6B20] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Authoritative Corpus
                </span>
                {activeCitationModal.url && (
                  <a
                    href={activeCitationModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8E241C] text-[#FFF7EC] text-xs font-semibold"
                  >
                    <span>Open Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
