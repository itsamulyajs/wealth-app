# 🪙 ArthSaathi | Intelligent Indian WealthTech & Financial Confidence Platform

> **CodeFury 9.0 Hackathon Submission**  
> *Category: WealthTech & Investment Solutions*  
> 🌐 **Live Deployed App:** [https://wealth-app-s9l2.vercel.app/](https://wealth-app-s9l2.vercel.app/)  
> 📦 **GitHub Repository:** [https://github.com/itsamulyajs/wealth-app](https://github.com/itsamulyajs/wealth-app)

---

## 📌 Problem Statement Solution (150–200 Words)

Financial literacy in India has surged with millions opening Demat accounts, yet **financial confidence remains low**. First-time investors and college students frequently fall prey to social media fads—such as high-risk F&O gambling or obscure crypto tokens—without understanding downside volatility. Meanwhile, young working professionals struggle to manage fragmented investments scattered across Zerodha, Groww, bank fixed deposits, EPF/PPF, and sovereign gold bonds.

**ArthSaathi** bridges this critical confidence gap by converting complex market volatility and scattered portfolio data into clear, personalized, and actionable intelligence. The platform provides:
1. **Interactive Indian Risk Profiler**: Assesses psychological risk tolerance and prescribes ideal asset allocation matrices (Equity, Debt, Gold, Cash).
2. **Unified Multi-Asset Portfolio Dashboard**: Consolidates scattered holdings and computes a real-time **Diversification Health Score** to flag over-concentration traps.
3. **Goal-Based SIP & Wealth Simulator**: Dynamically projects inflation-adjusted compounding milestones for home buying, higher education, emergency funds, and early retirement (FIRE).
4. **"Hype vs Reality" FinLiteracy Engine**: Directly contrasts viral social media claims with official SEBI statistics and compound interest mathematics.
5. **ArthAI Intelligent Assistant**: A context-aware conversational financial advisor answering complex tax (Old vs New regime), SIP, and allocation questions in plain language.

---

## 🚀 Key Features

### 1. 🔐 Secure User Authentication & 1-Click Persona Demos
* Persistent credential login and registration with monthly take-home salary tracking.
* **Instant 1-Click Persona Switcher** for immediate hackathon judging:
  * **Aarav Patel (21, Student / Intern)**: ₹18K/mo stipend, speculative crypto flags, starter index SIP.
  * **Priya Sharma (28, Software Engineer)**: ₹1.45L/mo salary, multi-broker holdings (Zerodha, Groww, EPF, SGB), 2BHK down payment goal.
  * **Rajesh Gupta (44, Family Earner)**: ₹2.1L/mo income, conservative debt allocation (PPF, NPS), child's international college fund.

### 2. 🛡️ Interactive Indian Risk Profiler
* 4-question behavioral assessment evaluating time horizon, reaction to a 25% market crash, income stability, and asset familiarity.
* Dynamic category assignment (*Conservative Capital Preserver*, *Moderate Growth*, *Aggressive Wealth Builder*) with custom Recharts asset allocation models.

### 3. 📊 Consolidated Multi-Asset Wealth Dashboard
* Real-time tracking of Mutual Funds, Direct Equity, PPF, EPF, Sovereign Gold Bonds, and Liquid Funds.
* **Portfolio Health & Diversification Engine (0-100)**: Detects dangerous concentration (e.g. >15% crypto or cash drag losing to 6% inflation).
* Interactive Recharts Pie Chart & detailed holding list with broker tags.

### 4. 🎯 Goal-Based SIP & Wealth Simulator
* Milestone cards with visual progress bars (Emergency Buffer, 2BHK Home, Education, FIRE).
* Dual-mode compounding visualizer:
  * **SIP → Future Corpus**: Interactive sliders for monthly investment, timeline (1-30 yrs), and expected CAGR.
  * **Target Corpus → Required Monthly SIP**: Calculates required monthly commitment accounting for India's 6% inflation.
  * Recharts Area Chart displaying principal invested vs exponential compound growth curve.

### 5. 🔥 "Hype vs Reality" FinLiteracy & MythBuster Hub
* Unmasks popular social media financial fads (F&O day trading traps with SEBI's 93% loss data, rent vs buy math, hidden costs of 0% EMIs).
* Indian Financial Jargon Demystifier with real-world analogies (SIP, CAGR, ELSS, Index Funds, SGBs).

### 6. 🤖 ArthAI Financial Assistant (AI Chatbot)
* Intelligent context-aware chatbot knowing the user's name, net worth, risk profile, and active SIPs.
* Answers questions regarding tax regimes, asset allocation, emergency funds, and budgeting.
* Built-in prompt suggestion pills + optional Gemini API Key integration for live multimodal inference.

---

## 💬 Prompts Implemented in ArthAI Chatbot

The AI Chatbot includes pre-configured, deep-reasoning prompts and contextual logic for the Indian financial ecosystem:

1. **Starter Investment for Students**:
   > *"Is ₹2,500/month enough to start investing as a student?"*
   > → *Explains Rupee Cost Averaging, low-cost Nifty 50 Index Funds, and compound growth over 20+ years.*

2. **Asset Allocation & Risk Profiling**:
   > *"How should I allocate my portfolio between Equity, Debt, and Gold?"*
   > → *Personalizes recommendations based on the user's active risk score (60-70% Equity, 20-25% Debt/PPF, 5-10% SGB).*

3. **Tax Regime Optimization (FY 2024-25 / FY 2025-26)**:
   > *"Explain Old Tax Regime vs New Tax Regime for salaried people"*
   > → *Provides side-by-side comparison tables, standard deduction benefits, and the ₹3.75L deduction breakeven rule.*

4. **50-30-20 Budgeting Blueprint**:
   > *"What is the 50-30-20 rule and how do I apply it to my salary?"*
   > → *Calculates exact Rupee amounts for Needs, Wants, and Wealth building based on user's take-home salary.*

5. **Emergency Cushion Sizing**:
   > *"How do I calculate how much emergency fund I need?"*
   > → *Formulates 3-6 months essential expenses split between sweep-in savings and liquid debt funds.*

6. **Debt Payoff vs SIP Compounding**:
   > *"Should I pay off my education/personal loan or invest in SIPs first?"*
   > → *Differentiates between toxic high-interest debt (>12%) and tax-deductible education/home loans.*

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite
* **Styling**: Tailwind CSS, PostCSS, Lucide React (Financial Icons)
* **Data Visualization**: Recharts (Interactive Pie & Area Charts)
* **Gamification & Delighters**: Canvas Confetti
* **State Management**: React Context API (`AuthContext`, `PortfolioContext`)
* **Persistence**: Client-side LocalStorage
* **AI Intelligence**: Context-Aware Financial Response Engine + Google Gemini API Integration Support

---

## 📦 How to Run Locally

```bash
# 1. Navigate to the project folder
cd arthsaathi-wealth

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🌐 Quick Hosting Instructions (Vercel / Netlify)

1. **Deploy to Vercel**:
   ```bash
   npx vercel
   ```
2. **Deploy to Netlify**:
   * Build command: `npm run build`
   * Publish directory: `dist`
