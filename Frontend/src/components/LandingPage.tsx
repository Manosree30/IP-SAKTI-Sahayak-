import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../i18n/translations';
import { useAuth } from '../auth/AuthContext';
import { EvidenceThreadBar } from './EvidenceThreadBar';
import { 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  ExternalLink,
  Layers,
  Database,
  FileText,
  UserCheck
} from 'lucide-react';

interface LandingPageProps {
  setScreen: (screen: Screen) => void;
  language: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setScreen,
  language,
}) => {
  const t = translations[language];
  const { isAuthenticated, user } = useAuth();

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#F7F5EF] dark:bg-[#0C1310] text-[#1E2925] dark:text-[#EFECE6]">
      {/* Editorial Header Section with Asymmetric Layout */}
      <section className="border-b border-[#E2DDD1] dark:border-[#203027] relative editorial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* Top Gazette Registry Strip */}
          <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-3 mb-8 text-[10px] font-mono text-[#526058] dark:text-[#8E9F96]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#8C6D3B]"></span>
              <span className="font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider uppercase">
                DIRECTIVE REPOSITORY // AYURVEDA INTELLECTUAL PROPERTY &amp; STATUTORY COMPLIANCE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>DOC REF: AG-STAT-2026</span>
              <span>INDEX: 5 KNOWLEDGE DOMAINS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 7 Columns: Editorial Headline, Authority Positioning, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] dark:bg-[#14221A] border border-[#DDD7C9] dark:border-[#25392D] text-[#173F35] dark:text-[#9ECBB0] font-mono text-[10px] uppercase tracking-wider font-bold shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#8C6D3B]"></span>
                <span>{t.landing.eyebrow}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#173F35] dark:text-[#F5F2ED] leading-[1.12]">
                {t.landing.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-[#4A5750] dark:text-[#BCC8C1] leading-relaxed max-w-2xl font-sans">
                {t.landing.heroLead}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setScreen('ask')}
                      className="px-6 py-3.5 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0B120E] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
                    >
                      <span>{t.nav?.openWorkspace || 'Open Research Workspace'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreen('product_analysis')}
                      className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F7F5EF] dark:bg-[#15221B] dark:hover:bg-[#1D2F25] text-[#173F35] dark:text-[#EFECE6] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#DDD7C9] dark:border-[#293E31] shadow-xs"
                    >
                      <span>{t.landing.ctaSecondary}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setScreen('signup')}
                      className="px-6 py-3.5 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0B120E] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#173F35] dark:border-[#759A84] shadow-xs"
                    >
                      <span>{t.nav?.getStarted || 'Get Started'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreen('login')}
                      className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F7F5EF] dark:bg-[#15221B] dark:hover:bg-[#1D2F25] text-[#173F35] dark:text-[#EFECE6] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border border-[#DDD7C9] dark:border-[#293E31] shadow-xs"
                    >
                      <span>{t.nav?.signIn || 'Sign In'}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Authority Citations */}
              <div className="pt-6 border-t border-[#E2DDD1] dark:border-[#1A2A20]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#526058] dark:text-[#889C92] font-bold">
                    INDEXED STATUTORY JURISDICTIONS &amp; TREATIES
                  </span>
                  <span className="font-mono text-[10px] text-[#8C6D3B] font-bold">CITATION VERIFICATION AUDIT</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#1E2925] dark:text-[#CAD5CF]">
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    The Patents Act 1970 § 3(p)
                  </span>
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    CSIR-TKDL Database
                  </span>
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    Drugs &amp; Cosmetics Rule 158B
                  </span>
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    Biological Diversity Act § 6
                  </span>
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    US FDA 21 CFR 101.93
                  </span>
                  <span className="px-2.5 py-1 bg-[#FFFFFF] dark:bg-[#142019] border border-[#DDD7C9] dark:border-[#22352A] shadow-xs">
                    EMA THMPD 2004/24/EC
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Official Regulatory Dossier Folio (Clean White Research Surface) */}
            <div className="lg:col-span-5 bg-[#FFFFFF] dark:bg-[#101914] border border-[#E2DDD1] dark:border-[#24352C] p-5 sm:p-6 space-y-4 tech-box shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1E2E25] pb-3">
                <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  <span>OFFICIAL STATUTORY DOSSIER FOLIO</span>
                </div>
                <span className="font-mono text-[10px] text-[#8C6D3B] font-bold px-2 py-0.5 bg-[#FAF8F3] dark:bg-[#1C261E] border border-[#DDD7C9] dark:border-[#2F4436]">
                  AG-2026-0884
                </span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <div className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#85978E] tracking-wider">
                    SUBJECT COMPOSITION UNDER EXAMINATION
                  </div>
                  <div className="font-serif text-base font-bold text-[#173F35] dark:text-[#EFECE6] mt-0.5 leading-snug">
                    Curcuma longa + Boswellia serrata + Zingiber officinale (Herbal-X)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-[#FFFDFD] dark:bg-[#0B120E] p-2.5 border border-[#F5DCDC] dark:border-[#1C2C23]">
                    <span className="font-mono text-[9px] uppercase text-[#9B2C2C] dark:text-[#809388] block font-bold">Section 3(p) Status</span>
                    <span className="font-mono font-bold text-[#9B2C2C] dark:text-[#F19292] text-[11px] block mt-0.5">High Prior Art Bar</span>
                  </div>
                  <div className="bg-[#FAF8F3] dark:bg-[#0B120E] p-2.5 border border-[#E2DDD1] dark:border-[#1C2C23]">
                    <span className="font-mono text-[9px] uppercase text-[#526058] dark:text-[#809388] block font-bold">AYUSH Licensing</span>
                    <span className="font-mono font-bold text-[#173F35] dark:text-[#9ECBB0] text-[11px] block mt-0.5">Rule 158B(ii) Track</span>
                  </div>
                </div>

                <div className="bg-[#FCFBF7] dark:bg-[#0B120E] p-3.5 border-l-2 border-[#8C6D3B] border-y border-r border-[#E2DDD1] dark:border-[#1C2C23] text-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] block mb-1">
                    EXECUTIVE STATUTORY VERDICT (§ 3(p))
                  </span>
                  <p className="text-[#1E2925] dark:text-[#CAD5CF] leading-relaxed italic font-serif text-sm">
                    "Unpatentable as a mere admixture under Section 3(p) due to Charaka Samhita Chikitsa Sthana prior art citations; mandatory NBA Section 6 filing required before any commercial export."
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E8E3D8] dark:border-[#1E2E25]">
                  <span className="font-mono text-[10px] text-[#526058] dark:text-[#9FB1A7]">
                    6 Verifiable Evidence Citations
                  </span>
                  <button
                    type="button"
                    onClick={() => setScreen('intelligence_report')}
                    className="font-mono text-xs text-[#173F35] dark:text-[#9ECBB0] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Full Dossier</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Design Element: Evidence Thread Horizontal Flow */}
      <EvidenceThreadBar language={language} variant="hero" />

      {/* Quantitative & Architectural Proof Points - Institutional Registry Strip */}
      <section className="border-b border-[#E2DDD1] dark:border-[#203027] bg-[#FFFFFF] dark:bg-[#0D1510] py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E3D8] dark:divide-[#1D2E24]">
            <div className="py-2 sm:py-0 sm:px-6 first:pl-0">
              <div className="font-serif text-3xl font-bold text-[#173F35] dark:text-[#EFECE6] tracking-tight">
                5 Domains
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#526058] dark:text-[#9ECBB0] mt-1 font-bold">
                Authoritative Corpus
              </div>
              <p className="text-xs text-[#4A5750] dark:text-[#8FA097] mt-1 leading-relaxed">
                Indexed across IP, TKDL classical canons, AYUSH regulations, NBA biodiversity, and international treaties.
              </p>
            </div>

            <div className="py-3 sm:py-0 sm:px-6">
              <div className="font-serif text-3xl font-bold text-[#8C6D3B]">
                6 Apex Bodies
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#526058] dark:text-[#9ECBB0] mt-1 font-bold">
                Direct Statutory Crosswalk
              </div>
              <p className="text-xs text-[#4A5750] dark:text-[#8FA097] mt-1 leading-relaxed">
                Ministry of AYUSH, Indian Patent Office, NBA, WIPO, US FDA, and European EMA.
              </p>
            </div>

            <div className="py-3 sm:py-0 sm:px-6">
              <div className="font-serif text-3xl font-bold text-[#173F35] dark:text-[#EFECE6] tracking-tight">
                Zero-Hallucination
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#526058] dark:text-[#9ECBB0] mt-1 font-bold">
                Deterministic Citations
              </div>
              <p className="text-xs text-[#4A5750] dark:text-[#8FA097] mt-1 leading-relaxed">
                Every assertion ties to an official statute, Gazette notification, or classical treatise verse.
              </p>
            </div>

            <div className="py-3 sm:py-0 sm:px-6 last:pr-0">
              <div className="font-serif text-3xl font-bold text-[#8C6D3B]">
                Trilingual Canon
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#526058] dark:text-[#9ECBB0] mt-1 font-bold">
                Sanskrit • Vernacular • English
              </div>
              <p className="text-xs text-[#4A5750] dark:text-[#8FA097] mt-1 leading-relaxed">
                Engineered for English, Tamil (தமிழ்), and Hindi (हिन्दी) regulatory operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Foundational Pillars of AyurGuard - Multilateral Crosswalk Framework */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8C6D3B] block">
              JURISDICTIONAL SCOPE &amp; STATUTORY COVERAGE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6] mt-1">
              Multilateral Intelligence Framework
            </h2>
          </div>
          <span className="font-mono text-xs text-[#526058] dark:text-[#8D9E95]">
            4 HARMONIZED REGULATORY COLUMNS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-6 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1C2C22] pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8C6D3B]">
                PILLAR 01 // STATUTORY DEFENSE
              </span>
              <Scale className="w-4 h-4 text-[#173F35] dark:text-[#9ECBB0]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.landing.keyPillars.p1Title}
            </h3>
            <p className="text-sm text-[#4A5750] dark:text-[#BAC7C0] leading-relaxed">
              {t.landing.keyPillars.p1Desc}
            </p>
            <div className="pt-2 border-t border-[#E8E3D8] dark:border-[#1C2C22]">
              <span className="font-mono text-[10px] text-[#526058] dark:text-[#8DA096] font-semibold">
                CODIFIED STATUTE: Indian Patents Act 1970 § 3(p), § 3(d), § 3(e) &amp; PCT Rule 45
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-6 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1C2C22] pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8C6D3B]">
                PILLAR 02 // CANONICAL EVIDENCE
              </span>
              <BookOpen className="w-4 h-4 text-[#173F35] dark:text-[#9ECBB0]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.landing.keyPillars.p2Title}
            </h3>
            <p className="text-sm text-[#4A5750] dark:text-[#BAC7C0] leading-relaxed">
              {t.landing.keyPillars.p2Desc}
            </p>
            <div className="pt-2 border-t border-[#E8E3D8] dark:border-[#1C2C22]">
              <span className="font-mono text-[10px] text-[#526058] dark:text-[#8DA096] font-semibold">
                CLASSICAL CORPUS: Charaka Samhita, Sushruta, Ashtanga Hridaya, Bhavaprakasha
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-6 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1C2C22] pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8C6D3B]">
                PILLAR 03 // COMPLIANCE GATEWAY
              </span>
              <ShieldCheck className="w-4 h-4 text-[#173F35] dark:text-[#9ECBB0]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.landing.keyPillars.p3Title}
            </h3>
            <p className="text-sm text-[#4A5750] dark:text-[#BAC7C0] leading-relaxed">
              {t.landing.keyPillars.p3Desc}
            </p>
            <div className="pt-2 border-t border-[#E8E3D8] dark:border-[#1C2C22]">
              <span className="font-mono text-[10px] text-[#526058] dark:text-[#8DA096] font-semibold">
                REGULATORY STANDARD: Drugs &amp; Cosmetics Rule 158B &amp; Biological Diversity Act § 6
              </span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1612] p-6 space-y-3 tech-box shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E3D8] dark:border-[#1C2C22] pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#8C6D3B]">
                PILLAR 04 // CROSS-BORDER EXPORT
              </span>
              <Globe2 className="w-4 h-4 text-[#173F35] dark:text-[#9ECBB0]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.landing.keyPillars.p4Title}
            </h3>
            <p className="text-sm text-[#4A5750] dark:text-[#BAC7C0] leading-relaxed">
              {t.landing.keyPillars.p4Desc}
            </p>
            <div className="pt-2 border-t border-[#E8E3D8] dark:border-[#1C2C22]">
              <span className="font-mono text-[10px] text-[#526058] dark:text-[#8DA096] font-semibold">
                EXPORT MANDATE: US FDA 21 CFR 101.93 &amp; EU Directive 2004/24/EC THMPD
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Terminal Callout */}
        <div className="mt-12 p-6 bg-[#FFFFFF] dark:bg-[#121C16] border border-[#E2DDD1] dark:border-[#24352C] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 tech-box shadow-xs">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#8C6D3B]"></span>
              <span>INDUSTRIAL STATUTORY WORKSPACE READY</span>
            </span>
            <p className="text-xs text-[#4A5750] dark:text-[#A7B8AF]">
              Execute formulation prior art investigations, claim drafting audits, or compliance verifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setScreen('ask')}
                className="px-4 py-2 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0B120E] font-mono text-xs font-bold hover:bg-[#102E26] dark:hover:bg-[#8AB09A] transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>{t.nav?.openWorkspace || 'Open Research Workspace'}</span>
                <span>→</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setScreen('login')}
                  className="px-4 py-2 bg-[#FCFBF7] dark:bg-[#0B120E] text-[#173F35] dark:text-[#9ECBB0] font-mono text-xs font-bold border border-[#DDD7C9] dark:border-[#273B30] hover:bg-[#F7F5EF] dark:hover:bg-[#192720] transition-colors shadow-xs"
                >
                  {t.nav?.signIn || 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setScreen('signup')}
                  className="px-4 py-2 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0B120E] font-mono text-xs font-bold hover:bg-[#102E26] dark:hover:bg-[#8AB09A] transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>{t.nav?.getStarted || 'Get Started'}</span>
                  <span>→</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
