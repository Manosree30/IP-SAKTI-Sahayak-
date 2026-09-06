import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProcessingPage: React.FC = () => {
  const { setCurrentTab, formulationInput } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(4); // Start around step 4/5

  const steps = [
    { id: 0, label: 'Understanding formulation & claims', status: 'Completed' },
    { id: 1, label: 'Detecting language & vernacular terms', status: 'Completed' },
    { id: 2, label: 'Identifying intent (Patent vs. Regulatory)', status: 'Completed' },
    { id: 3, label: 'Selecting relevant domains (TKDL, AYUSH, NBA)', status: 'Completed' },
    { id: 4, label: 'Searching authoritative sources & gazettes', status: 'Searching' },
    { id: 5, label: 'Reranking statutory evidence & classical texts', status: 'Processing' },
    { id: 6, label: 'Verifying citations & Section 3(p) thresholds', status: 'Verifying' },
    { id: 7, label: 'Generating evidence-backed guidance report', status: 'Synthesizing' },
  ];

  // Advance the steps step-by-step
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          // Navigate to results after brief delay
          setTimeout(() => {
            setCurrentTab('results');
          }, 800);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Retrieval Workflow</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
          Analyzing Your Formulation
        </h1>
        <p className="text-xs sm:text-sm text-[#63483D]">
          Searching relevant IP acts, TKDL prior-art classifications, and AYUSH regulatory gazettes...
        </p>
      </div>

      {/* Main Container: Steps on Left, Detected Info on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Vertical Pipeline Steps (Left) */}
        <div className="md:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-4">
          <h2 className="text-sm font-serif font-bold text-[#3A160F] border-b border-[#EAE0D0] pb-2">
            Intelligence Pipeline Progress
          </h2>

          <div className="space-y-3.5">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-[#8E241C]/8 border border-[#8E241C]/30 text-[#3A160F]' 
                      : isCompleted 
                        ? 'bg-[#F9F5EE] text-[#4A261B]' 
                        : 'opacity-50 text-[#8C6D5F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status icon */}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {isCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-[#2E6B20] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-[#8E241C] text-white flex items-center justify-center">
                          <Loader2 className="w-3 h-3 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-[#C8B294] bg-[#FAF4EB]" />
                      )}
                    </div>

                    <span className={`text-xs sm:text-sm font-medium ${isCurrent ? 'font-semibold text-[#8E241C]' : ''}`}>
                      {step.label}
                    </span>
                  </div>

                  {/* Status badge */}
                  <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    isCompleted 
                      ? 'bg-[#2E6B20]/10 text-[#2E6B20]' 
                      : isCurrent 
                        ? 'bg-[#8E241C]/15 text-[#8E241C] animate-pulse' 
                        : 'text-[#8C6D5F]'
                  }`}>
                    {isCompleted ? 'Completed' : isCurrent ? step.status : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detected Information & Botanical Emblem (Right) */}
        <div className="md:col-span-5 space-y-6">
          {/* Detected Info Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0CFB3] shadow-sm space-y-4">
            <h2 className="text-sm font-serif font-bold text-[#3A160F] border-b border-[#EAE0D0] pb-2">
              Detected Information
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D4]">
                <span className="text-[#8C6D5F]">Product Name</span>
                <span className="font-semibold text-[#3A160F] truncate max-w-[180px]">
                  {formulationInput.productName || 'Herbal Immunity Formulation'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D4]">
                <span className="text-[#8C6D5F]">Detected Language</span>
                <span className="font-semibold text-[#3A160F] bg-[#F6EFE3] px-2 py-0.5 rounded border border-[#E0CFB3]">
                  English (Latin / Botanical)
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#F0E5D4]">
                <span className="text-[#8C6D5F]">Primary Intent</span>
                <span className="font-semibold text-[#8E241C]">
                  Patentability & Regulatory Compliance
                </span>
              </div>

              <div>
                <span className="text-[#8C6D5F] block mb-1.5">Relevant Domains Routed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Patent', 'Traditional Knowledge', 'Biodiversity', 'AYUSH'].map((domain) => (
                    <span
                      key={domain}
                      className="px-2.5 py-0.5 rounded-full bg-[#8E241C]/10 text-[#8E241C] border border-[#8E241C]/25 text-[11px] font-semibold"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Central Animated Botanical Emblem */}
          <div className="bg-gradient-to-br from-[#EFE0C5]/70 to-[#E6D3B3]/40 rounded-3xl p-6 border border-[#D8C2A0] text-center flex flex-col items-center justify-center space-y-3">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#8E241C] animate-spin" style={{ animationDuration: '8s' }} />
              {/* Central golden leaf icon */}
              <div className="w-12 h-12 rounded-full bg-[#FFFDF9] shadow-md flex items-center justify-center border border-[#B8955A]/50">
                <Shield className="w-6 h-6 text-[#8E241C]" />
              </div>
            </div>

            <p className="font-serif text-sm font-bold text-[#3A160F]">
              Synthesizing regulatory evidence...
            </p>
            <p className="text-[11px] text-[#63483D] max-w-xs">
              Cross-referencing Section 3(p) statutory exclusions with classical Samhita and TKDL compendium records.
            </p>

            <button
              onClick={() => setCurrentTab('results')}
              className="mt-2 text-xs text-[#8E241C] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Skip directly to results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
