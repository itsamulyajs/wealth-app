# CodeFury 9.0 Solution Document

**Team Name:** [Your Team Name]  
**Track:** Track 1 - WealthTech & Investment Solutions  
**Project Name:** ArthSaathi | Intelligent Indian WealthTech & Financial Confidence Platform  
**Live Hosted Website:** [Insert your deployed Netlify/Vercel link here]  
**GitHub Repository Link:** [Insert your GitHub repo link here]  
**Demo Video Link:** [Insert your YouTube / Google Drive public recording link here]  

---

## 1. Executive Summary & Solution to Problem Statement (150–200 Words)

Financial literacy in India has grown rapidly with soaring retail investor participation in equity markets and mutual funds. However, **genuine financial confidence remains notably low**. College students and young earners start Systematic Investment Plans (SIPs) without comprehending risk horizons, professionals struggle with fragmented investments scattered across Zerodha, Groww, bank fixed deposits, EPF/PPF, and Sovereign Gold Bonds, and first-time investors frequently fall for viral social media hype rather than data-driven principles.

**ArthSaathi** bridges this confidence deficit through an innovative, user-centric web platform that converts complex financial and market volatility into clear, personalized, and actionable insights. The platform features:
1. **Interactive Indian Risk Profiler**: Evaluates psychological and horizon-based risk capacity to recommend balanced asset allocations (Equity, Debt, Gold, Cash).
2. **Unified Multi-Asset Portfolio Dashboard**: Aggregates scattered holdings into a single view with a dynamic **Portfolio Health & Diversification Score** that detects dangerous concentration traps.
3. **Goal-Based SIP & Wealth Simulator**: Visualizes compound growth and calculates precise monthly SIP commitments adjusted for India's ~6% inflation.
4. **"Hype vs Reality" FinLiteracy Hub**: Exposes dangerous social media myths (such as F&O get-rich-quick claims) using official SEBI data and mathematical facts.
5. **ArthAI Financial Assistant**: A context-aware conversational AI assistant providing clear, jargon-free advice on SIPs, tax optimization (Old vs New regime), and budgeting.

---

## 2. Application Architecture & Functionality

### A. User Authentication & 1-Click Persona Demos
* **Secure Authentication**: Supports user registration, login, and encrypted credential storage in client-side state.
* **1-Click Pre-Configured Personas**:
  * **Aarav Patel (21, Student)**: ₹18,000/mo stipend, speculative crypto alerts, starter Nifty 50 SIP.
  * **Priya Sharma (28, Software Engineer)**: ₹1,45,000/mo salary, multi-broker portfolio across Zerodha, Groww, EPF, and SGB with home down-payment milestones.
  * **Rajesh Gupta (44, Senior Manager & Parent)**: ₹2,10,000/mo income, conservative debt allocation (PPF, NPS), daughter's international education goal.

### B. Interactive Indian Risk Matrix
* 4-question behavioral assessment evaluating time horizon, crash temperament (reaction to a 25% dip), income certainty, and instrument familiarity.
* Calculates risk scores and generates recommended asset allocation charts powered by Recharts.

### C. Consolidated Portfolio & Health Score
* Aggregates equity mutual funds, direct stocks, PPF/EPF, sovereign gold bonds, and emergency sweep-in accounts.
* Real-time **Portfolio Health & Resiliency Engine (0-100)** that detects excess cash drag or overexposure to speculative assets.

### D. Goal-Based SIP & Compounding Visualizer
* Dual mode simulation:
  * **SIP to Future Corpus**: Interactive compound interest sliders with inflation-adjusted real purchasing power calculations.
  * **Target Corpus to Required Monthly SIP**: Determines the exact monthly auto-debit needed to reach milestones (Emergency Fund, 2BHK Home, Education, FIRE).

### E. "Hype vs Reality" FinLiteracy Engine
* Unmasks viral FinFluencer myths against hard SEBI statistics (e.g. 93% loss in intraday/F&O).
* Indian Financial Jargon Demystifier with real-world analogies (SIP, CAGR, ELSS, SGB, Index Funds).

### F. ArthAI Context-Aware Conversational Assistant
* Persistent conversational interface aware of user's active net worth, risk profile, and cash flow.
* Integrated with prompt suggestion chips and supports Google Gemini API inference.

---

## 3. Prompts Implemented in ArthAI Chatbot

Below are the key prompts implemented in the ArthAI conversational advisor:

1. **Student / Beginner SIP Initiation**:
   * *Prompt*: `"Is ₹2,500/month enough to start investing as a student?"`
   * *Implementation*: Guides first-time investors on starting small with low-cost Nifty 50 Index Funds, explains Rupee Cost Averaging, and emphasizes building a 2-month emergency cushion first.

2. **Asset Allocation & Portfolio Balancing**:
   * *Prompt*: `"How should I allocate my portfolio between Equity, Debt, and Gold?"`
   * *Implementation*: Ingests the user's current risk score and income to provide a tailored breakdown (e.g. 60% Equity, 25% Debt/PPF, 10% SGB, 5% Cash buffer).

3. **Tax Regime Optimization (FY 2024-25 / FY 2025-26)**:
   * *Prompt*: `"Explain Old Tax Regime vs New Tax Regime for salaried people"`
   * *Implementation*: Compares tax slabs, enhanced standard deductions (₹75,000), zero-tax rebate thresholds, and the ₹3.75L deduction breakeven rule.

4. **50-30-20 Smart Budgeting Blueprint**:
   * *Prompt*: `"What is the 50-30-20 rule and how do I apply it to my salary?"`
   * *Implementation*: Calculates exact Rupee allocations for Needs (50%), Wants (30%), and Investments (20%) mapped to the user's take-home salary.

5. **Emergency Cushion Calculation**:
   * *Prompt*: `"How do I calculate how much emergency fund I need?"`
   * *Implementation*: Details 3-6 months essential expenditure sizing and allocation between sweep-in savings accounts and overnight liquid funds.

6. **Debt Payoff vs SIP Compounding**:
   * *Prompt*: `"Should I pay off my education/personal loan or invest in SIPs first?"`
   * *Implementation*: Strategizes debt hierarchy—prioritizing toxic high-interest loans (>12%) while maintaining SIPs alongside low-cost education loans.

---

## 4. Technical Stack & Deployment

* **Frontend Framework**: React 18 (Vite)
* **Styling**: Tailwind CSS, PostCSS, Lucide React Icons
* **Data Visualization**: Recharts (PieChart, AreaChart, Tooltip)
* **Gamification & Delighters**: Canvas Confetti
* **Architecture**: React Context API (`AuthContext`, `PortfolioContext`), Client-Side LocalStorage Persistence
* **Build & Hosting**: Vite production build (`dist/`), compatible with Netlify, Vercel, and GitHub Pages
