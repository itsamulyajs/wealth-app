import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { ARTHAI_PROMPTS, getSmartArthAIResponse } from '../../data/chatbotKnowledge';
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
  ShieldCheck, 
  TrendingUp, 
  HelpCircle,
  Zap,
  CornerDownLeft
} from 'lucide-react';

export const ArthAIChatbot = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { assets, riskProfile } = usePortfolio();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'arthai',
      text: `Namaste **${currentUser?.name?.split(' ')[0] || 'Friend'}**! 🙏 I am **ArthAI**, your personal Indian WealthTech & Investment Advisor.\n\nI have loaded your profile context:\n- **Risk Archetype**: ${riskProfile?.category || currentUser?.riskProfile?.category || 'Moderate'}\n- **Net Worth Tracked**: ${formatINR(currentUser?.netWorth || 0)}\n- **Monthly Active SIPs**: ${formatINR(currentUser?.monthlySIPTotal || 0)}/mo\n\nHow can I assist you with your investments, taxes, SIP planning, or budgeting today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedNext: [
        'Is ₹2,500/month enough to start investing as a student?',
        'How should I allocate my portfolio between Equity, Debt, and Gold?',
        'Explain Old Tax Regime vs New Tax Regime for salaried people',
        'What is the 50-30-20 rule and how do I apply it to my salary?'
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('arthsaathi_gemini_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);

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

    // Provide response
    setTimeout(async () => {
      let aiResponseText = '';
      let suggestedNext = [];

      // If user supplied Gemini API key, we can try querying Gemini API
      if (apiKey && apiKey.trim().length > 10) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are ArthAI, an expert Indian WealthTech advisor on the ArthSaathi platform.
                  User Profile Context:
                  Name: ${currentUser?.name || 'Investor'}
                  Age: ${currentUser?.age || 25}
                  Monthly Income: ₹${currentUser?.monthlyIncome || 50000}
                  Net Worth: ₹${currentUser?.netWorth || 0}
                  Risk Tolerance: ${riskProfile?.category || 'Moderate'}
                  Monthly SIPs: ₹${currentUser?.monthlySIPTotal || 0}
                  Question: ${query}
                  Keep answer concise, empowering, structured with bullet points/markdown, and specifically tailored for the Indian financial system (SIPs, Nifty, ELSS, PPF, Tax rules, etc.).`
                }]
              }]
            })
          });
          const data = await res.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            aiResponseText = data.candidates[0].content.parts[0].text;
          } else {
            throw new Error('Fallback to local engine');
          }
        } catch (err) {
          const fallback = getSmartArthAIResponse(query, currentUser);
          aiResponseText = fallback.text;
          suggestedNext = fallback.suggestedNext;
        }
      } else {
        // Built-in high-accuracy Knowledge Base Response
        const smartResult = getSmartArthAIResponse(query, currentUser);
        aiResponseText = smartResult.text;
        suggestedNext = smartResult.suggestedNext;
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'arthai',
        text: aiResponseText,
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
        text: `Chat cleared! How can I assist your financial planning now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedNext: ARTHAI_PROMPTS.slice(0, 4)
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-[90vh] sm:h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-brand-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">ArthAI Financial Advisor</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-bold border border-brand-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span> Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Context-Aware Indian Wealth & Tax Guide</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-2 rounded-xl text-xs transition-colors ${
                apiKey ? 'text-brand-400 bg-brand-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Configure Custom Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={clearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Clear Conversation"
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

        {/* Optional Gemini API Key Drawer */}
        {showKeyInput && (
          <form onSubmit={handleSaveKey} className="p-3 bg-slate-950 border-b border-slate-800 flex items-center gap-2 animate-slide-up">
            <Key className="w-4 h-4 text-brand-400 shrink-0" />
            <input
              type="password"
              placeholder="Optional: Enter Google Gemini API Key for live LLM inference"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-brand-500 text-slate-950 text-xs font-bold rounded-lg"
            >
              Save
            </button>
          </form>
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
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-indigo-300" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
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

                  {/* Suggested Next Actions / Questions */}
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
              <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-300" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce delay-200"></span>
                <span>ArthAI is calculating Indian market insights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about SIPs, Nifty Index, 80C Tax, Emergency Fund, or 50-30-20..."
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
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-2">
            <span>Powered by ArthAI Indian Wealth Intelligence</span>
            <span>Educational guidance • Not SEBI certified advice</span>
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
      className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-brand-600 via-emerald-500 to-indigo-600 text-slate-950 shadow-2xl shadow-brand-500/40 hover:scale-110 active:scale-95 transition-all group flex items-center gap-2.5"
      title="Ask ArthAI Assistant"
    >
      <Bot className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
      <span className="text-xs font-black text-slate-950 hidden sm:inline-block">
        Ask ArthAI
      </span>
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
      </span>
    </button>
  );
};
