import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import { AddInvestmentModal } from './AddInvestmentModal';
import { 
  TrendingUp, 
  Wallet, 
  CalendarCheck, 
  ShieldAlert, 
  PieChart as PieChartIcon, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Info,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Coins
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const PortfolioDashboard = ({ onOpenRiskQuiz, onOpenGoals, onOpenArthAI }) => {
  const { currentUser } = useAuth();
  const { investments, assets, removeInvestment, healthEvaluation } = usePortfolio();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Asset allocation data for Recharts
  const pieData = [
    { name: 'Equity (MFs & Stocks)', value: assets.equity || 0, color: '#10b981' },
    { name: 'Debt & PPF', value: assets.debt || 0, color: '#3b82f6' },
    { name: 'Gold (SGB & Digital)', value: assets.gold || 0, color: '#f59e0b' },
    { name: 'Cash / Emergency Buffer', value: assets.cash || 0, color: '#64748b' },
    { name: 'Speculative / Crypto', value: assets.crypto || 0, color: '#ec4899' },
  ].filter(item => item.value > 0);

  const totalPortfolioValue = Object.values(assets).reduce((a, b) => a + Number(b), 0);
  const totalMonthlySIP = investments.reduce((sum, i) => sum + Number(i.monthlySIP || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner: User Greeting & Quick Action */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-brand-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
              {currentUser?.title || 'Consolidated Wealth View'}
            </span>
            <span className="text-xs text-slate-400">
              Risk: <strong className="text-white">{currentUser?.riskProfile?.category || 'Moderate'}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Namaste, {currentUser?.name?.split(' ')[0] || 'Investor'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Here is your unified financial snapshot across Mutual Funds, Fixed Deposits, Gold, and Equities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Add Asset
          </button>
          <button
            onClick={onOpenArthAI}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs sm:text-sm font-semibold rounded-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" /> AI Insights
          </button>
        </div>
      </div>

      {/* Top 3 Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Total Net Worth Card */}
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
              <span className="text-xs text-slate-400">Avg. Portfolio Growth</span>
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
              <span className="text-xs text-slate-400">allocated to wealth</span>
            </div>
          </div>
        </div>

        {/* Portfolio Health & Diversification Score */}
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

      {/* Warnings & AI Health Suggestions (if any flags detected) */}
      {healthEvaluation.flags.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-amber-300">Portfolio Optimization Alert:</p>
            <ul className="list-disc list-inside text-amber-200/90 space-y-0.5">
              {healthEvaluation.flags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Grid: Asset Allocation Chart (Left) + Holdings List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Asset Allocation Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-brand-400" /> Asset Allocation
            </h3>
            <button 
              onClick={onOpenRiskQuiz} 
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              Re-evaluate Risk →
            </button>
          </div>

          {/* Pie Chart */}
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [formatINR(val), 'Holdings']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Breakdown Percentages */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {pieData.map((item, idx) => {
              const pct = ((item.value / totalPortfolioValue) * 100).toFixed(1);
              return (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-white font-semibold">{formatINR(item.value, true)}</span>
                    <span className="text-slate-400 text-[11px]">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Consolidated Holdings List */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" /> Consolidated Holdings ({investments.length})
              </h3>
              <p className="text-xs text-slate-400">All your investments tracked in one single dashboard</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Holding
            </button>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">{inv.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0 font-medium">
                      {inv.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
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
              <div className="text-center py-12 text-slate-400 text-xs">
                No holdings added yet. Click "+ Add Asset" to start tracking.
              </div>
            )}
          </div>
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
