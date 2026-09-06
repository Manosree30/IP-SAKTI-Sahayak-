import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  Building2, 
  Leaf, 
  Globe, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DomainAnalysis } from '../types';

export const ResultsPage: React.FC = () => {
  const { 
    currentAnalysis, 
    setCurrentTab, 
    setSelectedDomainKey, 
    saveAnalysis,
    savedAnalyses 
  } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInspectDomain = (domainKey: string) => {
    setSelectedDomainKey(domainKey);
    setCurrentTab('detailed');
  };

  const handleSaveToArchive = () => {
    saveAnalysis(currentAnalysis);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const isAlreadySaved = savedAnalyses.some(a => a.id === currentAnalysis.id);

  const domainIcons: Record<string, any> = {
    patent: ShieldAlert,
    tk: BookOpen,
    ayush: Building2,
    biodiversity: Leaf,
    international: Globe
  };

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Product Info */}
      <div className="border-b border-[#E6D3B3] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#8E241C] bg-[#8E241C]/10 px-2.5 py-0.5 rounded-full border border-[#8E241C]/20">
              Intelligence Dossier
            </span>
            <span className="text-xs text-[#8C6D5F]">
              Analyzed just now • Formulation ID: #{currentAnalysis.id.slice(-6)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
            Analysis Results: <span className="text-[#8E241C]">{currentAnalysis.productName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#63483D] mt-1">
            Ingredients: {currentAnalysis.ingredients.join(', ')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <button
            onClick={handleSaveToArchive}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              savedSuccess || isAlreadySaved
                ? 'bg-[#2E6B20]/10 text-[#2E6B20] border-[#2E6B20]/40'
                : 'bg-[#FFFDF9] text-[#3A160F] border-[#D8C2A0] hover:border-[#8E241C]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Saved to Archive!' : isAlreadySaved ? 'Saved in Archive' : 'Save Analysis'}</span>
          </button>

          <button
            onClick={() => handleInspectDomain('patent')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8E241C] hover:bg-[#6F1D18] text-[#FFF7EC] text-xs font-semibold shadow-sm transition-colors"
          >
            <span>View Detailed Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* AI Assessment Overall Card (as in Screen 5 of Reference) */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#E0CFB3] shadow-sm space-y-4 relative overflow-hidden">
        {/* Accent top ribbon */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8E241C] via-[#B8955A] to-[#4A2117]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-[#3A160F]">
              AI Assessment
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE0C5] text-[#8E241C] text-xs font-semibold border border-[#D8C2A0]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#8E241C]" />
              <span>{currentAnalysis.overallStatus}</span>
            </div>
          </div>

          <div className="text-xs text-[#8C6D5F] flex items-center gap-1.5">
            <span>Overall Evidence Strength:</span>
            <span className="font-semibold text-[#3A160F] bg-[#F6EFE3] px-2 py-0.5 rounded border border-[#E0CFB3]">
              {currentAnalysis.overallConfidence}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#3A160F] font-serif leading-relaxed">
          &ldquo;{currentAnalysis.overallFinding}&rdquo;
        </p>

        {/* Cautious Language Regulatory Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] flex items-start gap-2.5 text-xs text-[#7A5B4C]">
          <Info className="w-4 h-4 text-[#8E241C] flex-shrink-0 mt-0.5" />
          <span>
            <strong>Statutory Disclaimer:</strong> This analysis provides decision-support and academic prior-art guidance grounded in statutory acts (Indian Patents Act 1970, Biological Diversity Act 2002, AYUSH notifications). It does not constitute formal legal counsel or guaranteed patent grant certification.
          </span>
        </div>
      </div>

      {/* 5 Domain Result Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-[#3A160F]">
            Domain Breakdown & Findings
          </h2>
          <span className="text-xs text-[#8C6D5F]">
            5 intelligence vectors evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.entries(currentAnalysis.domains) as [string, DomainAnalysis][]).map(([key, domain]) => {
            const Icon = domainIcons[key] || ShieldAlert;
            return (
              <div
                key={domain.id}
                className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E0CFB3] hover:border-[#8E241C] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F6EFE3] text-[#8E241C] flex items-center justify-center border border-[#D8C2A0]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#8E241C]/10 text-[#8E241C] border border-[#8E241C]/20">
                      {domain.status}
                    </span>
                  </div>

                  {/* Title & Evidence Strength */}
                  <h3 className="text-base font-serif font-bold text-[#3A160F]">
                    {domain.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8C6D5F]">
                    <span>{domain.sourceCount} Authoritative Sources</span>
                    <span>•</span>
                    <span className="text-[#8E241C] font-semibold">{domain.evidenceStrength} Evidence</span>
                  </div>

                  {/* Finding text */}
                  <p className="text-xs text-[#523326] mt-3 leading-relaxed">
                    {domain.finding}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-[#F0E5D4] flex items-center justify-between">
                  <span className="text-[11px] text-[#7A5B4C]">
                    Inspect statutory citations
                  </span>
                  <button
                    id={`view-analysis-${key}`}
                    onClick={() => handleInspectDomain(key)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8E241C] hover:text-[#5C1611] transition-colors cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
