/**
 * ArthAI Financial Knowledge Base & Contextual Response Engine
 */

export const ARTHAI_PROMPTS = [
  'Is ₹2,500/month enough to start investing as a student?',
  'How should I allocate my portfolio between Equity, Debt, and Gold?',
  'Explain Old Tax Regime vs New Tax Regime for salaried people',
  'What is the 50-30-20 rule and how do I apply it to my salary?',
  'What is Rupee Cost Averaging in SIPs and why does it protect me from crashes?',
  'How do I calculate how much emergency fund I need?',
  'Should I pay off my education/personal loan or invest in SIPs first?'
];

export const getSmartArthAIResponse = (userQuestion, userContext) => {
  const q = userQuestion.toLowerCase().trim();

  // Extract context if available
  const name = userContext?.name || 'Investor';
  const netWorth = userContext?.netWorth || 0;
  const income = userContext?.monthlyIncome || 0;
  const sipTotal = userContext?.monthlySIPTotal || 0;
  const riskCategory = userContext?.riskProfile?.category || 'Moderate';

  // 1. Student / Beginner SIP
  if (q.includes('student') || q.includes('beginner') || q.includes('start investing') || q.includes('₹2,500') || q.includes('500') || q.includes('low income')) {
    return {
      text: `Hello ${name}! Absolutely, starting early is your biggest superpower due to **compound interest**.\n\n### 🚀 Quick 3-Step Starter Guide for Beginners:\n1. **Start small**: Even ₹500 to ₹1,500/month in a low-cost **Nifty 50 Index Fund Direct-Growth** gets you invested in India's top 50 giants (TCS, Reliance, HDFC, Infosys, etc.).\n2. **Emergency Cushion First**: Keep at least 1-2 months of living expenses in a liquid fund or sweep-in savings account before locking money away.\n3. **Avoid the Social Media Hype**: Stay away from Telegram "tip" channels, intraday calls, and penny stocks.\n\n*Fun Fact: A ₹2,000 monthly SIP started at age 21 at 13% CAGR grows to **~₹70.4 Lakhs** by age 45!*`,
      tags: ['Beginner', 'SIP', 'Compounding'],
      suggestedNext: ['How do I pick a Nifty 50 fund?', 'How much emergency fund do I need?']
    };
  }

  // 2. Portfolio Allocation & Risk
  if (q.includes('allocate') || q.includes('allocation') || q.includes('balance') || q.includes('asset') || q.includes('equity vs debt')) {
    return {
      text: `Based on your profile as **${riskCategory}** with a monthly cash flow of ₹${income.toLocaleString('en-IN')}:\n\n### ⚖️ Recommended Indian Asset Allocation:\n- **Equity (60% - 70%)**: Index Funds (35%) + Flexi-Cap Funds (25%) + Mid-Cap Funds (10%).\n- **Debt & Stability (20% - 25%)**: PPF / EPF + High Yield Liquid Funds or Arbitrage Funds.\n- **Hedge (5% - 10%)**: Sovereign Gold Bonds (SGB) or Gold ETFs.\n- **Speculative Cap (< 5%)**: Any crypto or high-risk small caps.\n\n💡 *Tip: Rebalance once a year to lock in equity profits into debt during bull markets!*`,
      tags: ['Portfolio', 'Asset Allocation', 'Diversification'],
      suggestedNext: ['Review my portfolio health score', 'Explain Sovereign Gold Bonds (SGB)']
    };
  }

  // 3. Tax Regimes (Old vs New)
  if (q.includes('tax') || q.includes('old vs new') || q.includes('80c') || q.includes('regime') || q.includes('elss')) {
    return {
      text: `Here is a clear, jargon-free comparison of **Old vs New Tax Regime**:\n\n| Feature | Old Tax Regime | New Tax Regime (Default) |\n| :--- | :--- | :--- |\n| **Tax Slabs** | Higher tax rates | Lower, streamlined tax rates |\n| **Standard Deduction** | ₹50,000 | ₹75,000 (Enhanced in Budget) |\n| **Zero Tax Rebate** | Up to ₹5 Lakhs | Up to ₹7.75 Lakhs (with Std. Deduction) |\n| **Deductions (80C, HRA, Health)** | Available (up to ₹1.5L in 80C, HRA, 80D) | **No deductions** allowed |\n\n### 🎯 Rule of Thumb:\n- If your total deductions (HRA + 80C + Home Loan Interest + 80D) exceed **₹3.75 - ₹4 Lakhs**, Old Regime may save more.\n- For most young professionals and students with fewer deductions, the **New Regime** leaves more take-home cash in hand!`,
      tags: ['Taxation', '80C', 'Finance India'],
      suggestedNext: ['What is ELSS tax saving fund?', 'How does 50-30-20 budget work?']
    };
  }

  // 4. Emergency Fund
  if (q.includes('emergency') || q.includes('emergency fund') || q.includes('contingency')) {
    return {
      text: `### 🛡️ Building a Rock-Solid Emergency Fund:\n\n1. **How much?**: Calculate **3 to 6 months** of essential living expenses (Rent + Groceries + EMIs + Utilities + Insurance premiums).\n2. **Where to park it?**\n   - **50% in Bank Sweep-in Savings Account** (Instant liquidity via UPI/ATM).\n   - **50% in Overnight / Ultra-Short Term Debt Fund** (Yields ~6.5-7% without equity risk).\n3. **Golden Rule**: Never invest your emergency money in stocks, crypto, or volatile mutual funds. Its purpose is *peace of mind*, not high returns!`,
      tags: ['Emergency Fund', 'Safety', 'Liquidity'],
      suggestedNext: ['How do I start a goal for emergency fund?', 'Is ₹2,500/month enough to start?']
    };
  }

  // 5. 50-30-20 Rule
  if (q.includes('50-30-20') || q.includes('budget') || q.includes('spend') || q.includes('salary')) {
    return {
      text: `### 📊 The 50-30-20 Budgeting Blueprint for Indian Earners:\n\n- **50% Needs (₹${Math.round(income * 0.5).toLocaleString('en-IN')})**: Rent, groceries, utility bills, transportation, term/health insurance.\n- **30% Wants (₹${Math.round(income * 0.3).toLocaleString('en-IN')})**: Dining out, OTT subscriptions, weekend trips, shopping, gadgets.\n- **20% Wealth & Savings (₹${Math.round(income * 0.2).toLocaleString('en-IN')})**: SIPs in mutual funds, PPF/EPF, emergency fund building.\n\n💡 *Pro-Tip for High Growth: If you are young and living with parents or having lower rent, invert the rule to **30% Needs, 20% Wants, 50% Investments**!*`,
      tags: ['Budgeting', 'Financial Health', 'Savings'],
      suggestedNext: ['How should I allocate my portfolio?', 'Explain Old vs New Tax Regime']
    };
  }

  // 6. Loan vs SIP / Debt
  if (q.includes('loan') || q.includes('debt payoff') || q.includes('credit card') || q.includes('prepay')) {
    return {
      text: `### 💳 Loan Repayment vs Investing Hierarchy:\n\n1. **High-Interest Debt (> 12%)** (Credit Cards, Personal Loans, BNPL, Instant App Loans):\n   👉 **PAY OFF IMMEDIATELY FIRST.** No stock market return can reliably beat a 24% - 42% credit card interest penalty.\n2. **Moderate-Interest Debt (7% - 9%)** (Education Loan, Home Loan):\n   👉 Pay regular EMIs while continuing your monthly SIPs. Historically, Indian equity CAGR (12-14%) outperforms the ~8.5% borrowing cost over a 10-year horizon, plus education loans offer tax deduction under Sec 80E!`,
      tags: ['Debt', 'Loans', 'Strategy'],
      suggestedNext: ['What is the 50-30-20 rule?', 'How do I calculate emergency fund?']
    };
  }

  // 7. Portfolio Review / Health Check
  if (q.includes('review') || q.includes('my portfolio') || q.includes('check') || q.includes('health') || q.includes('net worth')) {
    return {
      text: `### 🔍 Live Portfolio Review for ${name}:\n\n- **Current Net Worth**: ₹${netWorth.toLocaleString('en-IN')}\n- **Active Monthly SIPs**: ₹${sipTotal.toLocaleString('en-IN')}/month\n- **Risk Archetype**: ${riskCategory}\n\n**ArthAI Insights:**\n1. Your monthly investments are consistent. Keep stepping up your SIP by **10% every year** with annual salary increments.\n2. Ensure your insurance needs (Pure Term Insurance + Super Top-up Health Insurance) are covered outside your employer group cover.\n3. Keep your goal-linked SIPs isolated so you don't panic-sell when market swings occur.`,
      tags: ['Portfolio Review', 'Personalized', 'Net Worth'],
      suggestedNext: ['Simulate my goal timeline', 'What is Rupee Cost Averaging?']
    };
  }

  // Default intelligent response
  return {
    text: `Hello ${name}! I'm **ArthAI**, your Indian WealthTech Assistant. I can help you with:\n\n- **Mutual Funds & SIPs**: Understanding Index funds, Flexi-cap funds, ELSS, and Rupee Cost Averaging.\n- **Asset Allocation**: Finding the right balance between Equities, Debt (PPF/EPF), Gold (SGB), and Cash.\n- **Tax Planning**: Demystifying Old vs New Tax Regimes and 80C deductions.\n- **Goal Simulation**: Calculating exact monthly SIPs required for home purchase, emergency funds, or retirement.\n\n*Ask me any question in simple terms, or select one of the suggested prompts below!*`,
    tags: ['General', 'ArthAI', 'Advisor'],
    suggestedNext: ['Is ₹2,500/month enough to start investing?', 'Explain Old Tax Regime vs New Tax Regime', 'What is the 50-30-20 rule?']
  };
};
