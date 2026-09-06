import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AyurLogo } from './AyurLogo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser, registerUser, loginUser } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup') {
      const cleanName = name.trim() || 'AyurGuard User';
      const cleanEmail = email.trim() || 'researcher@ayurguard.org';
      registerUser(cleanName, cleanEmail);
      setFeedback(`Account created for ${cleanName}! Welcome to AyurGuard.`);
      setTimeout(() => {
        setFeedback(null);
        setIsAuthModalOpen(false);
      }, 1200);
    } else if (authMode === 'login') {
      const cleanEmail = email.trim();
      const cleanName = name.trim();
      loginUser(cleanEmail, cleanName);
      const displayName = cleanName || 'AyurGuard User';
      setFeedback(`Logged in successfully! Welcome back.`);
      setTimeout(() => {
        setFeedback(null);
        setIsAuthModalOpen(false);
      }, 1000);
    } else {
      setFeedback('Password reset instructions sent to your email.');
      setTimeout(() => {
        setFeedback(null);
        setAuthMode('login');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF4EB] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#B8955A] shadow-2xl space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1 rounded-full text-[#8C6D5F] hover:text-[#3A160F] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <AyurLogo size="lg" variant="light" />
          </div>
          <p className="text-xs text-[#63483D] max-w-xs mx-auto">
            AI-Powered IP & Regulatory Guidance for Ayurveda Innovators
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 bg-[#EFE0C5] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authMode === 'login' 
                ? 'bg-[#8E241C] text-[#FFF7EC] shadow-xs' 
                : 'text-[#3A160F] hover:text-[#8E241C]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authMode === 'signup' 
                ? 'bg-[#8E241C] text-[#FFF7EC] shadow-xs' 
                : 'text-[#3A160F] hover:text-[#8E241C]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('forgot')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              authMode === 'forgot' 
                ? 'bg-[#8E241C] text-[#FFF7EC] shadow-xs' 
                : 'text-[#3A160F] hover:text-[#8E241C]'
            }`}
          >
            Reset
          </button>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-xl bg-[#2E6B20]/10 border border-[#2E6B20]/30 text-xs font-medium text-[#2E6B20] text-center">
            {feedback}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="block font-semibold text-[#3A160F] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#FFFDF9] border border-[#D8C2A0] rounded-xl text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#3A160F] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@ayurveda.edu"
                className="w-full pl-10 pr-3 py-2.5 bg-[#FFFDF9] border border-[#D8C2A0] rounded-xl text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#3A160F]">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#8E241C] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D5F]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#FFFDF9] border border-[#D8C2A0] rounded-xl text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
                />
              </div>
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auth-remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#8E241C] w-3.5 h-3.5"
              />
              <label htmlFor="auth-remember" className="text-[11px] text-[#7A5B4C] cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8E241C] to-[#6F1D18] hover:from-[#781E17] hover:to-[#591612] text-[#FFF7EC] font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>
              {authMode === 'login' ? 'Log In to Workspace' : authMode === 'signup' ? 'Create Research Account' : 'Send Reset Link'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Federated Research Login */}
        <div className="pt-2 border-t border-[#EAE0D0] text-center space-y-2">
          <p className="text-[10px] text-[#8C6D5F]">
            Or continue with Academic / Institutional Single Sign-On
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setUser({
                  name: 'Institutional Researcher',
                  email: 'researcher@ccras.res.in',
                  role: 'CCRAS AYUSH Scientist',
                  avatarInitials: 'IR'
                });
                setIsAuthModalOpen(false);
              }}
              className="flex-1 py-2 px-3 bg-[#FFFDF9] hover:bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[11px] font-semibold text-[#3A160F] transition-colors cursor-pointer"
            >
              Institutional SSO
            </button>
            <button
              onClick={() => {
                setUser({
                  name: 'ORCID Scholar',
                  email: 'scholar@orcid.org',
                  role: 'Researcher',
                  avatarInitials: 'OS'
                });
                setIsAuthModalOpen(false);
              }}
              className="flex-1 py-2 px-3 bg-[#FFFDF9] hover:bg-[#FAF4EB] border border-[#D8C2A0] rounded-xl text-[11px] font-semibold text-[#3A160F] transition-colors cursor-pointer"
            >
              ORCID Login
            </button>
          </div>
        </div>

        <p className="text-[10px] text-[#8C6D5F] text-center leading-relaxed">
          By signing in, you agree to AyurGuard’s Ethical Prior-Art Guidelines and Research Privacy Charter.
        </p>
      </div>
    </div>
  );
};
