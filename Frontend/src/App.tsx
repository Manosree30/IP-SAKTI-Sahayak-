import React, { useState, useEffect } from 'react';
import { Screen, Language, Theme, ResponsePreference, IntelligenceReport, EvidenceItem, Domain } from './types';
import { translations } from './i18n/translations';
import { DossierProvider, useDossier } from './context/DossierContext';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { AskView } from './components/AskView';
import { ProductAnalysisView } from './components/ProductAnalysisView';
import { AnalysisProgressView } from './components/AnalysisProgressView';
import { IntelligenceReportView } from './components/IntelligenceReportView';
import { EvidenceAuditView } from './components/EvidenceAuditView';
import { SourcesView } from './components/SourcesView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { Check, ShieldCheck } from 'lucide-react';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [returnScreen, setReturnScreen] = useState<Screen>('ask');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [responsePref, setResponsePref] = useState<ResponsePreference>('balanced');
  const { isAuthenticated } = useAuth();

  const {
    dossiers,
    activeDossier,
    setActiveDossierId,
    setSelectedEvidenceId,
    createDossier,
    feedbackMessage,
  } = useDossier();

  // In-flight pipeline tracking
  const [pendingInvestigationTitle, setPendingInvestigationTitle] = useState<string>('Herbal-X Anti-Inflammatory Complex');
  const [initialAskQuery, setInitialAskQuery] = useState<string>('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Theme synchronization with document element
  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else if (theme === 'light') {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      } else {
        // System mode
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else {
          root.classList.remove('dark');
          root.style.colorScheme = 'light';
        }
      }
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const t = translations[language];

  // Handler to launch Product Analysis pipeline
  const handleLaunchProductInvestigation = (details: {
    productName: string;
    ingredients: string;
    purpose: string;
    dosageForm: string;
    targetCountry: string;
  }) => {
    setPendingInvestigationTitle(`${details.productName} (${details.dosageForm})`);

    const newId = `AG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: IntelligenceReport = {
      id: newId,
      title: `${details.productName} Regulatory Dossier`,
      queryOrProduct: details.ingredients,
      timestamp: new Date().toISOString(),
      isProductAnalysis: true,
      language,
      responsePreference: responsePref,
      productDetails: {
        productName: details.productName,
        ingredients: details.ingredients.split(',').map((s) => s.trim()),
        purpose: details.purpose,
        dosageForm: details.dosageForm,
        targetCountry: details.targetCountry,
      },
      executiveFinding: {
        verdict: `Potential Section 3(p) Patent Barrier; Rule 158B(ii) Licensing Track Required for ${details.productName}`,
        summary: `Prior art examination reveals codified therapeutic anticipation in classical texts for ingredients (${details.ingredients}). While patentability as a simple composition faces strict statutory opposition under Section 3(p), the formula is eligible for proprietary AYUSH licensing under Rule 158B.`,
        actionRecommendation: `1. Generate synergism matrix to rebut Section 3(p). 2. Submit NBA Section 6 Form III prior to international marketing. 3. Secure Rule 158B(ii) proof of safety.`,
        riskLevel: 'Critical Prior Art Conflict',
        primaryStatutes: [
          'Indian Patents Act 1970 § 3(p)',
          'Drugs and Cosmetics Rules Rule 158B',
          'Biological Diversity Act § 6',
          'US FDA DSHEA 21 CFR 101.93',
        ],
      },
      evidenceStrengthSummary: {
        strongCount: 5,
        moderateCount: 1,
        insufficientCount: 0,
        totalSourcesQueried: 5,
      },
      sections: {
        ...activeDossier.sections,
        ip: {
          ...activeDossier.sections.ip,
          claim: `Novel formulation comprising ${details.ingredients} for ${details.purpose}`,
        },
      },
      auditTrails: {
        supportedClaimsCount: 5,
        requiresReviewCount: 1,
        flaggedCount: 0,
        humanAudited: true,
        auditedBy: 'AyurGuard Regulatory Intelligence Engine & Institutional Auditor',
        auditTimestamp: new Date().toISOString(),
      },
    };

    createDossier(newReport);
    setCurrentScreen('analysis_progress');
  };

  // Handler to launch Ask Research pipeline
  const handleExecuteQuery = (
    query: string,
    domain: Domain,
    pref: ResponsePreference,
    sources: string[]
  ) => {
    setPendingInvestigationTitle(query);
    const newId = `AG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: IntelligenceReport = {
      id: newId,
      title: `Advisory: ${query.slice(0, 50)}...`,
      queryOrProduct: query,
      isProductAnalysis: false,
      timestamp: new Date().toISOString(),
      language,
      responsePreference: pref,
      executiveFinding: {
        verdict: `Statutory Precedents Confirm Strict Admixture Bar Under Indian Patents Act 1970 § 3(p)`,
        summary: `Analysis of question against ${sources.length} active knowledge repositories confirms that conventional combinations of classical herbs cannot be patented as compositions without quantified synergistic data.`,
        actionRecommendation: `Prepare synergism data with isobologram or CI < 1.0 to overcome Section 3(p) objection at the Indian Patent Office.`,
        riskLevel: 'Critical Prior Art Conflict',
        primaryStatutes: [
          'Indian Patents Act § 3(p), 3(e)',
          'TKDL Search Guidelines',
          'IPO Traditional Knowledge Guidelines',
        ],
      },
      evidenceStrengthSummary: {
        strongCount: 4,
        moderateCount: 2,
        insufficientCount: 0,
        totalSourcesQueried: sources.length,
      },
      sections: {
        ...activeDossier.sections,
        ip: {
          ...activeDossier.sections.ip,
          claim: query,
        },
      },
      auditTrails: {
        supportedClaimsCount: 5,
        requiresReviewCount: 1,
        flaggedCount: 0,
        humanAudited: true,
        auditedBy: 'AyurGuard Autonomous Legal Agent',
        auditTimestamp: new Date().toISOString(),
      },
    };

    createDossier(newReport);
    setCurrentScreen('analysis_progress');
  };

  const handleAuditEvidenceFromCard = (item: EvidenceItem) => {
    setSelectedEvidenceId(item.id);
    setCurrentScreen('evidence_audit');
  };

  // Dedicated Auth Flows
  if (currentScreen === 'login') {
    return (
      <AuthLayout
        setScreen={setCurrentScreen}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      >
        <LoginForm
          setScreen={setCurrentScreen}
          language={language}
          returnScreen={returnScreen}
        />
      </AuthLayout>
    );
  }

  if (currentScreen === 'signup') {
    return (
      <AuthLayout
        setScreen={setCurrentScreen}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      >
        <SignupForm
          setScreen={setCurrentScreen}
          language={language}
        />
      </AuthLayout>
    );
  }

  if (currentScreen === 'forgot_password') {
    return (
      <AuthLayout
        setScreen={setCurrentScreen}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      >
        <ForgotPasswordForm
          setScreen={setCurrentScreen}
          language={language}
        />
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] dark:bg-[#0B130F] text-[#121815] dark:text-[#F5F2EB] selection:bg-[#173F35] selection:text-[#F7F5EF]">
      {/* Top Main Navigation */}
      <Navigation
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Content Area */}
      {currentScreen === 'landing' ? (
        <main className="flex-1">
          <LandingPage setScreen={setCurrentScreen} language={language} />
        </main>
      ) : (
        <ProtectedRoute
          currentScreen={currentScreen}
          onRedirectToLogin={(ret) => {
            setReturnScreen(ret);
            setCurrentScreen('login');
          }}
          language={language}
        >
          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <Sidebar
              currentScreen={currentScreen}
              setScreen={setCurrentScreen}
              language={language}
              activeDossierId={activeDossier?.id}
              isMobileOpen={mobileSidebarOpen}
              setIsMobileOpen={setMobileSidebarOpen}
            />
            <main className="flex-1 overflow-y-auto min-w-0">
              {currentScreen === 'dashboard' && (
                <DashboardView
                  setScreen={setCurrentScreen}
                  language={language}
                  onSelectReport={(id) => {
                    setActiveDossierId(id);
                    setCurrentScreen('intelligence_report');
                  }}
                  onSelectQuery={(q) => {
                    setInitialAskQuery(q);
                    setCurrentScreen('ask');
                  }}
                  activeDossier={activeDossier}
                  allDossiers={dossiers}
                />
              )}

              {currentScreen === 'ask' && (
                <AskView
                  setScreen={setCurrentScreen}
                  language={language}
                  setLanguage={setLanguage}
                  responsePref={responsePref}
                  setResponsePref={setResponsePref}
                  initialQuery={initialAskQuery}
                  onExecuteQuery={handleExecuteQuery}
                />
              )}

              {currentScreen === 'product_analysis' && (
                <ProductAnalysisView
                  setScreen={setCurrentScreen}
                  language={language}
                  onLaunchInvestigation={handleLaunchProductInvestigation}
                />
              )}

              {currentScreen === 'analysis_progress' && (
                <AnalysisProgressView
                  setScreen={setCurrentScreen}
                  language={language}
                  investigationTitle={pendingInvestigationTitle}
                  onComplete={() => setCurrentScreen('intelligence_report')}
                />
              )}

              {currentScreen === 'intelligence_report' && (
                <IntelligenceReportView
                  report={activeDossier}
                  setScreen={setCurrentScreen}
                  language={language}
                  onAuditItem={handleAuditEvidenceFromCard}
                  responsePref={responsePref}
                  setResponsePref={setResponsePref}
                />
              )}

              {currentScreen === 'evidence_audit' && (
                <EvidenceAuditView
                  setScreen={setCurrentScreen}
                  language={language}
                />
              )}

              {currentScreen === 'sources' && (
                <SourcesView setScreen={setCurrentScreen} language={language} />
              )}

              {currentScreen === 'history' && (
                <HistoryView
                  setScreen={setCurrentScreen}
                  language={language}
                />
              )}

              {currentScreen === 'settings' && (
                <SettingsView
                  language={language}
                  setLanguage={setLanguage}
                  theme={theme}
                  setTheme={setTheme}
                  responsePref={responsePref}
                  setResponsePref={setResponsePref}
                  setScreen={setCurrentScreen}
                />
              )}
            </main>
          </div>
        </ProtectedRoute>
      )}

      {/* Industrial Editorial Footer */}
      <footer className="border-t border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FCFBF7] dark:bg-[#070D0A] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wider text-[#173F35] dark:text-[#EFECE6]">
                AYURGUARD
              </span>
              <span className="font-mono text-[10px] text-[#8C6D3B] font-bold">
                REGULATORY &amp; INTELLECTUAL PROPERTY INTELLIGENCE
              </span>
            </div>
            <p className="text-[11px] text-[#526058] dark:text-[#8D9E96] max-w-2xl leading-relaxed">
              Engineered for pharmaceutical innovators, IP attorneys, regulatory professionals, and Ayurvedic researchers. Compliant with Indian Patents Act 1970 § 3(p), Biological Diversity Act 2002 § 6, Drugs and Cosmetics Rules Rule 158B, and WIPO Traditional Knowledge guidelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[11px] font-mono text-[#526058] dark:text-[#8D9E96] shrink-0">
            <span>Citation Verification Pipeline</span>
            <span className="hidden sm:inline">·</span>
            <span>TKDL-Indexed</span>
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={() => setCurrentScreen('sources')}
              className="hover:underline text-[#173F35] dark:text-[#D5DDD8] font-bold"
            >
              Statutory Knowledge Repository
            </button>
          </div>
        </div>
      </footer>

      {/* Global Feedback Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] px-4 py-2.5 shadow-lg border border-[#102E26] font-mono text-xs flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#8C6D3B]" />
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DossierProvider>
        <AppContent />
      </DossierProvider>
    </AuthProvider>
  );
}
