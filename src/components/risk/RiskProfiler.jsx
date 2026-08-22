import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  PieChart as PieChartIcon,
  AlertTriangle,
  Flame,
  Activity,
  Zap,
  Layers
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const QUIZ_QUESTIONS = [
  {
    id: 'horizon',
    question: '1. How long do you plan to keep your invested money untouched?',
    subtitle: 'Your investment horizon dictates how much market volatility you can safely tolerate.',
    options: [
      { text: 'Less than 1 year (Need for immediate college fees/bills)', score: 10, type: 'Short Term' },
      { text: '1 to 3 years (Medium-term purchases like vehicle or gadget)', score: 30, type: 'Medium Term' },
      { text: '3 to 7 years (Goal-focused: Marriage, Home Down Payment)', score: 65, type: 'Long Term' },
      { text: '7+ years (Long-term wealth creation, FIRE & Retirement)', score: 95, type: 'Ultra Long Term' },
    ]
  },
  {
    id: 'reaction',
    question: '2. The Indian stock market drops 25% in 3 months due to global events. What do you do?',
    subtitle: 'Emotional temperament is the #1 factor in real-world compound interest returns.',
    options: [
      { text: 'Panic and sell everything to Fixed Deposits to avoid further loss', score: 10, type: 'Loss Averse' },
      { text: 'Feel anxious and stop/pause my monthly SIPs temporarily', score: 35, type: 'Cautious' },
      { text: 'Do nothing and let automated SIPs continue as scheduled', score: 70, type: 'Disciplined' },
      { text: 'Celebrate the discount! Invest extra lumpsum to buy more NAV units', score: 95, type: 'Value Opportunist' },
    ]
  },
  {
    id: 'income_stability',
    question: '3. What describes your current income stream and financial responsibilities?',
    subtitle: 'Income certainty and dependents determine your essential safety cushion.',
    options: [
      { text: 'Student / Freelancer with irregular pocket money or stipend', score: 25, type: 'Variable' },
      { text: 'Salaried professional with dependents (family, parents, kids)', score: 55, type: 'Family Earner' },
      { text: 'Early-career professional with steady salary & no major dependents', score: 85, type: 'High Freedom' },
      { text: 'Business owner / High earner with strong emergency buffer established', score: 90, type: 'High Resilience' },
    ]
  },
  {
    id: 'knowledge',
    question: '4. How familiar are you with Indian investment instruments?',
    subtitle: 'Understanding the mechanics of Index Funds, Debt, and SGB prevents costly mistakes.',
    options: [
      { text: 'Beginner: Mostly know Bank FDs, Savings Accounts, and Physical Gold', score: 20, type: 'Novice' },
      { text: 'Familiar: Know about Mutual Funds & SIPs, but unsure of asset allocation', score: 60, type: 'Intermediate' },
      { text: 'Experienced: Understand PE ratios, Index vs Active funds, SGBs, and Debt taxation', score: 90, type: 'Advanced' },
    ]
  }
];

export const RiskProfiler = () => {
  const { riskProfile, updateRiskScore } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedProfile, setCalculatedProfile] = useState(null);

  // Interactive Market Stress Test Scenario
  const [stressScenario, setStressScenario] = useState('crash'); // 'crash' | 'mild_dip' | 'bull'
  const [stressPrincipal, setStressPrincipal] = useState(500000); // Default ₹5 Lakh portfolio

  const handleSelectOption = (questionId, optionScore) => {
    const newAnswers = { ...answers, [questionId]: optionScore };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final score
      const scores = Object.values(newAnswers);
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

      let category = 'Moderate Growth';
      let description = 'A balanced approach balancing inflation-beating equity growth with debt stability.';
      let allocation = [
        { name: 'Equity (Index & Flexi-Cap)', value: 60, color: '#10b981', equityPct: 0.60 },
        { name: 'Debt (PPF, Liquid, FD)', value: 25, color: '#3b82f6', debtPct: 0.25 },
        { name: 'Gold (SGB / ETF)', value: 10, color: '#f59e0b', goldPct: 0.10 },
        { name: 'Cash / Emergency Buffer', value: 5, color: '#64748b', cashPct: 0.05 },
      ];

      if (avgScore <= 40) {
        category = 'Conservative Capital Preserver';
        description = 'Priority on capital safety, low drawdown risk, and stable income generation.';
        allocation = [
          { name: 'Equity (Large Cap/Index)', value: 25, color: '#10b981', equityPct: 0.25 },
          { name: 'Debt (PPF, EPF, Arbitrage)', value: 55, color: '#3b82f6', debtPct: 0.55 },
          { name: 'Gold (SGB / ETF)', value: 15, color: '#f59e0b', goldPct: 0.15 },
          { name: 'Cash / Liquid Buffer', value: 5, color: '#64748b', cashPct: 0.05 },
        ];
      } else if (avgScore >= 75) {
        category = 'Aggressive Wealth Builder';
        description = 'High tolerance for market volatility with 7+ years horizon for exponential compounding.';
        allocation = [
          { name: 'Equity (Index, Mid & Flexi-Cap)', value: 75, color: '#10b981', equityPct: 0.75 },
          { name: 'Debt (PPF / Liquid)', value: 15, color: '#3b82f6', debtPct: 0.15 },
          { name: 'Gold (SGB)', value: 5, color: '#f59e0b', goldPct: 0.05 },
          { name: 'Cash', value: 5, color: '#64748b', cashPct: 0.05 },
        ];
      }

      const result = {
        score: avgScore,
        category,
        description,
        allocation,
      };

      setCalculatedProfile(result);
      setIsCompleted(true);
      updateRiskScore(category, avgScore, description);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setCalculatedProfile(null);
  };

  // Calculate Stress Test Values
  const getStressTestImpact = () => {
    if (!calculatedProfile) return { netChangePct: 0, netValue: stressPrincipal, diff: 0 };
    
    // Multipliers for assets under each scenario
    let equityMult = 1;
    let debtMult = 1.07; // Debt grows ~7%
    let goldMult = 1.08; // Gold tends to rally during crises

    if (stressScenario === 'crash') {
      equityMult = 0.70; // -30% Equity Crash (like March 2020)
      debtMult = 1.07;   // +7% Steady Interest
      goldMult = 1.15;   // +15% Gold Safe-Haven Rally
    } else if (stressScenario === 'mild_dip') {
      equityMult = 0.88; // -12% Correction
      debtMult = 1.07;
      goldMult = 1.05;
    } else if (stressScenario === 'bull') {
      equityMult = 1.25; // +25% Bull Run
      debtMult = 1.07;
      goldMult = 1.04;
    }

    const alloc = calculatedProfile.allocation;
    const equityVal = stressPrincipal * (alloc[0].value / 100) * equityMult;
    const debtVal = stressPrincipal * (alloc[1].value / 100) * debtMult;
    const goldVal = stressPrincipal * (alloc[2].value / 100) * goldMult;
    const cashVal = stressPrincipal * (alloc[3].value / 100) * 1.03;

    const netValue = Math.round(equityVal + debtVal + goldVal + cashVal);
    const diff = netValue - stressPrincipal;
    const netChangePct = ((diff / stressPrincipal) * 100).toFixed(1);

    return { netValue, diff, netChangePct };
  };

  const stressImpact = getStressTestImpact();
  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Indian Investor Risk Matrix & Stress Tester
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discover Your True Risk DNA
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Most first-time investors fail not because of bad stocks, but because they pick high-volatility instruments mismatched with their timeline and emotional tolerance.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        /* Active Quiz Card */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-semibold">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-brand-400">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(currentQ.id, opt.score)}
                className="w-full text-left p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-brand-500/60 hover:bg-slate-800/50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-brand-500 group-hover:text-slate-950 font-bold text-xs flex items-center justify-center transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {opt.text}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="pt-2 flex justify-start">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Results & Asset Allocation Recommendation */
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 animate-slide-up">
            
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Assessment Result
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {calculatedProfile?.category}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                {calculatedProfile?.description}
              </p>
            </div>

            {/* Score Indicator & Recommended Allocation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
              
              {/* Left: Score Gauge */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-full border-8 border-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-black text-brand-400 font-mono">
                        {calculatedProfile?.score}
                      </span>
                      <span className="text-xs text-slate-400 block font-semibold">/ 100</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Risk Tolerance Index
                </p>
                <p className="text-[11px] text-slate-400 mt-2 max-w-xs">
                  Your profile balances disciplined equity exposure with risk mitigation against sudden market corrections.
                </p>
              </div>

              {/* Right: Asset Allocation Pie Chart */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-brand-400" />
                  Optimal Target Asset Allocation
                </h4>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={calculatedProfile?.allocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {calculatedProfile?.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val) => [`${val}%`, 'Recommended Share']}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {calculatedProfile?.allocation.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="truncate">{item.name}: <strong className="text-white">{item.value}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Risk Assessment
              </button>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Applied to your personalized dashboard & ArthAI advisor</span>
              </div>
            </div>

          </div>

          {/* Interactive Market Stress-Test Simulator Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  Portfolio Stress-Test Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  See how your recommended asset allocation protects you during real-world market crashes vs bull runs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Portfolio Size:</span>
                <select
                  value={stressPrincipal}
                  onChange={(e) => setStressPrincipal(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                >
                  <option value={100000}>₹1 Lakh</option>
                  <option value={500000}>₹5 Lakhs</option>
                  <option value={1000000}>₹10 Lakhs</option>
                  <option value={2500000}>₹25 Lakhs</option>
                </select>
              </div>
            </div>

            {/* Scenario Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setStressScenario('crash')}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  stressScenario === 'crash'
                    ? 'bg-rose-950/30 border-rose-500/60 ring-1 ring-rose-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> 2020 Crash (-30%)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">Severe</span>
                </div>
                <p className="text-[11px] text-slate-400">Equity drops -30%, Gold surges +15%, Debt yields +7%</p>
              </button>

              <button
                onClick={() => setStressScenario('mild_dip')}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  stressScenario === 'mild_dip'
                    ? 'bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Regular Dip (-12%)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Moderate</span>
                </div>
                <p className="text-[11px] text-slate-400">Normal healthy market pullback & sector rotation</p>
              </button>

              <button
                onClick={() => setStressScenario('bull')}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  stressScenario === 'bull'
                    ? 'bg-emerald-950/30 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Bull Rally (+25%)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Expansion</span>
                </div>
                <p className="text-[11px] text-slate-400">Indian GDP surge & broad market all-time highs</p>
              </button>
            </div>

            {/* Stress Test Outcome Display */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Simulated Portfolio Value ({stressScenario === 'crash' ? 'After 30% Crash' : stressScenario === 'mild_dip' ? 'After 12% Dip' : 'During Bull Run'})
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-white font-mono">{formatINR(stressImpact.netValue)}</span>
                  <span className={`text-sm font-bold font-mono ${
                    stressImpact.diff >= 0 ? 'text-brand-400' : 'text-rose-400'
                  }`}>
                    {stressImpact.diff >= 0 ? `+${formatINR(stressImpact.diff)}` : `${formatINR(stressImpact.diff)}`} ({stressImpact.netChangePct}%)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-sm">
                💡 <strong>Why Asset Allocation Matters:</strong> Even when pure equity drops by 30%, your Debt & Gold cushion reduce your total portfolio drawdown to just <strong>{stressImpact.netChangePct}%</strong>!
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
