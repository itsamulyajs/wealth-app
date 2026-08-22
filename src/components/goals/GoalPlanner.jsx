import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { calculateSIP, calculateRequiredSIP, formatINR } from '../../utils/financeCalculators';
import { 
  Target, 
  TrendingUp, 
  Flame, 
  Calendar, 
  ShieldCheck, 
  Home, 
  GraduationCap, 
  Plane, 
  Plus, 
  Trash2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const GoalPlanner = () => {
  const { goals, addGoal, removeGoal } = usePortfolio();

  // Interactive Simulator Controls
  const [calculatorMode, setCalculatorMode] = useState('sipToWealth'); // 'sipToWealth' | 'targetToSIP'
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [targetAmount, setTargetAmount] = useState(2500000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(13); // Nifty CAGR average
  const [inflationRate, setInflationRate] = useState(6);
  const [adjustInflation, setAdjustInflation] = useState(true);

  // New Goal Form Modal / Accordion state
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalCurrent, setNewGoalCurrent] = useState('');
  const [newGoalSIP, setNewGoalSIP] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('2028-12-31');
  const [newGoalCategory, setNewGoalCategory] = useState('Real Estate');

  // Compute Results
  const sipResult = calculateSIP(monthlySIP, expectedReturn, years);
  const goalSIPResult = calculateRequiredSIP(targetAmount, expectedReturn, years, inflationRate);

  // Inflation adjusted real purchasing power
  const realPurchasingPower = Math.round(
    sipResult.totalValue / Math.pow(1 + inflationRate / 100, years)
  );

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalTarget) return;

    addGoal({
      title: newGoalTitle,
      targetAmount: Number(newGoalTarget),
      currentAmount: Number(newGoalCurrent || 0),
      monthlySIP: Number(newGoalSIP || 0),
      targetDate: newGoalDate,
      category: newGoalCategory
    });

    setShowAddGoal(false);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalCurrent('');
    setNewGoalSIP('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" />
            Goal-Based Wealth Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Transform Life Dreams into Mathematical Certainty
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Investing without a specific goal leads to impulse panic-selling. Define your milestones, account for India's 6% inflation, and automate the required monthly SIP.
          </p>
        </div>
      </div>

      {/* Active User Goals Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-400" /> Active Milestones ({goals.length})
            </h3>
            <p className="text-xs text-slate-400">Track your progress and target completion dates</p>
          </div>
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" /> Add Goal
          </button>
        </div>

        {/* Add Goal Form Toggle */}
        {showAddGoal && (
          <form onSubmit={handleCreateGoal} className="p-5 rounded-2xl bg-slate-950 border border-brand-500/30 space-y-4 animate-slide-up">
            <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Create New Financial Goal</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Studies in UK or 2BHK Down Payment"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Category</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Real Estate">Real Estate / Home</option>
                  <option value="Education">Education & Upskilling</option>
                  <option value="Retirement">Retirement / FIRE</option>
                  <option value="Security">Emergency Fund</option>
                  <option value="Travel">Travel & Luxury</option>
                  <option value="Vehicle">Vehicle / Car</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Amount (₹)</label>
                <input
                  type="number"
                  placeholder="₹ 10,00,000"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Saved So Far (₹)</label>
                <input
                  type="number"
                  placeholder="₹ 1,50,000"
                  value={newGoalCurrent}
                  onChange={(e) => setNewGoalCurrent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly SIP (₹)</label>
                <input
                  type="number"
                  placeholder="₹ 5,000"
                  value={newGoalSIP}
                  onChange={(e) => setNewGoalSIP(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddGoal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold rounded-xl"
              >
                Save Goal
              </button>
            </div>
          </form>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round(((g.currentAmount || 0) / g.targetAmount) * 100));
            return (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-brand-300 font-semibold">
                      {g.category}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{g.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" /> Target: {g.targetDate || '2028'}
                    </p>
                  </div>

                  <button
                    onClick={() => removeGoal(g.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-brand-400 font-bold">{formatINR(g.currentAmount)}</span>
                    <span className="text-slate-400">Target: {formatINR(g.targetAmount)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>{pct}% Achieved</span>
                    {g.monthlySIP > 0 && (
                      <span className="text-indigo-300 font-semibold font-mono">
                        SIP: {formatINR(g.monthlySIP)}/mo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive SIP & Compound Interest Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-400" /> Interactive SIP Compound Simulator
            </h3>
            <p className="text-xs text-slate-400">See the power of monthly compounding vs inflation over time</p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setCalculatorMode('sipToWealth')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                calculatorMode === 'sipToWealth' ? 'bg-brand-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              SIP → Future Corpus
            </button>
            <button
              onClick={() => setCalculatorMode('targetToSIP')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                calculatorMode === 'targetToSIP' ? 'bg-brand-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Target Corpus → Required SIP
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
          
          {/* Slider 1: Monthly Investment or Target */}
          {calculatorMode === 'sipToWealth' ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Monthly SIP Amount</span>
                <span className="font-bold text-brand-400 font-mono text-sm">{formatINR(monthlySIP)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlySIP}
                onChange={(e) => setMonthlySIP(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>₹1,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Target Wealth Corpus</span>
                <span className="font-bold text-brand-400 font-mono text-sm">{formatINR(targetAmount)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="50000000"
                step="500000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>₹5 Lakhs</span>
                <span>₹2.5 Cr</span>
                <span>₹5 Crores</span>
              </div>
            </div>
          )}

          {/* Slider 2: Horizon (Years) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Investment Horizon</span>
              <span className="font-bold text-indigo-300 font-mono text-sm">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>30 yrs</span>
            </div>
          </div>

          {/* Slider 3: Expected CAGR Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Expected Annual CAGR</span>
              <span className="font-bold text-amber-400 font-mono text-sm">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min="7"
              max="18"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>7% (FD/Debt)</span>
              <span>13% (Nifty Index)</span>
              <span>18% (High Equity)</span>
            </div>
          </div>

        </div>

        {/* Output Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Invested Principal</span>
            <p className="text-xl font-bold text-slate-200 font-mono">
              {formatINR(sipResult.totalInvested)}
            </p>
            <span className="text-[10px] text-slate-500">₹{monthlySIP.toLocaleString('en-IN')} × {years * 12} months</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-brand-500/30 space-y-1">
            <span className="text-[11px] text-brand-400 font-semibold uppercase">Estimated Future Corpus</span>
            <p className="text-2xl font-black text-brand-400 font-mono">
              {formatINR(sipResult.totalValue)}
            </p>
            <span className="text-[10px] text-brand-300/80 font-semibold">
              Gain: +{formatINR(sipResult.estimatedReturns)} ({Math.round((sipResult.estimatedReturns / (sipResult.totalInvested || 1)) * 100)}%)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Real Purchasing Power</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">@ 6% Inflation</span>
            </div>
            <p className="text-xl font-bold text-indigo-300 font-mono">
              {formatINR(realPurchasingPower)}
            </p>
            <span className="text-[10px] text-slate-400">Equivalent to today's buying power</span>
          </div>

        </div>

        {/* Growth Area Chart */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Compounding Trajectory Over {years} Years</span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Principal Invested</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-brand-400"></span> Total Wealth Growth</span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sipResult.yearlyBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatINR(v, true)} />
                <Tooltip
                  formatter={(val, name) => [formatINR(val), name === 'total' ? 'Total Portfolio Value' : 'Principal Invested']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#totalGrad)" />
                <Area type="monotone" dataKey="invested" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#investedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
