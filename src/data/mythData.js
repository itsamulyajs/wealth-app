/**
 * "Hype vs Reality" FinLiteracy & Mythbuster Database for Indian Investors
 */

export const MYTHS_DATABASE = [
  {
    id: 'fno-myth',
    tag: 'Trading Hype',
    title: 'Myth: "Options & Intraday Trading is the easiest way to make ₹5,000 daily from your phone"',
    hypeSummary: 'FinFluencers showcase screenshots of massive single-day profits and luxury cars, promising easy daily income with basic chart patterns.',
    realitySummary: 'SEBI\'s official study revealed that 93% of individual F&O traders lost money between FY22-FY24, with average loss exceeding ₹1.25 Lakhs per trader plus heavy brokerage fees.',
    dataStats: [
      { label: 'SEBI Statistic', value: '93% Traders in Net Loss' },
      { label: 'Avg Loss per Person', value: '₹1.25 Lakh+' },
      { label: 'Only Winning Category', value: 'Algorithms & Institutional Desks' }
    ],
    actionableAdvice: 'Treat long-term SIPs in broad-market Index / Flexi-Cap funds as your wealth builder, not derivative gambling.',
    category: 'High Risk'
  },
  {
    id: 'real-estate-myth',
    tag: 'Property & Real Estate',
    title: 'Myth: "Buying a house on 30-year EMI is always better than renting and investing the difference"',
    hypeSummary: 'Traditional belief that rent is "wasted money" and real estate prices only go up forever without maintenance or interest cost.',
    realitySummary: 'Residential rental yield in Indian metro cities is only 2.5% - 3.5%, while home loan interest is 8.5% - 9.5%. Investing the EMI difference into Nifty Index (historic 12-14% CAGR) often yields 2x higher net wealth over 20 years with zero illiquidity.',
    dataStats: [
      { label: 'Rental Yield in India', value: '2.5% - 3.5% / year' },
      { label: 'Home Loan Interest', value: '8.5% - 9.25%' },
      { label: 'Nifty 50 15yr CAGR', value: '~13.2%' }
    ],
    actionableAdvice: 'Buy a home when ready for personal stability and emotional value, not as a purely financial return instrument.',
    category: 'Real Estate'
  },
  {
    id: 'zero-emi-myth',
    tag: 'Consumer Debt',
    title: 'Myth: "No-Cost EMI on latest iPhones and gadgets is completely 0% interest and free"',
    hypeSummary: 'Marketing campaigns advertise 0% interest EMIs with zero downside, encouraging impulse spending.',
    realitySummary: 'Retailers bake the interest into the product cost by removing upfront cash discounts (5-10%), charging non-refundable loan processing fees, and levying 18% GST on the subvented interest.',
    dataStats: [
      { label: 'Hidden GST', value: '18% on EMI Interest' },
      { label: 'Missed Cash Discount', value: '5% - 10%' },
      { label: 'Processing Surcharge', value: '₹199 - ₹499 + GST' }
    ],
    actionableAdvice: 'Follow the 30-day rule for luxury gadgets: if you can\'t buy it twice in cash, budget a recurring deposit or mini-SIP first.',
    category: 'Budgeting'
  },
  {
    id: 'sip-timing-myth',
    tag: 'Mutual Funds',
    title: 'Myth: "You should stop your SIP when the market is crashing and restart at the bottom"',
    hypeSummary: 'Investors panic during corrections (like 2020 crash or global geopolitical dips) and stop auto-debits.',
    realitySummary: 'Stopping SIPs during market crashes destroys compound interest because market downturns are when you buy units at maximum discount (Rupee Cost Averaging). Missing just the 10 best market days in a decade cuts your total return by nearly half.',
    dataStats: [
      { label: 'Miss 10 Best Days', value: '-48% Total Return' },
      { label: 'SIP Benefit in Crash', value: 'Buys more NAV units' },
      { label: 'Best Horizon for Equities', value: '5+ Years' }
    ],
    actionableAdvice: 'Never pause a mutual fund SIP due to market mood. Automate it on your salary day and forget it.',
    category: 'SIP & Compounding'
  },
  {
    id: 'crypto-all-in-myth',
    tag: 'Crypto & Hype Tokens',
    title: 'Myth: "Crypto is the fastest way for young investors to get rich with 100x coins"',
    hypeSummary: 'Telegram groups and YouTube influencers push obscure altcoins claiming guaranteed multi-bagger returns.',
    realitySummary: 'Over 99% of meme coins and micro-caps drop to zero. In India, flat 30% tax on crypto gains with 0% loss set-off and 1% TDS means net risk-reward is heavily skewed.',
    dataStats: [
      { label: 'India Tax on Crypto', value: 'Flat 30% + 1% TDS' },
      { label: 'Loss Offsetting', value: 'Not Permitted in India' },
      { label: 'Safe Exposure Limit', value: '0% - 5% of Portfolio' }
    ],
    actionableAdvice: 'If you want crypto exposure, cap it at less than 5% of your total net worth and treat it as speculative capital.',
    category: 'High Risk'
  }
];

export const FINANCIAL_JARGON_EXPLAINED = [
  {
    term: 'SIP (Systematic Investment Plan)',
    simple: 'A recurring auto-debit (e.g., ₹2,000 every month) into a mutual fund, averaging out price fluctuations.',
    analogy: 'Like paying monthly gym membership, but for your future bank account.'
  },
  {
    term: 'CAGR (Compound Annual Growth Rate)',
    simple: 'The constant rate at which your money grew every year as if it compounded smoothly.',
    analogy: 'Your investment\'s true annual speedometer score.'
  },
  {
    term: 'Index Fund (Nifty 50 / Sensex)',
    simple: 'A low-cost fund that automatically buys shares in India\'s top 50 biggest companies without a fund manager guessing.',
    analogy: 'Betting on the entire Indian economy rather than picking one single horse in the race.'
  },
  {
    term: 'ELSS (Equity Linked Savings Scheme)',
    simple: 'A mutual fund that gives you tax deduction up to ₹1.5 Lakh under Section 80C with the shortest lock-in period of 3 years.',
    analogy: 'A dual-engine rocket: Saves taxes today + grows equity for tomorrow.'
  },
  {
    term: 'SGB (Sovereign Gold Bond)',
    simple: 'Government-backed gold certificates that pay you 2.5% annual interest on top of gold price appreciation, with zero capital gains tax at 8-year maturity.',
    analogy: 'Gold in your Demat account that pays you rent every 6 months.'
  }
];
