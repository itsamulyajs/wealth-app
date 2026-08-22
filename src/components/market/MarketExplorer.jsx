import React, { useState } from 'react';
import { ALL_MARKET_ASSETS, MARKET_STATISTICS_BAR } from '../../data/allMarketAssets';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Coins, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Flame,
  ArrowUpRight,
  ExternalLink,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';

export const MarketExplorer = ({ onOpenArthAI }) => {
  const { addInvestment } = usePortfolio();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedAssetId, setAddedAssetId] = useState(null);

  const categories = [
    { id: 'All', label: '🌐 All Markets & Assets', icon: Layers },
    { id: 'Stocks & Indices', label: '📈 Stocks & Indices', icon: TrendingUp },
    { id: 'Gold & Commodities', label: '🪙 Gold & Silver', icon: Coins },
    { id: 'Cryptocurrency', label: '⚡ Crypto (Digital)', icon: Flame },
    { id: 'Govt Schemes & FDs', label: '🛡️ Govt Schemes & FDs', icon: ShieldCheck },
    { id: 'Mutual Funds', label: '📊 Mutual Funds & ETFs', icon: Sparkles },
  ];

  const filteredAssets = ALL_MARKET_ASSETS.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (asset) => {
    addInvestment({
      name: asset.name,
      category: asset.assetClass || 'equity',
      type: asset.subCategory,
      amount: asset.price > 1000 ? Math.min(asset.price, 50000) : 25000,
      monthlySIP: asset.category === 'Mutual Funds' ? 2500 : 0,
      returnPct: parseFloat(asset.oneYearReturn) || 14.0,
      platform: asset.category.includes('Govt') ? 'Govt / Bank' : asset.category.includes('Gold') ? 'RBI / Broker' : 'Groww / Zerodha'
    });

    setAddedAssetId(asset.id);
    setTimeout(() => setAddedAssetId(null), 1800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Coins className="w-4 h-4" />
            Comprehensive Indian & Global Asset Universe
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Explore Stocks, Gold, Silver, Crypto & Govt Schemes
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Real-time pricing, historical 1-year CAGRs, valuations, and strategic risk ratings across Indian equities, precious metals, sovereign bonds, and digital assets.
          </p>
        </div>
      </div>

      {/* Top Live Markets Ticker Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(MARKET_STATISTICS_BAR).map(([k, item]) => (
          <div key={k} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold block truncate">{item.label}</span>
            <p className="text-sm font-black text-white font-mono">{item.val}</p>
            <span className={`text-[10px] font-bold font-mono flex items-center gap-0.5 ${
              item.isPos ? 'text-brand-400' : 'text-rose-400'
            }`}>
              {item.isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.chg}
            </span>
          </div>
        ))}
      </div>

      {/* Search & Category Tabs Controls */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search stocks, gold, silver, crypto, PPF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredAssets.length}</strong> available instruments
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => {
          const isAdded = addedAssetId === asset.id;
          
          const getRiskBadge = (risk) => {
            if (risk.includes('Zero') || risk.includes('Low')) {
              return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
            }
            if (risk.includes('Moderate')) {
              return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
            }
            return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
          };

          return (
            <div
              key={asset.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800/90 hover:border-slate-700 shadow-xl space-y-4 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3">
                
                {/* Card Top: Symbol, Category & Risk */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-semibold">
                      {asset.symbol}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 leading-snug group-hover:text-brand-300 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-slate-400">{asset.subCategory}</p>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${getRiskBadge(asset.risk)}`}>
                    {asset.risk} Risk
                  </span>
                </div>

                {/* Price & 24H Change */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Live Price / Rate</span>
                    <span className="text-lg font-black text-white font-mono">
                      {typeof asset.price === 'number' ? formatINR(asset.price) : asset.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">1-Yr Return</span>
                    <span className="text-xs font-bold text-brand-400 font-mono">{asset.oneYearReturn}</span>
                  </div>
                </div>

                {/* Description & Strategic Signal */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {asset.description}
                </p>

                <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="font-semibold truncate">{asset.signal}</span>
                </div>

              </div>

              {/* Card Footer: Quick Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleQuickAdd(asset)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-md shadow-brand-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Added to Portfolio
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Add to Portfolio
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
