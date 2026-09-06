import React from 'react';
import { useAuth } from './AuthContext';
import { Screen, Language } from '../types';
import { translations } from '../i18n/translations';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onRedirectToLogin: (returnScreen: Screen) => void;
  language: Language;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  currentScreen,
  onRedirectToLogin,
  language,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const t = translations[language];

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-8">
        <div className="flex items-center gap-3 font-mono text-xs text-[#526058] dark:text-[#8FA097]">
          <span className="w-2 h-2 rounded-full bg-[#173F35] dark:bg-[#759A84] animate-pulse"></span>
          <span>Verifying authentication status…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto my-12 sm:my-20 px-4 sm:px-6">
        <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-8 sm:p-10 tech-box shadow-sm text-center space-y-6">
          <div className="w-12 h-12 mx-auto bg-[#F7F5EF] dark:bg-[#15231B] border border-[#DDD7C9] dark:border-[#2A3F32] flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#8C6D3B]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C6D3B] font-bold">
              WORKSPACE ACCESS RESTRICTED // AUTHENTICATION REQUIRED
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
              {t.auth?.signInToContinue || 'Sign in to continue'}
            </h2>
            <p className="text-sm text-[#526058] dark:text-[#BAC7C0] leading-relaxed">
              {t.auth?.workspaceRequiresAccount || 'Your AyurGuard research workspace requires an account.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => onRedirectToLogin(currentScreen)}
              className="w-full sm:w-auto px-6 py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>{t.auth?.signIn || 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-4 border-t border-[#EAE5DA] dark:border-[#1E2E25] text-[11px] font-mono text-[#6A7870] dark:text-[#809489]">
            <span>{t.auth?.prototypeNotice || 'Authentication prototype — mock authorization service ready for FastAPI / JWT.'}</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
