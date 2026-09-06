import React, { useState, useEffect } from 'react';
import { Screen, Language, Theme, ResponsePreference } from '../types';
import { translations } from '../i18n/translations';
import { useAuth } from '../auth/AuthContext';
import { UserRole } from '../auth/types';
import { 
  Settings, 
  Globe, 
  Scale, 
  ShieldCheck, 
  FileText, 
  Database, 
  Sliders, 
  Check,
  Save,
  CheckCircle2,
  User,
  Building2,
  Mail,
  Award
} from 'lucide-react';

interface SettingsViewProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  responsePref: ResponsePreference;
  setResponsePref: (pref: ResponsePreference) => void;
  setScreen: (screen: Screen) => void;
}

const ROLES: UserRole[] = [
  'Founder / Entrepreneur',
  'Researcher',
  'Ayurveda Practitioner',
  'IP Professional',
  'Regulatory Professional',
  'Student / Academic',
  'Other',
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  responsePref,
  setResponsePref,
  setScreen,
}) => {
  const t = translations[language];
  const { user, isAuthenticated, updateProfile } = useAuth();

  const [userName, setUserName] = useState(user?.name || 'Dr. Ananya Sharma');
  const [userEmail, setUserEmail] = useState(user?.email || 'researcher@example.com');
  const [userOrg, setUserOrg] = useState(user?.organization || 'Council of AYUSH IP Experts');
  const [userRole, setUserRole] = useState<UserRole>(user?.role || 'Researcher');

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setUserOrg(user.organization || '');
      setUserRole(user.role);
    }
  }, [user]);

  const [jurisdictionPriority, setJurisdictionPriority] = useState<string>('india_ayush');
  const [strictnessLevel, setStrictnessLevel] = useState<string>('strict_statutory');
  const [authorityThreshold, setAuthorityThreshold] = useState<string>('tier_1_only');
  const [citationFormat, setCitationFormat] = useState<string>('legal_bluebook');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    if (isAuthenticated) {
      updateProfile({
        name: userName,
        email: userEmail,
        organization: userOrg,
        role: userRole,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div id="settings-view-root" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-semibold">
              INSTITUTIONAL PREFERENCES
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
            {t.settings.title}
          </h1>
          <p className="text-sm text-[#526058] dark:text-[#BAC7C0] mt-1">
            {t.settings.subtitle}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FCFBF7] text-[#13402A] dark:bg-[#163325] dark:text-[#8CCCA6] border border-[#C8DFD2] font-mono text-xs font-bold animate-fadeIn shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6D3B]" />
            <span>Preferences Updated</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Section 0: User Profile */}
        <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#8C6D3B]" />
              <h3 className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998]">
                00. User Profile &amp; Researcher Credentials
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#8C6D3B] uppercase font-bold">
              {isAuthenticated ? 'Active Authenticated Profile' : 'Guest (Session Simulation)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-left">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="settings-user-name" className="block text-[11px] font-bold uppercase tracking-wider text-[#526058] dark:text-[#BAC7C0]">
                Name
              </label>
              <input
                id="settings-user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="settings-user-email" className="block text-[11px] font-bold uppercase tracking-wider text-[#526058] dark:text-[#BAC7C0]">
                Email Address
              </label>
              <input
                id="settings-user-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              />
            </div>

            {/* Organization */}
            <div className="space-y-1">
              <label htmlFor="settings-user-org" className="block text-[11px] font-bold uppercase tracking-wider text-[#526058] dark:text-[#BAC7C0]">
                Organization
              </label>
              <input
                id="settings-user-org"
                type="text"
                value={userOrg}
                onChange={(e) => setUserOrg(e.target.value)}
                placeholder="Institutional affiliation"
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label htmlFor="settings-user-role" className="block text-[11px] font-bold uppercase tracking-wider text-[#526058] dark:text-[#BAC7C0]">
                Role
              </label>
              <select
                id="settings-user-role"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] px-2.5 py-2 text-xs font-mono focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 1: Multilingual Engine */}
        <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
            <Globe className="w-4 h-4 text-[#8C6D3B]" />
            <h3 className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998]">
              {t.settings.languageSection}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            {(['en', 'ta', 'hi'] as const).map((code) => {
              const langOpt = t.settings.languageOptions[code];
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code as Language)}
                  className={`p-3 text-left border transition-all ${
                    language === code
                      ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] dark:border-[#759A84] font-bold shadow-xs'
                      : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
                  }`}
                >
                  <div className="font-bold">{langOpt.label}</div>
                  <div className="text-[10px] opacity-80 mt-1">{langOpt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Regulatory Jurisdiction Priority */}
        <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
            <Scale className="w-4 h-4 text-[#8C6D3B]" />
            <h3 className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998]">
              02. Primary Regulatory Jurisdiction Weighting
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {[
              { id: 'india_ayush', title: 'India (MoA, IPO, NBA)', desc: 'Prioritizes Section 3(p), Rule 158B, and NBA Section 6' },
              { id: 'us_fda', title: 'United States (US FDA / USPTO)', desc: 'Prioritizes 21 CFR 101.93, DSHEA, and 35 U.S.C. 101' },
              { id: 'eu_ema', title: 'European Union (EMA / HMPC)', desc: 'Prioritizes Directive 2004/24/EC and Traditional Herbal Monograph' },
              { id: 'global_wipo', title: 'Multilateral Global (WIPO / PCT)', desc: 'Prioritizes PCT Article 33 and Nagoya Protocol treaties' },
            ].map((j) => (
              <label
                key={j.id}
                className={`p-3 border flex items-start gap-2.5 cursor-pointer transition-colors ${
                  jurisdictionPriority === j.id
                    ? 'bg-[#F4EFE6] dark:bg-[#18261F] border-[#173F35] dark:border-[#759A84] text-[#173F35] dark:text-[#EFECE6] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] border-[#DDD7C9] dark:border-[#25392D] text-[#526058] dark:text-[#A7B8AF]'
                }`}
              >
                <input
                  type="radio"
                  name="jurisdiction"
                  checked={jurisdictionPriority === j.id}
                  onChange={() => setJurisdictionPriority(j.id)}
                  className="mt-0.5 accent-[#173F35] dark:accent-[#759A84]"
                />
                <div>
                  <span className="font-bold block">{j.title}</span>
                  <span className="text-[10px] text-[#6A7870] dark:text-[#8FA097] mt-0.5 block">{j.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section 3: Authority Threshold & Strictness Level */}
        <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#8C6D3B]" />
            <h3 className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#8DA998]">
              03. Evidence Verification &amp; Authority Threshold
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[11px] font-bold text-[#173F35] dark:text-[#8DA998] uppercase mb-1.5">
                Statutory Strictness Mode
              </label>
              <select
                value={strictnessLevel}
                onChange={(e) => setStrictnessLevel(e.target.value)}
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] p-2 text-xs text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35]"
              >
                <option value="strict_statutory">Strict Statutory (Requires direct gazette/codified citation)</option>
                <option value="balanced_academic">Balanced Academic (Permits peer-reviewed Ayurvedic trials)</option>
                <option value="exploratory_rnd">Exploratory R&amp;D (Includes provisional claims and emerging research)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#173F35] dark:text-[#8DA998] uppercase mb-1.5">
                Authority Classification Bar
              </label>
              <select
                value={authorityThreshold}
                onChange={(e) => setAuthorityThreshold(e.target.value)}
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] p-2 text-xs text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35]"
              >
                <option value="tier_1_only">Tier 1 Statutory Acts &amp; Classical Canon Only</option>
                <option value="tier_1_and_2">Tier 1 &amp; Tier 2 (Includes Pharmacopoeia Monographs)</option>
                <option value="all_verified">All Verified Knowledge Records</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Visual Theme & Regulatory Ledger Aesthetics */}
        <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-5 space-y-4 tech-box shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-2">
            <span className="font-mono text-xs text-[#8C6D3B] font-bold">☀ / ☾</span>
            <h3 className="font-mono text-xs uppercase font-bold text-[#173F35] dark:text-[#9ECBB0]">
              {t.settings.themeSection}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3 text-left border transition-all ${
                theme === 'light'
                  ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] shadow-xs font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>{t.settings.themeOptions.light.label}</span>
                {theme === 'light' && (
                  <span className="text-[10px] bg-[#8C6D3B] text-white px-1.5 py-0.2 uppercase">
                    {t.settings.themeOptions.light.badge}
                  </span>
                )}
              </div>
              <div className="text-[10px] opacity-80 mt-1 font-normal">
                {t.settings.themeOptions.light.desc}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3 text-left border transition-all ${
                theme === 'system'
                  ? 'bg-[#8C6D3B] text-white border-[#8C6D3B] shadow-xs font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>{t.settings.themeOptions.system.label}</span>
              </div>
              <div className="text-[10px] opacity-80 mt-1 font-normal">
                {t.settings.themeOptions.system.desc}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3 text-left border transition-all ${
                theme === 'dark'
                  ? 'bg-[#142019] text-[#EFECE6] border-[#2A4435] shadow-xs font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>{t.settings.themeOptions.dark.label}</span>
              </div>
              <div className="text-[10px] opacity-80 mt-1 font-normal">
                {t.settings.themeOptions.dark.desc}
              </div>
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD1] dark:border-[#1E2E25]">
          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className="px-4 py-2 bg-transparent text-[#526058] dark:text-[#BAC7C0] font-mono text-xs hover:underline"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-[#8C6D3B]" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
