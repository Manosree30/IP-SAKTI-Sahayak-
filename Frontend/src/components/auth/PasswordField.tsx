import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  showHideText?: { show: string; hide: string };
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder = '••••••••',
  autoComplete = 'current-password',
  required = false,
  showHideText = { show: 'Show password', hide: 'Hide password' },
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 text-left font-mono">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-[#173F35] dark:text-[#9ECBB0]"
        >
          {label} {required && <span className="text-[#9B2C2C] dark:text-[#E07A7A]">*</span>}
        </label>
      </div>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-[#FCFBF7] dark:bg-[#121B16] border ${
            error
              ? 'border-[#9B2C2C] dark:border-[#E07A7A] text-[#9B2C2C] dark:text-[#F19292]'
              : 'border-[#DDD7C9] dark:border-[#25392D] text-[#1E2925] dark:text-[#EFECE6] focus:border-[#173F35] dark:focus:border-[#759A84]'
          } px-3 py-2.5 pr-10 text-xs font-mono focus:outline-none transition-colors`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6A7870] dark:text-[#8FA097] hover:text-[#173F35] dark:hover:text-[#FAF8F5] focus:outline-none"
          aria-label={showPassword ? showHideText.hide : showHideText.show}
          title={showPassword ? showHideText.hide : showHideText.show}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="text-[11px] font-mono text-[#9B2C2C] dark:text-[#F19292]">
          {error}
        </p>
      )}
    </div>
  );
};
