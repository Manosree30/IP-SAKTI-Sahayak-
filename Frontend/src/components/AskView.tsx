import React, { useState } from 'react';
import { Screen, Language, Domain, ResponsePreference } from '../types';
import { translations } from '../i18n/translations';
import { SAMPLE_QUERIES, KNOWLEDGE_SOURCES } from '../data/mockIntelligenceData';
import { 
  Search, 
  Settings2, 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  Globe, 
  HelpCircle, 
  FileSpreadsheet, 
  Sliders, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface AskViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  responsePref: ResponsePreference;
  setResponsePref: (pref: ResponsePreference) => void;
  initialQuery?: string;
  onExecuteQuery: (query: string, domain: Domain, pref: ResponsePreference, sources: string[]) => void;
}

export const AskView: React.FC<AskViewProps> = ({
  setScreen,
  language,
  setLanguage,
  responsePref,
  setResponsePref,
  initialQuery = '',
  onExecuteQuery,
}) => {
  const t = translations[language];
  const [query, setQuery] = useState(initialQuery || 'Can I patent an Ayurvedic oral tablet containing standardized extracts of Curcuma longa, Boswellia serrata, and Zingiber officinale under Section 3(p) of the Indian Patents Act?');
  const [domain, setDomain] = useState<Domain>('patentability');
  const [selectedSources, setSelectedSources] = useState<string[]>([
    'src-tkdl',
    'src-ayush',
    'src-nba',
    'src-wipo',
    'src-pcimh',
  ]);

  const toggleSource = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      if (selectedSources.length > 1) {
        setSelectedSources(selectedSources.filter((s) => s !== sourceId));
      }
    } else {
      setSelectedSources([...selectedSources, sourceId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onExecuteQuery(query, domain, responsePref, selectedSources);
  };

  return (
    <div id="ask-view-root" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-[#8C6D3B]"></span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
            RESEARCH INSTRUMENT 01
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
          {t.ask.title}
        </h1>
        <p className="text-sm text-[#526058] dark:text-[#BAC7C0] mt-1">
          {t.ask.subtitle}
        </p>
      </div>

      {/* Main Research Instrument Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Large Technical Query Input Area (NOT a round chat bubble!) */}
        <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] focus-within:border-[#173F35] dark:focus-within:border-[#759A84] transition-colors tech-box shadow-xs">
          <div className="bg-[#FCFBF7] dark:bg-[#142019] px-4 py-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>RESEARCH QUESTION &amp; HYPOTHESIS SPECIFICATION</span>
            </span>
            <span className="font-mono text-[11px] text-[#6A7870] dark:text-[#809489]">
              {query.length} chars
            </span>
          </div>

          <div className="p-4">
            <textarea
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.ask.inputPlaceholder}
              className="w-full bg-transparent border-0 text-[#1E2925] dark:text-[#EFECE6] text-base sm:text-lg font-serif placeholder:font-sans placeholder:text-[#8C9A93] dark:placeholder:text-[#52635A] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Integrated Action Strip */}
          <div className="bg-[#FCFBF7] dark:bg-[#111A15] px-4 py-3 border-t border-[#E2DDD1] dark:border-[#1A2820] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#526058] dark:text-[#9FB1A7]">
              <span className="font-mono uppercase font-semibold text-[10px] text-[#8C6D3B]">
                Target Strategy:
              </span>
              <span className="font-mono text-[11px]">
                {domain.toUpperCase()} • {responsePref.toUpperCase()} DEPTH • {selectedSources.length} SOURCES
              </span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
            >
              <span>{t.ask.btnRun}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C6D3B]" />
            </button>
          </div>
        </div>

        {/* Supporting Controls Grid (Sophisticated Compact Technical Interface) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Control 1: Domain Scoping */}
          <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-4 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
              <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#8C6D3B]" />
                {t.ask.domainScope}
              </span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              {[
                { id: 'patentability', label: 'Section 3(p) Patentability' },
                { id: 'traditional_knowledge', label: 'TKDL Classical Canon' },
                { id: 'ayush_regulations', label: 'AYUSH Rule 158B Licensing' },
                { id: 'biodiversity', label: 'NBA § 6 Biological Diversity' },
                { id: 'international', label: 'US FDA DSHEA / EU EMA' },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-2 cursor-pointer transition-colors ${
                    domain === item.id
                      ? 'bg-[#F4EFE6] dark:bg-[#1A2921] font-bold text-[#173F35] dark:text-[#EFECE6] border border-[#DDD7C9] dark:border-[#284234]'
                      : 'hover:bg-[#FCFBF7] dark:hover:bg-[#131F19] text-[#526058] dark:text-[#BAC7C0]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="domain"
                      value={item.id}
                      checked={domain === item.id}
                      onChange={() => setDomain(item.id as Domain)}
                      className="accent-[#173F35] dark:accent-[#759A84]"
                    />
                    <span>{item.label}</span>
                  </div>
                  {domain === item.id && <Check className="w-3.5 h-3.5 text-[#8C6D3B]" />}
                </label>
              ))}
            </div>
          </div>

          {/* Control 2: Response Preference & Language */}
          <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-4 space-y-4 tech-box shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2 mb-2">
                <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  {t.ask.responsePreference}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 font-mono text-xs">
                {(['concise', 'balanced', 'detailed'] as ResponsePreference[]).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setResponsePref(pref)}
                    className={`py-1.5 px-2 text-center border uppercase text-[10px] tracking-wider transition-all ${
                      responsePref === pref
                        ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#526058] dark:text-[#9EB0A6] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF] dark:hover:bg-[#16231C]'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2 mb-2">
                <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  {t.ask.languageOption}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 font-mono text-xs">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'hi', label: 'हिन्दी' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`py-1.5 px-2 text-center border text-[11px] transition-all ${
                      language === lang.code
                        ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] font-bold shadow-xs'
                        : 'bg-[#FFFFFF] text-[#526058] dark:text-[#9EB0A6] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF] dark:hover:bg-[#16231C]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Control 3: Source Scope Ingestion Checkboxes */}
          <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-4 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
              <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8C6D3B]" />
                {t.ask.sourceScope}
              </span>
              <span className="font-mono text-[10px] text-[#8C6D3B] font-bold">
                {selectedSources.length} Active
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono max-h-[170px] overflow-y-auto pr-1">
              {KNOWLEDGE_SOURCES.map((src) => {
                const checked = selectedSources.includes(src.id);
                return (
                  <label
                    key={src.id}
                    className={`flex items-center justify-between p-1.5 border cursor-pointer text-[11px] transition-colors ${
                      checked
                        ? 'bg-[#F4EFE6] dark:bg-[#1B2921] border-[#DDD7C9] dark:border-[#2D4235] text-[#173F35] dark:text-[#EFECE6] font-semibold'
                        : 'border-transparent text-[#6A7870] dark:text-[#7A8C82] hover:bg-[#FCFBF7] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSource(src.id)}
                        className="accent-[#173F35] dark:accent-[#759A84]"
                      />
                      <span>{src.acronym}</span>
                    </div>
                    <span className="text-[10px] text-[#6A7870] dark:text-[#607369]">
                      {src.category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </form>

      {/* Preset Investigative Benchmarks */}
      <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-3 tech-box shadow-xs">
        <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#8C6D3B]" />
          <span>{t.ask.sampleQueriesLabel}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAMPLE_QUERIES.map((sq) => (
            <button
              key={sq.id}
              type="button"
              onClick={() => {
                setQuery(sq.query);
                setDomain(sq.domain as Domain);
              }}
              className="p-3 text-left bg-[#FCFBF7] dark:bg-[#111A15] hover:bg-[#F4EFE6] dark:hover:bg-[#18251E] border border-[#E2DDD1] dark:border-[#1E2D24] transition-colors group shadow-xs"
            >
              <div className="font-serif text-xs font-bold text-[#173F35] dark:text-[#EFECE6] group-hover:text-[#8C6D3B]">
                {sq.title}
              </div>
              <div className="font-mono text-[10px] text-[#6A7870] dark:text-[#8DA096] mt-0.5">
                {sq.lead}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
