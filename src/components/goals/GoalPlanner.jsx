import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import {
  Target, Plus, Trash2, Edit3, CheckCircle2, AlertTriangle,
  XCircle, TrendingUp, Clock, Sparkles, Save, X, ChevronRight,
  BarChart3, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Zap
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell, LineChart, Line, Legend
} from 'recharts';

const DEFAULT_GOALS = [];

export const GoalPlanner = () => {
  const { currentUser } = useAuth();
  const monthlyIncome = currentUser?.monthlyIncome || 50000;

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('arthsaathi_goals');
      return saved ? JSON.parse(saved) : DEFAULT_GOALS;
    } catch { return DEFAULT_GOALS; }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [whatIfMode, setWhatIfMode] = useState(false);
  const [whatIfSIP, setWhatIfSIP] = useState(0);
  const [whatIfReturn, setWhatIfReturn] = useState(12);
  const [whatIfYears, setWhatIfYears] = useState(5);

  // Form state
  const [formName, setFormName] = useState('');
  const [formTarget, setFormTarget] = useState(500000);
  const [formMonthly, setFormMonthly] = useState(5000);
  const [formSaved, setFormSaved] = useState(0);
  const [formYears, setFormYears] = useState(5);
  const [formReturn, setFormReturn] = useState(12);
  const [formPriority, setFormPriority] = useState('Medium');
  const [formIcon, setFormIcon] = useState('🏠');

  const persistGoals = (updated) => {
    setGoals(updated);
    localStorage.setItem('arthsaathi_goals', JSON.stringify(updated));
  };

  const openAddModal = () => {
    setEditingGoal(null);
    setFormName(''); setFormTarget(500000); setFormMonthly(5000);
    setFormSaved(0); setFormYears(5); setFormReturn(12);
    setFormPriority('Medium'); setFormIcon('🏠');
    setShowAddModal(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal.id);
    setFormName(goal.name); setFormTarget(goal.target); setFormMonthly(goal.monthlySIP);
    setFormSaved(goal.savedSoFar); setFormYears(goal.years); setFormReturn(goal.expectedReturn);
    setFormPriority(goal.priority); setFormIcon(goal.icon);
    setShowAddModal(true);
  };

  const handleSaveGoal = () => {
    if (!formName || formTarget <= 0) return;
    const now = new Date().toISOString();
    if (editingGoal) {
      persistGoals(goals.map(g => g.id === editingGoal ? {
        ...g, name: formName, target: formTarget, monthlySIP: formMonthly,
        savedSoFar: formSaved, years: formYears, expectedReturn: formReturn,
        priority: formPriority, icon: formIcon, updatedAt: now
      } : g));
    } else {
      persistGoals([...goals, {
        id: Date.now().toString(),
        name: formName, target: formTarget, monthlySIP: formMonthly,
        savedSoFar: formSaved, years: formYears, expectedReturn: formReturn,
        priority: formPriority, icon: formIcon,
        createdAt: now, updatedAt: now
      }]);
    }
    setShowAddModal(false);
  };

  const deleteGoal = (id) => persistGoals(goals.filter(g => g.id !== id));

  const updateSavedAmount = (id, newAmount) => {
    persistGoals(goals.map(g => g.id === id ? { ...g, savedSoFar: Number(newAmount), updatedAt: new Date().toISOString() } : g));
  };

  // Calculate goal analytics
  const calcGoalAnalytics = (goal) => {
    const { target, monthlySIP, savedSoFar, years, expectedReturn } = goal;
    const months = years * 12;
    const i = (expectedReturn / 100) / 12;
    const fvSIP = monthlySIP * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    const fvSaved = savedSoFar * Math.pow(1 + expectedReturn / 100, years);
    const totalProjected = fvSIP + fvSaved;
    const totalInvested = (monthlySIP * months) + savedSoFar;
    const interestEarned = totalProjected - totalInvested;
    const progressPct = Math.min(100, Math.round((savedSoFar / Math.max(1, target)) * 100));
    const gap = target - totalProjected;
    const onTrack = totalProjected >= target;

    // Pace analysis
    const monthsElapsed = Math.max(1, Math.round((Date.now() - new Date(goal.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const expectedSavedByNow = (target / months) * monthsElapsed;
    const paceDiff = savedSoFar - expectedSavedByNow;

    let paceStatus, paceMsg, paceColor;
    if (paceDiff > 0) {
      const monthsAhead = Math.round(paceDiff / Math.max(1, monthlySIP));
      paceStatus = 'ahead';
      paceMsg = `You're ahead of pace — could reach goal ${monthsAhead} month(s) early!`;
      paceColor = 'text-emerald-400';
    } else if (Math.abs(paceDiff) < monthlySIP * 2) {
      const extraNeeded = Math.round(Math.abs(paceDiff) / Math.max(1, months - monthsElapsed));
      paceStatus = 'slightly_behind';
      paceMsg = `Slightly behind — increase savings by ${formatINR(extraNeeded)}/mo to catch up.`;
      paceColor = 'text-amber-400';
    } else {
      paceStatus = 'behind';
      paceMsg = `Significantly behind — won't reach goal without adjustments.`;
      paceColor = 'text-rose-400';
    }

    // Monthly progress chart data
    const monthlyProgressData = [];
    let cumSaved = savedSoFar;
    for (let m = 0; m <= Math.min(months, 60); m += (months > 24 ? 6 : 1)) {
      const fv = savedSoFar * Math.pow(1 + i, m) + monthlySIP * (m > 0 ? (((Math.pow(1 + i, m) - 1) / i) * (1 + i)) : 0);
      const linearTarget = (target / months) * m + savedSoFar;
      monthlyProgressData.push({
        month: m === 0 ? 'Now' : `${m}mo`,
        projected: Math.round(fv),
        target: Math.round(linearTarget),
        actual: m === 0 ? savedSoFar : null
      });
    }

    return {
      totalProjected: Math.round(totalProjected),
      totalInvested: Math.round(totalInvested),
      interestEarned: Math.round(interestEarned),
      progressPct,
      gap: Math.round(gap),
      onTrack,
      paceStatus, paceMsg, paceColor,
      monthlyProgressData,
      monthsRemaining: months - (monthsElapsed || 0)
    };
  };

  // What-If Simulator
  const whatIfResult = useMemo(() => {
    if (!whatIfMode) return null;
    const months = whatIfYears * 12;
    const i = (whatIfReturn / 100) / 12;
    const fv = whatIfSIP * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    const invested = whatIfSIP * months;
    return { corpus: Math.round(fv), invested, interest: Math.round(fv - invested) };
  }, [whatIfSIP, whatIfReturn, whatIfYears, whatIfMode]);

  const selectedGoal = goals.find(g => g.id === selectedGoalId);

  const iconOptions = ['🏠', '🚗', '💻', '📱', '🎓', '💍', '✈️', '🏥', '👶', '🔒', '💰', '🎯'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/30 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Target className="w-4 h-4" /> Goal-Based SIP Simulator & Progress Tracker
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Track, Edit & Simulate Every Financial Goal
            </h2>
            <p className="text-sm text-slate-300 mt-1">Create unlimited goals, manually update savings, track pace, and run What-If scenarios.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setWhatIfMode(!whatIfMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${whatIfMode ? 'bg-indigo-500 text-white' : 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white'}`}>
              <SlidersHorizontal className="w-3.5 h-3.5" /> What-If Simulator
            </button>
            <button onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-lg shadow-brand-500/20 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add New Goal
            </button>
          </div>
        </div>
      </div>

      {/* What-If Simulator Panel */}
      {whatIfMode && (
        <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/30 shadow-xl space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> Real-Time What-If Adjustments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Monthly SIP (₹)</label>
              <input type="number" value={whatIfSIP} onChange={e => setWhatIfSIP(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Expected Return (%)</label>
              <input type="number" step="0.5" value={whatIfReturn} onChange={e => setWhatIfReturn(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Time Horizon (Years)</label>
              <input type="number" value={whatIfYears} onChange={e => setWhatIfYears(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-indigo-500" />
            </div>
          </div>
          {whatIfResult && (
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Total Corpus</span>
                <span className="text-xl font-black text-brand-400 font-mono">{formatINR(whatIfResult.corpus)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Total Invested</span>
                <span className="text-xl font-black text-white font-mono">{formatINR(whatIfResult.invested)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Interest Earned</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{formatINR(whatIfResult.interest)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <Target className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Goals Created Yet</h3>
          <p className="text-sm text-slate-400">Create your first financial goal to start tracking progress!</p>
          <button onClick={openAddModal} className="px-6 py-3 bg-brand-500 text-slate-950 font-bold rounded-xl">
            <Plus className="w-4 h-4 inline mr-1" /> Create First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.sort((a, b) => {
            const pr = { Critical: 0, High: 1, Medium: 2, Low: 3 };
            return (pr[a.priority] || 2) - (pr[b.priority] || 2);
          }).map(goal => {
            const analytics = calcGoalAnalytics(goal);
            const prColors = { Critical: 'bg-rose-500/20 text-rose-300 border-rose-500/30', High: 'bg-amber-500/20 text-amber-300 border-amber-500/30', Medium: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', Low: 'bg-slate-700/30 text-slate-300 border-slate-600/30' };
            return (
              <div key={goal.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{goal.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${prColors[goal.priority] || prColors.Medium}`}>
                        {goal.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(goal)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteGoal(goal.id)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Saved: <strong className="text-white">{formatINR(goal.savedSoFar)}</strong></span>
                    <span className="text-slate-400">Target: <strong className="text-brand-400">{formatINR(goal.target)}</strong></span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${analytics.progressPct >= 75 ? 'bg-emerald-500' : analytics.progressPct >= 40 ? 'bg-brand-500' : 'bg-indigo-500'}`}
                      style={{ width: `${analytics.progressPct}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-brand-400">{analytics.progressPct}% Complete</span>
                </div>

                {/* Manual Update Field */}
                <div className="flex items-center gap-2">
                  <input type="number" value={goal.savedSoFar}
                    onChange={(e) => updateSavedAmount(goal.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono focus:border-brand-500" />
                  <span className="text-[10px] text-slate-400">Edit & Auto-Saves</span>
                </div>

                {/* Pace Indicator */}
                <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                  analytics.paceStatus === 'ahead' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                  analytics.paceStatus === 'slightly_behind' ? 'bg-amber-500/10 border border-amber-500/20' :
                  'bg-rose-500/10 border border-rose-500/20'
                }`}>
                  {analytics.paceStatus === 'ahead' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> :
                   analytics.paceStatus === 'slightly_behind' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> :
                   <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                  <span className={analytics.paceColor}>{analytics.paceMsg}</span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Projected Corpus</span>
                    <span className="font-bold text-white font-mono">{formatINR(analytics.totalProjected)}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Interest Earned</span>
                    <span className="font-bold text-emerald-400 font-mono">{formatINR(analytics.interestEarned)}</span>
                  </div>
                </div>

                <button onClick={() => setSelectedGoalId(selectedGoalId === goal.id ? null : goal.id)}
                  className="w-full py-2 text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center justify-center gap-1 border-t border-slate-800 pt-3">
                  {selectedGoalId === goal.id ? 'Hide' : 'Show'} Progress Chart <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Expanded Goal Progress Chart */}
      {selectedGoal && (() => {
        const analytics = calcGoalAnalytics(selectedGoal);
        return (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-400" />
              {selectedGoal.icon} {selectedGoal.name} — Projected vs Target Timeline
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.monthlyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} tickFormatter={v => formatINR(v, true)} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                    formatter={(v, n) => [formatINR(v), n === 'projected' ? 'SIP Projected' : 'Linear Target']} />
                  <Area type="monotone" dataKey="projected" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#projGrad)" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })()}

      {/* Add / Edit Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">{editingGoal ? 'Edit Goal' : 'Create New Goal'}</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Goal Name</label>
                <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Buy House Down Payment"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-brand-500" />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(ic => (
                    <button key={ic} onClick={() => setFormIcon(ic)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${formIcon === ic ? 'bg-brand-500/20 border-2 border-brand-500 scale-110' : 'bg-slate-950 border border-slate-800 hover:bg-slate-800'}`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Amount (₹)</label>
                  <input type="number" value={formTarget} onChange={e => setFormTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-brand-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Already Saved (₹)</label>
                  <input type="number" value={formSaved} onChange={e => setFormSaved(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-brand-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Monthly SIP (₹)</label>
                  <input type="number" value={formMonthly} onChange={e => setFormMonthly(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-brand-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Timeline (Years)</label>
                  <input type="number" value={formYears} onChange={e => setFormYears(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-brand-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Return (%)</label>
                  <input type="number" step="0.5" value={formReturn} onChange={e => setFormReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-brand-500" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Priority</label>
                <div className="flex gap-2">
                  {priorityOptions.map(p => (
                    <button key={p} onClick={() => setFormPriority(p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${formPriority === p ? 'bg-brand-500 text-slate-950' : 'bg-slate-950 border border-slate-800 text-slate-400'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleSaveGoal}
              className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> {editingGoal ? 'Save Changes' : 'Create Goal & Start Tracking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
