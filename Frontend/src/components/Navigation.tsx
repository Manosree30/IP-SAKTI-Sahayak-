import React, { useState, useRef, useEffect } from 'react';
import { Screen, Language, Theme } from '../types';
import { translations } from '../i18n/translations';
import { useAuth } from '../auth/AuthContext';
import { 
  Compass, 
  Search, 
  FlaskConical, 
  FileCheck2, 
  Archive, 
  History, 
  Settings, 
  Globe, 
  Menu, 
  X,
  FileText,
  User,
  LogOut,
  ChevronDown,
  Shield,
  ExternalLink
} from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onToggleMobileSidebar?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  setScreen,
  language,
  setLanguage,
  theme,
  setTheme,
  onToggleMobileSidebar,
}) => {
  const t = translations[language];
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileNav = (screen: Screen) => {
    setScreen(screen);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setScreen('landing');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'AG';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF]/95 dark:bg-[#0B130F]/95 backdrop-blur-md shadow-xs">
      {/* Top Gazette Classification Bar */}
      <div className="border-b border-[#EFEBE1] dark:border-[#18261F] bg-[#FCFBF7] dark:bg-[#0E1612] px-4 sm:px-6 py-1.5 text-[10px] font-mono flex items-center justify-between text-[#526058] dark:text-[#8E9F96]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-[#173F35] dark:text-[#9ECBB0] font-bold tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#8C6D3B]"></span>
            <span>GAZETTE ARCHIVE // § 3(p) &amp; TKDL REPOSITORY</span>
          </span>
          <span className="hidden lg:inline text-[#D8D2C4] dark:text-[#25362C]">|</span>
          <span className="hidden lg:inline text-[10px] uppercase tracking-wider text-[#6A7870] dark:text-[#7A8C83]">
            IN-IPO • NBA • AYUSH-PCIM&amp;H • WIPO • US FDA • EMA THMPD
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 border-r border-[#E2DDD1] dark:border-[#1C2A22] pr-2.5 sm:pr-3">
            <Globe className="w-3 h-3 text-[#8C6D3B]" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 font-mono text-[10px] transition-colors ${
                language === 'en'
                  ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                  : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
              }`}
            >
              EN
            </button>
            <span className="text-[#D8D2C4] dark:text-[#25362C]">·</span>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 font-mono text-[10px] transition-colors ${
                language === 'ta'
                  ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                  : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
              }`}
            >
              தமிழ்
            </button>
            <span className="text-[#D8D2C4] dark:text-[#25362C]">·</span>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 font-mono text-[10px] transition-colors ${
                language === 'hi'
                  ? 'font-bold text-[#173F35] dark:text-[#9ECBB0] bg-[#FAF8F3] dark:bg-[#16271F] border border-[#DDD7C9] dark:border-[#284234]'
                  : 'hover:text-[#173F35] dark:hover:text-[#EFECE6]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Theme Switcher: Prominent 3-State Controls (☀ Light, ◐ System, ☾ Dark) */}
          <div className="flex items-center border border-[#DDD7C9] dark:border-[#263C2F] bg-[#FAF8F3] dark:bg-[#131E18] p-0.5">
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Switch to Light Theme"
              className={`px-2 py-0.5 font-mono text-[10px] font-bold transition-colors flex items-center gap-1 ${
                theme === 'light'
                  ? 'bg-[#173F35] text-[#FAF8F5] shadow-xs'
                  : 'text-[#506057] dark:text-[#8D9E95] hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
              }`}
            >
              <span className="text-[11px] leading-none">☀</span>
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('system')}
              title="Sync with System Theme"
              className={`px-2 py-0.5 font-mono text-[10px] font-bold transition-colors flex items-center gap-1 ${
                theme === 'system'
                  ? 'bg-[#8C6D3B] text-white shadow-xs'
                  : 'text-[#506057] dark:text-[#8D9E95] hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
              }`}
            >
              <span className="text-[11px] leading-none">◐</span>
              <span>System</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Switch to Dark Theme"
              className={`px-2 py-0.5 font-mono text-[10px] font-bold transition-colors flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-[#1E3B2E] text-[#9ECBB0] border border-[#2B4B3B] shadow-xs'
                  : 'text-[#506057] dark:text-[#8D9E95] hover:text-[#173F35] dark:hover:text-[#F5F2EB]'
              }`}
            >
              <span className="text-[11px] leading-none">☾</span>
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-15">
          {/* Brand Identity: Official Knowledge Seal */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Opener Button (if on workspace screen and authenticated) */}
            {onToggleMobileSidebar && isAuthenticated && (
              <button
                type="button"
                onClick={onToggleMobileSidebar}
                className="md:hidden p-1.5 -ml-1.5 text-[#173F35] dark:text-[#8DA998] hover:bg-[#F7F5EF] dark:hover:bg-[#16271F]"
                aria-label="Open Workspace Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setScreen(isAuthenticated ? 'ask' : 'landing')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 bg-[#173F35] dark:bg-[#101C16] border border-[#8C6D3B] flex items-center justify-center relative shadow-xs">
                <span className="font-serif text-[#FAF8F5] text-xs font-bold tracking-tight">AG</span>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#8C6D3B]"></div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg tracking-widest font-bold text-[#173F35] dark:text-[#EFECE6] leading-none">
                    AYURGUARD
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 bg-[#FAF8F3] dark:bg-[#16261E] text-[#173F35] dark:text-[#8EAAA0] border border-[#DDD7C9] dark:border-[#223B2F] tracking-wider font-semibold">
                    STATUTORY INTEL
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#526058] dark:text-[#85978E] hidden sm:block tracking-tight mt-0.5">
                  {t.brand.subtext}
                </div>
              </div>
            </button>
          </div>

          {/* Nav links based on AUTHENTICATED vs LOGGED OUT state */}
          {!isAuthenticated ? (
            /* Logged Out Center Links */
            <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium">
              <button
                type="button"
                onClick={() => setScreen('ask')}
                className="text-[#4A5750] dark:text-[#A6B5AD] hover:text-[#173F35] dark:hover:text-[#EFECE6] transition-colors"
              >
                {t.nav?.research || 'Research'}
              </button>
              <button
                type="button"
                onClick={() => setScreen('landing')}
                className="text-[#4A5750] dark:text-[#A6B5AD] hover:text-[#173F35] dark:hover:text-[#EFECE6] transition-colors"
              >
                {t.nav?.about || 'About'}
              </button>
            </div>
          ) : (
            /* Logged In Center Quick Workspace Links */
            <div className="hidden md:flex items-center gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setScreen('ask')}
                className={`px-3 py-1.5 transition-colors ${
                  currentScreen === 'ask'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                }`}
              >
                {t.sidebar?.research || 'Research'}
              </button>
              <button
                type="button"
                onClick={() => setScreen('product_analysis')}
                className={`px-3 py-1.5 transition-colors ${
                  currentScreen === 'product_analysis'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                }`}
              >
                {t.sidebar?.investigations || 'Investigations'}
              </button>
              <button
                type="button"
                onClick={() => setScreen('evidence_audit')}
                className={`px-3 py-1.5 transition-colors ${
                  currentScreen === 'evidence_audit'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                }`}
              >
                {t.sidebar?.audit || 'Audit'}
              </button>
              <button
                type="button"
                onClick={() => setScreen('intelligence_report')}
                className={`px-3 py-1.5 transition-colors ${
                  currentScreen === 'intelligence_report'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-bold shadow-xs'
                    : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                }`}
              >
                {t.sidebar?.reports || 'Reports'}
              </button>
            </div>
          )}

          {/* Right Action / Auth Controls */}
          <div className="flex items-center gap-2.5">
            {!isAuthenticated ? (
              /* Unauthenticated: Sign In & Get Started Buttons */
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setScreen('login')}
                  className="px-3.5 py-1.5 text-[#173F35] dark:text-[#EFECE6] hover:bg-[#F7F5EF] dark:hover:bg-[#16271F] border border-transparent hover:border-[#DDD7C9] dark:hover:border-[#263C2F] transition-colors"
                >
                  {t.nav?.signIn || 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setScreen('signup')}
                  className="px-3.5 py-1.5 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8CB29C] text-[#FAF8F5] dark:text-[#0B120E] font-bold transition-colors shadow-xs"
                >
                  {t.nav?.getStarted || 'Get Started'}
                </button>
              </div>
            ) : (
              /* Authenticated User Area with Avatar & Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-2.5 py-1 bg-[#FCFBF7] dark:bg-[#111A15] border border-[#DDD7C9] dark:border-[#25392D] hover:border-[#173F35] dark:hover:border-[#759A84] transition-colors focus:outline-none"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  {/* Initials Avatar */}
                  <div className="w-7 h-7 bg-[#173F35] dark:bg-[#1F3E30] text-[#FAF8F5] dark:text-[#9ECBB0] border border-[#8C6D3B] flex items-center justify-center font-serif text-xs font-bold">
                    {getInitials(user?.name)}
                  </div>

                  {/* Name & Role */}
                  <div className="hidden sm:flex flex-col text-left font-mono">
                    <span className="text-xs font-bold text-[#1E2925] dark:text-[#EFECE6] leading-tight max-w-[130px] truncate">
                      {user?.name || 'Researcher'}
                    </span>
                    <span className="text-[9px] text-[#8C6D3B] uppercase font-semibold leading-tight">
                      {user?.role || 'Researcher'}
                    </span>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-[#6A7870] dark:text-[#8E9F96] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24382D] shadow-lg py-1 z-50 font-mono text-xs">
                    {/* User Info Header */}
                    <div className="px-3.5 py-2.5 border-b border-[#EFEBE1] dark:border-[#1C2C23]">
                      <div className="font-bold text-[#173F35] dark:text-[#9ECBB0] truncate">
                        {user?.name}
                      </div>
                      <div className="text-[10px] text-[#6A7870] dark:text-[#8E9F96] truncate">
                        {user?.email}
                      </div>
                      <div className="mt-1 inline-block px-1.5 py-0.5 bg-[#FAF8F3] dark:bg-[#14231B] border border-[#DDD7C9] dark:border-[#263D30] text-[9px] text-[#8C6D3B] font-bold uppercase">
                        {user?.role}
                      </div>
                    </div>

                    {/* Links: Profile, Preferences, Sign out */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setScreen('settings');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[#3D4B44] dark:text-[#CAD5CF] hover:bg-[#F7F5EF] dark:hover:bg-[#16251E]"
                      >
                        <User className="w-3.5 h-3.5 text-[#8C6D3B]" />
                        <span>{t.auth?.profile || 'Profile'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setScreen('settings');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[#3D4B44] dark:text-[#CAD5CF] hover:bg-[#F7F5EF] dark:hover:bg-[#16251E]"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#8C6D3B]" />
                        <span>{t.auth?.preferences || 'Preferences'}</span>
                      </button>

                      <div className="my-1 border-t border-[#EFEBE1] dark:border-[#1C2C23]"></div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[#9B2C2C] dark:text-[#F19292] hover:bg-[#FFFDFD] dark:hover:bg-[#1D1414]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.auth?.signOut || 'Sign out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Navigation Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#4A5750] dark:text-[#A6B5AD] hover:text-[#173F35] dark:hover:text-[#EFECE6]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] px-4 py-3 space-y-4 shadow-md font-mono">
          {!isAuthenticated ? (
            /* Logged Out Mobile Menu */
            <div className="space-y-3">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleMobileNav('ask')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]"
                >
                  <Search className="w-4 h-4 text-[#8C6D3B]" />
                  <span>{t.nav?.research || 'Research'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNav('landing')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]"
                >
                  <Compass className="w-4 h-4 text-[#8C6D3B]" />
                  <span>{t.nav?.about || 'About'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#EAE5DA] dark:border-[#1E2E25] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleMobileNav('login')}
                  className="w-full py-2 text-xs font-mono text-center border border-[#DDD7C9] dark:border-[#25392D]"
                >
                  {t.nav?.signIn || 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNav('signup')}
                  className="w-full py-2 text-xs font-mono text-center font-bold bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E]"
                >
                  {t.nav?.getStarted || 'Get Started'}
                </button>
              </div>
            </div>
          ) : (
            /* Logged In Mobile Menu: Complete Structured Workspace */
            <div className="space-y-4">
              {/* User header on mobile */}
              <div className="p-2.5 bg-[#FCFBF7] dark:bg-[#131E18] border border-[#E2DDD1] dark:border-[#203227] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#173F35] dark:text-[#9ECBB0]">
                    {user?.name}
                  </div>
                  <div className="text-[10px] text-[#6A7870] dark:text-[#8E9F96]">
                    {user?.role}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[11px] text-[#9B2C2C] dark:text-[#F19292] font-bold"
                >
                  {t.auth?.signOut || 'Sign out'}
                </button>
              </div>

              {/* WORKSPACE */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold px-2 py-1">
                  {t.sidebar?.workspace || 'WORKSPACE'}
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleMobileNav('ask')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'ask'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.sidebar?.research || 'Research'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('product_analysis')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'product_analysis'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>{t.sidebar?.investigations || 'Investigations'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('intelligence_report')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'intelligence_report'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.sidebar?.reports || 'Reports'}</span>
                  </button>
                </div>
              </div>

              {/* EVIDENCE */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#6A7870] dark:text-[#809489] font-bold px-2 py-1">
                  {t.sidebar?.evidence || 'EVIDENCE'}
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleMobileNav('evidence_audit')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'evidence_audit'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>{t.sidebar?.audit || 'Audit'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('history')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'history'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <History className="w-4 h-4" />
                    <span>{t.sidebar?.archive || 'Archive'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav('sources')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                      currentScreen === 'sources'
                        ? 'bg-[#173F35] text-[#FAF8F5] font-bold'
                        : 'text-[#4A5750] dark:text-[#A6B5AD] hover:bg-[#F7F5EF] dark:hover:bg-[#131F19]'
                    }`}
                  >
                    <Archive className="w-4 h-4" />
                    <span>{t.sidebar?.sources || 'Sources'}</span>
                  </button>
                </div>
              </div>

              {/* Preferences */}
              <div className="pt-2 border-t border-[#EAE5DA] dark:border-[#1C2C23] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleMobileNav('settings')}
                  className="text-[#173F35] dark:text-[#8DA998] font-bold flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t.nav.settings}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

