import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { evaluatePortfolioHealth } from '../utils/financeCalculators';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const { currentUser, updateUserProfile } = useAuth();

  const [investments, setInvestments] = useState(currentUser?.investments || []);
  const [goals, setGoals] = useState(currentUser?.goals || []);
  const [assets, setAssets] = useState(currentUser?.assets || { equity: 0, debt: 0, gold: 0, cash: 0, crypto: 0 });
  const [riskProfile, setRiskProfile] = useState(currentUser?.riskProfile || { category: 'Moderate', score: 65, description: '' });

  // Sync state whenever currentUser changes (e.g. switching personas or login)
  useEffect(() => {
    if (currentUser) {
      setInvestments(currentUser.investments || []);
      setGoals(currentUser.goals || []);
      setAssets(currentUser.assets || { equity: 0, debt: 0, gold: 0, cash: 0, crypto: 0 });
      setRiskProfile(currentUser.riskProfile || { category: 'Moderate', score: 65, description: '' });
    }
  }, [currentUser]);

  // Add new investment
  const addInvestment = (investment) => {
    const newInv = {
      ...investment,
      id: `inv-${Date.now()}`,
      amount: Number(investment.amount),
      monthlySIP: Number(investment.monthlySIP || 0),
      returnPct: Number(investment.returnPct || 12),
    };

    const updatedList = [newInv, ...investments];
    setInvestments(updatedList);

    // Update asset allocation breakdown
    const cat = investment.category || 'equity';
    const updatedAssets = {
      ...assets,
      [cat]: (assets[cat] || 0) + Number(investment.amount)
    };
    setAssets(updatedAssets);

    // Recalculate net worth & monthly SIP
    const newNetWorth = Object.values(updatedAssets).reduce((sum, v) => sum + Number(v), 0);
    const newMonthlySIP = updatedList.reduce((sum, item) => sum + Number(item.monthlySIP || 0), 0);

    updateUserProfile({
      investments: updatedList,
      assets: updatedAssets,
      netWorth: newNetWorth,
      monthlySIPTotal: newMonthlySIP
    });
  };

  // Remove investment
  const removeInvestment = (id) => {
    const itemToRemove = investments.find(i => i.id === id);
    if (!itemToRemove) return;

    const updatedList = investments.filter(i => i.id !== id);
    setInvestments(updatedList);

    const cat = itemToRemove.category || 'equity';
    const updatedAssets = {
      ...assets,
      [cat]: Math.max(0, (assets[cat] || 0) - Number(itemToRemove.amount))
    };
    setAssets(updatedAssets);

    const newNetWorth = Object.values(updatedAssets).reduce((sum, v) => sum + Number(v), 0);
    const newMonthlySIP = updatedList.reduce((sum, item) => sum + Number(item.monthlySIP || 0), 0);

    updateUserProfile({
      investments: updatedList,
      assets: updatedAssets,
      netWorth: newNetWorth,
      monthlySIPTotal: newMonthlySIP
    });
  };

  // Add a financial goal
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: `g-${Date.now()}`,
      targetAmount: Number(goal.targetAmount),
      currentAmount: Number(goal.currentAmount || 0),
      monthlySIP: Number(goal.monthlySIP || 0),
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    updateUserProfile({ goals: updatedGoals });
  };

  // Delete a goal
  const removeGoal = (id) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    updateUserProfile({ goals: updatedGoals });
  };

  // Update Risk Profile from Quiz
  const updateRiskScore = (category, score, description) => {
    const newProfile = { category, score, description };
    setRiskProfile(newProfile);
    updateUserProfile({ riskProfile: newProfile });
  };

  // Evaluate Portfolio Health
  const healthEvaluation = evaluatePortfolioHealth(assets);

  return (
    <PortfolioContext.Provider
      value={{
        investments,
        goals,
        assets,
        riskProfile,
        addInvestment,
        removeInvestment,
        addGoal,
        removeGoal,
        updateRiskScore,
        healthEvaluation,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
