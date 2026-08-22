import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Flame, 
  Bot, 
  User, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  Layers,
  ArrowRightLeft,
  Settings,
  Edit3
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenArthAI }) => {
  const { 
    currentUser, 
    logout, 
    setAuthModalOpen, 
    setAuthMode, 
    switchPersona, 
    personas,
    setEditProfileOpen,
    setOnboardingOpen
  } = useAuth();
  
  const { healthEvaluation } = usePortfolio();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Portfolio & Wealth', icon: TrendingUp },
    { id: 'risk', label: 'Risk Profiler', icon: ShieldCheck },
    { id: 'goals', label: 'Goal SIP Simulator', icon: Target },
    { id: 'literacy', label: 'Hype vs Reality', icon: Flame },
    { id: 'advisor', label: 'ArthAI Assistant', icon: Bot, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black text-slate-950">₹</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-400 bg-clip-text text-transparent">
                  ArthSaathi
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  India
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Democratizing Financial Confidence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {currentUser && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === 'advisor' && onOpenArthAI) {
                        onOpenArthAI();
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm'
                        : item.highlight
                        ? 'bg-indigo-600/15 text-indigo-300 hover:bg-indigo-600/25 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Section: Persona Switcher & Auth */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-brand-500/30"
                  />
                  <div className="hidden sm:block text-xs">
                    <p className="font-semibold text-slate-200 leading-tight flex items-center gap-1.5">
                      {currentUser.name}
                      <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-slate-800 text-brand-400 border border-slate-700">
                        {currentUser.age || 22}y
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Net: {formatINR(currentUser.netWorth || 0, true)}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>

                {/* Profile & Persona Switcher Dropdown */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl p-3 z-50 animate-slide-up"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-2 py-2 border-b border-slate-800 mb-2">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-400">{currentUser.email}</p>
                      
                      <div className="mt-2 text-[11px] text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monthly Inflow:</span>
                          <span className="text-brand-400 font-mono font-bold">{formatINR(currentUser.monthlyIncome || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Occupation:</span>
                          <span className="text-slate-200 truncate">{currentUser.occupation || 'Student'}</span>
                        </div>
                      </div>

                      {/* Edit Profile Anytime Button */}
                      <button
                        onClick={() => {
                          setEditProfileOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full mt-2.5 py-1.5 px-3 bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Financial Parameters
                      </button>
                    </div>

                    {/* Quick Persona Switching */}
                    <div className="space-y-1 mb-2">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 pt-1 flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3 text-brand-400" /> Switch Demo Persona
                      </p>
                      {personas.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            switchPersona(p.id);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            currentUser.id === p.id 
                              ? 'bg-brand-500/20 text-brand-300 font-semibold' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                          <div className="truncate flex-1">
                            <span>{p.name}</span>
                            <span className="text-[10px] text-slate-400 block truncate">{p.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{formatINR(p.netWorth, true)}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setOnboardingOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Settings className="w-3.5 h-3.5" /> Onboarding Wizard
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Navigation Row (If signed in) */}
        {currentUser && (
          <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'advisor' && onOpenArthAI) {
                      onOpenArthAI();
                    }
                  }}
                  className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
                    isActive ? 'text-brand-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
