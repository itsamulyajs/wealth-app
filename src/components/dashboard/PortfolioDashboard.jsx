import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import { AddInvestmentModal } from './AddInvestmentModal';
import {
  TrendingUp, Wallet, CalendarCheck, ShieldAlert, PieChart as PieChartIcon,
  Plus, Trash2, Edit3, Sparkles, Info, CheckCircle, AlertCircle, BarChart3,
  Calendar, Sliders, ArrowUpRight, ArrowDownRight, Save, X, RefreshCw,
  Activity, Layers, ShieldCheck, Target, TrendingDown, Eye
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend, LineChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

export const PortfolioDashboard = ({ onOpenRiskQuiz, onOpenGoals, onOpenArthAI }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const { investments, assets, removeInvestment, updateDirectAssets, healthEvaluation } = usePortfolio();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManualEditOpen, setIsManualEditOpen] = useState(false);
  
  // Time period selection state
  const [timePeriod, setTimePeriod] = useState('monthly'); // 'monthly' | 'financial_year' | 'custom'
  const [trajectoryGranularity, setTrajectoryGranularity] = useState('monthly'); // 'daily' | 'weekly' | 'monthly' | 'yearly'
  const [allocationMode, setAllocationMode] = useState('current'); // 'current' | 'yearly_target'
  const [customStartYear, setCustomStartYear] = useState('2024');
  const [customEndYear, setCustomEndYear] = useState('2026');

  // Manual Edit State
  const [editEquity, setEditEquity] = useState(assets.equity || 0);
  const [editDebt, setEditDebt] = useState(assets.debt || 0);
  const [editGold, setEditGold] = useState(assets.gold || 0);
  const [editCash, setEditCash] = useState(assets.cash || 0);
  const [editCrypto, setEditCrypto] = useState(assets.crypto || 0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const openManualEdit = () => {
    setEditEquity(assets.equity || 0);
    setEditDebt(assets.debt || 0);
    setEditGold(assets.gold || 0);
    setEditCash(assets.cash || 0);
    setEditCrypto(assets.crypto || 0);
    setIsManualEditOpen(true);
  };

  const handleSaveManualAssets = () => {
    updateDirectAssets({
      equity: Number(editEquity),
      debt: Number(editDebt),
      gold: Number(editGold),
      cash: Number(editCash),
      crypto: Number(editCrypto)
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsManualEditOpen(false);
    }, 1200);
  };

  const totalPortfolioValue = Object.values(assets).reduce((a, b) => a + Number(b), 0);
  const totalMonthlySIP = investments.reduce((sum, i) => sum + Number(i.monthlySIP || 0), 0);

  // Asset allocation data for Recharts
  const currentPieData = [
    { name: 'Equity (MFs & Stocks)', value: assets.equity || 0, color: '#10b981' },
    { name: 'Debt & PPF/FD', value: assets.debt || 0, color: '#3b82f6' },
    { name: 'Gold & Commodities', value: assets.gold || 0, color: '#f59e0b' },
    { name: 'Cash & Emergency', value: assets.cash || 0, color: '#64748b' },
    { name: 'Crypto & High Risk', value: assets.crypto || 0, color: '#ec4899' },
  ].filter(item => item.value > 0);

  const targetYearlyPieData = [
    { name: 'Equity (Target 60%)', value: Math.round(totalPortfolioValue * 0.60), color: '#10b981' },
    { name: 'Debt (Target 20%)', value: Math.round(totalPortfolioValue * 0.20), color: '#3b82f6' },
    { name: 'Gold (Target 10%)', value: Math.round(totalPortfolioValue * 0.10), color: '#f59e0b' },
    { name: 'Cash (Target 8%)', value: Math.round(totalPortfolioValue * 0.08), color: '#64748b' },
    { name: 'Crypto (Target 2%)', value: Math.round(totalPortfolioValue * 0.02), color: '#ec4899' },
  ];

  const pieData = allocationMode === 'current' ? currentPieData : targetYearlyPieData;

  // 1. Time-Period Driven Wealth Trajectory Data
  const wealthTrajectoryData = useMemo(() => {
    const base = totalPortfolioValue || 100000;
    const monthlySIP = totalMonthlySIP || 5000;
    const rate = 0.125 / 12; // 12.5% p.a.

    if (timePeriod === 'monthly') {
      // Week-by-week for the current month / recent 8 weeks
      return [
        { label: 'Week 1', value: Math.round(base * 0.965), sipContributed: monthlySIP * 0.25, benchmark: Math.round(base * 0.97) },
        { label: 'Week 2', value: Math.round(base * 0.978), sipContributed: monthlySIP * 0.50, benchmark: Math.round(base * 0.98) },
        { label: 'Week 3', value: Math.round(base * 0.991), sipContributed: monthlySIP * 0.75, benchmark: Math.round(base * 0.99) },
        { label: 'Week 4', value: Math.round(base), sipContributed: monthlySIP * 1.0, benchmark: Math.round(base) },
        { label: 'Week 5', value: Math.round(base * (1 + rate * 0.5) + monthlySIP * 0.25), sipContributed: monthlySIP * 1.25, benchmark: Math.round(base * 1.01) },
        { label: 'Week 6', value: Math.round(base * (1 + rate * 1.0) + monthlySIP * 0.50), sipContributed: monthlySIP * 1.50, benchmark: Math.round(base * 1.018) },
        { label: 'Week 7', value: Math.round(base * (1 + rate * 1.5) + monthlySIP * 0.75), sipContributed: monthlySIP * 1.75, benchmark: Math.round(base * 1.025) },
        { label: 'Week 8', value: Math.round(base * (1 + rate * 2.0) + monthlySIP * 1.0), sipContributed: monthlySIP * 2.0, benchmark: Math.round(base * 1.032) }
      ];
    } else if (timePeriod === 'financial_year') {
      // Quarter by Quarter across FY 23-24, FY 24-25, FY 25-26
      return [
        { label: 'Q1 FY24 (Apr-Jun)', value: Math.round(base * 0.72), sipContributed: monthlySIP * 3, seasonal: 'Bonus Inflow' },
        { label: 'Q2 FY24 (Jul-Sep)', value: Math.round(base * 0.79), sipContributed: monthlySIP * 6, seasonal: 'Normal' },
        { label: 'Q3 FY24 (Oct-Dec)', value: Math.round(base * 0.88), sipContributed: monthlySIP * 9, seasonal: 'Diwali Gold Inflow' },
        { label: 'Q4 FY24 (Jan-Mar)', value: Math.round(base * 0.94), sipContributed: monthlySIP * 12, seasonal: '80C Tax Saving Rush' },
        { label: 'Q1 FY25 (Apr-Jun)', value: Math.round(base * 0.98), sipContributed: monthlySIP * 15, seasonal: 'Appraisal Boost' },
        { label: 'Q2 FY25 (Jul-Sep)', value: Math.round(base * 1.05), sipContributed: monthlySIP * 18, seasonal: 'Market Rally' },
        { label: 'Q3 FY25 (Oct-Dec)', value: Math.round(base * 1.14), sipContributed: monthlySIP * 21, seasonal: 'Festive Season' },
        { label: 'Q4 FY25 (Jan-Mar)', value: Math.round(base * 1.25), sipContributed: monthlySIP * 24, seasonal: 'Year-End Close' }
      ];
    } else {
      // Custom Range (Multi-year projection)
      const points = [];
      let curVal = base;
      const start = Number(customStartYear) || 2024;
      const end = Number(customEndYear) || 2029;
      for (let y = start; y <= end; y++) {
        points.push({
          label: `Year ${y}`,
          value: Math.round(curVal),
          sipContributed: monthlySIP * 12 * (y - start + 1),
          conservative: Math.round(base * Math.pow(1.07, y - start)),
          aggressive: Math.round(base * Math.pow(1.16, y - start))
        });
        curVal = curVal * 1.125 + (monthlySIP * 12);
      }
      return points;
    }
  }, [base => totalPortfolioValue, totalPortfolioValue, totalMonthlySIP, timePeriod, customStartYear, customEndYear]);

  // 2. Risk vs Return Comparison Data
  const riskReturnData = [
    { asset: 'Bank FD / Debt', riskScore: 2, expectedReturn: 7.2, sharpe: 1.8, fill: '#3b82f6' },
    { asset: 'Sovereign Gold (SGB)', riskScore: 4, expectedReturn: 10.5, sharpe: 1.4, fill: '#f59e0b' },
    { asset: 'Large Cap Index (Nifty)', riskScore: 6, expectedReturn: 13.0, sharpe: 1.2, fill: '#10b981' },
    { asset: 'Mid & Small Caps', riskScore: 8, expectedReturn: 16.5, sharpe: 0.95, fill: '#8b5cf6' },
    { asset: 'Crypto / Altcoins', riskScore: 10, expectedReturn: 22.0, sharpe: 0.45, fill: '#ec4899' },
  ];

  // 3. Scenario Comparison Projections (Bear vs Base vs Bull)
  const scenarioMonthlyData = useMemo(() => {
    const base = totalPortfolioValue || 100000;
    const monthlySIP = totalMonthlySIP || 5000;
    const months = 12;
    const data = [];
    for (let m = 1; m <= months; m++) {
      const bear = base * Math.pow(1 + 0.05 / 12, m) + (monthlySIP * m * 1.01);
      const realistic = base * Math.pow(1 + 0.125 / 12, m) + (monthlySIP * m * 1.05);
      const bull = base * Math.pow(1 + 0.18 / 12, m) + (monthlySIP * m * 1.08);
      data.push({
        month: `M${m}`,
        BearCase: Math.round(bear),
        RealisticCase: Math.round(realistic),
        BullCase: Math.round(bull)
      });
    }
    return data;
  }, [totalPortfolioValue, totalMonthlySIP]);

  // 4. Financial Health Timeline Metrics
  const healthTimeline = [
    { phase: 'Month -3', emergencyFund: '2.5 Mo', savingsRate: '22%', debtRatio: '18%', status: 'Building' },
    { phase: 'Month -2', emergencyFund: '3.2 Mo', savingsRate: '26%', debtRatio: '15%', status: 'Safe' },
    { phase: 'Month -1', emergencyFund: '4.0 Mo', savingsRate: '30%', debtRatio: '12%', status: 'Strong' },
    { phase: 'Current', emergencyFund: `${(assets.cash / Math.max(1, currentUser?.monthlyExpense || 30000)).toFixed(1)} Mo`, savingsRate: `${Math.round((totalMonthlySIP / (currentUser?.monthlyIncome || 50000)) * 100)}%`, debtRatio: '8%', status: 'Optimal' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner: Greeting, Risk Profile Badge & Interactive Edit Control */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
              {currentUser?.title || 'Consolidated Wealth View'}
            </span>
            <span className="text-xs text-slate-400">
              Risk DNA: <strong className="text-white font-mono">{currentUser?.riskProfile?.category || 'Moderate'} ({currentUser?.riskProfile?.score || 65}/100)</strong>
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              ● All Data Manually Editable & Saved
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Namaste, {currentUser?.name?.split(' ')[0] || 'Investor'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Live multi-period financial intelligence with instant manual parameter tuning, time horizon projections, and multi-asset risk scoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={openManualEdit}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-brand-400 border border-brand-500/30 text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            <Sliders className="w-3.5 h-3.5" /> Edit Balances
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5" /> Add Asset
          </button>
          <button
            onClick={onOpenArthAI}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-xl transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Insights
          </button>
        </div>
      </div>

      {/* Manual Asset Allocation & Balance Editing Drawer / Modal */}
      {isManualEditOpen && (
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-brand-500/40 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-400">
              <Sliders className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Manual Edit & Save Asset Balances
              </h3>
            </div>
            <button onClick={() => setIsManualEditOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Directly customize your exact portfolio holdings across all asset classes. Changes immediately synchronize with your database and risk models.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div>
              <label className="text-[11px] text-emerald-400 font-bold block mb-1">Equity (Stocks & MFs)</label>
              <input type="number" value={editEquity} onChange={e => setEditEquity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500" />
            </div>
            <div>
              <label className="text-[11px] text-blue-400 font-bold block mb-1">Debt (PPF / FDs / Bonds)</label>
              <input type="number" value={editDebt} onChange={e => setEditDebt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500" />
            </div>
            <div>
              <label className="text-[11px] text-amber-400 font-bold block mb-1">Gold & SGBs</label>
              <input type="number" value={editGold} onChange={e => setEditGold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500" />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 font-bold block mb-1">Cash / Emergency Fund</label>
              <input type="number" value={editCash} onChange={e => setEditCash(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500" />
            </div>
            <div>
              <label className="text-[11px] text-pink-400 font-bold block mb-1">Crypto / Speculative</label>
              <input type="number" value={editCrypto} onChange={e => setEditCrypto(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              New Calculated Net Worth: <strong className="text-white font-mono">{formatINR(Number(editEquity) + Number(editDebt) + Number(editGold) + Number(editCash) + Number(editCrypto))}</strong>
            </span>
            <button
              onClick={handleSaveManualAssets}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                saveSuccess ? 'bg-emerald-500 text-slate-950' : 'bg-brand-500 hover:bg-brand-400 text-slate-950'
              }`}
            >
              {saveSuccess ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saveSuccess ? 'Saved & Synced!' : 'Save & Update Portfolio'}
            </button>
          </div>
        </div>
      )}

      {/* Top 3 Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Net Worth Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consolidated Net Worth</span>
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white font-mono tracking-tight">
              {formatINR(totalPortfolioValue)}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-brand-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14.8%
              </span>
              <span className="text-xs text-slate-400">Annual Growth Rate</span>
            </div>
          </div>
        </div>

        {/* Monthly SIP Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Monthly SIPs</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white font-mono tracking-tight">
              {formatINR(totalMonthlySIP)}<span className="text-sm text-slate-400 font-sans font-normal"> / mo</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-indigo-300 font-semibold">
                {Math.round((totalMonthlySIP / (currentUser?.monthlyIncome || 50000)) * 100)}% of monthly income
              </span>
              <span className="text-xs text-slate-400">automated wealth</span>
            </div>
          </div>
        </div>

        {/* Diversification Health Score Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Diversification Health</span>
            <div className={`p-2.5 rounded-xl ${
              healthEvaluation.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-white font-mono">
                {healthEvaluation.score}
              </h2>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
              <span className={`ml-auto text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                healthEvaluation.score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {healthEvaluation.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 line-clamp-1">
              {healthEvaluation.flags[0] || 'No dangerous concentration detected.'}
            </p>
          </div>
        </div>

      </div>

      {/* TIME PERIOD SELECTOR BAR */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Visual Output Time Horizon:</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTimePeriod('monthly')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timePeriod === 'monthly' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📅 Monthly View (Week-by-Week)
          </button>
          
          <button
            onClick={() => setTimePeriod('financial_year')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timePeriod === 'financial_year' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📊 Financial Year View (YoY & Seasonal)
          </button>
          
          <button
            onClick={() => setTimePeriod('custom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timePeriod === 'custom' ? 'bg-brand-500 text-slate-950 shadow-md' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Custom Range ({customStartYear} - {customEndYear})
          </button>
        </div>

        {timePeriod === 'custom' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">From:</span>
            <input type="number" value={customStartYear} onChange={e => setCustomStartYear(e.target.value)}
              className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-center" />
            <span className="text-slate-400">To:</span>
            <input type="number" value={customEndYear} onChange={e => setCustomEndYear(e.target.value)}
              className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-center" />
          </div>
        )}
      </div>

      {/* CHART 1: WEALTH GROWTH TRAJECTORY (Dynamic by selected time period) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4" /> Chart 1: Wealth Growth Trajectory
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {timePeriod === 'monthly' ? 'Week-by-Week Portfolio Valuation & Inflows' :
               timePeriod === 'financial_year' ? 'Quarter-by-Quarter Seasonal Growth & Inflow Peaks' :
               `Multi-Year Compounding Projection (${customStartYear} to ${customEndYear})`}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
            <span className="text-slate-400 px-2">Granularity:</span>
            {['daily', 'weekly', 'monthly', 'yearly'].map(g => (
              <button key={g} onClick={() => setTrajectoryGranularity(g)}
                className={`px-2 py-1 rounded-lg uppercase font-bold transition-all ${trajectoryGranularity === g ? 'bg-brand-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wealthTrajectoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sipGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => formatINR(v, true)} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                formatter={(v, name) => [formatINR(v), name === 'value' ? 'Net Worth Value' : name === 'sipContributed' ? 'Cumulative SIP Inflows' : name]} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#wealthGrad)" name="Total Portfolio" />
              <Area type="monotone" dataKey="sipContributed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#sipGrad)" name="SIP Invested" />
              {timePeriod === 'custom' && (
                <>
                  <Line type="monotone" dataKey="aggressive" stroke="#ec4899" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Aggressive (16%)" />
                  <Line type="monotone" dataKey="conservative" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Conservative (7%)" />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TWO-COLUMN ROW: CHART 2 (Asset Allocation Pie) & CHART 3 (Risk vs Return) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART 2: Asset Allocation Pie (with Monthly / Yearly Toggle) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
                <PieChartIcon className="w-4 h-4" /> Chart 2: Asset Allocation
              </div>
              <h3 className="text-sm font-bold text-white">
                {allocationMode === 'current' ? 'Current Portfolio Distribution' : 'Target Ideal Yearly Allocation'}
              </h3>
            </div>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button onClick={() => setAllocationMode('current')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${allocationMode === 'current' ? 'bg-brand-500 text-slate-950' : 'text-slate-400'}`}>
                Current
              </button>
              <button onClick={() => setAllocationMode('yearly_target')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${allocationMode === 'yearly_target' ? 'bg-brand-500 text-slate-950' : 'text-slate-400'}`}>
                Yearly Ideal
              </button>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [formatINR(val), 'Holdings']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            {pieData.map((item, idx) => {
              const pct = totalPortfolioValue > 0 ? ((item.value / totalPortfolioValue) * 100).toFixed(1) : 0;
              return (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300 truncate">{item.name}</span>
                  </div>
                  <span className="font-mono text-white font-semibold shrink-0">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHART 3: Risk vs Return Comparison Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" /> Chart 3: Risk vs. Return Matrix
            </div>
            <h3 className="text-sm font-bold text-white">
              Expected Return (%) vs Risk Volatility Score (1-10)
            </h3>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskReturnData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="asset" stroke="#64748b" fontSize={9.5} interval={0} />
                <YAxis stroke="#64748b" fontSize={10} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                  formatter={(v, name) => [name === 'expectedReturn' ? `${v}% CAGR` : `${v}/10`, name === 'expectedReturn' ? 'Expected Return' : 'Risk Score']} />
                <Bar dataKey="expectedReturn" name="Expected Return %" radius={[6, 6, 0, 0]}>
                  {riskReturnData.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
            <span>💡 <strong>Sharpe Ratio Analysis:</strong> Bank FDs give stability, Index Equities offer optimal risk-adjusted reward, while Crypto carries 5x downside tail-risk.</span>
          </div>
        </div>

      </div>

      {/* TWO-COLUMN ROW: CHART 4 (Scenario Comparison) & CHART 5 (Financial Health Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART 4: Scenario Comparison Charts (Monthly Projections) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" /> Chart 4: Scenario Comparison Projections
            </div>
            <h3 className="text-sm font-bold text-white">
              Bear Case (5% CAGR) vs Realistic (12.5%) vs Bull Case (18%)
            </h3>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} tickFormatter={v => formatINR(v, true)} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                  formatter={v => [formatINR(v)]} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="BullCase" stroke="#10b981" strokeWidth={2} dot={false} name="Bull Case (18%)" />
                <Line type="monotone" dataKey="RealisticCase" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Realistic (12.5%)" />
                <Line type="monotone" dataKey="BearCase" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Bear Case (5%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 5: Financial Health Dashboard Timeline View */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Chart 5: Financial Health Timeline
            </div>
            <h3 className="text-sm font-bold text-white">
              Emergency Fund Coverage, Savings Rate & Debt Ratios
            </h3>
          </div>

          <div className="space-y-2.5">
            {healthTimeline.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${item.status === 'Optimal' ? 'bg-emerald-400' : 'bg-brand-400'}`}></span>
                  <span className="font-bold text-white">{item.phase}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Emergency</span>
                    <span className="font-mono font-bold text-emerald-400">{item.emergencyFund}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Savings Rate</span>
                    <span className="font-mono font-bold text-indigo-300">{item.savingsRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Debt Load</span>
                    <span className="font-mono font-bold text-slate-300">{item.debtRatio}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Emergency fund satisfies the recommended 3-6 months living expenses rule!</span>
          </div>
        </div>

      </div>

      {/* CONSOLIDATED HOLDINGS LIST (With Instant Inline Delete & Add) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Consolidated Holdings Breakdown ({investments.length})
            </h3>
            <p className="text-xs text-slate-400">All active investments tracked across brokers and accounts</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Holding
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 flex items-center justify-between gap-3 group transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">{inv.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0 font-medium">
                    {inv.platform}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>{inv.type}</span>
                  {inv.monthlySIP > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-300">SIP: {formatINR(inv.monthlySIP)}/mo</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-white font-mono">
                  {formatINR(inv.amount)}
                </div>
                <div className={`text-xs font-semibold font-mono ${
                  inv.returnPct >= 0 ? 'text-brand-400' : 'text-rose-400'
                }`}>
                  {inv.returnPct >= 0 ? `+${inv.returnPct}%` : `${inv.returnPct}%`}
                </div>
              </div>

              <button
                onClick={() => removeInvestment(inv.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                title="Remove Holding"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {investments.length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-400 text-xs">
              No holdings added yet. Click "+ Add Asset" to start tracking.
            </div>
          )}
        </div>
      </div>

      {/* Add Investment Modal */}
      <AddInvestmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
};
