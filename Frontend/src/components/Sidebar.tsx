import React from 'react';
import { 
  Home, 
  FlaskConical, 
  Bot, 
  FolderArchive, 
  BookOpen, 
  Search, 
  Settings, 
  Globe, 
  ChevronDown,
  User,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AyurLogo } from './AyurLogo';
import { NavigationTab, LanguageCode } from '../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { 
    currentTab, 
    setCurrentTab, 
    language, 
    setLanguage, 
    user, 
    setIsAuthModalOpen,
    t 
  } = useApp();

  const handleNav = (tab: NavigationTab) => {
    setCurrentTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemsWorkspace = [
    { id: 'dashboard' as NavigationTab, label: t.dashboard, icon: Home },
    { id: 'analyze' as NavigationTab, label: t.analyzeFormulation, icon: FlaskConical },
    { id: 'ask-ai' as NavigationTab, label: t.askAi, icon: Bot },
    { id: 'analyses' as NavigationTab, label: t.myAnalyses, icon: FolderArchive },
  ];

  const navItemsEvidence = [
    { id: 'evidence' as NavigationTab, label: t.evidenceLibrary, icon: BookOpen },
    { id: 'research' as NavigationTab, label: t.research, icon: Search },
    { id: 'settings' as NavigationTab, label: t.settings, icon: Settings },
  ];

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-gradient-to-b from-[#3A160F] via-[#2F110B] to-[#250E09] text-[#F5E8D2] flex flex-col border-r border-[#4A2117] transition-transform duration-300 shadow-2xl md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="p-5 border-b border-[#4A2117]/80 flex items-center justify-between">
        <AyurLogo size="md" variant="wood" onClick={() => handleNav('dashboard')} />
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-none">
        {/* Workspace Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] tracking-widest font-semibold uppercase text-[#B8955A]/80">
            {t.workspace}
          </div>
          <nav className="space-y-1">
            {navItemsWorkspace.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#8E241C] text-[#FFF7EC] shadow-md border-l-4 border-[#B8955A]'
                      : 'text-[#E6D3B3]/85 hover:text-[#FFF7EC] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#FFF7EC]' : 'text-[#B8955A]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Evidence Section */}
        <div>
          <div className="px-3 mb-2 text-[10px] tracking-widest font-semibold uppercase text-[#B8955A]/80">
            {t.evidence}
          </div>
          <nav className="space-y-1">
            {navItemsEvidence.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#8E241C] text-[#FFF7EC] shadow-md border-l-4 border-[#B8955A]'
                      : 'text-[#E6D3B3]/85 hover:text-[#FFF7EC] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#FFF7EC]' : 'text-[#B8955A]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Traditional Ayurveda Intelligence Callout badge */}
        <div className="mx-1 p-3 rounded-xl bg-gradient-to-br from-[#4A2117]/70 to-[#3A160F] border border-[#B8955A]/25">
          <div className="flex items-center gap-1.5 text-[#B8955A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TKDL + AYUSH Grounded</span>
          </div>
          <p className="text-[11px] text-[#E6D3B3]/70 mt-1 leading-relaxed">
            Statutory decision support cross-referenced with classical compendiums and Indian patent law.
          </p>
        </div>
      </div>

      {/* Bottom Section: Language & User Profile */}
      <div className="p-3 border-t border-[#4A2117] space-y-2 bg-[#2E120B]">
        {/* Language Selector */}
        <div className="relative flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 text-xs text-[#E6D3B3]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#B8955A]" />
            <select
              id="sidebar-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              aria-label="Select application language"
              className="bg-transparent text-xs text-[#F5E8D2] focus:outline-none cursor-pointer pr-4"
            >
              <option value="en" className="bg-[#3A160F] text-[#F5E8D2]">English</option>
              <option value="ta" className="bg-[#3A160F] text-[#F5E8D2]">தமிழ் (Tamil)</option>
              <option value="hi" className="bg-[#3A160F] text-[#F5E8D2]">हिन्दी (Hindi)</option>
              <option value="te" className="bg-[#3A160F] text-[#F5E8D2]">తెలుగు (Telugu)</option>
              <option value="ml" className="bg-[#3A160F] text-[#F5E8D2]">മലയാളം (Malayalam)</option>
              <option value="kn" className="bg-[#3A160F] text-[#F5E8D2]">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#B8955A] pointer-events-none" />
        </div>

        {/* User Profile Card */}
        <div 
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
          title="Account profile"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8E241C] to-[#5C1611] text-[#FFF7EC] font-serif font-bold text-xs flex items-center justify-center border border-[#B8955A]/50">
            {user.avatarInitials || 'AU'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#F5E8D2] truncate">
              {user.name && user.name.trim() ? user.name : 'AyurGuard User'}
            </p>
            <p className="text-[10px] text-[#B8955A] truncate">
              Researcher
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
