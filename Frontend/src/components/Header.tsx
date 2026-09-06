import React from 'react';
import { Search, Globe, Menu, Shield, Bell, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const { 
    language, 
    setLanguage, 
    user, 
    setIsAuthModalOpen, 
    globalSearch, 
    setGlobalSearch,
    setCurrentTab,
    t 
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      setCurrentTab('evidence');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#F6EFE3]/90 backdrop-blur-md border-b border-[#E6D3B3] px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Mobile hamburger menu */}
      <button
        id="mobile-menu-btn"
        onClick={onOpenMobileSidebar}
        className="md:hidden p-2 rounded-lg text-[#3A160F] hover:bg-[#EFE0C5] transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
          <input
            id="global-search-input"
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FFFDF9] border border-[#E0CFB3] rounded-full text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C] focus:ring-1 focus:ring-[#8E241C]/30 shadow-inner transition-all"
          />
        </div>
      </form>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Language selector */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#4A2117] bg-[#FFFDF9] border border-[#E0CFB3] px-3 py-1.5 rounded-full">
          <Globe className="w-3.5 h-3.5 text-[#8E241C]" />
          <select
            id="header-language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            aria-label="Select interface language"
            className="bg-transparent text-xs text-[#2B1A14] focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
            <option value="ml">മലയാളം</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>
        </div>

        {/* Traditional Regulatory Badge */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] border border-[#8E241C]/20 text-[11px] font-medium">
          <Shield className="w-3 h-3 text-[#8E241C]" />
          <span>AYUSH & TKDL Grounded</span>
        </div>

        {/* User avatar button */}
        <button
          id="header-profile-btn"
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#8E241C]/30 transition-all"
          title="User Account"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8E241C] to-[#4A2117] text-[#FFF7EC] font-serif font-bold text-xs flex items-center justify-center border border-[#B8955A]/60 shadow-sm">
            {user.avatarInitials || 'AU'}
          </div>
          <span className="hidden xl:inline text-xs font-medium text-[#3A160F]">
            {user.name && user.name.trim() ? user.name : 'AyurGuard User'}
          </span>
        </button>
      </div>
    </header>
  );
};
