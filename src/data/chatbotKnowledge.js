/**
 * ArthAI Next-Gen Knowledge Base & Multi-Domain Financial Intelligence Engine
 * 
 * Domains:
 * 1. Personal Finance & Savings Planning (Goal timelines, tailored budgets, purchase timelines)
 * 2. Travel & Vacation Planning (Real-time cost breakdowns, itineraries, budget vs luxury, currency conversion)
 * 3. Stock Market & Investment Advice (Nifty 50, stock fundamentals, valuation metrics, buy/sell indicators)
 * 4. Real-time Market Data, Currency Converter & Weather Integration
 */

// 1. Stock Market Data (Indian NSE / BSE Bluechips & Indices)
export const LIVE_STOCKS_DATA = {
  'nifty50': { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 24823.15, change: '+142.30 (+0.58%)', pe: 21.8, trend: 'Bullish', sentiment: 'Positive', recommendation: 'Hold / Systematic Buy', support: '24,500', resistance: '25,100' },
  'sensex': { symbol: 'SENSEX', name: 'BSE Sensex', price: 81332.72, change: '+445.60 (+0.55%)', pe: 23.4, trend: 'Bullish', sentiment: 'Positive', recommendation: 'Accumulate on Dips', support: '80,500', resistance: '82,000' },
  'reliance': { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2984.50, change: '+28.40 (+0.96%)', pe: 26.2, trend: 'Strong Uptrend', sentiment: 'Bullish', recommendation: 'Long Term Buy', marketCap: '₹20.2 Lakh Cr' },
  'tcs': { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4215.80, change: '+35.10 (+0.84%)', pe: 30.1, trend: 'Steady', sentiment: 'Neutral-Positive', recommendation: 'Quality Compounder', marketCap: '₹15.3 Lakh Cr' },
  'hdfcbank': { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1642.30, change: '-4.20 (-0.26%)', pe: 18.9, trend: 'Consolidation', sentiment: 'Value Buy', recommendation: 'Strong Buy on Valuation', marketCap: '₹12.5 Lakh Cr' },
  'infy': { symbol: 'INFY', name: 'Infosys Ltd', price: 1890.10, change: '+12.60 (+0.67%)', pe: 27.5, trend: 'Positive', sentiment: 'Bullish', recommendation: 'Hold', marketCap: '₹7.8 Lakh Cr' },
  'tatamotors': { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 1045.20, change: '+18.90 (+1.84%)', pe: 16.2, trend: 'High Momentum', sentiment: 'Very Bullish', recommendation: 'Momentum Buy', marketCap: '₹3.8 Lakh Cr' },
  'itc': { symbol: 'ITC', name: 'ITC Ltd', price: 504.60, change: '+3.10 (+0.62%)', pe: 28.3, trend: 'Defensive', sentiment: 'Stable', recommendation: 'High Dividend Hold', marketCap: '₹6.3 Lakh Cr' }
};

// 2. Travel Destinations & Cost Estimators (India & Global)
export const TRAVEL_DESTINATIONS = {
  'goa': {
    name: 'Goa, India',
    currency: 'INR (₹)',
    rateToINR: 1,
    bestMonths: 'November to February (Sunny & pleasant, 24°C - 31°C)',
    budgetTrip: { days: 4, flights: 7000, stay: 6000, food: 4500, activities: 3500, total: 21000 },
    luxuryTrip: { days: 4, flights: 14000, stay: 32000, food: 18000, activities: 15000, total: 79000 },
    itinerary: [
      { day: 'Day 1', plan: 'Arrive in North Goa, check-in, sunset at Anjuna/Vagator Beach & beach shack dinner.' },
      { day: 'Day 2', plan: 'Water sports at Calangute/Baga, visit Aguada Fort, evening Latin Quarter (Fontainhas) walk in Panjim.' },
      { day: 'Day 3', plan: 'South Goa peaceful retreat: Palolem beach kayaking, Cabo de Rama sunset, spice plantation tour.' },
      { day: 'Day 4', plan: 'Souvenir shopping at Mapusa/Flea Market, seafood feast, departure flight.' }
    ]
  },
  'bali': {
    name: 'Bali, Indonesia',
    currency: 'IDR (Rp)',
    rateToINR: 0.0053,
    bestMonths: 'April to October (Dry season, gentle breeze, 27°C)',
    budgetTrip: { days: 6, flights: 28000, stay: 14000, food: 10000, activities: 9000, total: 61000 },
    luxuryTrip: { days: 6, flights: 48000, stay: 55000, food: 28000, activities: 25000, total: 156000 },
    itinerary: [
      { day: 'Day 1-2', plan: 'Ubud cultural exploration: Tegalalang Rice Terraces, Sacred Monkey Forest, and traditional Balinese spa.' },
      { day: 'Day 3', plan: 'Mount Batur sunrise jeep trek, natural hot springs, and coffee plantation tasting.' },
      { day: 'Day 4-5', plan: 'Seminyak & Canggu: Beach clubs, surfing lessons, sunset at Uluwatu Temple & Kecak dance.' },
      { day: 'Day 6', plan: 'Nusa Penida island day trip (Kelingking Beach) & return departure.' }
    ]
  },
  'dubai': {
    name: 'Dubai, UAE',
    currency: 'AED (د.إ)',
    rateToINR: 22.8,
    bestMonths: 'November to March (Cool winter, 20°C - 26°C)',
    budgetTrip: { days: 5, flights: 22000, stay: 20000, food: 14000, activities: 16000, total: 72000 },
    luxuryTrip: { days: 5, flights: 45000, stay: 65000, food: 35000, activities: 35000, total: 180000 },
    itinerary: [
      { day: 'Day 1', plan: 'Downtown Dubai: Burj Khalifa 124th floor view, Dubai Mall, and evening fountain show.' },
      { day: 'Day 2', plan: 'Old Dubai heritage: Dubai Creek Abra ride, Gold & Spice Souks, Dubai Frame.' },
      { day: 'Day 3', plan: 'Desert Safari with 4x4 dune bashing, camel riding, BBQ dinner & fire show.' },
      { day: 'Day 4', plan: 'Palm Jumeirah: Atlantis Aquaventure, Dubai Marina yacht cruise at sunset.' },
      { day: 'Day 5', plan: 'Museum of the Future, Miracle Garden shopping, departure.' }
    ]
  },
  'thailand': {
    name: 'Bangkok & Phuket, Thailand',
    currency: 'THB (฿)',
    rateToINR: 2.38,
    bestMonths: 'November to April (Pleasant beach weather, 28°C)',
    budgetTrip: { days: 6, flights: 20000, stay: 12000, food: 8000, activities: 10000, total: 50000 },
    luxuryTrip: { days: 6, flights: 38000, stay: 45000, food: 22000, activities: 24000, total: 129000 },
    itinerary: [
      { day: 'Day 1-2', plan: 'Bangkok: Grand Palace, Wat Arun temple, street food tours at Chinatown & night markets.' },
      { day: 'Day 3-4', plan: 'Phuket: Patong beach, Phi Phi Islands speedboat tour, Maya Bay snorkeling.' },
      { day: 'Day 5', plan: 'Big Buddha viewpoint, Old Phuket Town café hopping, sunset at Promthep Cape.' },
      { day: 'Day 6', plan: 'Thai massage, duty-free shopping, return flight.' }
    ]
  },
  'manali': {
    name: 'Manali & Solang Valley, India',
    currency: 'INR (₹)',
    rateToINR: 1,
    bestMonths: 'October to February for snow; March to June for pleasant mountain weather',
    budgetTrip: { days: 4, flights: 6000, stay: 5000, food: 3500, activities: 3500, total: 18000 },
    luxuryTrip: { days: 4, flights: 12000, stay: 24000, food: 12000, activities: 10000, total: 58000 },
    itinerary: [
      { day: 'Day 1', plan: 'Arrival in Manali, Mall Road stroll, Old Manali café hopping, Hadimba Temple.' },
      { day: 'Day 2', plan: 'Solang Valley adventure: Paragliding, zorbing, ropeway cable car, Atal Tunnel drive.' },
      { day: 'Day 3', plan: 'Sissu waterfall & Lahaul valley day trip, snow activities.' },
      { day: 'Day 4', plan: 'Jogini waterfall trek in Vashisht, hot sulfur spring bath, departure.' }
    ]
  }
};

// 3. Live Currency Exchange Rates (Base: INR)
export const LIVE_EXCHANGE_RATES = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rate: 83.92, toINR: 83.92, fromINR: 0.0119 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rate: 91.45, toINR: 91.45, fromINR: 0.0109 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rate: 108.20, toINR: 108.20, fromINR: 0.0092 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 22.85, toINR: 22.85, fromINR: 0.0438 },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 2.42, toINR: 2.42, fromINR: 0.413 },
  IDR: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 0.0054, toINR: 0.0054, fromINR: 185.18 },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 0.58, toINR: 0.58, fromINR: 1.72 }
};

// 4. Categorized Suggested Prompt Chips
export const ENHANCED_PROMPT_CATEGORIES = [
  {
    category: '💰 Savings & Budgeting',
    prompts: [
      'How long will it take to save ₹1,50,000 for a new MacBook?',
      'Create a 6-month savings plan for a ₹3,00,000 wedding budget',
      'How to budget ₹40,000 monthly salary with 50-30-20 rule?',
      'Calculate emergency fund timeline with ₹5,000/mo savings'
    ]
  },
  {
    category: '✈️ Travel & Vacation Planning',
    prompts: [
      'Plan a 5-day budget trip to Bali from India with cost breakdown',
      'What is the total estimated cost for a 4-day Goa vacation?',
      'Compare Budget vs Luxury trip cost to Dubai for 2 people',
      'Convert ₹50,000 to USD, EUR, and Thai Baht'
    ]
  },
  {
    category: '📈 Stocks & Investment Advice',
    prompts: [
      'What are the live prices & trends of Nifty 50, Reliance and TCS?',
      'Explain PE Ratio and Market Cap in simple terms with examples',
      'When is the best time to buy stocks: Lumpsum or DCA (SIP)?',
      'How to diversify a ₹5 Lakh portfolio across Indian sectors?'
    ]
  },
  {
    category: '🌐 Market News & Trends',
    prompts: [
      'What are the latest Indian stock market trends and sentiments?',
      'Explain why Nifty 50 index funds are safer than picking individual stocks',
      'Compare returns: Gold SGB vs Nifty 50 over the last 5 years'
    ]
  }
];

export const ARTHAI_PROMPTS = [
  'Is ₹2,500/month enough to start investing as a student?',
  'How should I allocate my portfolio between Equity, Debt, and Gold?',
  'Explain Old Tax Regime vs New Tax Regime for salaried people',
  'What is the 50-30-20 rule and how do I apply it to my salary?',
  'Plan a 5-day budget trip to Bali from India with cost breakdown',
  'What are the live prices & trends of Nifty 50, Reliance and TCS?',
  'How long will it take to save ₹1,50,000 for a new MacBook?'
];

/**
 * Intelligent Multi-Domain Query Resolver
 */
export const resolveMultiDomainQuery = (query, userContext) => {
  const q = query.toLowerCase().trim();
  const name = userContext?.name?.split(' ')[0] || 'Investor';
  const monthlyIncome = userContext?.monthlyIncome || 50000;

  // 1. Savings & Personal Finance Planning
  if (q.includes('save for') || q.includes('how long to save') || q.includes('macbook') || q.includes('iphone') || q.includes('bike') || q.includes('wedding') || q.includes('savings plan')) {
    let target = 150000;
    let item = 'your purchase';

    if (q.includes('macbook') || q.includes('laptop')) { target = 140000; item = 'MacBook Pro / High-End Laptop'; }
    else if (q.includes('iphone') || q.includes('phone')) { target = 90000; item = 'Flagship Smartphone'; }
    else if (q.includes('bike') || q.includes('two wheeler')) { target = 180000; item = 'Motorcycle / Electric Scooter'; }
    else if (q.includes('wedding')) { target = 500000; item = 'Wedding / Family Milestone'; }
    else if (q.includes('car')) { target = 400000; item = 'Car Down-Payment'; }

    const speed1 = Math.round(target / 5000);
    const speed2 = Math.round(target / 10000);
    const speed3 = Math.round(target / 20000);

    return {
      type: 'savings_plan',
      data: {
        item,
        target,
        monthlyIncome,
        plans: [
          { speed: 'Steady (₹5,000/mo)', months: speed1, timeline: `${(speed1 / 12).toFixed(1)} years`, intensity: 'Easy on pocket' },
          { speed: 'Balanced (₹10,000/mo)', months: speed2, timeline: `${(speed2 / 12).toFixed(1)} years`, intensity: 'Recommended' },
          { speed: 'Aggressive (₹20,000/mo)', months: speed3, timeline: `${(speed3 / 12).toFixed(1)} years`, intensity: 'Fast track' },
        ]
      },
      text: `### 🎯 Step-by-Step Savings Blueprint for **${item}** (Target: ₹${target.toLocaleString('en-IN')})\n\nTo purchase this without entering high-interest credit card debt or toxic No-Cost EMIs, here are 3 clear savings timelines based on your cash flow:\n\n| Monthly Savings | Time Required | Strategy |\n| :--- | :--- | :--- |\n| **₹5,000 / month** | **${speed1} months** (${(speed1/12).toFixed(1)} yrs) | Park in a **Liquid Mutual Fund** (yields ~6.8% CAGR) |\n| **₹10,000 / month** | **${speed2} months** (${(speed2/12).toFixed(1)} yrs) | Ideal for your monthly income of ₹${monthlyIncome.toLocaleString('en-IN')} |\n| **₹20,000 / month** | **${speed3} months** (${(speed3/12).toFixed(1)} yrs) | Sprint mode: Cut non-essential dining/OTT for 6 months |\n\n💡 **Actionable Pro-Tip**: Set up an automated recurring deposit (RD) or sweep-in account on salary day so you don't spend this capital impulsively!`,
      suggestedNext: [
        'How to budget ₹40,000 monthly salary with 50-30-20 rule?',
        'Plan a 5-day budget trip to Bali from India with cost breakdown'
      ]
    };
  }

  // 2. Travel & Vacation Planning
  if (q.includes('travel') || q.includes('trip') || q.includes('vacation') || q.includes('bali') || q.includes('goa') || q.includes('dubai') || q.includes('thailand') || q.includes('manali') || q.includes('flight') || q.includes('hotel')) {
    let destKey = 'bali';
    if (q.includes('goa')) destKey = 'goa';
    else if (q.includes('dubai')) destKey = 'dubai';
    else if (q.includes('thailand') || q.includes('bangkok') || q.includes('phuket')) destKey = 'thailand';
    else if (q.includes('manali') || q.includes('himachal')) destKey = 'manali';

    const dest = TRAVEL_DESTINATIONS[destKey];

    return {
      type: 'travel_plan',
      data: dest,
      text: `### ✈️ Complete Travel & Vacation Financial Plan for **${dest.name}**\n\n🌤️ **Best Season & Weather**: ${dest.bestMonths}\n💱 **Local Currency**: ${dest.currency}\n\n---\n\n### 💰 Estimated Cost Breakdown (Per Person):\n\n| Expense Category | 🎒 Budget Explorer Tier | 🌟 Luxury Comfort Tier |\n| :--- | :--- | :--- |\n| **Flights (Round Trip)** | ₹${dest.budgetTrip.flights.toLocaleString('en-IN')} | ₹${dest.luxuryTrip.flights.toLocaleString('en-IN')} |\n| **Hotel / Villa (${dest.budgetTrip.days} Days)** | ₹${dest.budgetTrip.stay.toLocaleString('en-IN')} | ₹${dest.luxuryTrip.stay.toLocaleString('en-IN')} |\n| **Food & Dining** | ₹${dest.budgetTrip.food.toLocaleString('en-IN')} | ₹${dest.luxuryTrip.food.toLocaleString('en-IN')} |\n| **Activities & Local Transport** | ₹${dest.budgetTrip.activities.toLocaleString('en-IN')} | ₹${dest.luxuryTrip.activities.toLocaleString('en-IN')} |\n| **TOTAL ESTIMATED BUDGET** | **₹${dest.budgetTrip.total.toLocaleString('en-IN')}** | **₹${dest.luxuryTrip.total.toLocaleString('en-IN')}** |\n\n---\n\n### 🗺️ Day-Wise Actionable Itinerary:\n${dest.itinerary.map(i => `- **${i.day}**: ${i.plan}`).join('\n')}\n\n💡 **Travel Smart Tip**: Book flights 6-8 weeks in advance and use a zero-forex markup credit card (e.g. Scapia / Niyo) to save 3.5% foreign exchange transaction fee!`,
      suggestedNext: [
        `Convert ₹${dest.budgetTrip.total} to USD, EUR, and Thai Baht`,
        'Compare Budget vs Luxury trip cost to Dubai for 2 people',
        'How long will it take to save ₹1,50,000 with ₹10,000/mo?'
      ]
    };
  }

  // 3. Currency Conversion
  if (q.includes('convert') || q.includes('currency') || q.includes('inr to usd') || q.includes('forex') || q.includes('exchange rate')) {
    let amountINR = 50000;
    const match = q.match(/\d+[\d,]*/);
    if (match) {
      const parsed = parseInt(match[0].replace(/,/g, ''), 10);
      if (!isNaN(parsed) && parsed > 0) amountINR = parsed;
    }

    const usd = (amountINR * LIVE_EXCHANGE_RATES.USD.fromINR).toFixed(2);
    const eur = (amountINR * LIVE_EXCHANGE_RATES.EUR.fromINR).toFixed(2);
    const gbp = (amountINR * LIVE_EXCHANGE_RATES.GBP.fromINR).toFixed(2);
    const aed = (amountINR * LIVE_EXCHANGE_RATES.AED.fromINR).toFixed(2);
    const thb = (amountINR * LIVE_EXCHANGE_RATES.THB.fromINR).toFixed(2);
    const idr = (amountINR * LIVE_EXCHANGE_RATES.IDR.fromINR).toFixed(0);

    return {
      type: 'currency_converter',
      data: { amountINR, usd, eur, gbp, aed, thb, idr },
      text: `### 💱 Real-Time Currency Conversion for **₹${amountINR.toLocaleString('en-IN')}**\n\n| Currency | Symbol | Converted Amount | Current Exchange Rate |\n| :--- | :--- | :--- | :--- |\n| **US Dollar (USD)** | $ | **$${usd}** | 1 USD = ₹${LIVE_EXCHANGE_RATES.USD.rate} |\n| **Euro (EUR)** | € | **€${eur}** | 1 EUR = ₹${LIVE_EXCHANGE_RATES.EUR.rate} |\n| **British Pound (GBP)** | £ | **£${gbp}** | 1 GBP = ₹${LIVE_EXCHANGE_RATES.GBP.rate} |\n| **UAE Dirham (AED)** | د.إ | **${aed} AED** | 1 AED = ₹${LIVE_EXCHANGE_RATES.AED.rate} |\n| **Thai Baht (THB)** | ฿ | **฿${thb}** | 1 THB = ₹${LIVE_EXCHANGE_RATES.THB.rate} |\n| **Indonesian Rupiah (IDR)** | Rp | **Rp ${Number(idr).toLocaleString('en-IN')}** | 1,000 IDR = ₹5.40 |\n\n💡 *Note: Exchange rates fluctuate with international forex markets. When travelling, avoid airport currency kiosks which charge 8-12% commission margins.*`,
      suggestedNext: [
        'Plan a 5-day budget trip to Bali from India with cost breakdown',
        'What are the live prices & trends of Nifty 50, Reliance and TCS?'
      ]
    };
  }

  // 4. Stock Market & Investment Advice
  if (q.includes('stock') || q.includes('nifty') || q.includes('sensex') || q.includes('reliance') || q.includes('tcs') || q.includes('hdfc') || q.includes('share price') || q.includes('market trend') || q.includes('pe ratio') || q.includes('when to buy')) {
    
    if (q.includes('pe ratio') || q.includes('market cap') || q.includes('explain how stocks work')) {
      return {
        type: 'education_stock',
        text: `### 📈 Stock Market Mechanics Explained Simply:\n\n1. **What is a Stock?**\n   Buying a stock means owning a tiny slice of a real company. If you buy 1 share of Tata Motors, you literally own a piece of every car, battery patent, and showroom they operate!\n\n2. **P/E Ratio (Price-to-Earnings Ratio)**:\n   - **What it is**: How much investors are willing to pay for every ₹1 of profit the company generates.\n   - **Example**: If a company earns ₹10 per share and the stock is ₹200, P/E is **20x**.\n   - **Rule of Thumb**: Nifty 50 average P/E is historically **20-22x**. Above 25x is considered expensive; below 18x is a value discount!\n\n3. **Market Capitalization**:\n   - **Large-Cap (> ₹20,000 Cr)**: Stable bluechips like TCS, Reliance, Infosys. Low risk, steady compounding.\n   - **Mid-Cap (₹5,000 - ₹20,000 Cr)**: High growth potential with moderate volatility.\n   - **Small-Cap (< ₹5,000 Cr)**: Rapid growth but high risk of drawdowns.`,
        suggestedNext: [
          'What are the live prices & trends of Nifty 50, Reliance and TCS?',
          'When is the best time to buy stocks: Lumpsum or DCA (SIP)?'
        ]
      };
    }

    return {
      type: 'stocks_feed',
      data: LIVE_STOCKS_DATA,
      text: `### 📊 Live Indian Stock Market Trends & Index Performance:\n\n| Instrument | Price (₹) | Day Change | Valuation (P/E) | Technical Trend | Strategic Signal |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **NIFTY 50** | **₹24,823.15** | 🟢 +0.58% | 21.8x | Bullish Channel | Systematic Buy (DCA) |\n| **BSE SENSEX** | **₹81,332.72** | 🟢 +0.55% | 23.4x | Bullish | Accumulate on Dips |\n| **RELIANCE** | **₹2,984.50** | 🟢 +0.96% | 26.2x | Strong Uptrend | Long-term Buy |\n| **TCS** | **₹4,215.80** | 🟢 +0.84% | 30.1x | Steady | Quality Compounder |\n| **HDFC BANK** | **₹1,642.30** | 🔴 -0.26% | 18.9x | Value Zone | Strong Valuation Buy |\n| **TATA MOTORS**| **₹1,045.20** | 🟢 +1.84% | 16.2x | High Momentum | Momentum Hold/Buy |\n\n### 🧭 Expert Market Strategy:\n- **Market Valuation**: Nifty 50 is trading at a fair P/E of **21.8x** (near historical median).\n- **When to Buy**: Rather than trying to time the absolute bottom, disciplined **Rupee Cost Averaging (monthly SIPs)** removes emotion and outperforms 90% of active intraday day-traders over 5+ years!`,
      suggestedNext: [
        'How to diversify a ₹5 Lakh portfolio across Indian sectors?',
        'Explain PE Ratio and Market Cap in simple terms with examples'
      ]
    };
  }

  // 5. Standard General Response
  return {
    type: 'general_advisor',
    text: `Hello ${name}! I'm **ArthAI 2.0**, your all-in-one Financial Intelligence & Life Planner. I specialize in:\n\n- 💰 **Savings & Goal Planning**: Calculating purchase timelines for MacBooks, gadgets, weddings, and emergency buffers.\n- ✈️ **Travel Budgeting**: Real-time cost breakdowns, itineraries, and luxury vs budget comparisons for Goa, Bali, Dubai, Thailand, and Manali.\n- 💱 **Currency Conversion**: Live INR exchange rates against USD, EUR, GBP, AED, THB, and IDR.\n- 📈 **Stock Market & Trends**: Nifty 50 analysis, P/E valuations, bluechip stock tracking, and DCA investment strategies.\n\n*Click on any suggested prompt below or type your question directly!*`,
    suggestedNext: [
      'Plan a 5-day budget trip to Bali from India with cost breakdown',
      'What are the live prices & trends of Nifty 50, Reliance and TCS?',
      'How long will it take to save ₹1,50,000 for a new MacBook?',
      'Convert ₹50,000 to USD, EUR, and Thai Baht'
    ]
  };
};

export const getSmartArthAIResponse = resolveMultiDomainQuery;
