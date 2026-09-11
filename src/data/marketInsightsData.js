/**
 * Comprehensive Database & Intelligent Claim Verification Engine
 * Module 4: Market Insights & Claim Verification ("Smart Investment Validator")
 */

// 1. PRE-ANALYZED VIRAL CLAIMS FOR INSTANT TEST & BENCHMARK
export const PRE_ANALYZED_CLAIMS = [
  {
    id: 'claim-btc-100k',
    claimText: 'Bitcoin will reach $100,000 / ₹1 Crore by next year and you should invest all your savings now',
    category: 'Crypto',
    status: 'Partially True', // 'Partially True' | 'Misleading' | 'False/Exaggerated' | 'Unverifiable'
    statusColor: 'amber',
    badgeText: '⚠️ Partially True (High Volatility Risk)',
    probabilityPct: 38,
    quote: '"Bitcoin is mathematically programmed to 10x every halving cycle. Put your emergency fund into BTC."',
    historicalData: 'Bitcoin has experienced four 70%+ drawdowns in the last 10 years (2014, 2018, 2021, 2022). While long-term CAGR is positive, 1-year holding periods have a 42% chance of negative real returns.',
    expertVsInfluencer: 'SEBI & RBI warn that cryptocurrencies have zero sovereign backing and flat 30% tax with 0% loss set-off. Influencers earn up to 40% affiliate kickbacks on exchange trading volume.',
    realityCheck: {
      hasHappenedBefore: 'Yes, parabolic surges occurred in 2017 and 2021, but both were immediately followed by 80% market crashes lasting 18-24 months.',
      whoProfits: 'Crypto exchanges (via 0.2-1% spot fees), early whale wallets selling liquidity, and influencers with affiliate referral links.',
      trackRecord: 'Only 6.2% of retail crypto accounts in India maintain a net profit after factoring in 30% tax and 1% TDS on every sell order.',
      whatsMissing: 'No mention of 30% flat tax in India, zero loss set-off against equity gains, extreme drawdown risk, or lack of insurance.'
    },
    riskAssessment: {
      realRisks: 'Total capital loss if private key compromised or exchange freezes withdrawals. Extreme 50-80% short-term volatility.',
      hiddenCosts: '1% TDS on every transaction, 18% GST on trading fees, 30% tax on all profitable trades without deducting losing trades.',
      whoLosesMoney: 'Retail investors who buy at peak hype during media frenzies and panic sell during 40% normal corrections.'
    },
    betterAlternatives: {
      action: 'Allocate maximum 2-5% of portfolio to high-liquidity assets like Bitcoin/Ethereum only after building 6 months emergency cash and equity SIPs.',
      realisticExpectation: 'Expect ±50% annualized volatility with high cyclical swings rather than guaranteed 10x gains.',
      lowerRiskApproach: 'Invest in Nifty 50 Index Funds + Sovereign Gold Bonds for consistent 12-14% compounding with sovereign safety.'
    }
  },
  {
    id: 'claim-10x-penny-stock',
    claimText: 'This penny stock trading at ₹12 is going to 10x in 6 months because of a secret government defense order',
    category: 'Stocks',
    status: 'False/Exaggerated',
    statusColor: 'rose',
    badgeText: '❌ False / Pump & Dump Trap',
    probabilityPct: 4,
    quote: '"Buy XYZ Infotech at ₹12. Target ₹150 in 6 months! 1000% multibagger confirmed by insider sources on Telegram."',
    historicalData: 'Over 94% of micro-cap stocks with sudden Telegram promotional bursts in India turn out to be operator-driven "Pump and Dump" schemes (SEBI Annual Report 2024).',
    expertVsInfluencer: 'Chartered Financial Analysts note that micro-caps with negative operating cash flows and promoter pledging above 40% almost never sustain price spikes.',
    realityCheck: {
      hasHappenedBefore: 'Operators inflate low-liquidity stock prices with circular trading, lure retail buyers via Telegram, and dump 100% of promoter shares on buyers.',
      whoProfits: 'Telegram channel admins paid ₹2-5 Lakhs per promotional campaign and front-running syndicate operators.',
      trackRecord: 'Less than 1 in 200 promoted penny stocks in India actually become sustainable mid-caps over a 5-year period.',
      whatsMissing: 'Zero financial audit data, negative P/E ratios, low free-float manipulation, and upcoming circuit filters.'
    },
    riskAssessment: {
      realRisks: 'Stock gets stuck in lower circuits (5% daily drop) where you cannot sell even if you try. 90-100% permanent capital destruction.',
      hiddenCosts: 'High illiquidity spread, ASM/GSM surveillance stage penalties by NSE/BSE.',
      whoLosesMoney: 'Retail traders who enter on day 3-5 after the initial hype message is broadcast.'
    },
    betterAlternatives: {
      action: 'Stick to Nifty Smallcap 250 Index Mutual Funds if you want small-cap explosive growth with professional diversification.',
      realisticExpectation: 'Quality small-cap mutual funds deliver 15-18% CAGR over 7+ years with regulated risk management.',
      lowerRiskApproach: 'Systematic Investment Plan (SIP) in Flexi-Cap or Mid-Cap mutual funds with 10-year proven track records.'
    }
  },
  {
    id: 'claim-guaranteed-20-mf',
    claimText: 'This special mutual fund scheme offers 20% guaranteed annual returns with zero risk to principal',
    category: 'Mutual Funds',
    status: 'False/Exaggerated',
    statusColor: 'rose',
    badgeText: '❌ False (Violates SEBI Regulations)',
    probabilityPct: 0,
    quote: '"Invest in our guaranteed high-yield arbitrage plan. 20% fixed returns credited every year safely."',
    historicalData: 'By SEBI law (Mutual Fund Regulations 1996), NO mutual fund in India is legally permitted to promise or guarantee returns. Even sovereign Indian Govt 10Y Bonds yield ~7.0-7.3%.',
    expertVsInfluencer: 'Any entity promising >12% fixed/guaranteed returns in India is either an unregistered Ponzi scheme, unauthorized chit fund, or misrepresenting past equity CAGR as a future guarantee.',
    realityCheck: {
      hasHappenedBefore: 'Multiple unauthorized investment schemes (e.g., Saradha, PACL, SpeakAsia) collapsed after promising 15-25% fixed monthly returns.',
      whoProfits: 'Unregistered agents earning upfront 10-15% Ponzi commissions on fresh retail deposits.',
      trackRecord: '100% of schemes promising >15% guaranteed returns without market risk have eventually defaulted.',
      whatsMissing: 'SEBI registration certificate, AMC fund fact sheet, risk-o-meter declaration, and market volatility disclosure.'
    },
    riskAssessment: {
      realRisks: 'Complete loss of invested principal. No recourse under SEBI SCORES dispute resolution for unregistered schemes.',
      hiddenCosts: 'Massive lock-in penalties and sudden withdrawal freezes when new depositor inflows dry up.',
      whoLosesMoney: 'Senior citizens and conservative savers looking for higher-than-FD returns.'
    },
    betterAlternatives: {
      action: 'For fixed safety: RBI Floating Rate Bonds (7.75%), Senior Citizen Savings Scheme (8.2%), or Bank FDs (7.0-7.5%).',
      realisticExpectation: 'Real equity market returns range between 11-14% CAGR over 10+ years with interim ±15% volatility.',
      lowerRiskApproach: 'Multi-Asset Allocation Fund combining Equity (65%), Debt (25%), and Gold (10%) for smooth 12% long-term CAGR.'
    }
  },
  {
    id: 'claim-fno-trader-50k',
    claimText: 'This 22-year-old influencer made ₹50,000 in one week trading Nifty options on mobile with just ₹10,000 capital',
    category: 'Trading',
    status: 'Misleading',
    statusColor: 'amber',
    badgeText: '⚠️ Misleading (Survivorship & Demo Trap)',
    probabilityPct: 7,
    quote: '"Turn ₹10K into ₹50K in 5 trading sessions! Daily Hero-or-Zero zero-loss expiry strategy revealed in my ₹999 course."',
    historicalData: 'SEBI study (September 2024) confirmed: 93% of individual F&O traders in India lost money between FY22-FY24. The top 1% of winners make profit by collecting premiums, not by buying out-of-the-money lotto calls.',
    expertVsInfluencer: 'Veteran derivatives market-makers note that option buying has a negative expected mathematical value (-EV) due to theta (time decay) and high transaction friction.',
    realityCheck: {
      hasHappenedBefore: 'Traders hit lucky 3x spikes occasionally, but lose 100% of accumulated capital on the next 2-3 losing trades (Gambler\'s Ruin).',
      whoProfits: 'Brokers charging ₹40-50 per executed order, course sellers earning ₹999-9,999 per subscriber, and option writers.',
      trackRecord: 'The average retail options trader in India incurs ₹1.25 Lakh net loss and spends ₹50,000+ in brokerage and STT within 14 months.',
      whatsMissing: 'The other 9 losing trades that were deleted from Instagram, demo trading app accounts, and brokerage transaction costs.'
    },
    riskAssessment: {
      realRisks: '100% decay of option premium on expiry day (Thursday/Friday). Rapid psychological burnout and revenge trading.',
      hiddenCosts: 'Securities Transaction Tax (STT), Exchange turnover charges, GST, SEBI turnover fees, and brokerage eating 30%+ of small profits.',
      whoLosesMoney: 'College students, salaried professionals trading during office hours without risk management or stop-loss discipline.'
    },
    betterAlternatives: {
      action: 'Stop intraday options gambling. Direct that same ₹10,000 into monthly SIPs in an Indian Index or Mid-Cap fund.',
      realisticExpectation: '₹10,000/month in Nifty Index at 13% CAGR grows to ₹1.15 Crore in 20 years with zero stress.',
      lowerRiskApproach: 'Focus on upgrading primary professional career income while keeping wealth creation 100% passive and automated.'
    }
  },
  {
    id: 'claim-real-estate-never-drops',
    claimText: 'Real Estate prices in India never go down and it is always the safest and highest returning investment',
    category: 'Real Estate',
    status: 'Partially True',
    statusColor: 'amber',
    badgeText: '⚠️ Partially True (High Illiquidity & Opportunity Cost)',
    probabilityPct: 52,
    quote: '"Land is the only real wealth. Buy a second flat on 30-year home loan; rent will cover the EMI automatically."',
    historicalData: 'RBI Residential Property Price Index shows real estate in major Indian metros delivered ~7.5-9.2% CAGR from 2013-2023. Factoring in 8.5% loan interest, property tax, maintenance, and 2-3% rental yield, net real return is often <5%.',
    expertVsInfluencer: 'Real estate economists highlight extreme illiquidity (takes 6-18 months to sell), high transaction costs (6-8% stamp duty + brokerage), and concentration risk.',
    realityCheck: {
      hasHappenedBefore: 'Real estate stagnated with zero price appreciation in Delhi NCR, Mumbai sub-markets, and Kolkata between 2013 and 2019.',
      whoProfits: 'Real estate builders, mortgage lenders collecting 2x loan interest over 20 years, and property brokers.',
      trackRecord: 'Over 20 years, Nifty 50 TRI (14.1% CAGR) significantly outperformed physical residential real estate (8.8% CAGR) in almost all tier-1 Indian cities.',
      whatsMissing: 'Maintenance costs (1-2%/yr), property taxes, 6-8% stamp duty, vacancy periods, and home loan amortization schedule.'
    },
    riskAssessment: {
      realRisks: 'Illiquidity during medical or financial emergencies. Project delays by builders (RERA litigations).',
      hiddenCosts: 'Interest component in home loan: on a ₹50 Lakh 20-year loan at 8.5%, you pay ₹54 Lakhs extra just in interest!',
      whoLosesMoney: 'Investors who buy under-construction flats with heavy leverage expecting quick flipping profits.'
    },
    betterAlternatives: {
      action: 'Buy one home for self-consumption when ready for emotional stability. Invest excess savings into diversified equity mutual funds and REITs.',
      realisticExpectation: 'Residential property gives 2.5-3% rental yield + 5-7% capital appreciation. REITs offer 6-7% dividend yield + capital growth with instant liquidity.',
      lowerRiskApproach: 'Real Estate Investment Trusts (REITs like Embassy, Mindspace) allow investing in grade-A commercial real estate with as little as ₹300 on stock exchanges.'
    }
  }
];

// 2. STOCK HYPE CHECK DATABASE (MEDIA NARRATIVE VS FINANCIAL REALITY)
export const STOCK_HYPE_DATABASE = [
  {
    id: 'stock-tata-motors',
    name: 'Tata Motors Ltd',
    symbol: 'TATAMOTORS',
    sector: 'Automobile & EV',
    mediaNarrative: 'EV market leader in India with 70%+ passenger EV market share, massive JLR turnaround, and aggressive debt reduction.',
    financialReality: {
      peRatio: '9.8x (Attractive vs Industry avg 24x)',
      revenueGrowth: '26.6% YoY',
      profitGrowth: 'Massive turnaround to ₹31,800 Cr net profit',
      debtToEquity: 'Reduced from 2.1x to 0.45x',
      competitorComparison: 'Strong lead in EVs vs Mahindra & Hyundai, but facing premium EV competition globally.',
      verdict: 'Fundamental reality matches or exceeds media narrative. Strong operational execution.',
      verdictStatus: 'Validated Strong'
    }
  },
  {
    id: 'stock-zomato',
    name: 'Zomato Ltd / Eternal',
    symbol: 'ZOMATO',
    sector: 'Quick Commerce & Food Delivery',
    mediaNarrative: 'Blinkit quick commerce is capturing 10-minute grocery market; hyper-growth stock headed for continuous multibagger status.',
    financialReality: {
      peRatio: '115x (Extremely Rich / High Growth Priced In)',
      revenueGrowth: '68% YoY (Driven by Blinkit 120% GOV expansion)',
      profitGrowth: 'Turned profitable (PAT ₹253 Cr in Q1)',
      debtToEquity: '0.0x (Net Cash Positive ~₹12,000 Cr)',
      competitorComparison: 'Leading against Swiggy Instamart and Zepto, but quick-commerce dark store wars burning heavy capex.',
      verdict: 'Business execution is hyper-strong, but valuation leaves zero margin of safety for any growth slowdown.',
      verdictStatus: 'High Growth at High Valuation'
    }
  },
  {
    id: 'stock-suzlon',
    name: 'Suzlon Energy',
    symbol: 'SUZLON',
    sector: 'Renewable & Wind Energy',
    mediaNarrative: 'Green energy turnaround story with 10x past surge, huge order book, and government renewable targets.',
    financialReality: {
      peRatio: '78x (Expensive relative to cyclical nature)',
      revenueGrowth: '49% YoY',
      profitGrowth: 'Turned profitable after debt restructuring',
      debtToEquity: 'Net debt-free after rights issue and QIP',
      competitorComparison: 'Faces global competition from Envision, Siemens Energy, and policy tender delays.',
      verdict: 'Turnaround is genuine, but retail speculative frenzy has pushed valuations ahead of 3-year earnings reality.',
      verdictStatus: 'Speculative Momentum'
    }
  },
  {
    id: 'stock-hdfc-bank',
    name: 'HDFC Bank Ltd',
    symbol: 'HDFCBANK',
    sector: 'Banking & Financials',
    mediaNarrative: 'Lagging stock post-HDFC merger due to high Credit-to-Deposit (CD) ratio and margin compression.',
    financialReality: {
      peRatio: '18.2x (Historical 10-year low valuation band)',
      revenueGrowth: '14.5% Net Interest Income Growth',
      profitGrowth: 'Steady ₹16,000+ Cr quarterly profit',
      debtToEquity: 'N/A (NPA at pristine 1.33%)',
      competitorComparison: 'Largest private bank in India with 20%+ national credit share. Merged balance sheet digestion is temporary.',
      verdict: 'Financial reality is vastly superior to negative media sentiment. Prime candidate for long-term compounders.',
      verdictStatus: 'Undervalued Moat'
    }
  }
];

// 3. VIRAL TRENDS REALITY CHECK
export const VIRAL_TRENDS_REALITY = [
  {
    id: 'trend-fo-trading',
    title: 'F&O Daily Intraday Trading',
    hypeHeadline: '"Make ₹10,000 daily with 15-minute Scalping Setup"',
    successStats: '7.1% profitable accounts',
    failureStats: '92.9% net loss accounts',
    earlyVsLate: 'Brokers and exchange make guaranteed revenue on day 1. Retail traders deplete capital within 180 days.',
    hiddenRisks: 'Overnight gap-downs, exchange glitches, algorithmic front-running, and emotional tilt.',
    actualAverageReturn: '-₹1,25,000 average net loss per active trader (SEBI Official Data)'
  },
  {
    id: 'trend-meme-crypto',
    title: 'Meme Coins & Doge/Pepe Altcoins',
    hypeHeadline: '"1000x Moonshot Token before Binance Listing"',
    successStats: '0.8% of wallets exit in profit',
    failureStats: '99.2% of tokens rug-pull or crash >95%',
    earlyVsLate: 'Insiders and deployer bots snipe 80% supply at launch and dump on social media followers.',
    hiddenRisks: 'Smart contract honeypots, liquidity drain, 30% tax + 1% TDS on every transaction in India.',
    actualAverageReturn: '-85% loss for buyers entering after Twitter/Telegram trending announcements'
  },
  {
    id: 'trend-prelaunch-property',
    title: 'Pre-Launch Real Estate Assured Return',
    hypeHeadline: '"12% Assured Monthly Rental Return until Possession"',
    successStats: '15% projects delivered on time with returns',
    failureStats: '85% face delayed possession, litigation, or return stoppage',
    earlyVsLate: 'Builders secure cheap non-bank financing. Retail buyers bear complete project delivery risk.',
    hiddenRisks: 'Builder insolvency, unapproved blueprints, post-dated cheques bouncing.',
    actualAverageReturn: 'Sub-4% real returns after factoring in 3-5 year construction delays'
  },
  {
    id: 'trend-algo-bot-telegram',
    title: 'Guaranteed Algo Trading Bot Subscriptions',
    hypeHeadline: '"98% Win-Rate AI Trading Bot that prints money on autopilot"',
    successStats: '0% verified long-term winners (excluding sellers)',
    failureStats: '100% of accounts encounter black-swan drawdown blowup',
    earlyVsLate: 'Bot seller collects ₹5,000-25,000 monthly software fee regardless of market performance.',
    hiddenRisks: 'API key compromise, slippage during high-volatility news events, curve-fitted backtests.',
    actualAverageReturn: 'Account blown to zero during sharp market gap-openings'
  }
];

// 4. FINANCIAL PRODUCT MYTHS (INSURANCE, ULIPS, MUTUAL FUNDS)
export const PRODUCT_MYTHS_DATABASE = [
  {
    id: 'prod-ulip-vs-term',
    name: 'ULIP (Unit Linked Insurance Plan) vs Term + SIP',
    claimedBenefits: 'Investment + Insurance + Tax Savings all in one single convenient package.',
    actualBenefits: 'High mortality charges, fund management charges, and policy administration fees eat 2-4% of annual returns. Sum assured is only 10x annual premium (inadequate).',
    feeStructure: 'Upfront Premium Allocation Charge (3-8%), Policy Admin Charges, Mortality Charges, Fund Switching Fees.',
    realisticReturns: '6.5% - 8.5% CAGR over 10-15 years.',
    betterAlternative: 'Pure Term Insurance (₹1 Crore cover for ~₹800/mo) + Pure Index Fund SIP. Delivers 2x higher corpus + 10x higher life cover.'
  },
  {
    id: 'prod-endowment-policy',
    name: 'Traditional Money-Back / Endowment LIC Policies',
    claimedBenefits: '"Guaranteed returns for your child\'s education with life cover and bonus."',
    actualBenefits: 'Returns barely match or underperform inflation (5-6% p.a.). Real purchasing power of maturity amount shrinks drastically over 20 years.',
    feeStructure: 'Opaque bonus calculation with massive upfront agent commissions (up to 25-35% in Year 1).',
    realisticReturns: '5.2% - 5.8% IRR (Internal Rate of Return).',
    betterAlternative: 'PPF (Public Provident Fund) at 7.1% sovereign tax-free + Nifty 50 Index Fund for child\'s long-term horizon.'
  },
  {
    id: 'prod-dividend-reinvestment',
    name: 'Mutual Fund Dividend (IDCW) Option as "Free Regular Income"',
    claimedBenefits: '"Get free monthly payout checks from mutual funds while keeping your principal safe."',
    actualBenefits: 'Dividend is paid out directly from your OWN invested Net Asset Value (NAV). If NAV is ₹100 and fund pays ₹5 dividend, NAV drops to ₹95 immediately.',
    feeStructure: 'TDS at 10% and dividend taxed at individual income tax slab rate (up to 39%).',
    realisticReturns: 'Significantly lower long-term corpus due to destruction of compounding.',
    betterAlternative: 'Growth Option + Systematic Withdrawal Plan (SWP). You control timing, pay only Long-Term Capital Gains (12.5% above ₹1.25 Lakh), and maximize compounding.'
  }
];

// 5. MARKET PSYCHOLOGY & BEHAVIORAL TRAPS
export const PSYCHOLOGY_BIASES = [
  {
    id: 'bias-fomo',
    name: 'FOMO (Fear Of Missing Out)',
    icon: '🔥',
    definition: 'The painful anxiety that others are getting rich quickly while you are left behind, driving you to buy assets at all-time highs.',
    statistic: '82% of retail investors enter hype cycles during the final 15% of a bull market rally.',
    howToDefeat: 'Strict Rule: "Never buy an asset that has surged >50% in the last 30 days without doing fundamental valuation checks."'
  },
  {
    id: 'bias-survivorship',
    name: 'Survivorship Bias',
    icon: '🏆',
    definition: 'Focusing exclusively on the 1 out of 100 people who made ₹1 Crore trading, while ignoring the 99 people who lost their entire savings and stayed silent.',
    statistic: 'Social media algorithms amplify winners by 500x while losers feel ashamed to post losses.',
    howToDefeat: 'Remember: "If a trading strategy reliably generated 50% annual returns, the creator would manage billion-dollar funds, not sell ₹999 PDF courses."'
  },
  {
    id: 'bias-loss-aversion',
    name: 'Loss Aversion & Disposition Effect',
    icon: '📉',
    definition: 'Psychological pain of losing ₹10,000 is 2.5x more intense than the joy of winning ₹10,000, causing investors to sell winners too early and hold losers forever.',
    statistic: 'Average retail investor holds a losing stock for 4.2x longer than a winning stock.',
    howToDefeat: 'Use automated rebalancing and write down your thesis before buying: "If company fundamentals deteriorate, exit immediately without hoping for break-even."'
  },
  {
    id: 'bias-recency',
    name: 'Recency Bias',
    icon: '⏳',
    definition: 'Believing that whatever happened in the last 6 months (bull market or crash) will continue forever into the indefinite future.',
    statistic: 'Mutual fund inflows in India peak right at market tops and plunge to record lows right at market bottoms.',
    howToDefeat: 'Automate SIPs on your salary credit day so human emotional recency bias is eliminated from the investment process.'
  }
];

// 6. DYNAMIC AI / HEURISTIC CLAIM VERIFICATION ENGINE (FOR ANY USER TYPED INPUT)
export const verifyUserClaim = (claim) => {
  const text = (claim || '').toLowerCase().trim();

  // Check if matches pre-analyzed database
  const matchedPre = PRE_ANALYZED_CLAIMS.find(c => 
    c.claimText.toLowerCase().includes(text) || text.includes(c.claimText.toLowerCase().slice(0, 20))
  );
  if (matchedPre) return matchedPre;

  // Rule-based NLP pattern detection
  const isGuaranteed = text.includes('guarantee') || text.includes('fixed return') || text.includes('zero risk') || text.includes('risk-free');
  const isMultibagger = text.includes('10x') || text.includes('100x') || text.includes('multibagger') || text.includes('penny stock') || text.includes('double');
  const isOptionsTrading = text.includes('option') || text.includes('f&o') || text.includes('intraday') || text.includes('daily profit') || text.includes('trading');
  const isCryptoHype = text.includes('crypto') || text.includes('bitcoin') || text.includes('doge') || text.includes('altcoin') || text.includes('token');
  const isRealEstate = text.includes('real estate') || text.includes('property') || text.includes('flat') || text.includes('land') || text.includes('emi vs rent');

  if (isGuaranteed) {
    return {
      id: `custom-${Date.now()}`,
      claimText: claim,
      category: 'Financial Product',
      status: 'False/Exaggerated',
      statusColor: 'rose',
      badgeText: '❌ False / High Risk Violation',
      probabilityPct: 2,
      quote: `"${claim}"`,
      historicalData: 'SEBI and RBI regulations prohibit non-sovereign products from promising fixed market-linked returns. Real sovereign fixed rate instruments in India yield 7.0-7.75%.',
      expertVsInfluencer: 'Experts warn that high guaranteed returns (>10%) are the #1 red flag for Ponzi structures or undisclosed credit risks.',
      realityCheck: {
        hasHappenedBefore: '100% of historical private schemes promising above-market risk-free returns have resulted in capital loss.',
        whoProfits: 'The scheme promoter and agents taking upfront commission.',
        trackRecord: 'Zero sustained institutional precedent.',
        whatsMissing: 'SEBI registration, regulatory capital guarantees, and independent custodian oversight.'
      },
      riskAssessment: {
        realRisks: 'Complete loss of principal with zero legal claim in unorganized markets.',
        hiddenCosts: 'Undisclosed exit penalties and high management deductions.',
        whoLosesMoney: 'Investors seeking safety without verifying regulatory registrations.'
      },
      betterAlternatives: {
        action: 'Opt for RBI Floating Rate Bonds (7.75%), Senior Citizens Savings Scheme (8.2%), or AAA Bank Fixed Deposits.',
        realisticExpectation: '7.0% - 7.8% safe fixed returns with sovereign/RBI protection.',
        lowerRiskApproach: 'Multi-Asset Allocation Fund for blended 11-13% long-term growth.'
      }
    };
  }

  if (isMultibagger || isOptionsTrading) {
    return {
      id: `custom-${Date.now()}`,
      claimText: claim,
      category: 'Market Speculation',
      status: 'Misleading',
      statusColor: 'amber',
      badgeText: '⚠️ Misleading / Speculative Trap',
      probabilityPct: 8,
      quote: `"${claim}"`,
      historicalData: 'SEBI data confirms 93% of active short-term traders incur net losses. Less than 1% of micro-cap stocks sustain 10x valuations.',
      expertVsInfluencer: 'Market professionals use risk-adjusted position sizing (<2% per trade), whereas social media promotes all-in bets.',
      realityCheck: {
        hasHappenedBefore: 'Short spikes happen in bull markets, but are routinely wiped out during market consolidations.',
        whoProfits: 'Brokers (turnover brokerage), signal sellers, and course creators.',
        trackRecord: 'Average retail participant loses substantial capital within 12 months.',
        whatsMissing: 'Risk management rules, stop-loss discipline, transaction taxes, and slippage.'
      },
      riskAssessment: {
        realRisks: 'Fast account drawdowns, psychological distress, and tax friction.',
        hiddenCosts: 'STT, exchange charges, and short-term capital gains tax.',
        whoLosesMoney: 'Retail investors following momentum without fundamental valuation backing.'
      },
      betterAlternatives: {
        action: 'Invest systematically via Index Funds or Smallcap Mutual Funds with long holding horizons.',
        realisticExpectation: '13-16% CAGR over 7+ years with compound growth.',
        lowerRiskApproach: 'Direct equity stock picking only after reading audited annual reports and cash flow statements.'
      }
    };
  }

  if (isCryptoHype) {
    return {
      id: `custom-${Date.now()}`,
      claimText: claim,
      category: 'Cryptocurrency',
      status: 'Partially True',
      statusColor: 'amber',
      badgeText: '⚠️ Partially True (High Drawdown Risk)',
      probabilityPct: 40,
      quote: `"${claim}"`,
      historicalData: 'Crypto assets have strong multi-year compounding but endure 70-80% cyclical corrections.',
      expertVsInfluencer: 'Indian tax laws impose flat 30% tax + 1% TDS on crypto with zero loss offset.',
      realityCheck: {
        hasHappenedBefore: 'Past bull markets produced huge gains followed by multi-year crypto winters.',
        whoProfits: 'Exchanges and early whale holders.',
        trackRecord: 'High volatility asset with binary outcomes for unverified altcoins.',
        whatsMissing: 'Tax implications and storage security risks.'
      },
      riskAssessment: {
        realRisks: 'Total loss on micro-cap tokens, lack of deposit insurance.',
        hiddenCosts: '1% TDS on every sale, high exchange spread.',
        whoLosesMoney: 'Late-stage buyers during peak media hype.'
      },
      betterAlternatives: {
        action: 'Cap total crypto allocation to 2-5% of net worth.',
        realisticExpectation: 'High volatility with cyclical boom-bust dynamics.',
        lowerRiskApproach: 'Build core wealth in diversified equity mutual funds first.'
      }
    };
  }

  // Generic fallback analysis
  return {
    id: `custom-${Date.now()}`,
    claimText: claim,
    category: 'General Investment Claim',
    status: 'Partially True',
    statusColor: 'amber',
    badgeText: '🤔 Unverifiable / Context Dependent',
    probabilityPct: 50,
    quote: `"${claim}"`,
    historicalData: 'Financial returns are strictly governed by company earnings growth, interest rate cycles, and risk premiums.',
    expertVsInfluencer: 'SEBI-registered advisors recommend goal-based asset allocation rather than one-size-fits-all social media tips.',
    realityCheck: {
      hasHappenedBefore: 'Market narratives fluctuate between extreme euphoria and unwarranted panic.',
      whoProfits: 'Content creators generating views and engagement.',
      trackRecord: 'Long-term diversified investing consistently beats short-term narrative chasing.',
      whatsMissing: 'Personal risk profile, time horizon, tax bracket, and emergency liquidity requirements.'
    },
    riskAssessment: {
      realRisks: 'Misalignment with personal financial goals.',
      hiddenCosts: 'Opportunity cost of missing compound interest in proven asset classes.',
      whoLosesMoney: 'Investors acting on unsolicited social media tips.'
    },
    betterAlternatives: {
      action: 'Consult our ArthAI Assistant or a SEBI RIA to calculate your personalized risk profile.',
      realisticExpectation: '11-14% equity CAGR over long horizons.',
      lowerRiskApproach: 'Automate monthly SIPs in broad-market funds.'
    }
  };
};
