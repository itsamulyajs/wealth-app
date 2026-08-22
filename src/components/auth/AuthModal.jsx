import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  IndianRupee, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Users 
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    switchPersona, 
    personas 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        login(email, password);
        setLoading(false);
      }, 400);
    } else if (authMode === 'register') {
      if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        register(name, email, password, monthlyIncome);
        setLoading(false);
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80 max-w-md mx-auto">
          <button
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('register'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => { setAuthMode('persona'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authMode === 'persona'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ 1-Click Demos
          </button>
        </div>

        {/* Mode 1: 1-Click Persona Demos */}
        {authMode === 'persona' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Select an Indian Investor Persona
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore ArthSaathi instantly with real-world financial profiles, portfolios, and goals.
              </p>
            </div>

            <div className="space-y-3">
              {personas.map((p) => {
                const getIcon = () => {
                  if (p.id.includes('student')) return <GraduationCap className="w-5 h-5 text-amber-400" />;
                  if (p.id.includes('tech')) return <Briefcase className="w-5 h-5 text-indigo-400" />;
                  return <Users className="w-5 h-5 text-emerald-400" />;
                };

                return (
                  <div
                    key={p.id}
                    onClick={() => switchPersona(p.id)}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-700 group-hover:ring-brand-400 transition-all"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            Age {p.age}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{p.title} • {p.city}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-300">
                          <span>Income: <strong className="text-emerald-400">{formatINR(p.monthlyIncome)}/mo</strong></span>
                          <span>•</span>
                          <span>Net Worth: <strong className="text-indigo-300">{formatINR(p.netWorth, true)}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Select <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setAuthMode('login')}
                className="text-xs text-slate-400 hover:text-slate-300 underline"
              >
                Or sign in with custom credentials
              </button>
            </div>
          </div>
        )}

        {/* Mode 2: Standard Login & Register Form */}
        {authMode !== 'persona' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back to ArthSaathi' : 'Begin Your Wealth Journey'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login'
                  ? 'Access your unified portfolio, goals, and AI financial advisor'
                  : 'Get personalized Indian market insights, risk profiling, and SIP planning'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Rohan Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300">Monthly Take-Home Income</label>
                    <span className="text-xs font-bold text-brand-400 font-mono">{formatINR(monthlyIncome)}</span>
                  </div>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      step="5000"
                      min="5000"
                      max="1000000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 font-mono transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'Sign In Securely' : 'Create ArthSaathi Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>
                {authMode === 'login' ? "Don't have an account?" : 'Already registered?'}
              </span>
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="text-brand-400 hover:text-brand-300 font-semibold"
              >
                {authMode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
