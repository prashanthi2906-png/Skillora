import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Sparkles, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { DEMO_CREDENTIALS } from '../../constants/demoData';
import { StorageService } from '../../utils/storage';

interface LoginPageProps {
  onLoginSuccess: (email: string, isDemoUser: boolean, onboardingCompleted: boolean) => void;
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setErrorMessage(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your student email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email format (e.g. student@skillora.demo).');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    // Simulated short delay for realistic UI responsiveness
    setTimeout(() => {
      setIsSubmitting(false);

      // 1. Check if matching demo credentials
      if (
        trimmedEmail.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase() &&
        password === DEMO_CREDENTIALS.password
      ) {
        onLoginSuccess(trimmedEmail, true, true);
        return;
      }

      // 2. Check if this is a registered mock user in localStorage
      const registered = StorageService.findRegisteredProfile(trimmedEmail);
      if (registered) {
        // Mock authentication accepts valid demo password or any registered session for mock purposes
        onLoginSuccess(trimmedEmail, false, registered.onboardingCompleted);
        return;
      }

      // 3. Otherwise invalid login
      setErrorMessage(
        'Invalid credentials. Use the demo credentials below or register a new student profile.'
      );
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl shadow-xl shadow-indigo-500/20 mb-2">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
            Skillora
          </h1>
          <p className="text-sm text-slate-400">
            Student Career Readiness & Skill Gap Matching
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-sm space-y-3">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-indigo-200 uppercase tracking-wide text-[11px] block">
                Demo-Only Mock Authentication
              </span>
              <p className="text-slate-300 leading-relaxed">
                Client-side demo session. Passwords are never stored or transmitted to any external server.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="space-y-0.5">
              <p className="text-slate-400">
                Demo User: <code className="text-indigo-300 font-mono">student@skillora.demo</code>
              </p>
              <p className="text-slate-400">
                Password: <code className="text-indigo-300 font-mono">Skillora123!</code>
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-2.5 py-1.5 rounded-md bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-medium transition-colors shrink-0"
            >
              Fill Demo Login
            </button>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">Student Sign In</h2>
            <p className="text-xs text-slate-400 mt-1">
              Access your personalized career dashboard and skill analytics
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@skillora.demo"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Skillora</span>
                </>
              )}
            </button>
          </form>

          {/* Registration Switcher */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400">
              New student to Skillora? Set up your profile in minutes.
            </p>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <UserPlus className="w-4 h-4 text-indigo-400" />
              <span>Register New Student Account</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-500" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500">
          Skillora Career Readiness System &bull; Feature Branch: feature/career-dashboard
        </p>
      </div>
    </div>
  );
};
