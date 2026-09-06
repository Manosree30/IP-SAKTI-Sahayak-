import React, { useState } from 'react';
import { Screen, Language, IntelligenceReport } from '../types';
import { translations } from '../i18n/translations';
import { 
  FlaskConical, 
  Scale, 
  Globe2, 
  FileCheck2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Sparkles 
} from 'lucide-react';

interface ProductAnalysisViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
  onLaunchInvestigation: (details: {
    productName: string;
    ingredients: string;
    purpose: string;
    dosageForm: string;
    targetCountry: string;
  }) => void;
}

export const ProductAnalysisView: React.FC<ProductAnalysisViewProps> = ({
  setScreen,
  language,
  onLaunchInvestigation,
}) => {
  const t = translations[language];

  const [productName, setProductName] = useState('Herbal-X Anti-Inflammatory Complex');
  const [ingredients, setIngredients] = useState('Turmeric (Curcuma longa - Haridra), Boswellia (Boswellia serrata - Shallaki), Ginger (Zingiber officinale - Shunthi)');
  const [purpose, setPurpose] = useState('Anti-inflammatory relief for joint discomfort, cartilage protection, and reduction of inflammatory cytokines (TNF-α, IL-6)');
  const [dosageForm, setDosageForm] = useState('Oral Film-Coated Tablet (500mg standardized extract)');
  const [targetCountry, setTargetCountry] = useState('India (Primary AYUSH / Patent Office) & United States (US FDA DSHEA)');

  const handleFillDemo = () => {
    setProductName('Herbal-X Anti-Inflammatory Complex');
    setIngredients('Turmeric (Curcuma longa - Haridra), Boswellia (Boswellia serrata - Shallaki), Ginger (Zingiber officinale - Shunthi)');
    setPurpose('Anti-inflammatory relief for joint discomfort, cartilage protection, and reduction of inflammatory cytokines (TNF-α, IL-6)');
    setDosageForm('Oral Film-Coated Tablet (500mg standardized extract)');
    setTargetCountry('India (Primary AYUSH / Patent Office) & United States (US FDA DSHEA)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLaunchInvestigation({
      productName,
      ingredients,
      purpose,
      dosageForm,
      targetCountry,
    });
  };

  return (
    <div id="product-analysis-view-root" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
              FLAGSHIP REGULATORY INTAKE
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
            {t.productAnalysis.title}
          </h1>
          <p className="text-sm text-[#526058] dark:text-[#BAC7C0] mt-1">
            {t.productAnalysis.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillDemo}
          className="px-3 py-1.5 bg-[#FFFFFF] dark:bg-[#15221B] text-[#173F35] dark:text-[#8DA998] font-mono text-xs font-semibold border border-[#DDD7C9] dark:border-[#263C2E] hover:bg-[#F7F5EF] dark:hover:bg-[#1D3025] transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D3B]" />
          <span>{t.productAnalysis.form.btnFillDemo}</span>
        </button>
      </div>

      {/* Investigation Intake Form Container */}
      <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] tech-box shadow-xs">
        {/* Form Title Banner */}
        <div className="bg-[#FCFBF7] dark:bg-[#142019] px-6 py-3 border-b border-[#E2DDD1] dark:border-[#1E2E25] flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#8C6D3B]" />
            <span>FORMULAR INVESTIGATION DOSSIER INTAKE</span>
          </span>
          <span className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96]">
            STATUTORY COMPLIANCE CHECKLIST
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Field 1: Product Name */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider font-semibold text-[#173F35] dark:text-[#8DA998] mb-1.5">
              01. {t.productAnalysis.form.productName}
            </label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder={t.productAnalysis.form.productNamePlaceholder}
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] px-4 py-2.5 text-sm text-[#1E2925] dark:text-[#EFECE6] font-medium focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
            />
          </div>

          {/* Field 2: Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-mono text-xs uppercase tracking-wider font-semibold text-[#173F35] dark:text-[#8DA998]">
                02. {t.productAnalysis.form.ingredients}
              </label>
              <span className="text-[11px] font-mono text-[#6A7870] dark:text-[#809489]">
                Botanical Binomials Advised
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={t.productAnalysis.form.ingredientsPlaceholder}
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] p-3 text-sm text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84] leading-relaxed"
            />
          </div>

          {/* Field 3: Purpose / Health Claim */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider font-semibold text-[#173F35] dark:text-[#8DA998] mb-1.5">
              03. {t.productAnalysis.form.purpose}
            </label>
            <textarea
              rows={2}
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder={t.productAnalysis.form.purposePlaceholder}
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] p-3 text-sm text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84] leading-relaxed"
            />
          </div>

          {/* Split Row: Dosage Form & Target Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider font-semibold text-[#173F35] dark:text-[#8DA998] mb-1.5">
                04. {t.productAnalysis.form.dosageForm}
              </label>
              <input
                type="text"
                required
                value={dosageForm}
                onChange={(e) => setDosageForm(e.target.value)}
                placeholder="e.g. Tablet, Vati, Asava/Arishta, Churna, Taila, Standardized Extract"
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] px-4 py-2.5 text-sm text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider font-semibold text-[#173F35] dark:text-[#8DA998] mb-1.5">
                05. {t.productAnalysis.form.targetCountry}
              </label>
              <input
                type="text"
                required
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                placeholder="e.g. India (AYUSH/IPO), USA (FDA), EU (EMA), UK (MHRA)"
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] px-4 py-2.5 text-sm text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              />
            </div>
          </div>

          {/* Statutory Pre-Audit Checklist Note */}
          <div className="p-4 bg-[#FCFBF7] dark:bg-[#131E18] border-l-2 border-[#8C6D3B] border-y border-r border-[#E2DDD1] dark:border-[#1E2E25] text-xs space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] block">
              AUTOMATED STATUTORY CROSS-CHECKS INCLUDED IN THIS RUN:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-[#526058] dark:text-[#B6C4BD]">
              <li>Section 3(p) Patent Act novelty review against TKDL classical prior art collections</li>
              <li>Schedule 1 Ayurvedic Classical Treatise cross-referencing (Charaka, Sushruta, Bhavaprakasha)</li>
              <li>AYUSH Rule 158B licensing classification (Classical vs Proprietary Medicine)</li>
              <li>National Biodiversity Authority Section 6 Form III mandatory filing requirement</li>
              <li>US FDA 21 CFR 101.93 Structure/Function vs illegal disease claims check</li>
            </ul>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
            >
              <span>{t.productAnalysis.form.btnSubmit}</span>
              <ArrowRight className="w-4 h-4 text-[#8C6D3B]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
