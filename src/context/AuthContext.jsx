import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PERSONAS } from '../data/mockPersonas';
import { supabase, isSupabaseConfigured, getSupabaseConfig, saveSupabaseConfig } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('arthsaathi_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default to Aarav (Student persona) for instant live demonstration
    return MOCK_PERSONAS[0];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'persona' | 'supabase_settings'
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [supabaseActive, setSupabaseActive] = useState(isSupabaseConfigured());
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('arthsaathi_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('arthsaathi_user');
    }
  }, [currentUser]);

  // Check Supabase session on initial load if configured
  useEffect(() => {
    if (supabase && isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const syncedUser = {
            id: session.user.id,
            email: session.user.email,
            name: userMeta.name || session.user.email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`,
            title: userMeta.title || 'Supabase Verified Investor',
            age: userMeta.age || 24,
            city: userMeta.city || 'Bengaluru',
            occupation: userMeta.occupation || 'Investor',
            monthlyIncome: userMeta.monthlyIncome || 50000,
            salary: userMeta.salary || 50000,
            scholarship: 0,
            internStipend: 0,
            annualIncome: (userMeta.monthlyIncome || 50000) * 12,
            savings: userMeta.savings || 40000,
            interests: userMeta.interests || ['Mutual Funds (SIP)', 'Tax Saving (80C)'],
            riskProfile: userMeta.riskProfile || { category: 'Moderate Growth', score: 65, description: 'Balanced growth seeker.' },
            netWorth: userMeta.netWorth || 450000,
            monthlySIPTotal: userMeta.monthlySIPTotal || 10000,
            assets: userMeta.assets || { equity: 250000, debt: 120000, gold: 40000, cash: 40000, crypto: 0 },
            investments: userMeta.investments || [
              { id: '1', name: 'Nifty 50 Index Fund Direct', type: 'Mutual Fund (SIP)', amount: 150000, monthlySIP: 5000, returnPct: 14.2, platform: 'Zerodha' },
              { id: '2', name: 'Flexi Cap Growth Fund', type: 'Mutual Fund (SIP)', amount: 100000, monthlySIP: 5000, returnPct: 16.5, platform: 'Groww' },
              { id: '3', name: 'Bank Fixed Deposit', type: 'Debt', amount: 120000, monthlySIP: 0, returnPct: 7.0, platform: 'HDFC Bank' },
              { id: '4', name: 'Digital Gold (SGB/ETF)', type: 'Gold', amount: 40000, monthlySIP: 0, returnPct: 11.0, platform: 'PhonePe' },
            ],
            goals: userMeta.goals || [
              { id: 'g1', title: 'Emergency Buffer', targetAmount: 200000, currentAmount: 120000, targetDate: '2027-01-01', monthlySIP: 5000, category: 'Security' }
            ],
            isOnboarded: true,
            isSupabaseUser: true
          };
          setCurrentUser(syncedUser);
        }
      }).catch(err => console.warn('Supabase session check:', err));
    }
  }, [supabaseActive]);

  // Update Supabase configuration settings
  const updateSupabaseCredentials = (url, key) => {
    saveSupabaseConfig(url, key);
    setSupabaseConfig({ supabaseUrl: url, supabaseAnonKey: key });
    setSupabaseActive(Boolean(url && key && url.startsWith('https://')));
  };

  // Login action (Handles both Supabase Cloud and Local Personas)
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);

    // 1. Check if it's a demo persona
    const found = MOCK_PERSONAS.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setAuthModalOpen(false);
      setAuthLoading(false);
      return { success: true, user: found };
    }

    // 2. If Supabase is configured, attempt real cloud login
    if (supabase && isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          console.warn('Supabase Auth error:', error.message);
          // Fallback to local user if password fails or user is testing offline
        } else if (data?.user) {
          const userMeta = data.user.user_metadata || {};
          const sbUser = {
            id: data.user.id,
            email: data.user.email,
            name: userMeta.name || email.split('@')[0].toUpperCase(),
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
            title: 'Supabase Cloud Investor',
            age: userMeta.age || 24,
            city: userMeta.city || 'Bengaluru',
            occupation: userMeta.occupation || 'Early Career Professional',
            monthlyIncome: userMeta.monthlyIncome || 50000,
            salary: userMeta.salary || 50000,
            scholarship: 0,
            internStipend: 0,
            annualIncome: 600000,
            savings: 40000,
            interests: ['Mutual Funds (SIP)', 'Tax Saving (80C)', 'Travel Budgeting'],
            riskProfile: { category: 'Moderate Growth', score: 65, description: 'Balanced growth seeker.' },
            netWorth: 450000,
            monthlySIPTotal: 10000,
            assets: { equity: 250000, debt: 120000, gold: 40000, cash: 40000, crypto: 0 },
            investments: [
              { id: '1', name: 'Nifty 50 Index Fund Direct', type: 'Mutual Fund (SIP)', amount: 150000, monthlySIP: 5000, returnPct: 14.2, platform: 'Zerodha' },
              { id: '2', name: 'Flexi Cap Growth Fund', type: 'Mutual Fund (SIP)', amount: 100000, monthlySIP: 5000, returnPct: 16.5, platform: 'Groww' },
              { id: '3', name: 'Bank Fixed Deposit', type: 'Debt', amount: 120000, monthlySIP: 0, returnPct: 7.0, platform: 'HDFC Bank' },
              { id: '4', name: 'Digital Gold (SGB/ETF)', type: 'Gold', amount: 40000, monthlySIP: 0, returnPct: 11.0, platform: 'PhonePe' },
            ],
            goals: [
              { id: 'g1', title: 'Emergency Buffer', targetAmount: 200000, currentAmount: 120000, targetDate: '2027-01-01', monthlySIP: 5000, category: 'Security' }
            ],
            isOnboarded: true,
            isSupabaseUser: true
          };

          setCurrentUser(sbUser);
          setAuthModalOpen(false);
          setAuthLoading(false);
          return { success: true, user: sbUser };
        }
      } catch (err) {
        console.warn('Supabase login exception:', err);
      }
    }

    // 3. Fallback to offline / instant user login
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      title: 'Individual Investor',
      age: 24,
      city: 'Bengaluru',
      occupation: 'Early Career Professional',
      monthlyIncome: 50000,
      salary: 50000,
      scholarship: 0,
      internStipend: 0,
      annualIncome: 600000,
      savings: 40000,
      interests: ['Mutual Funds (SIP)', 'Tax Saving (80C)', 'Travel Budgeting'],
      riskProfile: {
        category: 'Moderate Growth',
        score: 65,
        description: 'Balanced growth seeker with moderate risk tolerance.'
      },
      netWorth: 450000,
      monthlySIPTotal: 10000,
      assets: {
        equity: 250000,
        debt: 120000,
        gold: 40000,
        cash: 40000,
        crypto: 0,
      },
      investments: [
        { id: '1', name: 'Nifty 50 Index Fund Direct', type: 'Mutual Fund (SIP)', amount: 150000, monthlySIP: 5000, returnPct: 14.2, platform: 'Zerodha' },
        { id: '2', name: 'Flexi Cap Growth Fund', type: 'Mutual Fund (SIP)', amount: 100000, monthlySIP: 5000, returnPct: 16.5, platform: 'Groww' },
        { id: '3', name: 'Bank Fixed Deposit', type: 'Debt', amount: 120000, monthlySIP: 0, returnPct: 7.0, platform: 'HDFC Bank' },
        { id: '4', name: 'Digital Gold (SGB/ETF)', type: 'Gold', amount: 40000, monthlySIP: 0, returnPct: 11.0, platform: 'PhonePe' },
      ],
      goals: [
        { id: 'g1', title: 'Emergency Buffer', targetAmount: 200000, currentAmount: 120000, targetDate: '2027-01-01', monthlySIP: 5000, category: 'Security' }
      ],
      isOnboarded: true
    };

    setCurrentUser(newUser);
    setAuthModalOpen(false);
    setAuthLoading(false);
    return { success: true, user: newUser };
  };

  // Register action -> Triggers Onboarding (with Supabase signup if connected)
  const register = async (name, email, password, baseIncome = 35000) => {
    setAuthLoading(true);
    setAuthError(null);

    // If Supabase is connected, trigger Supabase signup
    if (supabase && isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              name,
              monthlyIncome: Number(baseIncome),
              salary: Number(baseIncome),
            }
          }
        });
        if (error) {
          console.warn('Supabase Signup warning:', error.message);
        }
      } catch (err) {
        console.warn('Supabase register exception:', err);
      }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      title: 'New Wealth Creator',
      age: 22,
      city: 'Bengaluru',
      occupation: 'Student / Young Earner',
      monthlyIncome: Number(baseIncome),
      salary: Number(baseIncome),
      scholarship: 0,
      internStipend: 0,
      annualIncome: Number(baseIncome) * 12,
      savings: 15000,
      interests: ['Mutual Funds (SIP)', 'Budgeting (50-30-20)'],
      riskProfile: {
        category: 'Getting Started',
        score: 50,
        description: 'Complete the Risk Profiler to personalize your asset allocation.'
      },
      netWorth: 15000,
      monthlySIPTotal: 2000,
      assets: {
        equity: 8000,
        debt: 4000,
        gold: 1000,
        cash: 2000,
        crypto: 0,
      },
      investments: [
        { id: '1', name: 'Nifty 50 Index Fund Direct', type: 'Mutual Fund (SIP)', amount: 8000, monthlySIP: 2000, returnPct: 13.0, platform: 'Groww' }
      ],
      goals: [
        { id: 'g1', title: 'First ₹1 Lakh Milestone', targetAmount: 100000, currentAmount: 15000, targetDate: '2027-06-30', monthlySIP: 2000, category: 'Milestone' }
      ],
      isOnboarded: false
    };

    setCurrentUser(newUser);
    setAuthModalOpen(false);
    setOnboardingOpen(true);
    setAuthLoading(false);
    return { success: true, user: newUser };
  };

  // Switch persona
  const switchPersona = (personaId) => {
    const persona = MOCK_PERSONAS.find(p => p.id === personaId);
    if (persona) {
      const enrichedPersona = {
        ...persona,
        salary: persona.monthlyIncome,
        scholarship: persona.id.includes('student') ? 5000 : 0,
        internStipend: persona.id.includes('student') ? 13000 : 0,
        annualIncome: persona.monthlyIncome * 12,
        savings: persona.assets.cash || 20000,
        interests: persona.id.includes('student') 
          ? ['Mutual Funds (SIP)', 'Emergency Buffer', 'Gadget Savings']
          : ['Equity Stocks', 'SGB Gold', 'Home Purchase', 'FIRE Retirement'],
        isOnboarded: true
      };
      setCurrentUser(enrichedPersona);
      setAuthModalOpen(false);
      return { success: true, persona: enrichedPersona };
    }
    return { success: false };
  };

  // Logout
  const logout = async () => {
    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout:', err);
      }
    }
    setCurrentUser(null);
  };

  // Update current user data & persist
  const updateUserProfile = async (updatedFields) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      const merged = {
        ...prev,
        ...updatedFields
      };

      if (updatedFields.salary !== undefined || updatedFields.scholarship !== undefined || updatedFields.internStipend !== undefined) {
        const salary = Number(updatedFields.salary !== undefined ? updatedFields.salary : (prev.salary || 0));
        const scholarship = Number(updatedFields.scholarship !== undefined ? updatedFields.scholarship : (prev.scholarship || 0));
        const internStipend = Number(updatedFields.internStipend !== undefined ? updatedFields.internStipend : (prev.internStipend || 0));
        merged.monthlyIncome = salary + scholarship + internStipend;
        merged.annualIncome = merged.monthlyIncome * 12;
      }

      return merged;
    });

    // Optionally update Supabase user metadata
    if (supabase && isSupabaseConfigured() && currentUser?.isSupabaseUser) {
      try {
        await supabase.auth.updateUser({
          data: updatedFields
        });
      } catch (err) {
        console.warn('Supabase update user metadata:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        switchPersona,
        updateUserProfile,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        onboardingOpen,
        setOnboardingOpen,
        editProfileOpen,
        setEditProfileOpen,
        supabaseActive,
        supabaseConfig,
        updateSupabaseCredentials,
        authError,
        authLoading,
        personas: MOCK_PERSONAS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
