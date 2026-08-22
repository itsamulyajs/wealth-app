/**
 * Realistic Indian Investor Personas representing different life stages
 */

export const MOCK_PERSONAS = [
  {
    id: 'aarav-student',
    name: 'Aarav Patel',
    email: 'aarav.student@arthsaathi.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    title: 'College Final Year & Intern',
    age: 21,
    city: 'Bengaluru',
    monthlyIncome: 18000,
    riskProfile: {
      category: 'Aggressive-Curious',
      score: 72,
      description: 'Eager to invest, high risk appetite, but needs guardrails against social media hype and day-trading fads.'
    },
    netWorth: 52000,
    monthlySIPTotal: 3000,
    assets: {
      equity: 24000,
      debt: 8000,
      gold: 4000,
      cash: 10000,
      crypto: 6000, // Slightly overexposed, triggers literacy tip
    },
    investments: [
      { id: '1', name: 'Parag Parikh Flexi Cap Fund', type: 'Mutual Fund (SIP)', amount: 15000, monthlySIP: 1500, returnPct: 18.4, platform: 'Groww' },
      { id: '2', name: 'Nifty 50 Index Fund Direct-Growth', type: 'Mutual Fund (SIP)', amount: 9000, monthlySIP: 1500, returnPct: 13.2, platform: 'Zerodha Coin' },
      { id: '3', name: 'Digital Gold (MMTC-PAMP)', type: 'Gold', amount: 4000, monthlySIP: 0, returnPct: 11.5, platform: 'PhonePe' },
      { id: '4', name: 'Emergency Sweep-in Bank Account', type: 'Debt / Cash', amount: 18000, monthlySIP: 0, returnPct: 6.8, platform: 'HDFC Bank' },
      { id: '5', name: 'Bitcoin & Altcoins', type: 'Crypto Speculation', amount: 6000, monthlySIP: 0, returnPct: -8.5, platform: 'CoinDCX' },
    ],
    goals: [
      { id: 'g1', title: 'Emergency Buffer (3 Months)', targetAmount: 45000, currentAmount: 18000, targetDate: '2026-12-31', monthlySIP: 2500, category: 'Security' },
      { id: 'g2', title: 'MacBook for First Job', targetAmount: 95000, currentAmount: 22000, targetDate: '2027-06-30', monthlySIP: 3000, category: 'Gadget' },
    ],
    insights: [
      '⚠️ 11.5% of your portfolio is in volatile Crypto. Consider setting up a fixed 3-month emergency fund first.',
      '💡 Great job starting an index SIP early! A ₹3,000/mo SIP started at 21 can compound to over ₹1.05 Cr by age 45 at 13% CAGR.'
    ]
  },
  {
    id: 'priya-tech',
    name: 'Priya Sharma',
    email: 'priya.sharma@arthsaathi.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    title: 'Senior Software Engineer',
    age: 28,
    city: 'Hyderabad',
    monthlyIncome: 145000,
    riskProfile: {
      category: 'Moderate-Aggressive',
      score: 80,
      description: 'Strong cash flow, long investment horizon, actively planning for home down-payment & financial independence (FIRE).'
    },
    netWorth: 2480000,
    monthlySIPTotal: 38000,
    assets: {
      equity: 1420000,
      debt: 680000,
      gold: 230000,
      cash: 150000,
      crypto: 0,
    },
    investments: [
      { id: '1', name: 'Mirae Asset Large & Midcap Fund', type: 'Mutual Fund (SIP)', amount: 540000, monthlySIP: 15000, returnPct: 19.8, platform: 'Zerodha Coin' },
      { id: '2', name: 'UTI Nifty 50 Index Fund', type: 'Mutual Fund (SIP)', amount: 480000, monthlySIP: 15000, returnPct: 14.5, platform: 'Groww' },
      { id: '3', name: 'Direct Equity Portfolio (Bluechip & IT)', type: 'Stocks', amount: 400000, monthlySIP: 0, returnPct: 22.1, platform: 'Zerodha Kite' },
      { id: '4', name: 'Employees\' Provident Fund (EPF)', type: 'Debt / Retirement', amount: 420000, monthlySIP: 8000, returnPct: 8.25, platform: 'EPFO' },
      { id: '5', name: 'Sovereign Gold Bonds (SGB 2028-Series)', type: 'Gold', amount: 230000, monthlySIP: 0, returnPct: 15.6, platform: 'RBI Retail Direct' },
      { id: '6', name: 'HDFC High Yield Liquid Fund (Emergency)', type: 'Debt / Cash', amount: 410000, monthlySIP: 0, returnPct: 7.1, platform: 'Kuvera' },
    ],
    goals: [
      { id: 'g1', title: '2BHK Apartment Down Payment', targetAmount: 2500000, currentAmount: 1400000, targetDate: '2028-03-31', monthlySIP: 30000, category: 'Real Estate' },
      { id: 'g2', title: 'FIRE Fund (Early Freedom at 42)', targetAmount: 35000000, currentAmount: 1080000, targetDate: '2040-12-31', monthlySIP: 25000, category: 'Retirement' },
      { id: 'g3', title: 'European Vacation', targetAmount: 350000, currentAmount: 210000, targetDate: '2027-09-30', monthlySIP: 8000, category: 'Travel' },
    ],
    insights: [
      '✅ Well diversified asset allocation with solid 57% equity and 27% debt backing.',
      '💡 You can optimize ₹1.5L tax under 80C or review New Tax Regime benefits with your standard deduction.'
    ]
  },
  {
    id: 'rajesh-family',
    name: 'Rajesh Gupta',
    email: 'rajesh.gupta@arthsaathi.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    title: 'Operations Director & Parent',
    age: 44,
    city: 'Pune',
    monthlyIncome: 210000,
    riskProfile: {
      category: 'Balanced-Conservative',
      score: 58,
      description: 'Focus on capital preservation, daughter\'s international college fund, and comfortable retirement income.'
    },
    netWorth: 6850000,
    monthlySIPTotal: 45000,
    assets: {
      equity: 2950000,
      debt: 2750000,
      gold: 850000,
      cash: 300000,
      crypto: 0,
    },
    investments: [
      { id: '1', name: 'HDFC Balanced Advantage Fund', type: 'Hybrid Mutual Fund', amount: 1250000, monthlySIP: 20000, returnPct: 13.4, platform: 'CAMS' },
      { id: '2', name: 'SBI Small Cap & Mid Cap Fund', type: 'Mutual Fund', amount: 700000, monthlySIP: 10000, returnPct: 17.8, platform: 'KFintech' },
      { id: '3', name: 'Public Provident Fund (PPF)', type: 'Tax Free Debt', amount: 1550000, monthlySIP: 12500, returnPct: 7.1, platform: 'SBI Bank' },
      { id: '4', name: 'National Pension System (NPS Tier 1)', type: 'Pension Fund', amount: 1200000, monthlySIP: 4166, returnPct: 10.9, platform: 'NSDL' },
      { id: '5', name: 'Physical Gold & Sovereign Gold Bonds', type: 'Gold', amount: 850000, monthlySIP: 0, returnPct: 12.0, platform: 'Locker & Demat' },
      { id: '6', name: 'Bank Fixed Deposits & Savings', type: 'Cash / Emergency', amount: 1300000, monthlySIP: 0, returnPct: 7.25, platform: 'ICICI Bank' },
    ],
    goals: [
      { id: 'g1', title: 'Child\'s Higher Studies (US/UK)', targetAmount: 6000000, currentAmount: 3200000, targetDate: '2029-07-31', monthlySIP: 35000, category: 'Education' },
      { id: 'g2', title: 'Retirement Corpus (Target ₹4 Cr)', targetAmount: 40000000, currentAmount: 3650000, targetDate: '2042-01-01', monthlySIP: 25000, category: 'Retirement' },
    ],
    insights: [
      '🛡️ Strong 40% debt allocation provides high safety for upcoming college tuition timeline.',
      '📌 Consider stepping up your SIP by 10% annually to comfortably beat educational inflation (~9-10%).'
    ]
  }
];
