/**
 * Indian Financial Mathematics & Formatting Helpers
 */

// Format numbers in Indian numbering system (Lakhs and Crores)
export const formatINR = (amount, compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  const num = Number(amount);
  
  if (compact) {
    if (Math.abs(num) >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    if (Math.abs(num) >= 100000) {
      return `₹${(num / 100000).toFixed(2)} L`;
    }
    if (Math.abs(num) >= 1000) {
      return `₹${(num / 1000).toFixed(1)} K`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

// Format standard number without currency symbol
export const formatIndianNumber = (num) => {
  if (!num || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Calculate SIP Future Value
 * Formula: FV = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
 * P = Monthly Investment
 * i = Monthly interest rate (annualRate / 12 / 100)
 * n = Total months (years * 12)
 */
export const calculateSIP = (monthlyInvestment, annualRate, years) => {
  const P = Number(monthlyInvestment);
  const r = Number(annualRate) / 100;
  const n = Number(years) * 12;
  const i = r / 12;

  if (P <= 0 || n <= 0) {
    return { totalInvested: 0, estimatedReturns: 0, totalValue: 0, yearlyBreakdown: [] };
  }

  const totalInvested = P * n;
  const totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const estimatedReturns = Math.max(0, totalValue - totalInvested);

  // Generate Year-by-Year Growth trajectory
  const yearlyBreakdown = [];
  for (let yr = 1; yr <= years; yr++) {
    const months = yr * 12;
    const invested = P * months;
    const value = P * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    yearlyBreakdown.push({
      year: `Year ${yr}`,
      invested: Math.round(invested),
      returns: Math.round(Math.max(0, value - invested)),
      total: Math.round(value),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    yearlyBreakdown,
  };
};

/**
 * Calculate Monthly SIP needed to reach a Target Goal
 * Formula: P = Target / [ ( (1 + i)^n - 1 ) / i * (1 + i) ]
 */
export const calculateRequiredSIP = (targetAmount, annualRate, years, inflationRate = 6) => {
  const target = Number(targetAmount);
  const r = Number(annualRate) / 100;
  const n = Number(years) * 12;
  const i = r / 12;
  const inf = Number(inflationRate) / 100;

  // Inflation adjusted future target cost
  const inflationAdjustedTarget = target * Math.pow(1 + inf, years);

  if (target <= 0 || n <= 0 || i <= 0) {
    return { requiredSIP: 0, inflationAdjustedTarget: target };
  }

  const denominator = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const requiredSIP = inflationAdjustedTarget / denominator;

  return {
    requiredSIP: Math.round(requiredSIP),
    nominalTarget: Math.round(target),
    inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
  };
};

/**
 * Assess Portfolio Health and Diversification Score (0 to 100)
 */
export const evaluatePortfolioHealth = (assets) => {
  // assets: { equity: number, debt: number, gold: number, cash: number, crypto: number }
  const total = (assets.equity || 0) + (assets.debt || 0) + (assets.gold || 0) + (assets.cash || 0) + (assets.crypto || 0);
  if (total === 0) return { score: 50, label: 'Unbalanced', flags: ['No assets found'], advice: 'Add assets to start analyzing.' };

  const equityPct = ((assets.equity || 0) / total) * 100;
  const debtPct = ((assets.debt || 0) / total) * 100;
  const goldPct = ((assets.gold || 0) / total) * 100;
  const cashPct = ((assets.cash || 0) / total) * 100;
  const cryptoPct = ((assets.crypto || 0) / total) * 100;

  let score = 85;
  const flags = [];
  const suggestions = [];

  if (cryptoPct > 15) {
    score -= 25;
    flags.push(`High speculative crypto exposure (${cryptoPct.toFixed(1)}%). Recommended cap is 5-10%.`);
  }

  if (equityPct > 85) {
    score -= 15;
    flags.push(`Over-concentrated in equity (${equityPct.toFixed(1)}%). Volatility risk during market corrections.`);
    suggestions.push('Consider allocating 10-15% into PPF, Debt Funds, or Sovereign Gold Bonds for stability.');
  }

  if (cashPct > 35) {
    score -= 15;
    flags.push(`Excess cash (${cashPct.toFixed(1)}%) losing value against India\'s ~6% inflation.`);
    suggestions.push('Move idle cash above emergency requirements into Flexi-Cap Mutual Funds or Arbitrage Funds.');
  }

  if (goldPct === 0) {
    suggestions.push('Consider adding 5-10% Gold (SGB or Gold ETF) as an inflation hedge.');
  }

  if (debtPct < 10 && equityPct > 70) {
    score -= 10;
    flags.push('Low debt buffer: Lack of fixed income safety net for sudden downturns.');
  }

  let label = 'Excellent';
  let badgeColor = 'emerald';
  if (score >= 80) {
    label = 'Healthy & Resilient';
    badgeColor = 'emerald';
  } else if (score >= 60) {
    label = 'Moderate Balance';
    badgeColor = 'amber';
  } else {
    label = 'Needs Rebalancing';
    badgeColor = 'rose';
  }

  return {
    score: Math.max(20, Math.min(100, score)),
    label,
    badgeColor,
    flags,
    suggestions,
    percentages: {
      equity: equityPct.toFixed(1),
      debt: debtPct.toFixed(1),
      gold: goldPct.toFixed(1),
      cash: cashPct.toFixed(1),
      crypto: cryptoPct.toFixed(1),
    }
  };
};
