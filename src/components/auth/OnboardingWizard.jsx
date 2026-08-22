import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  IndianRupee, 
  GraduationCap, 
  Briefcase, 
  User, 
  ShieldCheck, 
  TrendingUp, 
  Plane, 
  Coins, 
  Home, 
  Flame, 
  Receipt,
  X
} from 'lucide-react';

const OCCUPATION_OPTIONS = [
  'College Student / Intern',
  'Salaried Tech / IT Professional',
  'Corporate / Banking Professional',
  'Freelancer / Digital Creator',
  'Business Owner / Startup Founder',
  'Self-Employed / Other'
];

const INTEREST_OPTIONS = [
  { id: 'mf_sip', label: 'Mutual Funds & SIPs', icon: TrendingUp, desc: 'Compound interest via Nifty 50 & Flexi-Cap funds' },
  { id: 'stocks', label: 'Direct Stocks & Bluechips', icon: Flame, desc: 'Investing in leading Indian companies' },
  { id: 'emergency', label: 'Emergency Safety Buffer', icon: ShieldCheck, desc: '3-6 months liquid safety net' },
  { id: 'travel', label: 'Vacation & Travel Planning', icon: Plane, desc: 'Trip budgeting & currency conversions' },
  { id: 'gold', label: 'SGB & Digital Gold', icon: Coins, desc: 'Inflation hedging with 2.5% RBI interest' },
  { id: 'tax', label: 'Tax Optimization (80C / New Regime)', icon: Receipt, desc: 'Maximize your take-home cash' },
  { id: 'home', label: 'Home / Asset Down Payment', icon: Home, desc: 'Goal planning for real estate & vehicles' },
  { id: 'fire', label: 'FIRE (Early Financial Freedom)', icon: Sparkles, desc: 'Retire early with dividend & growth corpus' },
];

export const OnboardingWizard = () => {
  const { currentUser, onboardingOpen, setOnboardingOpen, updateUserProfile } = useAuth();
  const { updateRiskScore } = usePortfolio();

  const [step, setStep] = useState(1);

  // Form State
  const [age, setAge] = useState(currentUser?.age || 22);
  const [city, setCity] = useState(currentUser?.city || 'Bengaluru');
  const [occupation, setOccupation] = useState(currentUser?.occupation || 'College Student / Intern');

  const [salary, setSalary] = useState(currentUser?.salary || 25000);
  const [scholarship, setScholarship] = useState(currentUser?.scholarship || 0);
  const [internStipend, setInternStipend] = useState(currentUser?.internStipend || 0);

  const [savings, setSavings] = useState(currentUser?.savings || 15000);
  const [selectedInterests, setSelectedInterests] = useState(currentUser?.interests || ['Mutual Funds & SIPs', 'Emergency Safety Buffer']);

  if (!onboardingOpen) return null;

  const totalMonthly = Number(salary) + Number(scholarship) + Number(internStipend);
  const totalAnnual = totalMonthly * 12;

  const toggleInterest = (interestLabel) => {
    if (selectedInterests.includes(interestLabel)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestLabel));
    } else {
      setSelectedInterests([...selectedInterests, interestLabel]);
    }
  };

  const handleFinish = () => {
    updateUserProfile({
      age: Number(age),
      city,
      occupation,
      salary: Number(salary),
      scholarship: Number(scholarship),
      internStipend: Number(internStipend),
      monthlyIncome: totalMonthly,
      annualIncome: totalAnnual,
      savings: Number(savings),
      interests: selectedInterests,
      isOnboarded: true,
      // Update starting assets
      assets: {
        equity: Math.round(savings * 0.4),
        debt: Math.round(savings * 0.3),
        gold: Math.round(savings * 0.1),
        cash: Math.round(savings * 0.2),
        crypto: 0
      },
      netWorth: Number(savings)
    });

    setOnboardingOpen(false);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up">
        
        {/* Close Button */}
        <button
          onClick={() => setOnboardingOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Stepper */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-400 font-bold uppercase tracking-wider">
              Step {step} of 4: {
                step === 1 ? 'Personal Profile & Role' :
                step === 2 ? 'Income & Stipends' :
                step === 3 ? 'Current Savings Buffer' :
                'Your Financial Interests'
              }
            </span>
            <span className="text-slate-400 font-mono">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: Age, City, Occupation */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Let's Personalize Your Financial Journey</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your age and career stage help ArthSaathi tailor asset allocations and risk buffers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Current Age</label>
                <input
                  type="number"
                  min="16"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">City / Location in India</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Mumbai, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Occupation / Stage</label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {OCCUPATION_OPTIONS.map((occ, idx) => (
                  <option key={idx} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Income, Scholarships, Internship Stipends */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Your Income & Inflows</h3>
              <p className="text-xs text-slate-400 mt-1">
                Include salaries, college scholarships, or internship stipends. You can edit this anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Monthly Salary / Allowance (₹)</label>
                <input
                  type="number"
                  placeholder="₹ 25,000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Internship Stipend (₹/mo)</label>
                <input
                  type="number"
                  placeholder="₹ 10,000"
                  value={internStipend}
                  onChange={(e) => setInternStipend(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scholarships / Aid (₹/mo)</label>
                <input
                  type="number"
                  placeholder="₹ 5,000"
                  value={scholarship}
                  onChange={(e) => setScholarship(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Calculated Gross Banner */}
            <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-300 font-semibold block">Total Monthly Inflow:</span>
                <span className="text-xl font-black text-brand-400 font-mono">{formatINR(totalMonthly)}/mo</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Annualized Income:</span>
                <span className="text-sm font-bold text-white font-mono">{formatINR(totalAnnual)}/year</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Current Savings Buffer */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Current Savings & Emergency Funds</h3>
              <p className="text-xs text-slate-400 mt-1">
                How much liquid cash, savings accounts, or fixed deposits do you currently have?
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Total Liquid Savings / Bank Balance (₹)</label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  step="5000"
                  placeholder="₹ 30,000"
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-base text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-indigo-300 block">🛡️ Smart Cushion Insight:</span>
              <p>
                Based on your income of {formatINR(totalMonthly)}/mo, a recommended 3-month emergency cushion is <strong>{formatINR(totalMonthly * 3)}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Fields of Interest */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Select Your Financial Interests</h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the areas you want ArthSaathi & ArthAI to guide and optimize for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {INTEREST_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedInterests.includes(item.label);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleInterest(item.label)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border flex items-start gap-3 ${
                      isSelected
                        ? 'bg-brand-500/15 border-brand-500/50 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-brand-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold ${isSelected ? 'text-brand-300' : 'text-slate-200'}`}>
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-500 to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-brand-500/30 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" /> Launch My Workspace
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
