# CodeFury 9.0 Solution Document

**Team Name:** [Your Team Name]  
**Track:** Track 1 - WealthTech & Investment Solutions  
**Project Name:** ArthSaathi 2.0 | Intelligent Indian WealthTech, Travel Budgeting & Market Intelligence Platform  
**Live Hosted Website:** [Insert your deployed Netlify/Vercel link here]  
**GitHub Repository Link:** [Insert your GitHub repo link here]  
**Demo Video Link:** [Insert your YouTube / Google Drive public recording link here]  

---

## 1. Executive Summary & Solution to Problem Statement (150–200 Words)

Financial literacy in India has grown rapidly with soaring retail investor participation in equity markets and mutual funds. However, **genuine financial confidence remains notably low**. College students and young earners start Systematic Investment Plans (SIPs) without comprehending risk horizons, professionals struggle with fragmented investments scattered across Zerodha, Groww, bank fixed deposits, EPF/PPF, and Sovereign Gold Bonds, and first-time investors frequently fall for viral social media hype rather than data-driven principles.

**ArthSaathi 2.0** bridges this confidence deficit through an innovative, user-centric web platform that converts complex financial and market volatility into clear, personalized, and actionable insights. The platform features:
1. **Interactive Indian Risk Profiler**: Evaluates psychological and horizon-based risk capacity to recommend balanced asset allocations (Equity, Debt, Gold, Cash).
2. **Unified Multi-Asset Portfolio Dashboard**: Aggregates scattered holdings into a single view with a dynamic **Portfolio Health & Diversification Score** that detects dangerous concentration traps.
3. **Goal-Based SIP & Wealth Simulator**: Visualizes compound growth and calculates precise monthly SIP commitments adjusted for India's ~6% inflation.
4. **"Hype vs Reality" FinLiteracy Hub**: Exposes dangerous social media myths (such as F&O get-rich-quick claims) using official SEBI data and mathematical facts.
5. **ArthAI 2.0 Multi-Domain Advisor**: An upgraded conversational AI assistant providing deep guidance across **Personal Finance & Savings Timelines**, **Travel & Vacation Cost Breakdown**, **Live Stock Market Trends (Nifty 50, Bluechips)**, and **Real-Time Currency Conversions**.

---

## 2. ArthAI 2.0 Upgraded Capability Pillars

### 💰 Pillar 1: Personal Finance & Savings Planning
* **Goal Timeline Engine**: Computes exact timelines to save for major purchases (e.g. MacBook Pro, flagship smartphone, wedding budget, car down payment) across Steady (₹5K/mo), Balanced (₹10K/mo), and Aggressive (₹20K/mo) tiers.
* **Custom Budgeting Strategies**: Integrates the 50-30-20 rule dynamically mapped to user's take-home salary.

### ✈️ Pillar 2: Travel & Vacation Financial Planning
* **Complete Cost Breakdowns**: Estimates round-trip flights, accommodation, food, and local activity costs for destinations (Goa, Bali, Dubai, Thailand, Manali).
* **Budget Explorer vs Luxury Comfort Tiers**: Compares accessible vs premium vacation tiers.
* **Actionable Day-by-Day Itineraries**: Provides structured daily itineraries tailored to financial budgets.
* **Weather & Best Season Advisor**: Recommends optimal travel months and climate conditions.

### 📈 Pillar 3: Stock Market & Investment Advice
* **Live Market Intelligence**: Real-time prices, percentage shifts, and technical trends for Nifty 50, BSE Sensex, Reliance, TCS, HDFC Bank, Infosys, Tata Motors, and ITC.
* **Valuation & Fundamentals (P/E Ratios)**: Explains Price-to-Earnings ratios, historical medians, and market cap classifications.
* **Strategic Signals**: Recommends DCA / Rupee Cost Averaging vs Lumpsum strategies.

### 💱 Pillar 4: Real-Time Currency & Forex Engine
* **Instant Currency Conversion**: Converts INR into USD ($), EUR (€), GBP (£), AED (د.إ), THB (฿), IDR (Rp), and JPY (¥).
* **Live Exchange Rates Ticker**: Interactive real-time converter right inside the chat interface.

---

## 3. Implemented Prompts in ArthAI 2.0

Below are the key prompts implemented in the ArthAI 2.0 conversational advisor:

1. **Savings Goal & Item Purchase Timeline**:
   * *Prompt*: `"How long will it take to save ₹1,50,000 for a new MacBook?"`
   * *Implementation*: Computes 3 savings tiers (₹5K/mo, ₹10K/mo, ₹20K/mo), timeline in months, and recommended liquid fund strategies.

2. **International Travel & Vacation Cost Breakdown**:
   * *Prompt*: `"Plan a 5-day budget trip to Bali from India with cost breakdown"`
   * *Implementation*: Breaks down flights (₹28K), stay (₹14K), food (₹10K), and activities (₹9K), with weather advice, currency rates, and 6-day itinerary.

3. **Domestic Vacation Planning**:
   * *Prompt*: `"What is the total estimated cost for a 4-day Goa vacation?"`
   * *Implementation*: Compares budget tier (₹21K) vs luxury tier (₹79K) with day-by-day sightseeing plans.

4. **Live Stock Market Trends & Index Analysis**:
   * *Prompt*: `"What are the live prices & trends of Nifty 50, Reliance and TCS?"`
   * *Implementation*: Renders live price feeds, P/E metrics, technical momentum, and long-term hold/buy strategic recommendations.

5. **Financial Valuation Concepts Explained**:
   * *Prompt*: `"Explain PE Ratio and Market Cap in simple terms with examples"`
   * *Implementation*: Demystifies valuation metrics with practical examples (large-cap, mid-cap, small-cap risk levels).

6. **Real-Time Currency Conversion**:
   * *Prompt*: `"Convert ₹50,000 to USD, EUR, and Thai Baht"`
   * *Implementation*: Displays live converted amounts in USD, EUR, GBP, AED, THB, and IDR with international fee avoidance tips.

7. **Tax Regime Optimization**:
   * *Prompt*: `"Explain Old Tax Regime vs New Tax Regime for salaried people"`
   * *Implementation*: Compares tax slabs, ₹75,000 standard deductions, and the ₹3.75L deduction breakeven rule.

---

## 4. Technical Stack & Deployment

* **Frontend Framework**: React 18 (Vite)
* **Styling**: Tailwind CSS, PostCSS, Lucide React Icons
* **Data Visualization**: Recharts (Interactive Pie, Area & Stock Charts)
* **Gamification & Delighters**: Canvas Confetti
* **Architecture**: React Context API (`AuthContext`, `PortfolioContext`), Client-Side LocalStorage Persistence
* **Build & Hosting**: Vite production build (`dist/`), compatible with Netlify, Vercel, and GitHub Pages
