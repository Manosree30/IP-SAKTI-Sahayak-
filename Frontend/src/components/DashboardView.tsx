import React from 'react';
import { Screen, Language, IntelligenceReport } from '../types';
import { translations } from '../i18n/translations';
import { KNOWLEDGE_SOURCES, SAMPLE_QUERIES } from '../data/mockIntelligenceData';
import { 
  ArrowRight, 
  FlaskConical, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Scale, 
  ShieldCheck, 
  Database,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
  onSelectReport: (reportId: string) => void;
  onSelectQuery: (queryText: string) => void;
  activeDossier: IntelligenceReport;
  allDossiers: IntelligenceReport[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setScreen,
  language,
  onSelectReport,
  onSelectQuery,
  activeDossier,
  allDossiers,
}) => {
  const t = translations[language];

  return (
    <div id="dashboard-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Workspace Editorial Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
              INSTITUTIONAL REGULATORY &amp; IP WORKSPACE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#173F35] dark:text-[#EFECE6] leading-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4A5750] dark:text-[#BAC7C0] mt-1.5 max-w-3xl leading-relaxed">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setScreen('ask')}
            className="px-4 py-2 bg-[#FFFFFF] dark:bg-[#121B16] text-[#173F35] dark:text-[#8DA998] font-mono text-xs font-bold border border-[#DDD7C9] dark:border-[#25392D] hover:bg-[#F7F5EF] dark:hover:bg-[#18271F] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#8C6D3B]" />
            <span>{t.nav.ask}</span>
          </button>

          <button
            type="button"
            onClick={() => setScreen('product_analysis')}
            className="px-4 py-2 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs font-bold transition-colors flex items-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t.dashboard.quickStart}</span>
          </button>
        </div>
      </div>

      {/* Institutional Statutory Exposure Ledger - Crisp Light Research Surface */}
      <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] tech-box shadow-xs">
        <div className="bg-[#FCFBF7] dark:bg-[#142018] px-5 py-2.5 border-b border-[#E8E3D8] dark:border-[#1E2E25] flex flex-wrap items-center justify-between text-[10px] font-mono text-[#526058] dark:text-[#8D9E95]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#8C6D3B]"></span>
            <span className="font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider uppercase">
              STATUTORY EXPOSURE &amp; JURISDICTIONAL COMPLIANCE LEDGER
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#6A7870] dark:text-[#8D9E95]">
            <span>REGISTRY CYCLE: ACTIVE FY-2026</span>
            <span className="hidden sm:inline">|</span>
            <span>VERIFICATION STANDARD: CITATION VERIFICATION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E3D8] dark:divide-[#1E2E25]">
          {/* Column 1: Active Dossiers */}
          <div className="p-5 space-y-2 bg-[#FFFFFF] dark:bg-[#0E1612]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#6A7870] dark:text-[#889B90] tracking-wider">
                [LEDGER-01: REGISTRY]
              </span>
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#8C6D3B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#173F35] dark:text-[#EFECE6] leading-none">
              {allDossiers.length} <span className="font-mono text-xs font-normal text-[#6A7870] dark:text-[#8E9F95]">Active Dossiers</span>
            </div>
            <div className="text-[11px] font-mono text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 bg-[#173F35] dark:bg-[#6FD89C]"></span>
              <span className="font-semibold">Pipeline Verified Citations</span>
            </div>
          </div>

          {/* Column 2: Section 3(p) Risk Bar */}
          <div className="p-5 space-y-2 bg-[#FFFDFD] dark:bg-[#1C1212]/40">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#9B2C2C] dark:text-[#F39191] tracking-wider">
                [STATUTE-3(p): PRIOR ART]
              </span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#9B2C2C] dark:text-[#F39191]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#9B2C2C] dark:text-[#F39191] leading-none">
              Section 3(p) <span className="font-mono text-xs font-normal text-[#9B2C2C]/80 dark:text-[#F39191]/80">Anticipation</span>
            </div>
            <div className="text-[11px] font-mono text-[#526058] dark:text-[#A7B8AF] pt-1">
              TKDL Citations: Charaka / Bhavaprakasha
            </div>
          </div>

          {/* Column 3: National Biodiversity Authority */}
          <div className="p-5 space-y-2 bg-[#FFFFFF] dark:bg-[#0E1612]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#8C6D3B] dark:text-[#E0BE7B] tracking-wider">
                [TREATY-NBA: BIO-GATEWAY]
              </span>
              <Scale className="w-3.5 h-3.5 text-[#8C6D3B]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#173F35] dark:text-[#EFECE6] leading-none">
              Form III <span className="font-mono text-xs font-normal text-[#6A7870] dark:text-[#8E9F95]">Approval Bar</span>
            </div>
            <div className="text-[11px] font-mono text-[#526058] dark:text-[#A7B8AF] pt-1">
              Mandatory NBA § 6 Foreign Filing
            </div>
          </div>

          {/* Column 4: AYUSH Regulatory Track */}
          <div className="p-5 space-y-2 bg-[#FFFFFF] dark:bg-[#0E1612]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#173F35] dark:text-[#8DA998] tracking-wider">
                [REGULATORY: AYUSH 158B]
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#173F35] dark:text-[#8DA998]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#173F35] dark:text-[#EFECE6] leading-none">
              Rule 158B(ii) <span className="font-mono text-xs font-normal text-[#6A7870] dark:text-[#8E9F95]">License</span>
            </div>
            <div className="text-[11px] font-mono text-[#526058] dark:text-[#A7B8AF] pt-1">
              Proprietary ASU Medicine Pathway
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Active Investigations & Evidence Health Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Active Investigations & Recent Queries Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Investigations Table - Large White Research Surface */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] tech-box shadow-xs">
            <div className="px-5 py-3.5 bg-[#FCFBF7] dark:bg-[#142018] border-b border-[#E8E3D8] dark:border-[#1E2E25] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#8C6D3B]" />
                <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#9ECBB0]">
                  {t.dashboard.activeDossiers}
                </h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6A7870] dark:text-[#8D9E95]">
                {allDossiers.length} FORMAL REGISTRATIONS ON FILE
              </span>
            </div>

            <div className="divide-y divide-[#EFEBE1] dark:divide-[#1C2C23]">
              {allDossiers.map((dossier) => (
                <div
                  key={dossier.id}
                  className="p-5 hover:bg-[#FAF8F3] dark:hover:bg-[#121E17] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#8C6D3B] px-2 py-0.5 bg-[#FAF8F3] dark:bg-[#1C261E] border border-[#E2DDD1] dark:border-[#2F4436]">
                        {dossier.id}
                      </span>
                      <span className="text-[#C8C0AF] dark:text-[#283830]">·</span>
                      <span className="font-mono text-[10px] text-[#526058] dark:text-[#8D9E96]">
                        FILED: {new Date(dossier.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-[#C8C0AF] dark:text-[#283830]">·</span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${
                          dossier.executiveFinding.riskLevel === 'Critical Prior Art Conflict'
                            ? 'bg-[#FDF2F2] text-[#9B2C2C] border-[#F8D7D7] dark:bg-[#2B1414] dark:text-[#F39191] dark:border-[#522525]'
                            : 'bg-[#FEFBF2] text-[#8C6D3B] border-[#F3E3C3] dark:bg-[#2B2313] dark:text-[#E8CA89] dark:border-[#4B3919]'
                        }`}
                      >
                        § 3(p): {dossier.executiveFinding.riskLevel}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#173F35] dark:text-[#EFECE6] leading-snug">
                      {dossier.title}
                    </h3>
                    <p className="text-xs text-[#4A5750] dark:text-[#BAC7C0] line-clamp-2 leading-relaxed font-sans">
                      {dossier.executiveFinding.summary}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-[#526058] dark:text-[#8E9F96]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#173F35] dark:text-[#6FD89C]" />
                        <span className="font-medium">{dossier.evidenceStrengthSummary?.totalSourcesQueried ?? 6} Primary Treaties Checked</span>
                      </span>
                      <span>•</span>
                      <span>AYUSH Rule 158B(ii) Validated</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectReport(dossier.id);
                        setScreen('intelligence_report');
                      }}
                      className="px-4 py-2 bg-[#FFFFFF] dark:bg-[#15201A] text-[#173F35] dark:text-[#9ECBB0] font-mono text-xs font-bold border border-[#DDD7C9] dark:border-[#293E31] hover:bg-[#173F35] hover:text-white dark:hover:bg-[#1D2F25] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{t.common.viewReport}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Investigative Benchmarks / Recent Queries - Crisp White Surface */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] tech-box shadow-xs">
            <div className="px-5 py-3.5 bg-[#FCFBF7] dark:bg-[#142018] border-b border-[#E8E3D8] dark:border-[#1E2E25] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#8C6D3B]" />
                <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#9ECBB0]">
                  {t.dashboard.recentQueries}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setScreen('ask')}
                className="font-mono text-[11px] text-[#173F35] dark:text-[#9ECBB0] font-bold hover:underline"
              >
                Launch Research Instrument →
              </button>
            </div>

            <div className="divide-y divide-[#EFEBE1] dark:divide-[#1C2C23]">
              {SAMPLE_QUERIES.map((sq) => (
                <div
                  key={sq.id}
                  className="p-4 hover:bg-[#FAF8F3] dark:hover:bg-[#121E17] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#6A7870] dark:text-[#8D9E96]">
                        [{sq.domain.replace('_', ' ').toUpperCase()}]
                      </span>
                    </div>
                    <div className="font-serif text-base font-semibold text-[#173F35] dark:text-[#EFECE6]">
                      {sq.title}
                    </div>
                    <p className="text-xs text-[#526058] dark:text-[#BAC7C0] italic font-serif">
                      "{sq.query}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectQuery(sq.query);
                      setScreen('ask');
                    }}
                    className="shrink-0 px-3.5 py-1.5 text-xs font-mono font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FFFFFF] dark:bg-[#142018] hover:bg-[#173F35] hover:text-white dark:hover:bg-[#1B2921] border border-[#DDD7C9] dark:border-[#25392D] transition-colors shadow-xs"
                  >
                    RUN QUERY
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Evidence Health Matrix & Statutory Source Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Evidence Health Matrix - Clean White Surface */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1E2E25] pb-3">
              <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C6D3B]" />
                {t.dashboard.evidenceHealth}
              </span>
              <span className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96]">
                ACTIVE DOSSIER
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1.5">
                  <span className="text-[#173F35] dark:text-[#9ECBB0] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#173F35]"></span>
                    Strong Evidence (Tier 1 Statutory / Classical Canon)
                  </span>
                  <span className="font-bold text-[#173F35] dark:text-[#EFECE6]">
                    {activeDossier.evidenceStrengthSummary.strongCount} Citations
                  </span>
                </div>
                <div className="w-full bg-[#EFEBE1] dark:bg-[#1E2C24] h-2">
                  <div className="bg-[#173F35] h-2" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1.5">
                  <span className="text-[#8C6D3B] dark:text-[#E8CA89] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8C6D3B]"></span>
                    Moderate Evidence (Secondary Guidance / In-Vitro)
                  </span>
                  <span className="font-bold text-[#8C6D3B] dark:text-[#EFECE6]">
                    {activeDossier.evidenceStrengthSummary.moderateCount} Citations
                  </span>
                </div>
                <div className="w-full bg-[#EFEBE1] dark:bg-[#1E2C24] h-2">
                  <div className="bg-[#8C6D3B] h-2" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1.5">
                  <span className="text-[#9B2C2C] dark:text-[#EFA8A8] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#9B2C2C]"></span>
                    Insufficient (Unsubstantiated / Lacks Statute)
                  </span>
                  <span className="font-bold text-[#9B2C2C] dark:text-[#EFECE6]">
                    {activeDossier.evidenceStrengthSummary.insufficientCount} Citations
                  </span>
                </div>
                <div className="w-full bg-[#EFEBE1] dark:bg-[#1E2C24] h-2">
                  <div className="bg-[#9B2C2C] h-2" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8E3D8] dark:border-[#1E2E25]">
              <button
                type="button"
                onClick={() => setScreen('evidence_audit')}
                className="w-full py-2.5 bg-[#FCFBF7] dark:bg-[#15201A] hover:bg-[#173F35] hover:text-white dark:hover:bg-[#1C2C22] text-[#173F35] dark:text-[#8DA998] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#DDD7C9] dark:border-[#273B30] shadow-xs"
              >
                <span>{t.nav.evidenceAudit}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Statutory Source Activity - Clean White Surface */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-5 space-y-4 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1E2E25] pb-3">
              <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998] flex items-center gap-2">
                <Database className="w-4 h-4 text-[#8C6D3B]" />
                {t.dashboard.sourceActivity}
              </span>
              <button
                type="button"
                onClick={() => setScreen('sources')}
                className="font-mono text-[10px] text-[#8C6D3B] font-bold hover:underline"
              >
                Archive →
              </button>
            </div>

            <div className="space-y-3">
              {KNOWLEDGE_SOURCES.slice(0, 4).map((src) => (
                <div key={src.id} className="text-xs space-y-0.5 pb-2.5 border-b border-[#EFEBE1] dark:border-[#1A2820] last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#173F35] dark:text-[#EFECE6]">
                      {src.acronym}
                    </span>
                    <span className="font-mono text-[10px] text-[#173F35] dark:text-[#6FD89C] font-semibold">
                      {src.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#526058] dark:text-[#90A298]">
                    {src.totalRecords}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
