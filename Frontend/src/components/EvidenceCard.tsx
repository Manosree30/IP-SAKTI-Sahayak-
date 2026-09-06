import React, { useState } from 'react';
import { EvidenceItem, Language } from '../types';
import { translations } from '../i18n/translations';
import { ShieldCheck, AlertCircle, FileText, CheckCircle2, ChevronDown, ChevronUp, Scale, Bookmark } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  language: Language;
  onAuditClick?: (item: EvidenceItem) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  language,
  onAuditClick,
}) => {
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const getStrengthBadge = (strength: EvidenceItem['evidenceStrength']) => {
    switch (strength) {
      case 'Strong':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#E4EDE7] text-[#13402A] dark:bg-[#163325] dark:text-[#9ECBB0] border border-[#BDD7C7] dark:border-[#224D38]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A633F] dark:bg-[#6FD89C]"></span>
            {t.common.strong}
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#F8F2E6] text-[#7A581F] dark:bg-[#2A2315] dark:text-[#E8CA89] border border-[#E7D6B7] dark:border-[#524122]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A68244]"></span>
            {t.common.moderate}
          </span>
        );
      case 'Insufficient':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#FBEBEB] text-[#7D2424] dark:bg-[#2B1414] dark:text-[#EFA8A8] border border-[#EEC8C8] dark:border-[#552525]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B33939]"></span>
            {t.common.insufficient}
          </span>
        );
    }
  };

  const getStatusBadge = (status: EvidenceItem['verificationStatus']) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#185337] dark:text-[#8CCCA6] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.common.verified}
          </span>
        );
      case 'Requires Review':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8C6418] dark:text-[#E4BF6D] font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.common.requiresReview}
          </span>
        );
      case 'Flagged Discrepancy':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#992222] dark:text-[#F39191] font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.common.flagged}
          </span>
        );
    }
  };

  return (
    <div
      id={`evidence-item-${evidence.id}`}
      className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] transition-colors hover:border-[#8C6D3B] dark:hover:border-[#3E5C49] tech-box shadow-xs"
    >
      {/* Formal Docket Header: Metadata Bar */}
      <div className="bg-[#FCFBF7] dark:bg-[#142018] px-4 py-2.5 border-b border-[#E8E3D8] dark:border-[#1E2E25] flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#8C6D3B]" />
            <span>RECORD // {evidence.id.toUpperCase()}</span>
          </span>
          <span className="text-[#C8C0AF] dark:text-[#2A3F33] text-xs">|</span>
          <span className="text-xs font-mono font-semibold text-[#4A5750] dark:text-[#BAC7C0]">
            {evidence.source}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {getStrengthBadge(evidence.evidenceStrength)}
          {getStatusBadge(evidence.verificationStatus)}
        </div>
      </div>

      {/* Main Archival Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Step 1: CLAIM */}
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#6A7870] dark:text-[#85978E] font-bold mb-1">
            <span>01. CLAIM // ASSERTION</span>
          </div>
          <p className="text-sm font-semibold text-[#1E2925] dark:text-[#E8ECE9] leading-snug font-sans bg-[#FCFBF7] dark:bg-[#121B16] p-3 border border-[#E2DDD1] dark:border-[#1E2E25]">
            {evidence.claim}
          </p>
        </div>

        {/* Step 2: EVIDENCE PASSAGE */}
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0] mb-1 font-bold">
            <span className="text-[#8C6D3B]">↓</span>
            <FileText className="w-3 h-3 text-[#8C6D3B]" />
            <span>02. VERBATIM STATUTORY EXTRACT / CLASSICAL VERSE</span>
          </div>
          <div className="relative pl-4 border-l-3 border-[#173F35] dark:border-[#759A84] py-2 bg-[#F7F5EF] dark:bg-[#15201A]/50 pr-3">
            <blockquote className="text-sm italic font-serif text-[#1E2925] dark:text-[#C5D0CB] leading-relaxed">
              "{evidence.evidencePassage}"
            </blockquote>
          </div>
        </div>

        {/* Step 3: SOURCE TRACE (SOURCE -> DOCUMENT -> SECTION) */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8C6D3B] font-bold">
            <span>↓</span>
            <span>03. STATUTORY SOURCE TRACE: SOURCE → DOCUMENT → SECTION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs bg-[#FCFBF7] dark:bg-[#111A15] p-3 border border-[#E2DDD1] dark:border-[#1C2B22]">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold">
                SOURCE
              </div>
              <div className="font-serif font-bold text-xs text-[#173F35] dark:text-[#EFECE6] mt-0.5 truncate">
                {evidence.source}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold">
                {t.common.document}
              </div>
              <div className="font-mono text-xs font-semibold text-[#173F35] dark:text-[#9ECBB0] mt-0.5 truncate">
                {evidence.document}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold">
                {t.common.section}
              </div>
              <div className="font-mono text-xs font-semibold text-[#8C6D3B] mt-0.5 truncate">
                {evidence.section}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Epistemic Reasoning & Assessment */}
        <div className="text-xs text-[#4A5750] dark:text-[#9FB0A7] flex items-start gap-2.5 bg-[#FAF8F3] dark:bg-[#111914] p-3 border border-[#E2DDD1] dark:border-[#1E2A22]">
          <ShieldCheck className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-bold text-[#173F35] dark:text-[#9ECBB0] mr-1.5 uppercase text-[9px] tracking-wider block">
              EVIDENTIARY REASONING &amp; QUALITATIVE STRENGTH:
            </span>
            <span className="leading-relaxed font-sans text-xs">
              {evidence.confidenceReasoning}
            </span>
          </div>
        </div>

        {/* Optional Expanded Metadata */}
        {expanded && (
          <div className="pt-3.5 border-t border-[#E8E3D8] dark:border-[#1F2F26] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FCFBF7] dark:bg-[#101813] p-3">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold block">
                {t.common.statutoryTier}
              </span>
              <span className="font-mono font-semibold text-[#173F35] dark:text-[#D5DDD8]">
                {evidence.authorityTier}
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold block">
                {t.common.jurisdiction}
              </span>
              <span className="font-mono font-semibold text-[#173F35] dark:text-[#D5DDD8]">
                {evidence.jurisdiction}
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold block">
                {t.common.date}
              </span>
              <span className="font-mono text-[#173F35] dark:text-[#D5DDD8]">
                {evidence.verifiedDate}
              </span>
            </div>
            {evidence.auditNotes && (
              <div className="sm:col-span-3 bg-[#FAF8F3] dark:bg-[#1E1B13] p-2.5 border border-[#E2DDD1] dark:border-[#3D3320] text-[#8C6D3B] dark:text-[#DFBD76]">
                <span className="font-mono uppercase font-bold text-[9px] mr-1">Statutory Audit Advisory:</span>
                <span className="text-xs">{evidence.auditNotes}</span>
              </div>
            )}
          </div>
        )}

        {/* Card Actions Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D8] dark:border-[#192720]">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#526058] dark:text-[#90A298] hover:text-[#173F35] dark:hover:text-[#9ECBB0] transition-colors"
          >
            {expanded ? (
              <>
                <span>COLLAPSE METADATA</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>INSPECT STATUTORY METADATA</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {onAuditClick && (
            <button
              type="button"
              onClick={() => onAuditClick(evidence)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 text-[#173F35] dark:text-[#9ECBB0] hover:bg-[#F7F5EF] dark:hover:bg-[#192720] border border-[#DDD7C9] dark:border-[#273B30] transition-colors shadow-xs"
            >
              <Bookmark className="w-3 h-3 text-[#8C6D3B]" />
              <span>{t.common.auditCitation}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
