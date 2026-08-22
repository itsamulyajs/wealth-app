import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { analyzeMultiAssetRisk } from '../../utils/riskIntelligenceEngine';
import { formatINR } from '../../utils/financeCalculators';
import { RiskProfiler } from './RiskProfiler';
import { 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Users, 
  Layers, 
  Flame, 
  Coins, 
  PieChart as PieChartIcon, 
  ArrowRight, 
  SlidersHorizontal,
  Lightbulb,
  Zap,
  RotateCcw,
  Target,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const AdvancedRiskHub = ({ onOpenArthAI }) => {
  const { currentUser } = useAuth();
  const { assets, investments, goals } = usePortfolio();

  const [activeViewTab, setActiveViewTab] = useState('overview'); // 'overview' | 'multi_asset' | 'projections' | 'life_events' | 'quiz'
  const [selectedHorizonYears, setSelectedHorizonYears] = useState(10);

  const report = analyzeMultiAssetRisk(currentUser, assets, investments, goals);

  // Combine Projection Chart Data
  const chartData = [
    { year: 'Today', best: report.projections.bestCase.data[0].total, realistic: report.projections.realisticCase.data[0].total, worst: report.projections.worstCase.data[0].total },
    { year: '5 Yrs', best: report.projections.bestCase.data[1].total, realistic: report.projections.realisticCase.data[1].total, worst: report.projections.worstCase.data[1].total },
    { year: '10 Yrs', best: report.projections.bestCase.data[2].total, realistic: report.projections.realisticCase.data[2].total, worst: report.projections.worstCase.data[2].total },
    { year: '15 Yrs', best: report.projections.bestCase.data[3].total, realistic: report.projections.realisticCase.data[3].total, worst: report.projections.worstCase.data[3].total },
    { year: '20 Yrs', best: report.projections.bestCase.data[4].total, realistic: report.projections.realisticCase.data[4].total, worst: report.projections.worstCase.data[4].total },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Comprehensive Multi-Asset Risk & Health Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personalized Risk DNA & Financial Health Report
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Multi-asset risk breakdown, liquidity adequacy, stress testing, scenario projections (Best/Realistic/Worst), and adaptive life event planning.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: '📊 Risk Scorecard & Health' },
          { id: 'multi_asset', label: '🔍 Multi-Asset Risk Analysis' },
          { id: 'projections', label: '📈 Scenario Projections (5-20Y)' },
          { id: 'life_events', label: '🔄 Adaptive Life Events' },
          { id: 'quiz', label: '📝 Behavioral Quiz & Stress Test' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveViewTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
              activeViewTab === tab.id
                ? 'bg-brand-500 text-slate-950 font-bold shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & HEALTH SCORECARD */}
      {activeViewTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top 4 Core Metric Scorecards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Risk Tolerance Score (1-10) */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Risk Tolerance Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-mono">{report.riskScore10}</span>
                <span className="text-xs text-slate-400 font-semibold">/ 10</span>
              </div>
              <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${report.badgeTheme}`}>
                {report.profileCategory}
              </span>
            </div>

            {/* Financial Health Score (0-100) */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Financial Health Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-brand-400 font-mono">{report.healthScore}</span>
                <span className="text-xs text-slate-400 font-semibold">/ 100</span>
              </div>
              <span className="text-xs text-slate-400 block">
                {report.healthScore >= 75 ? 'Healthy & Resilient' : 'Needs Minor Optimization'}
              </span>
            </div>

            {/* Emergency Fund Adequacy */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Emergency Buffer</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-indigo-300 font-mono">{report.emergencyStatus.monthsCovered}</span>
                <span className="text-xs text-slate-400 font-semibold">Months</span>
              </div>
              <span className={`text-[10px] font-bold ${
                report.emergencyStatus.monthsCovered >= 3 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {report.emergencyStatus.monthsCovered >= 3 ? '✅ Meets 3-6 Mo Rule' : '⚠️ Below 3-Month Target'}
              </span>
            </div>

            {/* Immediate Liquidity Status */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Immediate Liquidity</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-300 font-mono">{report.liquidityStatus.liquidityPct}%</span>
                <span className="text-xs text-slate-400 font-semibold">({formatINR(report.liquidityStatus.liquidAmount, true)})</span>
              </div>
              <span className="text-xs text-slate-400 block">Instant Access via UPI/ATM</span>
            </div>

          </div>

          {/* Personality Narrative Story Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Your Financial Personality Narrative
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {report.narrativeStory}
            </p>
          </div>

          {/* SWOT Breakdown: Strengths vs Areas Needing Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> What You're Doing Right ({report.strengths.length})
              </h3>
              <ul className="space-y-2.5">
                {report.strengths.map((str, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas Needing Improvement */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Vulnerabilities & Action Items ({report.concerns.length})
              </h3>
              <ul className="space-y-2.5">
                {report.concerns.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                    <span>{con}</span>
                  </li>
                ))}
                {report.concerns.length === 0 && (
                  <li className="text-xs text-emerald-400 p-3 rounded-2xl bg-slate-950">
                    No critical vulnerabilities detected in your asset allocation!
                  </li>
                )}
              </ul>
            </div>

          </div>

          {/* Peer Benchmark Comparison Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-400" />
              How You Compare Against Average Indian Age Peers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400">Monthly Savings Rate</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-brand-400 font-mono">{report.peerComparison.userMonthlySavingsPct}%</span>
                  <span className="text-xs text-slate-500">Peer Avg: {report.peerComparison.peerAverageSavingsPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, report.peerComparison.userMonthlySavingsPct * 2)}%` }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400">Equity Asset Share</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-indigo-400 font-mono">{report.peerComparison.userEquitySharePct}%</span>
                  <span className="text-xs text-slate-500">Peer Avg: {report.peerComparison.peerAverageEquitySharePct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, report.peerComparison.userEquitySharePct)}%` }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400">Overall Health Score</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-emerald-400 font-mono">{report.peerComparison.userHealthScore}/100</span>
                  <span className="text-xs text-slate-500">Peer Avg: {report.peerComparison.peerAverageHealthScore}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${report.peerComparison.userHealthScore}%` }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MULTI-ASSET DEEP RISK ANALYSIS */}
      {activeViewTab === 'multi_asset' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-400" />
              Multi-Asset Class Risk & Inflation Analysis
            </h3>
            <p className="text-xs text-slate-400">
              Examining the volatility, concentration risk, FDIC/DICGC protection, and inflation resistance of each asset class in your portfolio.
            </p>

            <div className="space-y-4 pt-2">
              {report.multiAssetAnalysis.map((asset, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></span>
                      <h4 className="text-sm font-bold text-white">{asset.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {asset.allocationPct}% ({formatINR(asset.value)})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {asset.riskLevel}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        asset.inflationBeating ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {asset.inflationBeating ? 'Beats 6% Inflation' : 'Loses to Inflation'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {asset.assessment}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                    <span>Standard Volatility: <strong className="text-slate-300">{asset.volatility}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FUTURE SCENARIO PROJECTIONS */}
      {activeViewTab === 'projections' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-400" />
                Future Scenario Projections (5 to 20 Years)
              </h3>
              <p className="text-xs text-slate-400">
                Simulating portfolio compounding under Best Case (16%), Realistic Case (12.5%), and Worst Case (7%) market regimes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Active Monthly SIP:</span>
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-brand-400 font-mono">
                {formatINR(report.currentMonthlySIP)}/mo
              </span>
            </div>
          </div>

          {/* Comparison Cards for 20 Years */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
              <span className="text-[11px] text-emerald-400 font-bold uppercase block">🌟 Best Case (16% CAGR)</span>
              <p className="text-2xl font-black text-white font-mono">{formatINR(report.projections.bestCase.data[4].total)}</p>
              <span className="text-[10px] text-slate-400">In 20 Years (Indian Bull Supercycle)</span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1">
              <span className="text-[11px] text-indigo-300 font-bold uppercase block">📊 Realistic Case (12.5% CAGR)</span>
              <p className="text-2xl font-black text-brand-400 font-mono">{formatINR(report.projections.realisticCase.data[4].total)}</p>
              <span className="text-[10px] text-slate-400">In 20 Years (Historical Nifty Median)</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <span className="text-[11px] text-rose-400 font-bold uppercase block">🌧️ Worst Case (7.0% CAGR)</span>
              <p className="text-2xl font-black text-slate-300 font-mono">{formatINR(report.projections.worstCase.data[4].total)}</p>
              <span className="text-[10px] text-slate-400">In 20 Years (Stagnant Market Regime)</span>
            </div>

          </div>

          {/* Area Chart */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="bestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="worstGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => formatINR(v, true)} />
                <Tooltip
                  formatter={(val, name) => [formatINR(val), name === 'best' ? 'Best Case (16%)' : name === 'realistic' ? 'Realistic (12.5%)' : 'Worst Case (7%)']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="best" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#bestGrad)" />
                <Area type="monotone" dataKey="realistic" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#realGrad)" />
                <Area type="monotone" dataKey="worst" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#worstGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}

      {/* TAB 4: ADAPTIVE LIFE EVENTS */}
      {activeViewTab === 'life_events' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Adaptive Risk Management & Life Event Triggers
            </h3>
            <p className="text-xs text-slate-400">
              When your life stage changes, your risk appetite and asset allocation must dynamically rebalance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">💍 Event: Marriage / Family Expansion</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Increase emergency buffer from 3 months to <strong>6 months</strong>. Introduce separate health insurance top-up outside corporate coverage and increase debt allocation to 30%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">💼 Event: Job Switch / Career Promotion</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Step-up monthly SIPs by <strong>15-20%</strong> immediately to prevent lifestyle inflation creep. Review Old vs New Tax Regime deductions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">🏠 Event: Buying a House Down-Payment</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Move target down-payment money from volatile equity into <strong>Arbitrage or Liquid Debt Funds 2 years prior</strong> to purchase to avoid market crash risk.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">📉 Event: Severe Market Correction (-20%+)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Do not pause SIPs!</strong> Rebalance 5-10% of debt fund gains into discounted equity index funds to accelerate recovery compounding.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: QUIZ & STRESS TESTER */}
      {activeViewTab === 'quiz' && (
        <div className="animate-fade-in">
          <RiskProfiler />
        </div>
      )}

    </div>
  );
};
