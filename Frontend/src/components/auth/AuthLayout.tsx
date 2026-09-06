import React from 'react';
import { Screen, Language, Theme } from '../../types';
import { translations } from '../../i18n/translations';
import { Globe, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  setScreen: (screen: Screen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  setScreen,
  language,
  setLanguage,
  theme,
  setTheme,
}) => {
  const t = translations[language];

  return (
    <div id="auth-layout-root" className="min-h-screen bg-[#F7F5EF] dark:bg-[#070D0A] text-[#1E2925] dark:text-[#EFECE6] flex flex-col justify-between">
      {/* Top Gazette Status Header */}
      <header className="border-b border-[#E2DDD1] dark:border-[#1A2820] bg-[#FFFFFF]/90 dark:bg-[#0B130F]/90 backdrop-blur-sm px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[10px] text-[#526058] dark:text-[#8E9F96]">
          <button
            type="button"
            onClick={() => setScreen('landing')}
            className="flex items-center gap-2 hover:text-[#173F35] dark:hover:text-[#9ECBB0] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider uppercase">
              {t.auth?.backToHome || '← Return to Official Landing Portal'}
            </span>
          </button>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-r border-[#E2DDD1] dark:border-[#1E2E25] pr-2.5">
              <Globe className="w-3 h-3 text-[#8C6D3B]" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 ${
                  language === 'en'
                    ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                    : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
                }`}
              >
                EN
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-1.5 py-0.5 ${
                  language === 'ta'
                    ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                    : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
                }`}
              >
                தமிழ்
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 ${
                  language === 'hi'
                    ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                    : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Theme Switcher */}
            <div className="flex items-center gap-1 bg-[#FAF8F3] dark:bg-[#131E18] border border-[#DDD7C9] dark:border-[#263C2F] p-0.5">
              <button
                type="button"
                onClick={() => setTheme('light')}
                title="Light Theme"
                className={`px-1.5 py-0.5 font-bold ${
                  theme === 'light' ? 'bg-[#173F35] text-[#FAF8F5]' : 'hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
                }`}
              >
                ☀
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                title="System Theme"
                className={`px-1.5 py-0.5 font-bold ${
                  theme === 'system' ? 'bg-[#8C6D3B] text-white' : 'hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
                }`}
              >
                ◐
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                title="Dark Theme"
                className={`px-1.5 py-0.5 font-bold ${
                  theme === 'dark' ? 'bg-[#1E3B2E] text-[#9ECBB0]' : 'hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
                }`}
              >
                ☾
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#223329] grid grid-cols-1 md:grid-cols-12 overflow-hidden tech-box shadow-sm min-h-[640px]">
          
          {/* LEFT SIDE: Distinctive AyurGuard Identity Panel */}
          <section className="md:col-span-5 lg:col-span-5 bg-[#FCFBF7] dark:bg-[#0A120E] border-b md:border-b-0 md:border-r border-[#E2DDD1] dark:border-[#1E2E25] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Brand Header */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#173F35] dark:bg-[#12231A] border border-[#8C6D3B] flex items-center justify-center relative shadow-xs shrink-0">
                    <span className="font-serif text-[#FAF8F5] text-sm font-bold tracking-tight">AG</span>
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold tracking-widest text-[#173F35] dark:text-[#EFECE6] leading-none">
                      AYURGUARD
                    </h1>
                    <div className="text-[10px] font-mono text-[#8C6D3B] uppercase tracking-wider font-bold mt-1">
                      {t.auth?.identitySubtitle || 'Regulatory & IP Intelligence for Ayurveda'}
                    </div>
                  </div>
                </div>

                {/* Supporting Statement */}
                <div className="mt-6 pt-5 border-t border-[#EAE5DA] dark:border-[#1E2E25]">
                  <p className="font-serif text-base sm:text-lg text-[#283830] dark:text-[#CAD6CE] leading-relaxed italic">
                    "{t.auth?.identityStatement || 'Research authoritative sources. Trace evidence. Make informed decisions.'}"
                  </p>
                </div>
              </div>

              {/* Technical Evidence Workflow Visualization */}
              <div className="space-y-3 pt-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#526058] dark:text-[#8E9F96] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C6D3B]"></span>
                  <span>{t.auth?.workflowTitle || 'EVIDENCE VERIFICATION CHAIN'}</span>
                </div>

                {/* Restrained Scientific Linework Flow */}
                <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#DDD7C9] dark:before:bg-[#203227]">
                  {[
                    { step: 'QUESTION', desc: 'Statutory query / formulation intake', code: '01' },
                    { step: 'RETRIEVAL', desc: 'TKDL, IPO § 3(p), PCIM&H pharmacopoeia', code: '02' },
                    { step: 'EVIDENCE', desc: 'Verbatim canonical citations & extracts', code: '03' },
                    { step: 'VERIFICATION', desc: 'Human-in-the-loop expert audit', code: '04' },
                    { step: 'DECISION', desc: 'Defensible IP & regulatory dossier', code: '05' },
                  ].map((node, i) => (
                    <div key={node.step} className="relative group">
                      {/* Node Marker */}
                      <div className="absolute -left-6 top-1 w-4 h-4 bg-[#FFFFFF] dark:bg-[#0A120E] border border-[#8C6D3B] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-[#173F35] dark:bg-[#759A84]"></span>
                      </div>
                      <div className="font-mono text-xs">
                        <span className="font-bold text-[#173F35] dark:text-[#9ECBB0] tracking-wider">
                          {node.step}
                        </span>
                        <span className="text-[10px] text-[#6A7870] dark:text-[#8E9F96] block leading-tight mt-0.5">
                          {node.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prototype Notice Banner */}
            <div className="mt-8 pt-4 border-t border-[#EAE5DA] dark:border-[#1E2E25] font-mono text-[10px] text-[#526058] dark:text-[#8FA097] space-y-1">
              <div className="flex items-center gap-1.5 text-[#8C6D3B] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AUTHENTICATION PROTOTYPE</span>
              </div>
              <p className="leading-snug">
                Client-side session simulation decoupled from UI. Ready for seamless connection to FastAPI / JWT / OAuth backend services.
              </p>
            </div>
          </section>

          {/* RIGHT SIDE: Interactive Form Container */}
          <section className="md:col-span-7 lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-[#FFFFFF] dark:bg-[#0E1712]">
            <div className="max-w-md w-full mx-auto">
              {children}
            </div>
          </section>

        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-[#E2DDD1] dark:border-[#1A2820] bg-[#FCFBF7] dark:bg-[#070D0A] py-4 px-4 sm:px-6 font-mono text-[10px] text-[#6A7870] dark:text-[#8FA097]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AYURGUARD REGULATORY &amp; IP INTELLIGENCE PLATFORM // AUTHENTICATION SUBSYSTEM
          </div>
          <div className="flex items-center gap-3">
            <span>TERMS OF SERVICE</span>
            <span>·</span>
            <span>PRIVACY DIRECTIVE</span>
            <span>·</span>
            <span>SECURITY SPECIFICATION (PROTOTYPE)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
