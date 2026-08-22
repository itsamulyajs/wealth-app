import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PERSONAS } from '../data/mockPersonas';

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
    // Default to Aarav (Student persona) for instant interactive experience
    return MOCK_PERSONAS[0];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'persona'

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('arthsaathi_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('arthsaathi_user');
    }
  }, [currentUser]);

  // Login action
  const login = (email, password) => {
    // Check if matching any mock persona
    const found = MOCK_PERSONAS.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setAuthModalOpen(false);
      return { success: true, user: found };
    }

    // Generic login simulation
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      title: 'Individual Investor',
      age: 26,
      city: 'Mumbai',
      monthlyIncome: 65000,
      riskProfile: {
        category: 'Moderate',
        score: 65,
        description: 'Balanced growth seeker with moderate risk tolerance.'
      },
      netWorth: 450000,
      monthlySIPTotal: 12000,
      assets: {
        equity: 250000,
        debt: 120000,
        gold: 40000,
        cash: 40000,
        crypto: 0,
      },
      investments: [
        { id: '1', name: 'Nifty 50 Index Fund', type: 'Mutual Fund (SIP)', amount: 150000, monthlySIP: 6000, returnPct: 14.2, platform: 'Zerodha' },
        { id: '2', name: 'Flexi Cap Growth Fund', type: 'Mutual Fund (SIP)', amount: 100000, monthlySIP: 6000, returnPct: 16.5, platform: 'Groww' },
        { id: '3', name: 'Bank Fixed Deposit', type: 'Debt', amount: 120000, monthlySIP: 0, returnPct: 7.0, platform: 'HDFC' },
        { id: '4', name: 'Digital Gold', type: 'Gold', amount: 40000, monthlySIP: 0, returnPct: 11.0, platform: 'Paytm Money' },
      ],
      goals: [
        { id: 'g1', title: 'Emergency Cushion', targetAmount: 200000, currentAmount: 120000, targetDate: '2027-01-01', monthlySIP: 5000, category: 'Security' }
      ],
      insights: [
        '✅ Great foundation! Your asset allocation is well balanced across equity and debt.'
      ]
    };

    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  // Register action
  const register = (name, email, password, monthlyIncome = 30000) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      title: 'New Wealth Creator',
      age: 24,
      city: 'Delhi NCR',
      monthlyIncome: Number(monthlyIncome),
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
        { id: '1', name: 'Nifty 50 Index Fund Direct', type: 'Mutual Fund (SIP)', amount: 8000, monthlySIP: 2000, returnPct: 12.8, platform: 'Groww' }
      ],
      goals: [
        { id: 'g1', title: 'First ₹1 Lakh Milestone', targetAmount: 100000, currentAmount: 15000, targetDate: '2027-06-30', monthlySIP: 2000, category: 'Milestone' }
      ],
      insights: [
        '🎉 Welcome to ArthSaathi! Take the 2-minute Risk Profiler to unlock personalized recommendations.'
      ]
    };

    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  // Switch to one of the 3 predefined mock personas for instant evaluation
  const switchPersona = (personaId) => {
    const persona = MOCK_PERSONAS.find(p => p.id === personaId);
    if (persona) {
      setCurrentUser(persona);
      setAuthModalOpen(false);
      return { success: true, persona };
    }
    return { success: false };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Update current user data
  const updateUserProfile = (updatedFields) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updatedFields
      };
    });
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
