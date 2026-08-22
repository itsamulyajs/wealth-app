/**
 * ArthSaathi Advanced Risk Intelligence & Financial Health Engine
 * Analyzes multi-asset risk, liquidity, stress scenarios, peer benchmarks, and generates 8-pillar reports.
 */

import { formatINR } from './financeCalculators';

/**
 * Generate Comprehensive Multi-Asset Risk & Health Analysis
 */
export const analyzeMultiAssetRisk = (user, assets, investments, goals) => {
  const totalAssets = (assets.equity || 0) + (assets.debt || 0) + (assets.gold || 0) + (assets.cash || 0) + (assets.crypto || 0);
  const monthlyIncome = user?.monthlyIncome || 50000;
  const age = user?.age || 25;

  const equityPct = totalAssets > 0 ? ((assets.equity || 0) / totalAssets) * 100 : 0;
  const debtPct = totalAssets > 0 ? ((assets.debt || 0) / totalAssets) * 100 : 0;
  const goldPct = totalAssets > 0 ? ((assets.gold || 0) / totalAssets) * 100 : 0;
  const cashPct = totalAssets > 0 ? ((assets.cash || 0) / totalAssets) * 100 : 0;
  const cryptoPct = totalAssets > 0 ? ((assets.crypto || 0) / totalAssets) * 100 : 0;

  // 1. Calculate Risk Score (1 to 10)
  let rawRiskScore = 5;
  if (equityPct > 70 || cryptoPct > 10) rawRiskScore += 3;
  else if (equityPct > 50) rawRiskScore += 1.5;
  if (debtPct > 50 || cashPct > 40) rawRiskScore -= 2.5;
  if (age < 26) rawRiskScore += 0.5;
  else if (age > 45) rawRiskScore -= 1.0;
  
  const riskScore10 = Math.max(1, Math.min(10, Math.round(rawRiskScore * 10) / 10));

  // Category Tag
  let profileCategory = '🟡 Moderate Growth';
  let profileColor = 'amber';
  let badgeTheme = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  if (riskScore10 <= 3.5) {
    profileCategory = '🟢 Conservative Capital Preserver';
    profileColor = 'emerald';
    badgeTheme = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  } else if (riskScore10 >= 7.5) {
    profileCategory = '🔴 Aggressive Wealth Builder';
    profileColor = 'rose';
    badgeTheme = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  }

  // 2. Emergency Fund Adequacy Check (3 to 6 months expenses)
  const monthlyExpenses = Math.round(monthlyIncome * 0.6); // Estimated 60% needs/wants
  const targetEmergencyFund = monthlyExpenses * 4.5;
  const currentEmergencyFund = (assets.cash || 0) + Math.round((assets.debt || 0) * 0.4);
  const emergencyAdequacyPct = Math.min(100, Math.round((currentEmergencyFund / Math.max(1, targetEmergencyFund)) * 100));
  const emergencyMonthsCovered = (currentEmergencyFund / Math.max(1, monthlyExpenses)).toFixed(1);

  // 3. Liquidity Status & Financial Health Score (0 to 100)
  const immediateLiquidCash = (assets.cash || 0);
  const liquidityPct = totalAssets > 0 ? Math.round((immediateLiquidCash / totalAssets) * 100) : 100;

  let healthScore = 80;
  const strengths = [];
  const concerns = [];
  const actionItems = [];

  // Health evaluations
  if (emergencyMonthsCovered >= 3) {
    strengths.push(`Solid Emergency Cushion: You have ${emergencyMonthsCovered} months of essential expenses covered (${formatINR(currentEmergencyFund)}).`);
  } else {
    healthScore -= 18;
    concerns.push(`Emergency Fund Vulnerability: Only ${emergencyMonthsCovered} months of expenses covered. Target is 3-6 months (${formatINR(targetEmergencyFund)}).`);
    actionItems.push(`Automate ₹${Math.round(monthlyIncome * 0.15).toLocaleString('en-IN')}/mo into a Liquid Mutual Fund or Sweep-in FD until you reach ₹${targetEmergencyFund.toLocaleString('en-IN')}.`);
  }

  if (cryptoPct > 10) {
    healthScore -= 20;
    concerns.push(`High Speculative Crypto Exposure: ${cryptoPct.toFixed(1)}% of your wealth is in high-volatility tokens. (Recommended safe cap: <5%).`);
    actionItems.push('Rebalance excess crypto profits into Nifty 50 Index Fund or Sovereign Gold Bonds.');
  }

  if (cashPct > 35) {
    healthScore -= 12;
    concerns.push(`Cash Drag Penalty: ${cashPct.toFixed(1)}% idle cash is losing purchasing power against India\'s ~6% inflation.`);
    actionItems.push('Move idle savings above 3 months buffer into Flexi-Cap Mutual Funds or Arbitrage Funds.');
  }

  if (equityPct >= 40 && equityPct <= 75) {
    strengths.push(`Disciplined Equity Exposure: ${equityPct.toFixed(1)}% in growth assets provides optimal inflation-beating compounding.`);
  }

  if (goldPct >= 5 && goldPct <= 15) {
    strengths.push(`Gold Inflation Hedge: ${goldPct.toFixed(1)}% in Sovereign Gold Bonds / ETFs buffers against macroeconomic crises.`);
  } else if (goldPct === 0) {
    actionItems.push('Allocate 5-10% of portfolio into Sovereign Gold Bonds (SGB) or Gold ETFs for crisis protection.');
  }

  // 4. Multi-Asset Deep Asset Breakdown
  const multiAssetAnalysis = [
    {
      name: 'Stock Investments & MFs',
      allocationPct: equityPct.toFixed(1),
      value: assets.equity || 0,
      riskLevel: equityPct > 70 ? 'High Concentration' : 'Moderate Growth',
      volatility: '12% - 15% Annualized Std Dev',
      inflationBeating: true,
      assessment: 'Primary engine for beating 6% Indian inflation. Requires 5+ year horizon.',
      color: '#10b981'
    },
    {
      name: 'Bank Savings & Liquid Cash',
      allocationPct: cashPct.toFixed(1),
      value: assets.cash || 0,
      riskLevel: 'Zero Default (DICGC Insured up to ₹5L)',
      volatility: '0% (Capital Preserved)',
      inflationBeating: false,
      assessment: 'Immediate liquidity for emergencies. Negative real return after inflation (~3.5% vs 6%).',
      color: '#64748b'
    },
    {
      name: 'Fixed Deposits & PPF/EPF',
      allocationPct: debtPct.toFixed(1),
      value: assets.debt || 0,
      riskLevel: 'Zero (Sovereign / Grade AAA)',
      volatility: '0% - 2%',
      inflationBeating: true,
      assessment: 'Guaranteed 7.1% - 8.25% fixed returns with tax shelter (PPF/EPF EEE status).',
      color: '#3b82f6'
    },
    {
      name: 'Sovereign Gold & Precious Metals',
      allocationPct: goldPct.toFixed(1),
      value: assets.gold || 0,
      riskLevel: 'Low-Moderate',
      volatility: '8% - 10%',
      inflationBeating: true,
      assessment: 'Historical 11-12% CAGR + 2.5% RBI interest on SGB. Strong hedge against Rupee depreciation.',
      color: '#f59e0b'
    },
    {
      name: 'Cryptocurrencies & High-Risk',
      allocationPct: cryptoPct.toFixed(1),
      value: assets.crypto || 0,
      riskLevel: 'Extreme Speculative',
      volatility: '60% - 90% Annual Drawdowns',
      inflationBeating: false,
      assessment: 'Flat 30% tax with 0% loss offsetting. Strictly limit to speculative capital (<5%).',
      color: '#ec4899'
    }
  ];

  // 5. Future Projection Scenarios (5, 10, 20 Years)
  const currentMonthlySIP = investments.reduce((s, i) => s + (i.monthlySIP || 0), 0) || 5000;
  const generateScenarioGrowth = (cagr) => {
    const years = [0, 5, 10, 15, 20];
    return years.map(yr => {
      const months = yr * 12;
      const r = cagr / 100;
      const i = r / 12;
      // Future Value of Existing Portfolio + Monthly SIP
      const fvPrincipal = totalAssets * Math.pow(1 + r, yr);
      const fvSIP = months > 0 ? currentMonthlySIP * (((Math.pow(1 + i, months) - 1) / i) * (1 + i)) : 0;
      return {
        year: yr === 0 ? 'Today' : `${yr} Yrs`,
        total: Math.round(fvPrincipal + fvSIP),
      };
    });
  };

  const projections = {
    bestCase: { cagr: 16.0, label: '🌟 Best Case (Bull Run 16% CAGR)', data: generateScenarioGrowth(16.0) },
    realisticCase: { cagr: 12.5, label: '📊 Realistic Case (Historical 12.5% CAGR)', data: generateScenarioGrowth(12.5) },
    worstCase: { cagr: 7.0, label: '🌧️ Worst Case (Stagnant Market 7.0% CAGR)', data: generateScenarioGrowth(7.0) },
  };

  // 6. Peer Comparison (Average Indian age peer benchmark)
  const peerComparison = {
    userMonthlySavingsPct: Math.round((currentMonthlySIP / Math.max(1, monthlyIncome)) * 100),
    peerAverageSavingsPct: 15, // Average Indian urban peer saves ~15%
    userEquitySharePct: Math.round(equityPct),
    peerAverageEquitySharePct: 22, // Average Indian household has only ~22% in financial equities
    userHealthScore: Math.max(20, Math.min(100, healthScore)),
    peerAverageHealthScore: 58
  };

  // 7. Risk Profile Narrative Story
  const narrativeStory = `At age ${age} in ${user?.city || 'India'} as a ${user?.occupation || 'wealth creator'}, your financial archetype is classified as **${profileCategory}** with a Risk Score of **${riskScore10} / 10**. You have a strong ${Math.round(equityPct)}% growth engine backed by ${formatINR(totalAssets)} in consolidated net worth. Your biggest superpower is your **time horizon**—continuing disciplined monthly SIPs of ${formatINR(currentMonthlySIP)} will allow compound interest to expand your wealth to **${formatINR(projections.realisticCase.data[4].total)}** over 20 years.`;

  return {
    riskScore10,
    profileCategory,
    profileColor,
    badgeTheme,
    healthScore: Math.max(20, Math.min(100, healthScore)),
    totalAssets,
    monthlyIncome,
    currentMonthlySIP,
    emergencyStatus: {
      currentAmount: currentEmergencyFund,
      targetAmount: targetEmergencyFund,
      monthsCovered: emergencyMonthsCovered,
      adequacyPct: emergencyAdequacyPct
    },
    liquidityStatus: {
      liquidAmount: immediateLiquidCash,
      liquidityPct
    },
    multiAssetAnalysis,
    projections,
    peerComparison,
    narrativeStory,
    strengths,
    concerns,
    actionItems
  };
};
