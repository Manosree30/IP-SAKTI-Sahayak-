import React, { useState } from 'react';
import { Screen, Language, IntelligenceReport, EvidenceItem, ResponsePreference } from '../types';
import { translations } from '../i18n/translations';
import { EvidenceCard } from './EvidenceCard';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Share2, 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  Globe2, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

interface IntelligenceReportViewProps {
  report: IntelligenceReport;
  setScreen: (screen: Screen) => void;
  language: Language;
  onAuditItem?: (item: EvidenceItem) => void;
  responsePref: ResponsePreference;
  setResponsePref: (pref: ResponsePreference) => void;
}

export const IntelligenceReportView: React.FC<IntelligenceReportViewProps> = ({
  report,
  setScreen,
  language,
  onAuditItem,
  responsePref,
  setResponsePref,
}) => {
  const t = translations[language];
  const [activeSectionFilter, setActiveSectionFilter] = useState<'all' | 'ip' | 'tk' | 'ayush' | 'biodiversity' | 'intl'>('all');

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${report.id}_AyurGuard_Dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="intelligence-report-root" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Dossier Header & Official Gazette Reference Band */}
      <div className="border-gazette pb-6 space-y-4">
        {/* Gazette Classification Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider uppercase">
              {t.report.officialDossierId}: {report.id}
            </span>
            <span className="text-[#C8C0AF] dark:text-[#283830]">·</span>
            <span className="text-[#526058] dark:text-[#8D9E96]">
              FILED: {new Date(report.timestamp).toUTCString()}
            </span>
            <span className="text-[#C8C0AF] dark:text-[#283830]">·</span>
            <span className="text-[#8C6D3B] font-bold">EVIDENCE REVIEW ACTIVE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1 text-xs font-mono font-bold bg-[#FFFFFF] dark:bg-[#142018] text-[#173F35] dark:text-[#9ECBB0] border border-[#DDD7C9] dark:border-[#25392D] hover:bg-[#F7F5EF] dark:hover:bg-[#1C2C22] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>{t.common.exportPdf}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-1 text-xs font-mono font-bold bg-[#FFFFFF] dark:bg-[#142018] text-[#173F35] dark:text-[#9ECBB0] border border-[#DDD7C9] dark:border-[#25392D] hover:bg-[#F7F5EF] dark:hover:bg-[#1C2C22] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>{t.common.exportJson}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F35] dark:text-[#F5F2ED] leading-tight tracking-tight">
            {report.title}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#526058] dark:text-[#BAC7C0] mt-1.5 flex items-center gap-2">
            <span className="uppercase text-[#8C6D3B] font-bold tracking-wider">SUBJECT FORMULATION:</span>
            <span className="font-bold text-[#173F35] dark:text-[#EFECE6] bg-[#FCFBF7] dark:bg-[#16241C] px-2 py-0.5 border border-[#E2DDD1] dark:border-[#263D2E]">
              {report.queryOrProduct}
            </span>
          </p>
        </div>

        {/* Product Details Bar if available */}
        {report.productDetails && (
          <div className="p-3.5 bg-[#FFFFFF] dark:bg-[#121D17] border border-[#E2DDD1] dark:border-[#1E2D24] text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#85978E] font-bold block">Dosage Form</span>
              <span className="font-serif font-bold text-[#173F35] dark:text-[#EFECE6] text-sm mt-0.5 block">{report.productDetails.dosageForm}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#85978E] font-bold block">Target Jurisdiction</span>
              <span className="font-serif font-bold text-[#173F35] dark:text-[#EFECE6] text-sm mt-0.5 block">{report.productDetails.targetCountry}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#6A7870] dark:text-[#85978E] font-bold block">Statutory Risk</span>
              <span className="font-mono font-bold text-[#9B2C2C] dark:text-[#F19292] text-sm mt-0.5 block">{report.executiveFinding.riskLevel}</span>
            </div>
          </div>
        )}
      </div>

      {/* 01. EXECUTIVE FINDING & STATUTORY VERDICT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#24352C] pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold text-[#8C6D3B]">SECTION 01 //</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.report.executiveFinding}
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#FFF5F5] text-[#9B2C2C] dark:bg-[#2B1414] dark:text-[#F39191] border border-[#FED7D7] dark:border-[#522525] font-bold">
            {report.executiveFinding.riskLevel}
          </span>
        </div>

        <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-5 sm:p-6 space-y-4 tech-box shadow-xs">
          <div className="border-l-3 border-[#9B2C2C] pl-4 py-1">
            <div className="font-mono text-[9px] uppercase tracking-widest font-bold text-[#9B2C2C] dark:text-[#F19292]">
              BINDING STATUTORY VERDICT
            </div>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#173F35] dark:text-[#EFECE6] mt-1 leading-snug">
              "{report.executiveFinding.verdict}"
            </p>
          </div>

          <p className="text-sm text-[#1E2925] dark:text-[#C8D4CE] leading-relaxed font-sans">
            {report.executiveFinding.summary}
          </p>

          <div className="p-4 bg-[#FCFBF7] dark:bg-[#142019] border border-[#E2DDD1] dark:border-[#1E2E25] space-y-2 text-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>STATUTORY ACTION RECOMMENDATION</span>
            </div>
            <p className="text-[#4A5750] dark:text-[#D5DDD8] leading-relaxed font-sans text-xs">
              {report.executiveFinding.actionRecommendation}
            </p>
          </div>

          {/* Primary Statutes */}
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-[#6A7870] dark:text-[#85978E] block mb-1.5">
              {t.report.primaryStatutesQueried}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {report.executiveFinding.primaryStatutes.map((statute, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono font-semibold bg-[#FCFBF7] dark:bg-[#15221B] border border-[#DDD7C9] dark:border-[#23352A] text-[#173F35] dark:text-[#DCE5E0]"
                >
                  {statute}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02. EVIDENCE STRENGTH DISTRIBUTION MATRIX */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#24352C] pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 02</span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.report.evidenceStrengthBreakdown}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setScreen('evidence_audit')}
            className="font-mono text-xs text-[#173F35] dark:text-[#8DA998] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Launch Citation Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-[#BDD7C7] dark:border-[#224D38] bg-[#F2F7F4] dark:bg-[#163325]/40 p-4 shadow-xs">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#173F35] dark:text-[#9ECBB0]">{t.common.strong}</span>
              <span className="text-base font-bold text-[#173F35] dark:text-[#9ECBB0]">
                {report.evidenceStrengthSummary.strongCount} Records
              </span>
            </div>
            <p className="text-[11px] text-[#4A5750] dark:text-[#9FB1A7] mt-1">
              Tier 1 Statutory Statutes (Patents Act, Biological Diversity Act, Drugs &amp; Cosmetics Rules) &amp; Codified Canon.
            </p>
          </div>

          <div className="border border-[#E7D6B7] dark:border-[#524122] bg-[#FAF6EE] dark:bg-[#2A2315]/40 p-4 shadow-xs">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#8C6D3B] dark:text-[#E8CA89]">{t.common.moderate}</span>
              <span className="text-base font-bold text-[#8C6D3B] dark:text-[#E8CA89]">
                {report.evidenceStrengthSummary.moderateCount} Record
              </span>
            </div>
            <p className="text-[11px] text-[#5C4D30] dark:text-[#BFAF8B] mt-1">
              Secondary guidelines, peer monographs, and transitional directive standards (EMA HMPC).
            </p>
          </div>

          <div className="border border-[#EEC8C8] dark:border-[#552525] bg-[#FFF5F5] dark:bg-[#2B1414]/40 p-4 shadow-xs">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#9B2C2C] dark:text-[#EFA8A8]">{t.common.insufficient}</span>
              <span className="text-base font-bold text-[#9B2C2C] dark:text-[#EFA8A8]">
                {report.evidenceStrengthSummary.insufficientCount} Records
              </span>
            </div>
            <p className="text-[11px] text-[#783838] dark:text-[#B69696] mt-1">
              Zero unverified claims detected. All assertions have documented authority references.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2DDD1] dark:border-[#24352C] font-mono text-xs">
        <span className="text-[#6A7870] dark:text-[#85978E] mr-2 text-[10px] uppercase font-bold">Filter By Domain:</span>
        {[
          { id: 'all', label: 'All 5 Domains' },
          { id: 'ip', label: '03. IP & Patents Act § 3(p)' },
          { id: 'tk', label: '04. TKDL Canon' },
          { id: 'ayush', label: '05. AYUSH Rule 158B' },
          { id: 'biodiversity', label: '06. Biodiversity NBA § 6' },
          { id: 'intl', label: '07. International (FDA / EMA)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSectionFilter(tab.id as any)}
            className={`px-3 py-1 text-xs border whitespace-nowrap transition-colors ${
              activeSectionFilter === tab.id
                ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] font-bold shadow-xs'
                : 'bg-[#FFFFFF] dark:bg-[#0E1712] text-[#4A5750] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF] shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 03. INTELLECTUAL PROPERTY SECTION */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'ip') && (
        <section className="space-y-4">
          <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 03</span>
              <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#8C6D3B]" />
                {t.report.ipSection}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#9B2C2C] dark:text-[#F19292]">
              {report.sections.ip.legalRisk}
            </span>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] p-5 border border-[#E2DDD1] dark:border-[#24352C] space-y-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Investigated Claim</span>
              <p className="text-sm font-semibold text-[#173F35] dark:text-[#EFECE6] mt-0.5">
                {report.sections.ip.claim}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Statutory Finding</span>
              <p className="text-xs sm:text-sm text-[#4A5750] dark:text-[#C5D2CB] leading-relaxed mt-0.5">
                {report.sections.ip.finding}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.sections.ip.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} language={language} onAuditClick={onAuditItem} />
            ))}
          </div>
        </section>
      )}

      {/* 04. TRADITIONAL KNOWLEDGE (TKDL) SECTION */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'tk') && (
        <section className="space-y-4">
          <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 04</span>
              <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8C6D3B]" />
                {t.report.tkSection}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#9B2C2C] dark:text-[#F19292]">
              {report.sections.traditionalKnowledge.legalRisk}
            </span>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] p-5 border border-[#E2DDD1] dark:border-[#24352C] space-y-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Investigated Claim</span>
              <p className="text-sm font-semibold text-[#173F35] dark:text-[#EFECE6] mt-0.5">
                {report.sections.traditionalKnowledge.claim}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Statutory Finding</span>
              <p className="text-xs sm:text-sm text-[#4A5750] dark:text-[#C5D2CB] leading-relaxed mt-0.5">
                {report.sections.traditionalKnowledge.finding}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.sections.traditionalKnowledge.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} language={language} onAuditClick={onAuditItem} />
            ))}
          </div>
        </section>
      )}

      {/* 05. AYUSH REGULATORY FRAMEWORK SECTION */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'ayush') && (
        <section className="space-y-4">
          <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 05</span>
              <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C6D3B]" />
                {t.report.ayushSection}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#8C6D3B]">
              {report.sections.ayushRegulatory.legalRisk}
            </span>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] p-5 border border-[#E2DDD1] dark:border-[#24352C] space-y-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Investigated Claim</span>
              <p className="text-sm font-semibold text-[#173F35] dark:text-[#EFECE6] mt-0.5">
                {report.sections.ayushRegulatory.claim}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Statutory Finding</span>
              <p className="text-xs sm:text-sm text-[#4A5750] dark:text-[#C5D2CB] leading-relaxed mt-0.5">
                {report.sections.ayushRegulatory.finding}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.sections.ayushRegulatory.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} language={language} onAuditClick={onAuditItem} />
            ))}
          </div>
        </section>
      )}

      {/* 06. BIODIVERSITY SECTION */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'biodiversity') && (
        <section className="space-y-4">
          <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 06</span>
              <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#8C6D3B]" />
                {t.report.biodiversitySection}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#9B2C2C] dark:text-[#F19292]">
              {report.sections.biodiversity.legalRisk}
            </span>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] p-5 border border-[#E2DDD1] dark:border-[#24352C] space-y-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Investigated Claim</span>
              <p className="text-sm font-semibold text-[#173F35] dark:text-[#EFECE6] mt-0.5">
                {report.sections.biodiversity.claim}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Statutory Finding</span>
              <p className="text-xs sm:text-sm text-[#4A5750] dark:text-[#C5D2CB] leading-relaxed mt-0.5">
                {report.sections.biodiversity.finding}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.sections.biodiversity.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} language={language} onAuditClick={onAuditItem} />
            ))}
          </div>
        </section>
      )}

      {/* 07. INTERNATIONAL HARMONIZATION SECTION */}
      {(activeSectionFilter === 'all' || activeSectionFilter === 'intl') && (
        <section className="space-y-4">
          <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#8C6D3B]">SECTION 07</span>
              <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#8C6D3B]" />
                {t.report.internationalSection}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#8C6D3B]">
              {report.sections.international.legalRisk}
            </span>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] p-5 border border-[#E2DDD1] dark:border-[#24352C] space-y-3 tech-box shadow-xs">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Investigated Claim</span>
              <p className="text-sm font-semibold text-[#173F35] dark:text-[#EFECE6] mt-0.5">
                {report.sections.international.claim}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] font-bold">Statutory Finding</span>
              <p className="text-xs sm:text-sm text-[#4A5750] dark:text-[#C5D2CB] leading-relaxed mt-0.5">
                {report.sections.international.finding}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.sections.international.evidence.map((ev) => (
              <EvidenceCard key={ev.id} evidence={ev} language={language} onAuditClick={onAuditItem} />
            ))}
          </div>
        </section>
      )}

      {/* Regulatory Evidence Review & Verification Sign-Off */}
      <div className="p-5 border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#121B16] flex flex-col sm:flex-row sm:items-center justify-between gap-4 tech-box shadow-xs">
        <div>
          <div className="font-mono text-[11px] uppercase font-bold text-[#173F35] dark:text-[#8DA998] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#173F35] dark:text-[#6FD89C]" />
            <span>{t.report.humanAuditedLabel}</span>
          </div>
          <p className="text-xs text-[#526058] dark:text-[#BAC7C0] mt-1 font-mono">
            Sign-off: {report.auditTrails.auditedBy} • Verified: {report.auditTrails.auditTimestamp}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScreen('evidence_audit')}
          className="px-4 py-2 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold hover:bg-[#102E26] dark:hover:bg-[#8AB09A] transition-colors shrink-0 shadow-xs"
        >
          Inspect Audit Trails →
        </button>
      </div>
    </div>
  );
};
