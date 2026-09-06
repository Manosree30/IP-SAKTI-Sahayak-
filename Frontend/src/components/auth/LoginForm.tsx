import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { DEMO_USER, DEMO_PASSWORD } from '../../auth/authService';
import { Screen, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { PasswordField } from './PasswordField';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface LoginFormProps {
  setScreen: (screen: Screen) => void;
  language: Language;
  returnScreen?: Screen;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  setScreen,
  language,
  returnScreen = 'ask',
}) => {
  const { login } = useAuth();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleFillDemo = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_PASSWORD);
    setErrorMessage(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = t.auth?.emailRequired || 'Email is required.';
    }
    if (!password) {
      newErrors.password = t.auth?.passwordRequired || 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({ email, password, rememberMe });
      if (result.success) {
        // Redirect to requested screen (or default to Research 'ask')
        setScreen(returnScreen || 'ask');
      } else {
        setErrorMessage(
          result.error === 'Email or password is incorrect.'
            ? (t.auth?.invalidCredentials || 'Email or password is incorrect.')
            : (result.error || t.auth?.invalidCredentials || 'Email or password is incorrect.')
        );
      }
    } catch {
      setErrorMessage(t.auth?.invalidCredentials || 'Email or password is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 text-left">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C6D3B] font-bold">
          SECURITY PROTOCOL // ACCESS WORKSPACE
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
          {t.auth?.signInHeading || 'Sign in to AyurGuard'}
        </h2>
        <p className="text-xs sm:text-sm text-[#526058] dark:text-[#BAC7C0]">
          {t.auth?.signInSubheading || 'Access your regulatory and IP research workspace.'}
        </p>
      </div>

      {/* Demo Credentials Quick Fill Utility */}
      <div className="p-3 bg-[#FCFBF7] dark:bg-[#121E18] border border-[#DDD7C9] dark:border-[#22382D] flex items-center justify-between text-xs font-mono">
        <div className="space-y-0.5">
          <div className="font-bold text-[#173F35] dark:text-[#9ECBB0] flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3 h-3 text-[#8C6D3B]" />
            <span>{t.auth?.demoTitle || 'Reviewer Demo Account'}</span>
          </div>
          <div className="text-[10px] text-[#6A7870] dark:text-[#8E9F96]">
            researcher@example.com · {DEMO_PASSWORD}
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="px-2.5 py-1 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0C1310] font-bold text-[10px] uppercase hover:bg-[#102E26] transition-colors"
        >
          {t.auth?.fillDemo || 'Use Demo'}
        </button>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3 bg-[#FFFDFD] dark:bg-[#1A1212] border border-[#E07A7A] text-[#9B2C2C] dark:text-[#F19292] text-xs font-mono flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        {/* Email */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
          >
            {t.auth?.emailLabel || 'Email address'} <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="name@organization.com"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={`w-full bg-[#FCFBF7] dark:bg-[#121B16] border ${
              errors.email
                ? 'border-[#9B2C2C] dark:border-[#E07A7A]'
                : 'border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84]'
            } px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors`}
          />
          {errors.email && (
            <p id="login-email-error" className="text-[11px] text-[#9B2C2C] dark:text-[#F19292]">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <PasswordField
          id="login-password"
          name="password"
          label={t.auth?.passwordLabel || 'Password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          error={errors.password}
          required
          autoComplete="current-password"
          showHideText={{
            show: t.auth?.showPassword || 'Show password',
            hide: t.auth?.hidePassword || 'Hide password',
          }}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#526058] dark:text-[#BAC7C0]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#173F35] dark:accent-[#759A84] w-3.5 h-3.5"
            />
            <span className="text-[11px]">{t.auth?.rememberMe || 'Remember me'}</span>
          </label>

          <button
            type="button"
            onClick={() => setScreen('forgot_password')}
            className="text-[11px] font-bold text-[#8C6D3B] hover:underline focus:outline-none"
          >
            {t.auth?.forgotPassword || 'Forgot password?'}
          </button>
        </div>

        {/* Primary Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-xs"
        >
          {isLoading ? (
            <span>{t.auth?.signingIn || 'Signing in…'}</span>
          ) : (
            <>
              <span>{t.auth?.signIn || 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E3D8] dark:border-[#203227]"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#6A7870] dark:text-[#8E9F96]">
            <span className="bg-[#FFFFFF] dark:bg-[#0E1712] px-3 font-mono">
              {t.auth?.orDivider || 'OR'}
            </span>
          </div>
        </div>

        {/* Secondary SSO Options (Prototype UI-only) */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              setErrorMessage(
                t.auth?.prototypeNoticeSSO ||
                  'Prototype Notice: External OAuth (Google/Microsoft) is a mock interface ready to connect to production identity providers.'
              );
            }}
            className="w-full py-2.5 px-3 bg-[#FCFBF7] dark:bg-[#131E18] hover:bg-[#F7F5EF] dark:hover:bg-[#192720] border border-[#DDD7C9] dark:border-[#283C30] text-[#1E2925] dark:text-[#CAD5CF] font-mono text-xs flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t.auth?.continueWithGoogle || 'Continue with Google'}</span>
            <span className="text-[9px] text-[#8C6D3B] font-bold">({t.auth?.prototypeBadge || 'Prototype'})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setErrorMessage(
                t.auth?.prototypeNoticeSSO ||
                  'Prototype Notice: External OAuth (Google/Microsoft) is a mock interface ready to connect to production identity providers.'
              );
            }}
            className="w-full py-2.5 px-3 bg-[#FCFBF7] dark:bg-[#131E18] hover:bg-[#F7F5EF] dark:hover:bg-[#192720] border border-[#DDD7C9] dark:border-[#283C30] text-[#1E2925] dark:text-[#CAD5CF] font-mono text-xs flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            <span>{t.auth?.continueWithMicrosoft || 'Continue with Microsoft'}</span>
            <span className="text-[9px] text-[#8C6D3B] font-bold">({t.auth?.prototypeBadge || 'Prototype'})</span>
          </button>
        </div>

        {/* Footer Switch */}
        <div className="pt-4 text-center text-xs font-mono text-[#526058] dark:text-[#BAC7C0]">
          <span>{t.auth?.dontHaveAccount || "Don't have an account?"} </span>
          <button
            type="button"
            onClick={() => setScreen('signup')}
            className="font-bold text-[#173F35] dark:text-[#9ECBB0] hover:underline"
          >
            {t.auth?.createAccount || 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
};
