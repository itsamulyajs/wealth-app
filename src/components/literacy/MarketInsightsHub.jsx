import React, { useState } from 'react';
import {
  PRE_ANALYZED_CLAIMS,
  STOCK_HYPE_DATABASE,
  VIRAL_TRENDS_REALITY,
  PRODUCT_MYTHS_DATABASE,
  PSYCHOLOGY_BIASES,
  verifyUserClaim
} from '../../data/marketInsightsData';
import { FINANCIAL_JARGON_EXPLAINED } from '../../data/mythData';
import {
  ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, XCircle,
  HelpCircle, Sparkles, Search, ArrowRight, Flame, BookOpen,
  TrendingUp, TrendingDown, Brain, FileText, BarChart3, AlertOctagon,
  Percent, DollarSign, Target, Lightbulb, Compass, Zap
} from 'lucide-react';

export const MarketInsightsHub = () => {
  const [activeTab, setActiveTab] = useState('claim_verifier'); // 'claim_verifier' | 'stock_hype' | 'viral_trends' | 'product_myths' | 'psychology' | 'jargon'

  // Claim verifier state
  const [customClaimInput, setCustomClaimInput] = useState('');
  const [selectedClaim, setSelectedClaim] = useState(PRE_ANALYZED_CLAIMS[0]);
  const [analyzedResult, setAnalyzedResult] = useState(PRE_ANALYZED_CLAIMS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Stock hype search state
  const [stockSearchQuery, setStockSearchQuery] = useState('');

  const handleVerifyCustom = (e) => {
    e?.preventDefault();
    if (!customClaimInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = verifyUserClaim(customClaimInput);
      setAnalyzedResult(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSelectPrebuilt = (claim) => {
    setSelectedClaim(claim);
    setCustomClaimInput(claim.claimText);
    setAnalyzedResult(claim);
  };

  const filteredStocks = STOCK_HYPE_DATABASE.filter(s =>
    s.name.toLowerCase().includes(stockSearchQuery.toLowerCase()) ||
    s.symbol.toLowerCase().includes(stockSearchQuery.toLowerCase()) ||
    s.sector.toLowerCase().includes(stockSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Module 4: Smart Investment Validator & Fact Check
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Market Insights & Investment Claim Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Verify investment claims from social media, influencers, and news headlines. We analyze empirical SEBI data, financial statements, and mathematical probabilities to separate viral hype from wealth reality.
          </p>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'claim_verifier', label: '🔍 Claim Verification Space', icon: Search },
          { id: 'stock_hype', label: '📈 Stock Hype Check', icon: TrendingUp },
          { id: 'viral_trends', label: '🚀 Viral Trends Reality', icon: Flame },
          { id: 'product_myths', label: '📜 Financial Product Truths', icon: FileText },
          { id: 'psychology', label: '🧠 Market Psychology Traps', icon: Brain },
          { id: 'jargon', label: '📚 Jargon Demystifier', icon: BookOpen },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-brand-500 text-slate-950 shadow-lg shadow-brand-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLAIM VERIFICATION SPACE (PART A) */}
      {activeTab === 'claim_verifier' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* User Input Space */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-400" /> Enter Any Claim or Financial Tip
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Type what an influencer, colleague, or Telegram group claimed:</p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                AI Fact Engine Active
              </span>
            </div>

            <form onSubmit={handleVerifyCustom} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customClaimInput}
                onChange={e => setCustomClaimInput(e.target.value)}
                placeholder="e.g. 'This stock will 10x in 3 months' or 'Bitcoin will reach $100,000 next year'..."
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white focus:border-brand-500 placeholder:text-slate-600 outline-none"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all shrink-0"
              >
                {isAnalyzing ? <Sparkles className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                {isAnalyzing ? 'Analyzing Claim...' : 'Verify Claim'}
              </button>
            </form>

            {/* Quick Sample Clickers */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 block">Or test a trending viral claim:</span>
              <div className="flex flex-wrap gap-2">
                {PRE_ANALYZED_CLAIMS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectPrebuilt(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all border text-left ${
                      selectedClaim.id === c.id
                        ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    "{c.claimText.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VERIFICATION REPORT OUTPUT */}
          {analyzedResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
              
              {/* Header Status Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      analyzedResult.statusColor === 'rose' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                      analyzedResult.statusColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {analyzedResult.badgeText || analyzedResult.status}
                    </span>
                    <span className="text-xs text-slate-400">Category: <strong className="text-white">{analyzedResult.category}</strong></span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                    "{analyzedResult.claimText}"
                  </h4>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0 min-w-[130px]">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Probability Score</span>
                  <span className={`text-2xl font-black font-mono ${
                    analyzedResult.probabilityPct < 20 ? 'text-rose-400' :
                    analyzedResult.probabilityPct < 60 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {analyzedResult.probabilityPct}% Chance
                  </span>
                </div>
              </div>

              {/* 1. EVIDENCE BREAKDOWN */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> 1. Evidence & Data Breakdown
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 block">📊 Historical Data & Track Record:</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{analyzedResult.historicalData}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 block">🎓 Expert Consensus vs Influencer Narrative:</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{analyzedResult.expertVsInfluencer}</p>
                  </div>
                </div>
              </div>

              {/* 2. REALITY CHECK 4-POINT GRID */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> 2. Deep Reality Check
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Has this happened before?</span>
                    <p className="text-xs text-slate-300 leading-snug">{analyzedResult.realityCheck?.hasHappenedBefore}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Who profits from this?</span>
                    <p className="text-xs text-amber-300 font-semibold leading-snug">{analyzedResult.realityCheck?.whoProfits}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Actual Success Rate</span>
                    <p className="text-xs text-slate-300 leading-snug">{analyzedResult.realityCheck?.trackRecord}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">What's missing?</span>
                    <p className="text-xs text-rose-300 leading-snug">{analyzedResult.realityCheck?.whatsMissing}</p>
                  </div>
                </div>
              </div>

              {/* 3. RISK ASSESSMENT & 4. BETTER ALTERNATIVES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Risk Assessment */}
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4" /> 3. Hidden Risks & Downside Assessment
                  </span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong>Real Risks:</strong> {analyzedResult.riskAssessment?.realRisks}</p>
                    <p><strong>Hidden Costs:</strong> {analyzedResult.riskAssessment?.hiddenCosts}</p>
                    <p><strong>Who Loses:</strong> <span className="text-rose-300">{analyzedResult.riskAssessment?.whoLosesMoney}</span></p>
                  </div>
                </div>

                {/* Better Alternatives */}
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> 4. Smarter & Lower-Risk Alternatives
                  </span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong>What to do instead:</strong> {analyzedResult.betterAlternatives?.action}</p>
                    <p><strong>Realistic Expectations:</strong> <span className="text-brand-300 font-semibold">{analyzedResult.betterAlternatives?.realisticExpectation}</span></p>
                    <p><strong>Safer Route:</strong> {analyzedResult.betterAlternatives?.lowerRiskApproach}</p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: STOCK HYPE CHECK */}
      {activeTab === 'stock_hype' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" /> Stock Hype vs Fundamental Reality
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Compare social media narratives against audited balance sheets, P/E multiples, and competitive moats.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={stockSearchQuery}
                onChange={e => setStockSearchQuery(e.target.value)}
                placeholder="Search stock or sector..."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredStocks.map(stock => (
              <div key={stock.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{stock.name}</h4>
                      <span className="text-xs text-brand-400 font-mono font-semibold">{stock.symbol} • {stock.sector}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-brand-500/10 text-brand-300 border border-brand-500/30">
                      {stock.financialReality.verdictStatus}
                    </span>
                  </div>

                  {/* Media Narrative */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1 text-xs mb-3">
                    <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Media & Influencer Narrative
                    </span>
                    <p className="text-slate-300 leading-snug">"{stock.mediaNarrative}"</p>
                  </div>

                  {/* Financial Reality Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">P/E Valuation</span>
                      <span className="font-bold text-white font-mono">{stock.financialReality.peRatio}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Revenue Growth</span>
                      <span className="font-bold text-emerald-400 font-mono">{stock.financialReality.revenueGrowth}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Profitability</span>
                      <span className="font-semibold text-slate-300">{stock.financialReality.profitGrowth}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Debt / Balance Sheet</span>
                      <span className="font-semibold text-slate-300">{stock.financialReality.debtToEquity}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-200">
                  <strong className="text-indigo-300">Reality Verdict:</strong> {stock.financialReality.verdict}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VIRAL TRENDS REALITY CHECK */}
      {activeTab === 'viral_trends' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" /> Viral Investment Trends & The Cold Hard Numbers
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Empirical success vs failure statistics for popular get-rich-quick trends in India.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VIRAL_TRENDS_REALITY.map(trend => (
              <div key={trend.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{trend.title}</h4>
                  <span className="text-xs text-rose-400 font-mono font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                    High Risk Trap
                  </span>
                </div>

                <p className="text-xs text-slate-400 italic">Viral Hook: {trend.hypeHeadline}</p>

                {/* Success vs Failure Bar */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">Profitable: {trend.successStats}</span>
                    <span className="text-rose-400">Losing / Wiped Out: {trend.failureStats}</span>
                  </div>
                  <div className="w-full h-3 bg-rose-500/30 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: trend.successStats.includes('%') ? trend.successStats.split('%')[0] + '%' : '10%' }}></div>
                    <div className="h-full bg-rose-500 flex-1"></div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Early vs Late Investors:</strong> {trend.earlyVsLate}</p>
                  <p><strong>Hidden Downside:</strong> {trend.hiddenRisks}</p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-brand-300 font-mono font-semibold">
                    📈 Actual Average Result: {trend.actualAverageReturn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIAL PRODUCT TRUTHS & MYTHS */}
      {activeTab === 'product_myths' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-400" /> Financial Product Myths & Fee Structure Truths
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Unmasking toxic bundled insurance plans, ULIPs, and opaque distributor fee models.</p>
          </div>

          <div className="space-y-4">
            {PRODUCT_MYTHS_DATABASE.map(prod => (
              <div key={prod.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">{prod.name}</h4>
                  <span className="text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 w-fit">
                    Expected IRR: {prod.realisticReturns}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <span className="font-bold text-rose-400 block">⚠️ Claimed vs Real Benefits:</span>
                    <p className="text-slate-400"><strong>Sales Pitch:</strong> {prod.claimedBenefits}</p>
                    <p className="text-slate-300"><strong>Reality:</strong> {prod.actualBenefits}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <span className="font-bold text-amber-400 block">💸 Opaque Fee Structure:</span>
                    <p className="text-slate-300 leading-relaxed">{prod.feeStructure}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-slate-200">
                  <strong className="text-emerald-400">💡 Recommended Unbundled Strategy:</strong> {prod.betterAlternative}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MARKET PSYCHOLOGY & BEHAVIORAL TRAPS */}
      {activeTab === 'psychology' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" /> Market Psychology & Emotional Traps
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Why smart people make irrational money decisions and how to build mental firewalls.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PSYCHOLOGY_BIASES.map(b => (
              <div key={b.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{b.icon}</span>
                    <h4 className="text-base font-bold text-white">{b.name}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{b.definition}</p>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Behavioral Stat:</span>
                    <span className="text-brand-300 font-medium">{b.statistic}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-200">
                  <strong className="text-indigo-300">🛡️ How to Defeat:</strong> {b.howToDefeat}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: JARGON DEMYSTIFIER */}
      {activeTab === 'jargon' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Indian Financial Jargon Explained with Plain Analogies</h3>
              <p className="text-xs text-slate-400">Complex terminology broken down for everyday investors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINANCIAL_JARGON_EXPLAINED.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 hover:border-brand-500/30 transition-all">
                <h4 className="text-sm font-bold text-brand-400">{item.term}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.simple}</p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                  💡 <strong className="text-slate-300 not-italic">Analogy:</strong> {item.analogy}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
