import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/financeCalculators';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Plane, 
  Bot, 
  Coins, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Briefcase, 
  Users,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';

export const FuturisticLoginHero = () => {
  const { login, register, switchPersona, personas } = useAuth();
  
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register' | 'personas'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [income, setIncome] = useState(35000);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null);

  // Moving Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: Math.random() > 0.5 ? 'rgba(16, 185, 129, ' : 'rgba(99, 102, 241, '
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        // Connect nearby particles with glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authTab === 'login') {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        login(email, password);
        setLoading(false);
      }, 400);
    } else if (authTab === 'register') {
      if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        register(name, email, password, income);
        setLoading(false);
      }, 400);
    }
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-10 px-4 overflow-hidden">
      
      {/* Background Interactive Moving Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Pulsing Gradient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      {/* Main Grid: Left Animated 3D Hero + Right Sleek Glassmorphism Login Box */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: 3D Hologram & Moving Tickers */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brand-500/40 text-brand-400 text-xs font-bold shadow-lg shadow-brand-500/10 backdrop-blur-xl animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Next-Gen Indian WealthTech & FinConfidence
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Invest with <br />
              <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
                Absolute Clarity
              </span>{' '}
              & Confidence.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
              Consolidate your Mutual Funds, Stocks, and Gold. Master risk profiling, simulate inflation-adjusted SIPs, and plan trips with <strong>ArthAI 2.0</strong>.
            </p>
          </div>

          {/* 3D Animated Floating Financial Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            
            {/* Card 1: Floating Nifty Tracker */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl animate-float-slow hover:border-brand-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-400" /> Nifty 50
                </span>
                <span className="text-[10px] font-bold text-brand-400 font-mono">+0.58%</span>
              </div>
              <p className="text-sm font-black text-white font-mono">24,823.15</p>
              <span className="text-[10px] text-slate-500 block">Live NSE Market Index</span>
            </div>

            {/* Card 2: Floating SIP Compounding Card */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl animate-float-reverse hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> SIP Power
                </span>
                <span className="text-[10px] font-bold text-indigo-300">13% CAGR</span>
              </div>
              <p className="text-sm font-black text-white font-mono">₹3K/mo → ₹1.05 Cr</p>
              <span className="text-[10px] text-slate-500 block">24 Years Compounding</span>
            </div>

            {/* Card 3: Floating Risk DNA Shield */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl animate-float-reverse hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Risk DNA
                </span>
                <span className="text-[10px] font-bold text-emerald-300">80/100</span>
              </div>
              <p className="text-sm font-black text-white">Moderate Growth</p>
              <span className="text-[10px] text-slate-500 block">60% Eq • 25% Debt • 10% Gold</span>
            </div>

            {/* Card 4: Floating ArthAI 2.0 Assistant */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl animate-float-slow hover:border-rose-500/40 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-rose-400" /> ArthAI 2.0
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-400 font-bold">Online</span>
              </div>
              <p className="text-sm font-black text-white">Smart Life Planner</p>
              <span className="text-[10px] text-slate-500 block">Finance • Travel • Stocks</span>
            </div>

          </div>

        </div>

        {/* Right Column: Sleek 3D Animated Glass Login / Register / Persona Box */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl shadow-brand-500/10 backdrop-blur-2xl space-y-6 relative overflow-hidden ring-1 ring-white/10 animate-slide-up">
            
            {/* Ambient Corner Glow inside card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* 3D Animated Rupee Badge Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-brand-500/30">
                  ₹
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">ArthSaathi Portal</h3>
                  <p className="text-[11px] text-slate-400">Secure Client-Side Access</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-brand-400 font-semibold border border-slate-700">
                100% Private
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => { setAuthTab('login'); setError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'login'
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('register'); setError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'register'
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('personas'); setError(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authTab === 'personas'
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚡ 1-Click
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center">
                {error}
              </div>
            )}

            {/* TAB 1 & 2: Login or Register Form */}
            {authTab !== 'personas' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {authTab === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="e.g. Aarav Patel"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {authTab === 'register' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300">Starting Monthly Inflow</label>
                      <span className="text-xs font-bold text-brand-400 font-mono">{formatINR(income)}</span>
                    </div>
                    <input
                      type="number"
                      step="5000"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:border-brand-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-brand-500 to-emerald-400 hover:from-brand-400 hover:to-emerald-300 text-slate-950 font-black rounded-xl shadow-xl shadow-brand-500/25 transition-all hover:scale-102 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>{authTab === 'login' ? 'Sign In Securely' : 'Create Account & Onboard'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* TAB 3: 1-Click Persona Demos */
              <div className="space-y-2.5 animate-fade-in">
                <p className="text-xs text-slate-400 text-center mb-1">
                  Select an archetype to test with complete preloaded portfolios:
                </p>

                {personas.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => switchPersona(p.id)}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-brand-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-brand-300">{p.name}</h4>
                        <p className="text-[10px] text-slate-400">{p.title} • {p.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-400 font-mono block">{formatINR(p.netWorth, true)}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-0.5 justify-end group-hover:text-slate-300">
                        Launch <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-center text-[11px] text-slate-500">
              Built for <strong className="text-slate-400">CodeFury 9.0 Hackathon</strong> • Indian WealthTech
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
