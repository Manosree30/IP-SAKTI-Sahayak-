import React, { useEffect, useState } from 'react';
import { Screen, Language } from '../types';
import { translations } from '../i18n/translations';
import { PIPELINE_STAGES } from '../data/mockIntelligenceData';
import { EvidenceThreadBar } from './EvidenceThreadBar';
import { 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ArrowRight, 
  Layers, 
  FileSpreadsheet, 
  ShieldAlert 
} from 'lucide-react';

interface AnalysisProgressViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
  onComplete: () => void;
  investigationTitle?: string;
}

export const AnalysisProgressView: React.FC<AnalysisProgressViewProps> = ({
  setScreen,
  language,
  onComplete,
  investigationTitle = 'Curcuma longa + Boswellia serrata + Zingiber officinale (Herbal-X)',
}) => {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Establishing secure session with AyurGuard Regulatory Intelligence Engine...',
    '[TAXONOMY] Resolving botanical taxa: Curcuma longa L., Boswellia serrata Roxb. ex Colebr., Zingiber officinale Roscoe',
  ]);

  const stepDetails = [
    'Parsing botanical taxonomy, phytochemical descriptors, and claim syntax...',
    'Detecting legal intent: Patentability, Section 3(p) analysis, AYUSH licensing...',
    'Routing to Indian Patent Office Manual, TKDL Prior Art Index, NBA DB, and AYUSH Rule 158B...',
    'Executing lexical and dense vector search across authoritative classical and statutory records...',
    'Fusing BM25 keyword matching with bi-encoder legal embeddings across multilingual corpora...',
    'Cross-encoder scoring for relevance against statutory criteria and classical Ayurvedic indications...',
    'Evaluating source tier (Tier 1 Statutory Acts vs Tier 2 Canon vs Tier 3 Precedent)...',
    'Synthesizing evidence-grounded legal opinion, prior art citations, and risk rating...',
    'Deterministic bi-directional validation linking every assertion to an exact gazette or textual section...',
  ];

  const technicalLogs = [
    '[PARSER] Standardized botanical binomials confirmed. Extract ratio: 500mg standardized.',
    '[INTENT] High-priority patentability hurdle identified: Section 3(p) Traditional Knowledge Bar.',
    '[ROUTING] Connected to: CSIR-TKDL DB, IPO Gazette Archives, NBA Access Gateway, MoAYUSH Portal.',
    '[SEARCH] Querying classical knowledge collections... Matches located in Charaka Samhita & Bhavaprakasha Nighantu.',
    '[HYBRID] Dense embedding retrieval fused with BM25 statutory lookup. 24 high-relevance paragraphs isolated.',
    '[RERANK] Cross-encoder relevance score: 0.941 for anti-inflammatory (Shothahara) prior art anticipation.',
    '[AUTHORITY] Statutory validation: IPO Manual Ch. 3 § 3.14.2 confirmed as Tier 1 Statutory Authority.',
    '[SYNTHESIS] Executive finding generated: Fatal Section 3(p) objection without synergy data; NBA approval mandatory.',
    '[CITATION AUDIT] All 6 claims cross-verified against official gazette text. Citations verified.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 9) {
          const nextStep = prev + 1;
          setLogs((l) => [...l, technicalLogs[nextStep - 1]]);
          return nextStep;
        } else {
          setIsDone(true);
          clearInterval(timer);
          return 9;
        }
      });
    }, 650);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="analysis-progress-view-root" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#8C6D3B] animate-ping"></span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
            PROTOTYPE PIPELINE EXECUTION
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
          {isDone ? 'Investigation Complete: Intelligence Dossier Ready' : 'Synthesizing Regulatory & IP Intelligence Thread'}
        </h1>
        <p className="text-sm font-mono text-[#526058] dark:text-[#BAC7C0] mt-1">
          Subject: <span className="font-bold text-[#173F35] dark:text-[#EFECE6]">{investigationTitle}</span>
        </p>
      </div>

      {/* Signature Design Element: Evidence Thread at work */}
      <EvidenceThreadBar currentStep={currentStep} language={language} variant="detailed" />

      {/* Pipeline Stages Vertical Inspection List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Step Status Breakdown */}
        <div className="lg:col-span-7 border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] tech-box shadow-xs">
          <div className="bg-[#FCFBF7] dark:bg-[#142019] px-4 py-2.5 border-b border-[#E2DDD1] dark:border-[#1E2E25] flex items-center justify-between">
            <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0]">
              PIPELINE STAGE EXECUTION ({currentStep}/09)
            </span>
            <span className="font-mono text-[10px] text-[#8C6D3B] font-bold">
              {isDone ? 'PIPELINE COMPLETE' : 'PROCESSING...'}
            </span>
          </div>

          <div className="divide-y divide-[#EAE5DA] dark:divide-[#1C2C23]">
            {PIPELINE_STAGES.map((st, idx) => {
              const isCompleted = st.step < currentStep || isDone;
              const isCurrent = st.step === currentStep && !isDone;

              return (
                <div
                  key={st.code}
                  className={`p-3.5 flex items-start gap-3 transition-colors ${
                    isCurrent
                      ? 'bg-[#F4EFE6] dark:bg-[#18261F]'
                      : isCompleted
                      ? 'bg-[#FFFFFF] dark:bg-[#0E1712]'
                      : 'opacity-40 bg-[#FFFFFF] dark:bg-[#0E1712]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center font-mono text-xs font-bold ${
                      isCompleted
                        ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310]'
                        : isCurrent
                        ? 'bg-[#8C6D3B] text-[#FAF8F5] animate-pulse'
                        : 'bg-[#F7F5EF] dark:bg-[#1B2921] text-[#7A8780]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : st.code}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-[#173F35] dark:text-[#EFECE6]">
                        {st.step}. {st.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96]">
                        {st.latencyMs}ms
                      </span>
                    </div>
                    <p className="text-xs text-[#526058] dark:text-[#BAC7C0] mt-0.5">
                      {stepDetails[idx]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Columns: Technical Terminal / Telemetry Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#0E1B15] text-[#DCE7E1] font-mono text-xs p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#1E3027] pb-2 mb-3 text-[11px] text-[#8EA397]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#8C6D3B]" />
                <span>EVIDENTIARY TELEMETRY LOG</span>
              </span>
              <span className="text-[10px] text-[#8C6D3B] font-bold">PIPELINE RUN</span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 text-[11px] leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#8C6D3B] select-none font-bold">›</span>
                  <span className="text-[#CAD7D0]">{log}</span>
                </div>
              ))}
              {!isDone && (
                <div className="flex items-center gap-1 text-[#8EA397] animate-pulse">
                  <span>› Executing next citation verification node...</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Trigger once complete */}
          {isDone && (
            <div className="p-4 bg-[#FFFFFF] dark:bg-[#131E18] border border-[#E2DDD1] dark:border-[#273C30] space-y-3 animate-fadeIn shadow-xs">
              <div className="flex items-center gap-2 text-[#173F35] dark:text-[#8CCCA6]">
                <CheckCircle2 className="w-4 h-4 text-[#8C6D3B]" />
                <span className="font-mono text-xs uppercase font-bold">
                  EVIDENCE DOSSIER SYNTHESIZED SUCCESSFULLY
                </span>
              </div>
              <p className="text-xs text-[#526058] dark:text-[#BAC7C0]">
                All 9 stages completed. 6 statutory evidence passages indexed, 4 Tier-1 authorities verified, 1 Section 3(p) prior art conflict flagged.
              </p>
              <button
                type="button"
                onClick={() => {
                  onComplete();
                  setScreen('intelligence_report');
                }}
                className="w-full py-2.5 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#8C6D3B]" />
                <span>Open Intelligence Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
