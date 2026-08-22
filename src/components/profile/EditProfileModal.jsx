import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  X, 
  Save, 
  User, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

const OCCUPATION_OPTIONS = [
  'College Student / Intern',
  'Salaried Tech / IT Professional',
  'Corporate / Banking Professional',
  'Freelancer / Digital Creator',
  'Business Owner / Startup Founder',
  'Self-Employed / Other'
];

const ALL_INTERESTS = [
  'Mutual Funds & SIPs',
  'Direct Stocks & Bluechips',
  'Emergency Safety Buffer',
  'Vacation & Travel Planning',
  'SGB & Digital Gold',
  'Tax Optimization (80C / New Regime)',
  'Home / Asset Down Payment',
  'FIRE (Early Financial Freedom)'
];

export const EditProfileModal = () => {
  const { currentUser, editProfileOpen, setEditProfileOpen, updateUserProfile } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState(22);
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [salary, setSalary] = useState(0);
  const [internStipend, setInternStipend] = useState(0);
  const [scholarship, setScholarship] = useState(0);
  const [savings, setSavings] = useState(0);
  const [interests, setInterests] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAge(currentUser.age || 22);
      setCity(currentUser.city || 'Bengaluru');
      setOccupation(currentUser.occupation || 'College Student / Intern');
      setSalary(currentUser.salary !== undefined ? currentUser.salary : (currentUser.monthlyIncome || 0));
      setInternStipend(currentUser.internStipend || 0);
      setScholarship(currentUser.scholarship || 0);
      setSavings(currentUser.savings !== undefined ? currentUser.savings : (currentUser.netWorth || 0));
      setInterests(currentUser.interests || ['Mutual Funds & SIPs']);
    }
  }, [currentUser, editProfileOpen]);

  if (!editProfileOpen) return null;

  const totalMonthly = Number(salary) + Number(internStipend) + Number(scholarship);
  const totalAnnual = totalMonthly * 12;

  const toggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateUserProfile({
      name,
      age: Number(age),
      city,
      occupation,
      salary: Number(salary),
      internStipend: Number(internStipend),
      scholarship: Number(scholarship),
      monthlyIncome: totalMonthly,
      annualIncome: totalAnnual,
      savings: Number(savings),
      interests
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditProfileOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setEditProfileOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-brand-400" />
            Edit Profile & Financial Parameters
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Update your salary, paid internships, scholarships, and savings anytime. All calculators update live.
          </p>
        </div>

        {saveSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Changes saved and synced to your dashboard!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          
          {/* Personal Info */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-brand-400 tracking-wider">1. Basic Details</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  min="16"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Primary Stage / Occupation</label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-brand-500"
              >
                {OCCUPATION_OPTIONS.map((occ, idx) => (
                  <option key={idx} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Incomes, Stipends, Scholarships */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">2. Income, Stipends & Scholarships</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Monthly Salary / Allowance (₹)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Internship Stipends (₹/mo)</label>
                <input
                  type="number"
                  value={internStipend}
                  onChange={(e) => setInternStipend(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Scholarships / Aid (₹/mo)</label>
                <input
                  type="number"
                  value={scholarship}
                  onChange={(e) => setScholarship(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Total Monthly Cashflow:</span>
              <span className="text-brand-400 font-bold text-sm">{formatINR(totalMonthly)}/mo</span>
            </div>
          </div>

          {/* Current Savings */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">3. Liquid Savings & Bank Balance</h4>
            
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Total Liquid Cash / Savings (₹)</label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
              />
            </div>
          </div>

          {/* Fields of Interest */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-brand-300 tracking-wider">4. Fields of Interest</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_INTERESTS.map((item, idx) => {
                const isSelected = interests.includes(item);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleInterest(item)}
                    className={`p-2 rounded-xl text-[11px] text-left transition-all border ${
                      isSelected
                        ? 'bg-brand-500/20 border-brand-500/60 text-brand-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" /> Save & Update Workspace
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
