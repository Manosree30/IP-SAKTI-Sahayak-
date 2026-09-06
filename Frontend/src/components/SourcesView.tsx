import React, { useState } from 'react';
import { Screen, Language } from '../types';
import { translations } from '../i18n/translations';
import { KNOWLEDGE_SOURCES } from '../data/mockIntelligenceData';
import { 
  Archive, 
  ExternalLink, 
  Database, 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  Globe2, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface SourcesViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
}

export const SourcesView: React.FC<SourcesViewProps> = ({
  setScreen,
  language,
}) => {
  const t = translations[language];
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = ['All', 'IP', 'Traditional Knowledge', 'AYUSH', 'Biodiversity', 'International'];

  const filteredSources = KNOWLEDGE_SOURCES.filter((src) => {
    const matchesDomain = selectedDomain === 'All' || src.domain === selectedDomain;
    const matchesSearch = 
      src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (src.domain || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div id="sources-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
              AUTHORITATIVE REPOSITORY CORPUS
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
            {t.sources.title}
          </h1>
          <p className="text-sm text-[#526058] dark:text-[#BAC7C0] mt-1 max-w-2xl">
            {t.sources.subtitle}
          </p>
        </div>

        <div className="font-mono text-xs text-[#6A7870] dark:text-[#8D9E96]">
          Corpus Coverage: <span className="font-bold text-[#173F35] dark:text-[#EFECE6]">5 Knowledge Domains</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1">
          {domains.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1 border whitespace-nowrap transition-colors ${
                selectedDomain === dom
                  ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] font-bold shadow-xs'
                  : 'bg-[#FFFFFF] dark:bg-[#0E1712] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-[#6A7870] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter source name, act, or domain..."
            className="w-full bg-[#FFFFFF] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] pl-8 pr-3 py-1.5 text-xs text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35]"
          />
        </div>
      </div>

      {/* Sources Grid: High-density, authoritative institutional cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] flex flex-col justify-between hover:border-[#8C6D3B] transition-colors tech-box shadow-xs"
          >
            <div>
              {/* Header Strip */}
              <div className="bg-[#FCFBF7] dark:bg-[#142019] px-4 py-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider">
                  {src.acronym}
                </span>
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-[#FFFFFF] dark:bg-[#0E1712] text-[#13402A] dark:text-[#8CCCA6] border border-[#C8DFD2] dark:border-[#224D38] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#8C6D3B]" />
                  {src.status}
                </span>
              </div>

              {/* Main Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#173F35] dark:text-[#EFECE6] leading-snug">
                    {src.name}
                  </h3>
                  <span className="font-mono text-[10px] text-[#8C6D3B] uppercase tracking-wider block mt-0.5 font-bold">
                    {src.domain || src.category} • {src.jurisdiction}
                  </span>
                </div>

                <p className="text-xs text-[#526058] dark:text-[#BAC7C0] leading-relaxed">
                  {src.description}
                </p>

                {/* Sub-Repositories / Treatises */}
                {src.keyTreatises && (
                  <div className="pt-2 border-t border-[#EAE5DA] dark:border-[#1A2820]">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#6A7870] dark:text-[#85978E] block mb-1">
                      Classical Treatises &amp; Sub-Corpora
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {src.keyTreatises.map((tr, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 text-[10px] font-mono bg-[#F7F5EF] dark:bg-[#15221B] border border-[#E2DDD1] dark:border-[#22352A] text-[#173F35] dark:text-[#BAC7C0]"
                        >
                          {tr}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions & Metadata Bar */}
            <div className="p-3 bg-[#FCFBF7] dark:bg-[#111A15] border-t border-[#E2DDD1] dark:border-[#1A2820] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6A7870] dark:text-[#8D9E96]">
                <span className="text-[#173F35] dark:text-[#EFECE6] font-semibold">{src.totalRecords}</span>
                <span>{src.authorityTier || src.tier}</span>
              </div>

              <div className="pt-1.5 border-t border-[#EAE5DA] dark:border-[#1B2921] flex items-center justify-between">
                {src.officialUrl ? (
                  <a
                    href={src.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#173F35] dark:text-[#8DD4A9] hover:text-[#8C6D3B] transition-colors"
                  >
                    <span>Open Official Source ↗</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-[#7A8880] dark:text-[#7D8F86]">
                    Official source link not configured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
