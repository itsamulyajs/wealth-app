import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Sparkles } from 'lucide-react';

export const Footer = ({ onOpenRiskQuiz, onOpenGoals, onOpenLiteracy, onOpenArthAI }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-16 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-black text-sm">
                ₹
              </div>
              <span className="text-lg font-extrabold text-white">ArthSaathi India</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Transforming complex financial markets and scattered portfolios into clear, personalized, and actionable confidence for students, working professionals, and first-time investors.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy • No Credentials Shared</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Core Features</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenRiskQuiz} className="hover:text-brand-400 transition-colors">
                  Risk Tolerance Profiler
                </button>
              </li>
              <li>
                <button onClick={onOpenGoals} className="hover:text-brand-400 transition-colors">
                  Goal-Based SIP Compounder
                </button>
              </li>
              <li>
                <button onClick={onOpenLiteracy} className="hover:text-brand-400 transition-colors">
                  Social Media MythBuster
                </button>
              </li>
              <li>
                <button onClick={onOpenArthAI} className="hover:text-brand-400 transition-colors flex items-center gap-1 text-indigo-300">
                  <Sparkles className="w-3 h-3" /> ArthAI Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Financial Safety Notice */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Financial Literacy</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Investments in securities market are subject to market risks. Read all scheme related documents carefully before investing. Historical returns do not guarantee future performance.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ArthSaathi WealthTech. Designed for Indian Investors with confidence.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for Financial Freedom in India
          </p>
        </div>

      </div>
    </footer>
  );
};
