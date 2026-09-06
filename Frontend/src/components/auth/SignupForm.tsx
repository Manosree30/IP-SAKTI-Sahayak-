import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { UserRole } from '../../auth/types';
import { Screen, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { PasswordField } from './PasswordField';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignupFormProps {
  setScreen: (screen: Screen) => void;
  language: Language;
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

export const SignupForm: React.FC<SignupFormProps> = ({ setScreen, language }) => {
  const { signup } = useAuth();
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<UserRole>('Researcher');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    organization?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = t.auth?.nameRequired || 'Full name is required.';
    }
    if (!email.trim()) {
      newErrors.email = t.auth?.emailRequired || 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = t.auth?.validEmailRequired || 'Please enter a valid email address.';
      }
    }
    if (!password) {
      newErrors.password = t.auth?.passwordRequired || 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = t.auth?.passwordMinLength || 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.auth?.passwordMismatch || 'Passwords do not match.';
    }
    if (!agreeToTerms) {
      newErrors.agreeToTerms = t.auth?.termsRequired || 'You must agree to the Terms of Use and Privacy Policy.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup({
        name,
        email,
        organization,
        role,
        password,
        confirmPassword,
        agreeToTerms,
      });

      if (result.success) {
        // Redirect to research workspace after successful registration
        setScreen('ask');
      } else {
        setErrorMessage(result.error || 'Registration could not be completed.');
      }
    } catch {
      setErrorMessage('Registration error. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 text-left">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C6D3B] font-bold">
          ACCOUNT ONBOARDING // STATUTORY RESEARCHER
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
          {t.auth?.createWorkspaceHeading || 'Create your AyurGuard workspace'}
        </h2>
        <p className="text-xs sm:text-sm text-[#526058] dark:text-[#BAC7C0]">
          {t.auth?.createWorkspaceSubheading || 'Initialize an evidence-backed IP and regulatory intelligence profile.'}
        </p>
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
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs text-left">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
          >
            {t.auth?.fullNameLabel || 'Full Name'} <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Dr. Vaidya / Researcher Name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'signup-name-error' : undefined}
            className={`w-full bg-[#FCFBF7] dark:bg-[#121B16] border ${
              errors.name
                ? 'border-[#9B2C2C] dark:border-[#E07A7A]'
                : 'border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84]'
            } px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors`}
          />
          {errors.name && (
            <p id="signup-name-error" className="text-[11px] text-[#9B2C2C] dark:text-[#F19292]">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
          >
            {t.auth?.emailLabel || 'Email Address'} <span className="text-[#9B2C2C]">*</span>
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="researcher@institution.org"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'signup-email-error' : undefined}
            className={`w-full bg-[#FCFBF7] dark:bg-[#121B16] border ${
              errors.email
                ? 'border-[#9B2C2C] dark:border-[#E07A7A]'
                : 'border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84]'
            } px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors`}
          />
          {errors.email && (
            <p id="signup-email-error" className="text-[11px] text-[#9B2C2C] dark:text-[#F19292]">
              {errors.email}
            </p>
          )}
        </div>

        {/* Organization & Role in 2-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <label
              htmlFor="signup-org"
              className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
            >
              {t.auth?.organizationLabel || 'Organization'}
            </label>
            <input
              id="signup-org"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Herbals Lab / Law Firm"
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84] px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-role"
              className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
            >
              {t.auth?.roleLabel || 'Role'} <span className="text-[#9B2C2C]">*</span>
            </label>
            <select
              id="signup-role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84] px-2.5 py-2.5 text-xs font-mono focus:outline-none transition-colors"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {t.auth?.roles?.[r] || r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Password */}
        <PasswordField
          id="signup-password"
          name="password"
          label={t.auth?.passwordLabel || 'Password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          error={errors.password}
          required
          autoComplete="new-password"
          showHideText={{
            show: t.auth?.showPassword || 'Show password',
            hide: t.auth?.hidePassword || 'Hide password',
          }}
        />

        {/* Confirm Password */}
        <PasswordField
          id="signup-confirm-password"
          name="confirmPassword"
          label={t.auth?.confirmPasswordLabel || 'Confirm Password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
          }}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
          showHideText={{
            show: t.auth?.showPassword || 'Show password',
            hide: t.auth?.hidePassword || 'Hide password',
          }}
        />

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-[#526058] dark:text-[#BAC7C0]">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => {
                setAgreeToTerms(e.target.checked);
                if (errors.agreeToTerms) setErrors({ ...errors, agreeToTerms: undefined });
              }}
              className="accent-[#173F35] dark:accent-[#759A84] w-3.5 h-3.5 mt-0.5"
            />
            <span className="text-[11px] leading-snug">
              {t.auth?.agreeTerms || 'I agree to the Terms of Use and Privacy Policy.'}
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-[11px] text-[#9B2C2C] dark:text-[#F19292] mt-1">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-3 bg-[#173F35] hover:bg-[#102E26] dark:bg-[#759A84] dark:hover:bg-[#8AB09A] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-xs"
        >
          {isLoading ? (
            <span>{t.auth?.creatingAccount || 'Creating Account…'}</span>
          ) : (
            <>
              <span>{t.auth?.createAccount || 'Create Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Footer Link */}
        <div className="pt-4 text-center text-xs font-mono text-[#526058] dark:text-[#BAC7C0]">
          <span>{t.auth?.alreadyHaveAccount || 'Already have an account?'} </span>
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="font-bold text-[#173F35] dark:text-[#9ECBB0] hover:underline"
          >
            {t.auth?.signInLink || 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};
