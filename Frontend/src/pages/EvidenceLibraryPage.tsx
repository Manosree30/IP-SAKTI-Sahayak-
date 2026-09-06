import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  ShieldAlert, 
  Building2, 
  Leaf, 
  Globe 
} from 'lucide-react';
import { INITIAL_EVIDENCE_DOCUMENTS } from '../data/mockData';
import { EvidenceDocument } from '../types';

export const EvidenceLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [authorityFilter, setAuthorityFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<EvidenceDocument | null>(null);

  const filteredDocs = useMemo(() => {
    return INITIAL_EVIDENCE_DOCUMENTS.filter((doc) => {
      const matchSearch = 
        doc.documentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keySections.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDomain = domainFilter === 'All' || doc.domain === domainFilter;
      const matchAuthority = authorityFilter === 'All' || doc.authority.includes(authorityFilter);
      const matchCountry = countryFilter === 'All' || doc.country === countryFilter;

      return matchSearch && matchDomain && matchAuthority && matchCountry;
    });
  }, [searchQuery, domainFilter, authorityFilter, countryFilter]);

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E6D3B3] pb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Statutory Evidence Corpus</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
          Evidence Library
        </h1>
        <p className="text-xs sm:text-sm text-[#63483D]">
          Search authoritative Indian patent acts, TKDL prior-art classifications, and Ministry of Ayush regulatory gazettes.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0CFB3] shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations, patents, traditional knowledge..."
            className="w-full pl-11 pr-4 py-3 bg-[#FAF4EB] border border-[#D8C2A0] rounded-2xl text-xs sm:text-sm text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
          />
        </div>

        {/* Filter dropdowns row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-[#8C6D5F] mb-1">Domain</label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl px-3 py-2 text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
            >
              <option value="All">All Domains</option>
              <option value="Patent">Patent</option>
              <option value="Traditional Knowledge">Traditional Knowledge</option>
              <option value="AYUSH Regulation">AYUSH Regulation</option>
              <option value="Biodiversity">Biodiversity</option>
              <option value="International">International</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#8C6D5F] mb-1">Authority</label>
            <select
              value={authorityFilter}
              onChange={(e) => setAuthorityFilter(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl px-3 py-2 text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
            >
              <option value="All">All Authorities</option>
              <option value="IP India">IP India</option>
              <option value="Ministry of AYUSH">Ministry of AYUSH</option>
              <option value="TKDL">TKDL</option>
              <option value="National Biodiversity Authority">NBA India</option>
              <option value="WIPO">WIPO</option>
              <option value="PCIM&H">PCIM&H</option>
              <option value="WHO">WHO</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#8C6D5F] mb-1">Country / Scope</label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl px-3 py-2 text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
            >
              <option value="All">All Jurisdictions</option>
              <option value="India">India</option>
              <option value="International">International</option>
              <option value="Global">Global</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setDomainFilter('All');
                setAuthorityFilter('All');
                setCountryFilter('All');
              }}
              className="w-full py-2 px-3 text-xs text-[#8E241C] hover:bg-[#8E241C]/10 border border-[#8E241C]/30 rounded-xl transition-colors font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table of Evidence Records */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#E0CFB3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F6EFE3] text-[#3A160F] font-serif border-b border-[#E0CFB3]">
                <th className="py-3.5 px-4 font-bold">Authority</th>
                <th className="py-3.5 px-4 font-bold">Document Title</th>
                <th className="py-3.5 px-4 font-bold">Domain</th>
                <th className="py-3.5 px-4 font-bold">Jurisdiction</th>
                <th className="py-3.5 px-4 font-bold">Last Updated</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE0D0] text-[#4A261B]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8C6D5F]">
                    No evidence documents matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#FAF4EB] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#8E241C] whitespace-nowrap">
                      {doc.authority}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#3A160F]">{doc.documentTitle}</div>
                      <div className="text-[10px] text-[#8C6D5F] line-clamp-1 mt-0.5">{doc.keySections}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#EFE0C5] text-[#3A160F] font-medium text-[11px] whitespace-nowrap">
                        {doc.domain}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#63483D]">
                      {doc.country}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#8C6D5F]">
                      {doc.lastUpdated}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-2.5 py-1 bg-[#EFE0C5] hover:bg-[#E2C78E] text-[#3A160F] rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        View Evidence
                      </button>
                      {doc.sourceUrl ? (
                        <a
                          href={doc.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#8E241C] hover:underline font-semibold"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[#8C6D5F] text-[11px] italic">Archived</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FAF4EB] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#B8955A] shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-[#E6D3B3] pb-3">
              <div>
                <span className="text-xs font-bold text-[#8E241C] uppercase tracking-wider">
                  {selectedDoc.authority} • {selectedDoc.domain}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#3A160F] mt-0.5">
                  {selectedDoc.documentTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-sm font-bold text-[#8C6D5F] hover:text-[#3A160F] p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4A261B]">
              <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#D8C2A0] space-y-1">
                <strong className="block text-[#8E241C] text-[11px] uppercase tracking-wide">
                  Statutory Summary & Rule Provisions
                </strong>
                <p className="text-xs leading-relaxed text-[#3A160F]">
                  {selectedDoc.description}
                </p>
              </div>

              <div>
                <strong className="block text-[#8C6D5F] mb-1">Key Relevant Sections:</strong>
                <p className="p-2.5 rounded-lg bg-[#FAF4EB] border border-[#E6D8C3] font-mono text-[11px] text-[#3A160F]">
                  {selectedDoc.keySections}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E6D3B3]">
                <span className="text-[11px] text-[#2E6B20] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Authoritative Record
                </span>
                <a
                  href={selectedDoc.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8E241C] text-[#FFF7EC] text-xs font-semibold"
                >
                  <span>Open Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
