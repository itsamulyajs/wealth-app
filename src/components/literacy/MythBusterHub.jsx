import React, { useState } from 'react';
import { MYTHS_DATABASE, FINANCIAL_JARGON_EXPLAINED } from '../../data/mythData';
import { 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  TrendingDown, 
  TrendingUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const MythBusterHub = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMyth, setSelectedMyth] = useState(MYTHS_DATABASE[0]);

  const categories = ['All', 'High Risk', 'Real Estate', 'Budgeting', 'SIP & Compounding'];

  const filteredMyths = activeCategory === 'All'
    ? MYTHS_DATABASE
    : MYTHS_DATABASE.filter(m => m.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4" />
            Social Media Mythbuster & FinLiteracy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Hype vs Reality: Data-Driven Truths
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Financial Instagram reels and YouTube influencers push dangerous shortcuts. We contrast viral claims against actual SEBI data, tax laws, and compound mathematics.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Myth Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Myth Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Exposed Viral Myths ({filteredMyths.length})
          </h3>
          <div className="space-y-2.5">
            {filteredMyths.map((myth) => {
              const isSelected = selectedMyth.id === myth.id;
              return (
                <div
                  key={myth.id}
                  onClick={() => setSelectedMyth(myth)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500/50 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {myth.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{myth.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 line-clamp-2 leading-snug">
                    {myth.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Deep Dive Reality Check Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <span className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Deconstructing the Myth
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {selectedMyth.title}
            </h3>
          </div>

          {/* Side by Side: Social Media Claim vs The Cold Hard Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Social Media Claim */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" /> Viral Social Media Claim
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{selectedMyth.hypeSummary}"
              </p>
            </div>

            {/* The Real Data */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> What Data & SEBI Shows
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedMyth.realitySummary}
              </p>
            </div>

          </div>

          {/* Hard Data Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {selectedMyth.dataStats.map((stat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{stat.label}</span>
                <span className="text-sm font-bold text-brand-300 font-mono block">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Actionable Advice Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-indigo-300">Actionable Rule of Thumb:</p>
              <p className="text-xs text-slate-200 mt-0.5">{selectedMyth.actionableAdvice}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Jargon Demystifier Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Indian Financial Jargon Explained with Analogies</h3>
            <p className="text-xs text-slate-400">Complex terminology broken down into plain language</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FINANCIAL_JARGON_EXPLAINED.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 hover:border-brand-500/30 transition-all">
              <h4 className="text-sm font-bold text-brand-400">{item.term}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.simple}</p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                💡 <strong className="text-slate-300 not-italic">Analogy:</strong> {item.analogy}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
