import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Sliders, 
  Bell, 
  User, 
  ShieldCheck, 
  Check, 
  LogOut 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';

export const SettingsPage: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    responsePreference, 
    setResponsePreference,
    user,
    setUser,
    setIsAuthModalOpen
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [researchAlertsEnabled, setResearchAlertsEnabled] = useState(true);
  const [citationDisplay, setCitationDisplay] = useState<'full' | 'compact'>('full');
  const [savedNote, setSavedNote] = useState(false);

  const handleSavePreferences = () => {
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  const languageOptions: { code: LanguageCode; name: string; nativeName: string; desc: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', desc: 'Primary interface language' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', desc: 'Tamil interface language' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', desc: 'Hindi interface language' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', desc: 'Telugu interface language' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', desc: 'Malayalam interface language' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', desc: 'Kannada interface language' },
  ];

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#E6D3B3] pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences & Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#63483D]">
            Manage interface language, analysis preferences, and regulatory intelligence defaults.
          </p>
        </div>

        {savedNote && (
          <span className="text-xs font-semibold text-[#2E6B20] bg-[#2E6B20]/10 px-3 py-1 rounded-full border border-[#2E6B20]/30 animate-pulse">
            Preferences Saved!
          </span>
        )}
      </div>

      {/* 1. LANGUAGE SETTINGS */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE0D0] pb-3">
          <Globe className="w-5 h-5 text-[#8E241C]" />
          <h2 className="font-serif text-lg font-bold text-[#3A160F]">
            Language / மொழி / भाषा
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {languageOptions.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  handleSavePreferences();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8E241C] text-[#FFF7EC] border-[#8E241C] shadow-sm'
                    : 'bg-[#FAF4EB] hover:bg-[#F2E5D0] text-[#3A160F] border-[#D8C2A0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">
                    {lang.nativeName} ({lang.name})
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#FFF7EC]" />}
                </div>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-[#F5E8D2]/80' : 'text-[#7A5B4C]'}`}>
                  {lang.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. APPEARANCE SETTINGS */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE0D0] pb-3">
          <Sun className="w-5 h-5 text-[#8E241C]" />
          <h2 className="font-serif text-lg font-bold text-[#3A160F]">
            Appearance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', title: 'Light', desc: 'Warm, parchment paper-inspired Ayurvedic canvas' },
            { id: 'system', title: 'System', desc: 'Follow your operating device appearance preference' },
            { id: 'dark', title: 'Dark Wood', desc: 'Deep sandalwood and teakwood ambient interface' },
          ].map((item) => {
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTheme(item.id as any);
                  handleSavePreferences();
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3A160F] text-[#F5E8D2] border-[#B8955A] shadow-sm'
                    : 'bg-[#FAF4EB] hover:bg-[#F2E5D0] text-[#3A160F] border-[#D8C2A0]'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>{item.title}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#B8955A]" />}
                </div>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-[#E6D3B3]/75' : 'text-[#7A5B4C]'}`}>
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ANALYSIS PREFERENCES */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-[#EAE0D0] pb-3">
          <Sliders className="w-5 h-5 text-[#8E241C]" />
          <h2 className="font-serif text-lg font-bold text-[#3A160F]">
            Analysis & Guidance Preferences
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#3A160F] mb-1.5">
              Response Granularity
            </label>
            <div className="flex gap-2">
              {(['Concise', 'Balanced', 'Detailed'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setResponsePreference(lvl)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                    responsePreference === lvl
                      ? 'bg-[#8E241C] text-[#FFF7EC] border-[#8E241C]'
                      : 'bg-[#FAF4EB] text-[#3A160F] border-[#D8C2A0]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#7A5B4C] mt-1">
              Determines the depth of statutory rationale and classical cross-referencing.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3A160F] mb-1.5">
              Citation Display Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCitationDisplay('full')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  citationDisplay === 'full'
                    ? 'bg-[#8E241C] text-[#FFF7EC] border-[#8E241C]'
                    : 'bg-[#FAF4EB] text-[#3A160F] border-[#D8C2A0]'
                }`}
              >
                Full Citations & Quotes
              </button>
              <button
                onClick={() => setCitationDisplay('compact')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  citationDisplay === 'compact'
                    ? 'bg-[#8E241C] text-[#FFF7EC] border-[#8E241C]'
                    : 'bg-[#FAF4EB] text-[#3A160F] border-[#D8C2A0]'
                }`}
              >
                Compact References
              </button>
            </div>
            <p className="text-[11px] text-[#7A5B4C] mt-1">
              Controls whether verbatim slokas and legal acts display inline.
            </p>
          </div>
        </div>
      </div>

      {/* 4. NOTIFICATIONS */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE0D0] pb-3">
          <Bell className="w-5 h-5 text-[#8E241C]" />
          <h2 className="font-serif text-lg font-bold text-[#3A160F]">
            Notifications
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3]">
            <div>
              <span className="font-semibold text-[#3A160F] block">Analysis Completion Alerts</span>
              <span className="text-[11px] text-[#7A5B4C]">Receive immediate notification when background patent parsing completes</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="accent-[#8E241C] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF4EB] border border-[#E6D8C3]">
            <div>
              <span className="font-semibold text-[#3A160F] block">Gazette & Regulatory Updates</span>
              <span className="text-[11px] text-[#7A5B4C]">Periodic alerts on new Ministry of AYUSH and NBA notification gazettes</span>
            </div>
            <input
              type="checkbox"
              checked={researchAlertsEnabled}
              onChange={(e) => setResearchAlertsEnabled(e.target.checked)}
              className="accent-[#8E241C] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 5. USER PROFILE & AUTH */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE0D0] pb-3">
          <User className="w-5 h-5 text-[#8E241C]" />
          <h2 className="font-serif text-lg font-bold text-[#3A160F]">
            User Profile
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF4EB] border border-[#E0CFB3]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8E241C] to-[#4A2117] text-[#FFF7EC] font-serif font-bold text-base flex items-center justify-center border border-[#B8955A]">
              {user.avatarInitials || 'AU'}
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#3A160F]">
                {user.name && user.name.trim() ? user.name : 'AyurGuard User'}
              </h3>
              <p className="text-xs text-[#8E241C] font-semibold">{user.role || 'Researcher'}</p>
              <p className="text-[11px] text-[#8C6D5F]">{user.email || 'researcher@ayurguard.org'}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-4 py-2 bg-[#EFE0C5] hover:bg-[#8E241C] text-[#3A160F] hover:text-[#FFF7EC] rounded-xl text-xs font-semibold transition-colors self-start sm:self-center cursor-pointer"
          >
            Manage Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
