import React from 'react';
import { PIPELINE_STAGES } from '../data/mockIntelligenceData';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface EvidenceThreadBarProps {
  currentStep?: number; // 1 to 9, or undefined (meaning all complete / static overview)
  interactive?: boolean;
  onStepClick?: (step: number) => void;
  language: Language;
  variant?: 'compact' | 'detailed' | 'hero';
}

export const EvidenceThreadBar: React.FC<EvidenceThreadBarProps> = ({
  currentStep = 9,
  interactive = false,
  onStepClick,
  language,
  variant = 'detailed',
}) => {
  const t = translations[language];

  const getStageTitle = (idx: number) => {
    switch (idx) {
      case 0: return t.pipeline.s1;
      case 1: return t.pipeline.s2;
      case 2: return t.pipeline.s3;
      case 3: return t.pipeline.s4;
      case 4: return t.pipeline.s5;
      case 5: return t.pipeline.s6;
      case 6: return t.pipeline.s7;
      case 7: return t.pipeline.s8;
      case 8: return t.pipeline.s9;
      default: return '';
    }
  };

  if (variant === 'hero') {
    return (
      <div id="evidence-thread-hero" className="w-full border-y border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#121C17]/60 py-4 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E2DDD1] dark:border-[#1E2D24]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#8C6D3B] animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#8DA998]">
                {t.pipeline.pipelineTitle}
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#6A7870] dark:text-[#A8B5AE]">
              <span>EVIDENCE &amp; CITATION VERIFICATION PIPELINE</span>
            </div>
          </div>

          {/* Desktop/Tablet Thread */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px] grid grid-cols-9 gap-1 relative">
              {/* Connecting thread line */}
              <div className="absolute top-[13px] left-3 right-3 h-[1.5px] bg-[#E2DDD1] dark:bg-[#253A30] z-0" />
              
              {PIPELINE_STAGES.map((st, idx) => {
                const isPassed = st.step <= currentStep;
                const isCurrent = st.step === currentStep;

                return (
                  <div
                    key={st.code}
                    onClick={() => interactive && onStepClick?.(st.step)}
                    className={`relative z-10 flex flex-col items-center text-center transition-all ${
                      interactive ? 'cursor-pointer hover:opacity-80' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-none flex items-center justify-center font-mono text-[11px] font-bold border transition-all ${
                        isCurrent
                          ? 'bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] ring-2 ring-[#8C6D3B]/40 shadow-xs'
                          : isPassed
                          ? 'bg-[#FCFBF7] dark:bg-[#1B2922] text-[#173F35] dark:text-[#A8B5AE] border-[#DDD7C9] dark:border-[#2D4537]'
                          : 'bg-[#FFFFFF] dark:bg-[#0C1310] text-[#9EA8A2] dark:text-[#4A5D53] border-[#EAE5DA] dark:border-[#1E2D24]'
                      }`}
                    >
                      {st.code}
                    </div>
                    <span className="mt-2 text-[11px] font-medium leading-tight text-[#1E2925] dark:text-[#D5DDD8] line-clamp-2 px-0.5">
                      {getStageTitle(idx)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="evidence-thread-bar" className="w-full border-b border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FCFBF7] dark:bg-[#101914] px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-3 bg-[#8C6D3B]"></div>
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#8DA998]">
            {t.pipeline.pipelineTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {PIPELINE_STAGES.map((st, idx) => {
            const isPassed = st.step <= currentStep;
            const isCurrent = st.step === currentStep;

            return (
              <React.Fragment key={st.code}>
                <button
                  type="button"
                  onClick={() => interactive && onStepClick?.(st.step)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-none text-left transition-all border shrink-0 ${
                    isCurrent
                      ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] font-bold shadow-xs'
                      : isPassed
                      ? 'bg-[#FFFFFF] text-[#1E2925] dark:bg-[#1B2922] dark:text-[#D5DDD8] border-[#DDD7C9] dark:border-[#273B30]'
                      : 'bg-transparent text-[#7F8F87] dark:text-[#4A5D53] border-transparent'
                  } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="font-mono text-[10px] font-bold opacity-80">{st.code}</span>
                  <span className="text-[11px] font-medium whitespace-nowrap">{getStageTitle(idx)}</span>
                </button>

                {idx < PIPELINE_STAGES.length - 1 && (
                  <span className="text-[#C8C0B2] dark:text-[#2E4237] text-xs select-none">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
