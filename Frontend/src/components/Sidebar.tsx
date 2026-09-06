import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Search, 
  FlaskConical, 
  FileText, 
  FileCheck2, 
  History, 
  Archive, 
  Compass, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  language: Language;
  activeDossierId?: string;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  setScreen,
  language,
  activeDossierId,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const t = translations[language];

  const handleNavigate = (screen: Screen) => {
    setScreen(screen);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#0C1410] border-r border-[#E2DDD1] dark:border-[#1E2E25] select-none">
      <div>
        {/* Brand Banner */}
        <div className="p-4 sm:p-5 border-b border-[#EAE5DA] dark:border-[#1A2820] flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 bg-[#173F35] dark:bg-[#12231A] border border-[#8C6D3B] flex items-center justify-center relative shadow-xs shrink-0">
              <span className="font-serif text-[#FAF8F5] text-xs font-bold tracking-tight">AG</span>
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
              <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold tracking-widest text-[#173F35] dark:text-[#EFECE6] leading-none">
                  AYURGUARD
                </span>
              </div>
              <div className="text-[9px] font-mono text-[#8C6D3B] uppercase tracking-wider font-bold mt-0.5">
                STATUTORY INTEL
              </div>
            </div>
          </button>

          {isMobileOpen && setIsMobileOpen && (
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-[#6A7870] hover:text-[#173F35] dark:hover:text-[#EFECE6] md:hidden"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="py-4 px-3 space-y-6">
          {/* SECTION 1: WORKSPACE */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-bold tracking-widest text-[#6A7870] dark:text-[#7D9186] uppercase flex items-center justify-between">
              <span>{t.sidebar?.workspace || 'WORKSPACE'}</span>
            </div>
            <div className="space-y-1">
              {/* Research */}
              <button
                type="button"
                onClick={() => handleNavigate('ask')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'ask'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.research || 'Research'}</span>
                </div>
                {currentScreen === 'ask' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>

              {/* Investigations */}
              <button
                type="button"
                onClick={() => handleNavigate('product_analysis')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'product_analysis' || currentScreen === 'analysis_progress'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FlaskConical className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.investigations || 'Investigations'}</span>
                </div>
                {(currentScreen === 'product_analysis' || currentScreen === 'analysis_progress') && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>

              {/* Reports */}
              <button
                type="button"
                onClick={() => handleNavigate('intelligence_report')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'intelligence_report'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.reports || 'Reports'}</span>
                </div>
                {currentScreen === 'intelligence_report' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>
            </div>
          </div>

          {/* SECTION 2: EVIDENCE */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-mono font-bold tracking-widest text-[#6A7870] dark:text-[#7D9186] uppercase flex items-center justify-between">
              <span>{t.sidebar?.evidence || 'EVIDENCE'}</span>
            </div>
            <div className="space-y-1">
              {/* Audit */}
              <button
                type="button"
                onClick={() => handleNavigate('evidence_audit')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'evidence_audit'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.audit || 'Audit'}</span>
                </div>
                {currentScreen === 'evidence_audit' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>

              {/* Archive */}
              <button
                type="button"
                onClick={() => handleNavigate('history')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'history'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.archive || 'Archive'}</span>
                </div>
                {currentScreen === 'history' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>

              {/* Sources */}
              <button
                type="button"
                onClick={() => handleNavigate('sources')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors ${
                  currentScreen === 'sources'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A7B8AF] hover:bg-[#F7F5EF] dark:hover:bg-[#142019] hover:text-[#173F35] dark:hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Archive className="w-4 h-4 shrink-0" />
                  <span>{t.sidebar?.sources || 'Sources'}</span>
                </div>
                {currentScreen === 'sources' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer / Context Info */}
      <div className="p-3 border-t border-[#EAE5DA] dark:border-[#1A2820] space-y-2 bg-[#FAF8F3] dark:bg-[#0A100D]">
        {/* Quick Dashboard link */}
        <button
          type="button"
          onClick={() => handleNavigate('dashboard')}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-mono transition-colors ${
            currentScreen === 'dashboard'
              ? 'text-[#173F35] dark:text-[#9ECBB0] font-bold'
              : 'text-[#6A7870] dark:text-[#8D9E96] hover:text-[#173F35] dark:hover:text-[#EFECE6]'
          }`}
        >
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>{t.nav.dashboard}</span>
        </button>

        {/* Quick Settings link */}
        <button
          type="button"
          onClick={() => handleNavigate('settings')}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-mono transition-colors ${
            currentScreen === 'settings'
              ? 'text-[#173F35] dark:text-[#9ECBB0] font-bold'
              : 'text-[#6A7870] dark:text-[#8D9E96] hover:text-[#173F35] dark:hover:text-[#EFECE6]'
          }`}
        >
          <Settings className="w-3.5 h-3.5 shrink-0" />
          <span>{t.nav.settings}</span>
        </button>

        {/* Active Dossier Tag */}
        {activeDossierId && (
          <div className="pt-2 border-t border-[#EAE5DA] dark:border-[#18261F] px-1">
            <div className="text-[9px] font-mono text-[#6A7870] dark:text-[#809489] uppercase tracking-wider">
              ACTIVE DOSSIER
            </div>
            <div className="text-[11px] font-mono font-bold text-[#173F35] dark:text-[#BAC7C0] truncate mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5638] dark:bg-[#8DD4A9] inline-block shrink-0"></span>
              <span className="truncate">{activeDossierId}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-60 xl:w-64 shrink-0 min-h-[calc(100vh-6rem)]">
        <div className="sticky top-15 h-[calc(100vh-3.75rem)] overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen?.(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
