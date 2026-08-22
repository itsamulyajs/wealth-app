import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Plane, 
  Bot, 
  Coins, 
  Lock, 
  GraduationCap, 
  Briefcase, 
  Users,
  Compass,
  Zap
} from 'lucide-react';

export const FuturisticLoginHero = () => {
  const { setAuthModalOpen, setAuthMode, switchPersona, personas } = useAuth();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative py-12 overflow-hidden">
      
      {/* 3D Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main 3D Hero Container */}
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-8 animate-fade-in">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-brand-500/40 text-brand-400 text-xs font-bold shadow-lg shadow-brand-500/10 backdrop-blur-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Next-Gen Indian WealthTech & Financial Confidence Engine
        </div>

        {/* 3D Hologram Main Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Democratizing <br />
            <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Financial Confidence
            </span>{' '}
            in India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Consolidate your scattered portfolio across mutual funds, stocks, and gold. Simulate inflation-adjusted goals, master risk profiling, and plan dream vacations with <strong>ArthAI 2.0</strong>.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-emerald-400 hover:from-brand-400 hover:to-emerald-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-brand-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Create Free Account & Onboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-bold text-sm rounded-2xl transition-all shadow-lg backdrop-blur-xl flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-brand-400" />
            <span>Sign In to Existing Portal</span>
          </button>
        </div>

        {/* 3D Floating Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 text-left">
          
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-brand-500/40 hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Risk DNA Profiler</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              4-step behavioral quiz + Market Crash stress tester (-30% crash simulations).
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Goal SIP Compounder</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inflation-adjusted calculations for home buying, gadgets, education & FIRE.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Travel Budgeting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time trip cost breakdowns, day itineraries & live currency conversion.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-rose-500/40 hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">ArthAI 2.0 Assistant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Context-aware Indian financial guidance for taxes, SIPs, and stock trends.
            </p>
          </div>

        </div>

        {/* 1-Click Persona Demos for Hackathon Judges */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 font-semibold mb-3 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Or evaluate instantly with pre-configured Indian personas:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => switchPersona(p.id)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/80 transition-all group text-xs text-slate-200"
              >
                <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-white">{p.name}</span>
                <span className="text-[10px] text-slate-400">({p.title.split(' ')[0]})</span>
                <span className="font-mono text-brand-400 font-bold">{formatINR(p.netWorth, true)}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
