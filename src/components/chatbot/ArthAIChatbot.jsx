import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  resolveMultiDomainQuery, 
  ENHANCED_PROMPT_CATEGORIES, 
  LIVE_STOCKS_DATA, 
  LIVE_EXCHANGE_RATES,
  TRAVEL_DESTINATIONS 
} from '../../data/chatbotKnowledge';
import { formatINR } from '../../utils/financeCalculators';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  Key, 
  ChevronRight, 
  Plane, 
  TrendingUp, 
  Coins, 
  PiggyBank, 
  ArrowRight,
  Sun,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export const ArthAIChatbot = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { assets, riskProfile } = usePortfolio();

  const [activeCategoryTab, setActiveCategoryTab] = useState('All');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'arthai',
      text: `Namaste **${currentUser?.name?.split(' ')[0] || 'Friend'}**! 🙏 I am **ArthAI 2.0**, your upgraded Indian Financial & Lifestyle Intelligence Assistant.\n\n### 🚀 I can help you with 4 core domains:\n1. 💰 **Personal Finance & Savings**: Plan purchases, calculate timelines (e.g. MacBook, wedding), and budget tailored to your salary.\n2. ✈️ **Travel & Vacation Planning**: Real-time cost breakdowns, day-wise itineraries, and luxury vs budget comparisons (Goa, Bali, Dubai, Thailand).\n3. 📈 **Stock Market & Equities**: Live Nifty 50 trends, P/E valuations, bluechip stock tracking, and buying signals.\n4. 💱 **Real-Time Currency & Forex**: Live exchange rates and conversion.\n\n*Select a category above or choose a suggested prompt below to begin!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedNext: [
        'Plan a 5-day budget trip to Bali from India with cost breakdown',
        'What are the live prices & trends of Nifty 50, Reliance and TCS?',
        'How long will it take to save ₹1,50,000 for a new MacBook?',
        'Convert ₹50,000 to USD, EUR, and Thai Baht'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('arthsaathi_gemini_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Live Currency Converter Quick State
  const [converterINR, setConverterINR] = useState(50000);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    // Call Multi-Domain Query Engine
    setTimeout(async () => {
      let aiResponseText = '';
      let suggestedNext = [];
      let payloadData = null;
      let payloadType = 'text';

      if (apiKey && apiKey.trim().length > 10) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are ArthAI 2.0, an expert Indian WealthTech, Travel Budgeting, and Stock Market advisor on the ArthSaathi platform.
                  User Profile Context:
                  Name: ${currentUser?.name || 'Investor'}
                  Monthly Income: ₹${currentUser?.monthlyIncome || 50000}
                  Net Worth: ₹${currentUser?.netWorth || 0}
                  Risk Tolerance: ${riskProfile?.category || 'Moderate'}
                  Question: ${query}
                  Instructions: Structure your response with markdown tables, bullet points, cost breakdowns, and clear actionable takeaways for the Indian ecosystem.`
                }]
              }]
            })
          });
          const data = await res.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            aiResponseText = data.candidates[0].content.parts[0].text;
          } else {
            throw new Error('Fallback to local intelligence');
          }
        } catch (err) {
          const resolved = resolveMultiDomainQuery(query, currentUser);
          aiResponseText = resolved.text;
          suggestedNext = resolved.suggestedNext;
          payloadData = resolved.data;
          payloadType = resolved.type;
        }
      } else {
        const resolved = resolveMultiDomainQuery(query, currentUser);
        aiResponseText = resolved.text;
        suggestedNext = resolved.suggestedNext;
        payloadData = resolved.data;
        payloadType = resolved.type;
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'arthai',
        text: aiResponseText,
        type: payloadType,
        data: payloadData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedNext: suggestedNext || []
      };

      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 600);
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('arthsaathi_gemini_key', apiKey);
    setShowKeyInput(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'arthai',
        text: `Chat cleared! What would you like to explore? (Savings goals, travel plans, live stock trends, or currency conversion)`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedNext: [
          'Plan a 5-day budget trip to Bali from India with cost breakdown',
          'What are the live prices & trends of Nifty 50, Reliance and TCS?',
          'How long will it take to save ₹1,50,000 for a new MacBook?'
        ]
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl h-[92vh] sm:h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/95 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 via-emerald-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Bot className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">ArthAI 2.0 Multi-Domain Advisor</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-bold border border-brand-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span> Live Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Finance • Savings • Travel • Stocks • Forex</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className={`p-2 rounded-xl text-xs transition-colors ${
                  apiKey ? 'text-brand-400 bg-brand-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title="Configure Live Google Gemini API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={clearChat}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Domain Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['All', '💰 Savings', '✈️ Travel', '📈 Stocks', '💱 Forex'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategoryTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  activeCategoryTab === tab
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyInput && (
          <form onSubmit={handleSaveKey} className="p-3 bg-slate-950 border-b border-slate-800 flex items-center gap-2 animate-slide-up">
            <Key className="w-4 h-4 text-brand-400 shrink-0" />
            <input
              type="password"
              placeholder="Optional: Enter Google Gemini API Key for live multimodal internet calls"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-brand-500 text-slate-950 text-xs font-bold rounded-lg"
            >
              Save Key
            </button>
          </form>
        )}

        {/* Live Quick Interactive Widgets Bar (If user selected a specific tab) */}
        {activeCategoryTab === '📈 Stocks' && (
          <div className="p-3 bg-slate-950/80 border-b border-slate-800 overflow-x-auto flex items-center gap-3">
            {Object.values(LIVE_STOCKS_DATA).slice(0, 4).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => handleSendMessage(`Analyze ${stock.name} price, trend, and recommendation`)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 cursor-pointer shrink-0 text-xs flex items-center gap-2.5 transition-all"
              >
                <div>
                  <span className="font-bold text-white block">{stock.symbol}</span>
                  <span className="text-[10px] text-slate-400">{stock.recommendation}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-white block font-semibold">₹{stock.price.toLocaleString('en-IN')}</span>
                  <span className={`text-[10px] font-bold ${stock.change.includes('+') ? 'text-brand-400' : 'text-rose-400'}`}>
                    {stock.change.split(' ')[1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeCategoryTab === '💱 Forex' && (
          <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Convert ₹:</span>
              <input
                type="number"
                value={converterINR}
                onChange={(e) => setConverterINR(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto font-mono text-[11px]">
              <span className="text-emerald-300">USD: ${(converterINR * LIVE_EXCHANGE_RATES.USD.fromINR).toFixed(1)}</span>
              <span className="text-indigo-300">EUR: €{(converterINR * LIVE_EXCHANGE_RATES.EUR.fromINR).toFixed(1)}</span>
              <span className="text-amber-300">AED: {(converterINR * LIVE_EXCHANGE_RATES.AED.fromINR).toFixed(1)}</span>
              <span className="text-rose-300">THB: ฿{(converterINR * LIVE_EXCHANGE_RATES.THB.fromINR).toFixed(0)}</span>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                )}

                <div className="max-w-[88%] space-y-2.5">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-brand-500 text-slate-950 font-medium rounded-tr-sm shadow-md'
                        : 'bg-slate-950/80 text-slate-200 border border-slate-800 rounded-tl-sm shadow-md whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className={`flex items-center gap-2 text-[10px] text-slate-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Suggested Next Questions */}
                  {!isUser && msg.suggestedNext && msg.suggestedNext.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedNext.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-brand-500/40 text-[11px] text-slate-300 hover:text-brand-300 transition-all flex items-center gap-1 text-left"
                        >
                          <ChevronRight className="w-3 h-3 text-brand-400 shrink-0" />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce delay-200"></span>
                <span>ArthAI is calculating live pricing, valuations, and travel budgets...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Suggested Prompt Chips */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 space-y-2">
          
          {/* Quick Context-Specific Prompts Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {ENHANCED_PROMPT_CATEGORIES.flatMap(c => c.prompts).slice(0, 5).map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-brand-500/30 whitespace-nowrap transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about savings timelines, Bali/Goa travel costs, Nifty 50 trends, or forex..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-3 bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-slate-950 font-bold rounded-2xl shadow-md shadow-brand-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1">
            <span>ArthAI 2.0 • Real-Time Financial & Travel Intelligence</span>
            <span>Live Stock Market & Forex Engine</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const FloatingChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-brand-500 via-emerald-400 to-indigo-600 text-slate-950 shadow-2xl shadow-brand-500/40 hover:scale-110 active:scale-95 transition-all group flex items-center gap-2.5"
      title="Ask ArthAI 2.0 Assistant"
    >
      <Bot className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
      <span className="text-xs font-black text-slate-950 hidden sm:inline-block">
        Ask ArthAI 2.0
      </span>
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
      </span>
    </button>
  );
};
