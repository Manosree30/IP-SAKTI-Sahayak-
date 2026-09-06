import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Shield, 
  Sparkles, 
  RotateCcw, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FormulationInput } from '../types';
import { DEFAULT_FORMULATION } from '../data/mockData';

export const AnalyzeFormulationPage: React.FC = () => {
  const { formulationInput, startFormulationAnalysis } = useApp();
  const [formData, setFormData] = useState<FormulationInput>(formulationInput);

  const dosageOptions = [
    'Standardized Aqueous-Ethanolic Extract Tablet (500mg)',
    'Vegetarian Hard Gelatin Capsule (400mg)',
    'Classical Medicated Taila / Topical Oil (100ml)',
    'Fine Powder / Churna / Granules Sachet',
    'Concentrated Decoction / Kwatha / Syrup',
    'Topical Ointment / Herbal Lepa'
  ];

  const countryOptions = ['India', 'USA', 'European Union', 'United Kingdom', 'Japan', 'Australia', 'UAE', 'Canada'];

  const handleCountryToggle = (c: string) => {
    setFormData(prev => {
      const exists = prev.additionalCountries.includes(c);
      if (exists) {
        return { ...prev, additionalCountries: prev.additionalCountries.filter(x => x !== c) };
      } else {
        return { ...prev, additionalCountries: [...prev.additionalCountries, c] };
      }
    });
  };

  const handleAutofillPreset = (presetType: 'immunity' | 'skincare' | 'digestive') => {
    if (presetType === 'immunity') {
      setFormData(DEFAULT_FORMULATION);
    } else if (presetType === 'skincare') {
      setFormData({
        productName: 'AyurClarify Radiance Serum',
        ingredients: 'Manjistha (Rubia cordifolia), Lodhra (Symplocos racemosa), Red Sandalwood, Aloe Vera Leaf Juice',
        purpose: 'Dermatological blemish clearing, micro-circulation enhancement, Pitta-pacifying',
        claims: 'Antioxidant skin brightening, cellular melanin balancing, non-comedogenic',
        dosageForm: 'Topical Ointment / Herbal Lepa',
        targetCountry: 'India',
        additionalCountries: ['USA', 'European Union'],
        question: 'Can this topical botanical serum be patented in India, and what NBA export permissions are required?'
      });
    } else {
      setFormData({
        productName: 'Digestive Agni Granules',
        ingredients: 'Hing (Ferula foetida), Ajwain, Cumin, Ginger (Zingiber officinale), Saindhava Lavana',
        purpose: 'Digestive fire stimulation (Deepana/Pachana), flatulence alleviation',
        claims: 'Rapid gastric comfort, natural enzymatic support without antacid rebound',
        dosageForm: 'Fine Powder / Churna / Granules Sachet',
        targetCountry: 'India',
        additionalCountries: ['UAE', 'United Kingdom'],
        question: 'What AYUSH Rule 158B licensing category applies to this proprietary churna formulation?'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startFormulationAnalysis(formData);
  };

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E6D3B3] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Formulation Intelligence Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
            Analyze Your Ayurveda Formulation
          </h1>
          <p className="text-xs sm:text-sm text-[#63483D] mt-1 max-w-2xl">
            Tell us about your product and discover potential IP, patentability, TKDL prior art, and AYUSH regulatory considerations.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#8C6D5F] hidden sm:inline">Presets:</span>
          <button
            type="button"
            onClick={() => handleAutofillPreset('immunity')}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#EFE0C5] hover:bg-[#E2C78E] text-[#3A160F] border border-[#D8C2A0] transition-colors"
          >
            Immunity
          </button>
          <button
            type="button"
            onClick={() => handleAutofillPreset('skincare')}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#EFE0C5] hover:bg-[#E2C78E] text-[#3A160F] border border-[#D8C2A0] transition-colors"
          >
            Skincare
          </button>
          <button
            type="button"
            onClick={() => handleAutofillPreset('digestive')}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#EFE0C5] hover:bg-[#E2C78E] text-[#3A160F] border border-[#D8C2A0] transition-colors"
          >
            Digestive
          </button>
        </div>
      </div>

      {/* Main Layout: Form (Left) + Intelligence Overview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6">
          {/* Section 1: Product Information */}
          <div className="space-y-4">
            <h2 className="text-base font-serif font-bold text-[#3A160F] border-b border-[#EAE0D0] pb-2 flex items-center justify-between">
              <span>1. Product Information</span>
              <span className="text-[11px] font-sans font-normal text-[#8C6D5F]">Required details</span>
            </h2>

            <div>
              <label htmlFor="productName" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                Product Name <span className="text-[#8E241C]">*</span>
              </label>
              <input
                id="productName"
                type="text"
                required
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g., Herbal-X / AyurImmune Plus"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                Ingredients (Botanical or Sanskrit names, comma separated) <span className="text-[#8E241C]">*</span>
              </label>
              <textarea
                id="ingredients"
                required
                rows={2}
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="e.g., Ashwagandha (Withania somnifera), Turmeric (Curcuma longa), Neem (Azadirachta indica)"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="purpose" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                  Purpose / Intended Use <span className="text-[#8E241C]">*</span>
                </label>
                <input
                  id="purpose"
                  type="text"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="e.g., Immunity boosting, Anti-inflammatory"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
                />
              </div>

              <div>
                <label htmlFor="claims" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                  Product Claims (Functional assertions)
                </label>
                <input
                  id="claims"
                  type="text"
                  value={formData.claims}
                  onChange={(e) => setFormData({ ...formData, claims: e.target.value })}
                  placeholder="e.g., Synergistic bioavailability, cellular antioxidant"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dosageForm" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                Dosage Form
              </label>
              <select
                id="dosageForm"
                value={formData.dosageForm}
                onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] focus:outline-none focus:border-[#8E241C]"
              >
                {dosageOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Target Market */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-serif font-bold text-[#3A160F] border-b border-[#EAE0D0] pb-2">
              2. Target Market & Jurisdiction
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="targetCountry" className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                  Primary Country
                </label>
                <input
                  id="targetCountry"
                  type="text"
                  value={formData.targetCountry}
                  onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] focus:outline-none focus:border-[#8E241C]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#3A160F] mb-1.5">
                  Additional Target Markets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {countryOptions.filter(c => c !== formData.targetCountry).map((country) => {
                    const isSelected = formData.additionalCountries.includes(country);
                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountryToggle(country)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          isSelected 
                            ? 'bg-[#8E241C] text-[#FFF7EC] border-[#8E241C]' 
                            : 'bg-[#FAF4EB] text-[#3A160F] border-[#D8C2A0] hover:border-[#8E241C]'
                        }`}
                      >
                        {country} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Specific Question */}
          <div className="space-y-2 pt-2">
            <label htmlFor="question" className="block text-xs font-semibold text-[#3A160F]">
              Your Question or Focus Area
            </label>
            <textarea
              id="question"
              rows={3}
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g., Can this formulation be patented and what regulatory requirements should I consider?"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
            />
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 flex items-center justify-between border-t border-[#EAE0D0]">
            <p className="text-[11px] text-[#7A5B4C]">
              Grounds inputs with Patent Act 1970, TKDL prior art, and AYUSH Rule 158B.
            </p>
            <button
              id="submit-formulation-btn"
              type="submit"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8E241C] to-[#6F1D18] hover:from-[#781E17] hover:to-[#591612] text-[#FFF7EC] font-semibold text-sm shadow-[0_4px_16px_rgba(142,36,28,0.35)] hover:shadow-[0_6px_22px_rgba(142,36,28,0.5)] transition-all cursor-pointer"
            >
              <span>Analyze Formulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right Info Box: "AI Analysis Includes" (as in Screen 3 of Reference) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0CFB3] shadow-sm relative overflow-hidden">
            {/* Top gold header line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8E241C] to-[#B8955A]" />

            <h3 className="font-serif text-lg font-bold text-[#3A160F] mb-4 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#8E241C]" />
              <span>AI Analysis Includes</span>
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-[#4A261B]">
              {[
                { title: 'Patent considerations', detail: 'Section 3(p) TK bars & synergy proof' },
                { title: 'Traditional knowledge', detail: 'TKDL slokas & classical compendiums' },
                { title: 'AYUSH regulations', detail: 'Rule 158B, GMP Schedule T & API standards' },
                { title: 'Biodiversity requirements', detail: 'National Biodiversity Authority Section 6' },
                { title: 'International requirements', detail: 'US FDA DSHEA & EU THMPD criteria' },
                { title: 'Source citations', detail: 'Verifiable statutory documents & acts' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#8E241C]/10 text-[#8E241C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#8E241C] stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="font-semibold text-[#3A160F]">{item.title}</strong>
                    <p className="text-[11px] text-[#7A5B4C] leading-snug">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#EAE0D0] flex items-center gap-2 text-[11px] text-[#7A5B4C]">
              <Shield className="w-4 h-4 text-[#8E241C] flex-shrink-0" />
              <span>Your formulation details are analyzed securely in research sandbox mode.</span>
            </div>
          </div>

          {/* Reference quote card */}
          <div className="bg-[#EFE0C5]/60 rounded-2xl p-5 border border-[#D8C2A0] text-xs text-[#523326] space-y-2">
            <p className="font-serif italic font-medium text-[#3A160F]">
              &ldquo;An invention which in effect, is traditional knowledge or an aggregation of known properties of traditionally known component is not patentable.&rdquo;
            </p>
            <p className="text-[10px] text-[#8E241C] font-semibold text-right">
              — Section 3(p), The Indian Patents Act, 1970
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
