import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Plus, IndianRupee, Layers, Building2, TrendingUp } from 'lucide-react';

export const AddInvestmentModal = ({ isOpen, onClose }) => {
  const { addInvestment } = usePortfolio();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('equity');
  const [type, setType] = useState('Mutual Fund (SIP)');
  const [amount, setAmount] = useState('');
  const [monthlySIP, setMonthlySIP] = useState('');
  const [returnPct, setReturnPct] = useState('14.0');
  const [platform, setPlatform] = useState('Groww');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    addInvestment({
      name,
      category,
      type,
      amount: Number(amount),
      monthlySIP: Number(monthlySIP || 0),
      returnPct: Number(returnPct || 12),
      platform,
    });

    onClose();
    setName('');
    setAmount('');
    setMonthlySIP('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-brand-400" /> Add Investment Holding
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Consolidate your mutual funds, direct stocks, PPF, gold, or FDs into your unified ArthSaathi portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Name / Scheme</label>
            <input
              type="text"
              placeholder="e.g. Parag Parikh Flexi Cap Fund or HDFC Bank"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Class</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'equity') setType('Mutual Fund (SIP)');
                  else if (e.target.value === 'debt') setType('PPF / Debt Fund');
                  else if (e.target.value === 'gold') setType('SGB / Gold ETF');
                  else if (e.target.value === 'cash') setType('Sweep-in Savings / Liquid');
                }}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="equity">Equity (MFs / Stocks)</option>
                <option value="debt">Debt (PPF / EPF / FD)</option>
                <option value="gold">Gold (SGB / Digital)</option>
                <option value="cash">Cash / Liquid Buffer</option>
                <option value="crypto">Speculative (Crypto)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform / Broker</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Groww">Groww</option>
                <option value="Zerodha (Kite/Coin)">Zerodha (Kite/Coin)</option>
                <option value="Kuvera">Kuvera</option>
                <option value="CAMS / KFintech">CAMS / KFintech</option>
                <option value="Bank (HDFC/ICICI/SBI)">Bank (HDFC/ICICI/SBI)</option>
                <option value="RBI Retail Direct">RBI Retail Direct</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Invested Value (₹)</label>
              <input
                type="number"
                placeholder="₹ 50,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly SIP (₹) (Optional)</label>
              <input
                type="number"
                placeholder="₹ 2,500/mo"
                value={monthlySIP}
                onChange={(e) => setMonthlySIP(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Expected / Historic Return Rate (% CAGR)</label>
            <input
              type="number"
              step="0.5"
              value={returnPct}
              onChange={(e) => setReturnPct(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-4 h-4" /> Add to Portfolio
          </button>

        </form>

      </div>
    </div>
  );
};
