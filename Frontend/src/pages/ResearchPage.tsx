import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResearchPage: React.FC = () => {
  const { setCurrentTab, setSelectedDomainKey } = useApp();
  const [activeTab, setActiveTab] = useState<'section3p' | 'rule158b' | 'nba'>('section3p');
  const [plantSearch, setPlantSearch] = useState('Withania somnifera');
  const [plantResult, setPlantResult] = useState<any>({
    botanicalName: 'Withania somnifera (L.) Dunal',
    sanskritName: 'Ashwagandha',
    tkdlReferences: 'Extensively documented across classical Ayurvedic formulations in TKDL',
    classicalTexts: ['Charaka Samhita (Sutra Sthana 4/16)', 'Sushruta Samhita', 'Bhavaprakasha Nighantu'],
    patentPrecedents: 'Section 3(p) objections upheld in Indian Patent Office examination for simple aqueous extracts.',
    nbaStatus: 'Mandatory Section 3/Section 6 approval required for non-Indian entities or foreign IP filing.',
    patentablePathways: 'Extraction solvent selectivity yielding novel, non-obvious withanolide ratios with documented in-vivo synergistic potentiation against specific biomarker pathways.'
  });

  const handlePlantSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantSearch.trim()) return;
    const lower = plantSearch.toLowerCase();
    if (lower.includes('curcuma') || lower.includes('turmeric') || lower.includes('haridra')) {
      setPlantResult({
        botanicalName: 'Curcuma longa L.',
        sanskritName: 'Haridra',
        tkdlReferences: 'Widely documented across Ayurvedic, Unani, and Siddha classical texts in TKDL',
        classicalTexts: ['Charaka Samhita (Lekhaniya Dashemani)', 'Ashtanga Hridaya', 'Dhanvantari Nighantu'],
        patentPrecedents: 'Landmark revocation of US Patent 5,401,504 (wound healing) based on CSIR TKDL prior-art submission.',
        nbaStatus: 'NBA clearance required for commercial utilization by entities with non-Indian shareholding.',
        patentablePathways: 'Novel nanostructured lipid carriers or novel pharmacokinetic bioavailability enhancers demonstrating unpredictable therapeutic synergy.'
      });
    } else if (lower.includes('neem') || lower.includes('azadirachta')) {
      setPlantResult({
        botanicalName: 'Azadirachta indica A. Juss.',
        sanskritName: 'Nimba',
        tkdlReferences: 'Extensive classical formulations documented in Charaka and Sushruta Samhitas',
        classicalTexts: ['Charaka Samhita (Kusthaghna)', 'Sharangadhara Samhita'],
        patentPrecedents: 'European Patent Office (EPO) Patent 436257 revoked following Indian civil society opposition referencing traditional usage.',
        nbaStatus: 'Exempted for normal conventional agricultural cultivation, but regulated for industrial IP applications.',
        patentablePathways: 'Purely synthetic analogs or chemically modified limonoids with proven therapeutic distinction over traditional extracts.'
      });
    } else {
      setPlantResult({
        botanicalName: `${plantSearch} (Botanical query)`,
        sanskritName: 'Classical Botanical Reference',
        tkdlReferences: 'Documented entries in Pharmacopoeial and classical texts',
        classicalTexts: ['Ayurvedic Pharmacopoeia of India (API)', 'Bhavaprakasha'],
        patentPrecedents: 'Subject to Section 3(p) traditional knowledge threshold during Indian Patent Office examination.',
        nbaStatus: 'Biological Diversity Act (BDA) 2002 scrutiny triggered upon international patent filing.',
        patentablePathways: 'Requires quantitative comparative synergy data demonstrating greater-than-additive effect (Section 3(e)).'
      });
    }
  };

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#E6D3B3] pb-6 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Statutory Intelligence & Prior-Art Explorer</span>
          </div>
          <span className="text-[11px] bg-[#EFE0C5] text-[#523326] px-2.5 py-0.5 rounded-full border border-[#D8C2A0] font-sans">
            Prototype Research Reference • Statutory Text Excerpts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
          Ayurveda IP & Regulatory Research
        </h1>
        <p className="text-xs sm:text-sm text-[#63483D]">
          Analyze botanical ingredients against Section 3(p) precedents, classical Samhita citations, and NBA compliance rules.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-[#E6D3B3] pb-2">
        <button
          onClick={() => setActiveTab('section3p')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'section3p'
              ? 'bg-[#8E241C] text-[#FFF7EC]'
              : 'bg-[#FAF4EB] text-[#3A160F] hover:bg-[#EFE0C5]'
          }`}
        >
          Section 3(p) Botanical Prior-Art Checker
        </button>
        <button
          onClick={() => setActiveTab('rule158b')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'rule158b'
              ? 'bg-[#8E241C] text-[#FFF7EC]'
              : 'bg-[#FAF4EB] text-[#3A160F] hover:bg-[#EFE0C5]'
          }`}
        >
          AYUSH Rule 158B Classification Matrix
        </button>
        <button
          onClick={() => setActiveTab('nba')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'nba'
              ? 'bg-[#8E241C] text-[#FFF7EC]'
              : 'bg-[#FAF4EB] text-[#3A160F] hover:bg-[#EFE0C5]'
          }`}
        >
          National Biodiversity Authority (NBA) Pathways
        </button>
      </div>

      {/* Tab Content 1: Botanical Checker */}
      {activeTab === 'section3p' && (
        <div className="space-y-6">
          {/* Search Box */}
          <form onSubmit={handlePlantSearchSubmit} className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
              <input
                type="text"
                value={plantSearch}
                onChange={(e) => setPlantSearch(e.target.value)}
                placeholder="Search botanical or Sanskrit name (e.g., Withania somnifera, Turmeric, Neem)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDF9] border border-[#D8C2A0] rounded-xl text-xs sm:text-sm text-[#2B1A14] focus:outline-none focus:border-[#8E241C]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#8E241C] hover:bg-[#6F1D18] text-[#FFF7EC] text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Analyze Botanical
            </button>
          </form>

          {/* Botanical Analysis Card */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE0D0] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E241C] font-semibold">
                  Botanical Taxon Analysis
                </span>
                <h3 className="font-serif text-xl font-bold text-[#3A160F] italic">
                  {plantResult.botanicalName}
                </h3>
                <span className="text-xs text-[#7A5B4C]">
                  Sanskrit: <strong>{plantResult.sanskritName}</strong>
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold self-start sm:self-center">
                High Traditional Prior-Art Density
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] space-y-1">
                  <span className="font-bold text-[#8E241C] uppercase text-[10px] tracking-wide block">
                    TKDL Compendium Citations
                  </span>
                  <p className="text-sm font-semibold text-[#3A160F]">
                    {plantResult.tkdlReferences}
                  </p>
                  <p className="text-[11px] text-[#7A5B4C] mt-1">
                    Documented in classical texts: {plantResult.classicalTexts.join(', ')}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] space-y-1">
                  <span className="font-bold text-[#8E241C] uppercase text-[10px] tracking-wide block">
                    Historical Patent Office Precedents
                  </span>
                  <p className="text-xs leading-relaxed text-[#4A261B]">
                    {plantResult.patentPrecedents}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] space-y-1">
                  <span className="font-bold text-[#2E6B20] uppercase text-[10px] tracking-wide block">
                    Patentable Inventive Pathways (Section 3(e) / 3(p) Compliance)
                  </span>
                  <p className="text-xs leading-relaxed text-[#2B1A14]">
                    {plantResult.patentablePathways}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3] space-y-1">
                  <span className="font-bold text-[#8E241C] uppercase text-[10px] tracking-wide block">
                    NBA Statutory Clearance Trigger
                  </span>
                  <p className="text-xs leading-relaxed text-[#4A261B]">
                    {plantResult.nbaStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#EAE0D0]">
              <span className="text-xs text-[#7A5B4C]">
                Need to evaluate a complete formulation incorporating this botanical?
              </span>
              <button
                onClick={() => setCurrentTab('analyze')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E241C] hover:underline"
              >
                <span>Launch Full Formulation Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Rule 158B Classification Matrix */}
      {activeTab === 'rule158b' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6">
          <div className="border-b border-[#EAE0D0] pb-4">
            <h3 className="font-serif text-lg font-bold text-[#3A160F]">
              Drugs & Cosmetics Rules, 1945: Rule 158B Regulatory Pathways
            </h3>
            <p className="text-xs text-[#7A5B4C] mt-1">
              Licensing categories for Ayurvedic proprietary medicines vs. classical shastric medicines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-5 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3] space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#8E241C]/10 text-[#8E241C] font-bold text-[10px] uppercase">
                Category I
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3A160F]">Classical (Shastric) Medicines</h4>
              <p className="text-[#63483D] leading-relaxed">
                Formulations manufactured strictly according to recipes described in authoritative books specified in the First Schedule.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#2E6B20]">
                ✓ Safety trials exempt based on traditional textual citation.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3] space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#8E241C]/10 text-[#8E241C] font-bold text-[10px] uppercase">
                Category II
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3A160F]">Ayurvedic Proprietary (Traditional Ingredients)</h4>
              <p className="text-[#63483D] leading-relaxed">
                New combinations of classical ingredients cited in the First Schedule, in identical or modified dosage forms.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#6B4B18]">
                ⚠ Requires published literature safety data and proof of concept.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3] space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#8E241C]/10 text-[#8E241C] font-bold text-[10px] uppercase">
                Category III
              </span>
              <h4 className="font-serif font-bold text-sm text-[#3A160F]">New Phytopharmaceutical Drugs</h4>
              <p className="text-[#63483D] leading-relaxed">
                Purified and standardized fractions of medicinal plants containing characterized bioactive markers.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#8E241C]">
                ❗ Requires Phase I-III clinical trials under CDSCO guidelines.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: NBA Pathways */}
      {activeTab === 'nba' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6">
          <div className="border-b border-[#EAE0D0] pb-4">
            <h3 className="font-serif text-lg font-bold text-[#3A160F]">
              National Biodiversity Authority (NBA) India — Statutory Navigation
            </h3>
            <p className="text-xs text-[#7A5B4C] mt-1">
              Biological Diversity Act, 2002 and Biological Diversity (Amendment) Act, 2023 compliance protocols
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#8E241C] text-[#FFF7EC] flex items-center justify-center font-bold flex-shrink-0">
                §3
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#3A160F]">Section 3: Access to Biological Resources</h4>
                <p className="text-[#523326] mt-1 leading-relaxed">
                  Non-Indian citizens, non-residents, or bodies corporate having non-Indian participation in share capital or management must obtain prior approval of NBA before obtaining biological resources occurring in India.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#8E241C] text-[#FFF7EC] flex items-center justify-center font-bold flex-shrink-0">
                §6
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#3A160F]">Section 6: Application for Intellectual Property Rights</h4>
                <p className="text-[#523326] mt-1 leading-relaxed">
                  No person shall apply for any patent or other form of IP protection in India or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining prior approval of NBA (Form III).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
