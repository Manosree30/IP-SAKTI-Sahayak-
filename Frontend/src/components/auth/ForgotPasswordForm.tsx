import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Screen, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  setScreen: (screen: Screen) => void;
  language: Language;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setScreen,
  language,
}) => {
  const { resetPassword } = useAuth();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t.auth?.emailRequired || 'Email address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(t.auth?.validEmailRequired || 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError(res.message);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-12 h-12 mx-auto bg-[#FCFBF7] dark:bg-[#12231A] border border-[#DDD7C9] dark:border-[#2A3F32] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-[#173F35] dark:text-[#9ECBB0]" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C6D3B] font-bold">
            RESET DISPATCH SIMULATED
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
            {t.auth?.checkEmailHeading || 'Check your email'}
          </h2>
          <p className="text-xs sm:text-sm text-[#526058] dark:text-[#BAC7C0] max-w-sm mx-auto leading-relaxed">
            {t.auth?.resetEmailNotice ||
              'This prototype does not send real email. In production, this action will connect to the authentication backend.'}
          </p>
        </div>

        <div className="p-3 bg-[#FCFBF7] dark:bg-[#101A14] border border-[#DDD7C9] dark:border-[#22352A] text-[11px] font-mono text-[#526058] dark:text-[#8E9F96]">
          Target address: <span className="font-bold text-[#173F35] dark:text-[#9ECBB0]">{email}</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="w-full py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.auth?.returnToSignIn || 'Return to Sign In'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 text-left">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C6D3B] font-bold">
          SECURITY PROTOCOL // CREDENTIAL RECOVERY
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
          {t.auth?.resetPasswordHeading || 'Reset your password'}
        </h2>
        <p className="text-xs sm:text-sm text-[#526058] dark:text-[#BAC7C0]">
          {t.auth?.resetPasswordSubheading ||
            "Enter your email address and we'll send instructions to reset your password."}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="p-3 bg-[#FFFDFD] dark:bg-[#1A1212] border border-[#E07A7A] text-[#9B2C2C] dark:text-[#F19292] text-xs font-mono flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs text-left">
        <div className="space-y-1.5">
          <label
            htmlFor="forgot-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
          >
            {t.auth?.emailLabel || 'Email address'} <span className="text-[#9B2C2C]">*</span>
          </label>
          <div className="relative">
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="name@organization.com"
              autoComplete="email"
              required
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84] px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-xs"
        >
          {isLoading ? (
            <span>Sending Instructions…</span>
          ) : (
            <>
              <span>{t.auth?.sendResetLink || 'Send Reset Link'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <div className="pt-3 text-center">
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="inline-flex items-center gap-1.5 font-bold text-xs text-[#526058] dark:text-[#BAC7C0] hover:text-[#173F35] dark:hover:text-[#9ECBB0]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{t.auth?.backToSignIn || 'Back to Sign In'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
