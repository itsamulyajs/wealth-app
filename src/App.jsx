import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/auth/OnboardingWizard';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { FuturisticLoginHero } from './components/auth/FuturisticLoginHero';
import { PortfolioDashboard } from './components/dashboard/PortfolioDashboard';
import { MarketExplorer } from './components/market/MarketExplorer';
import { RiskProfiler } from './components/risk/RiskProfiler';
import { GoalPlanner } from './components/goals/GoalPlanner';
import { MythBusterHub } from './components/literacy/MythBusterHub';
import { ArthAIChatbot, FloatingChatButton } from './components/chatbot/ArthAIChatbot';
import { Footer } from './components/layout/Footer';

const MainContent = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'markets' | 'risk' | 'goals' | 'literacy' | 'advisor'
  const [isArthAIOpen, setIsArthAIOpen] = useState(false);

  const handleOpenArthAI = () => {
    setIsArthAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArthAI={handleOpenArthAI}
      />

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* If user is NOT logged in: Show 3D-styled moving animated landing & login portal */}
        {!currentUser ? (
          <FuturisticLoginHero />
        ) : (
          /* If user IS logged in: Show full platform tabs */
          <>
            {activeTab === 'dashboard' && (
              <PortfolioDashboard
                onOpenRiskQuiz={() => setActiveTab('risk')}
                onOpenGoals={() => setActiveTab('goals')}
                onOpenArthAI={handleOpenArthAI}
              />
            )}

            {activeTab === 'markets' && (
              <MarketExplorer
                onOpenArthAI={handleOpenArthAI}
              />
            )}

            {activeTab === 'risk' && (
              <RiskProfiler />
            )}

            {activeTab === 'goals' && (
              <GoalPlanner />
            )}

            {activeTab === 'literacy' && (
              <MythBusterHub />
            )}

            {activeTab === 'advisor' && (
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    ArthAI 2.0 Multi-Domain Financial Intelligence
                  </h2>
                  <p className="text-sm text-slate-300 max-w-xl mx-auto">
                    Personal Finance, Savings Timelines, Vacation Budgeting, Live Stock Market Trends, and Forex Conversions.
                  </p>
                  <button
                    onClick={handleOpenArthAI}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-2xl shadow-xl shadow-brand-500/20 transition-all hover:scale-105"
                  >
                    Launch Full ArthAI Chat Session
                  </button>
                </div>
                <MarketExplorer onOpenArthAI={handleOpenArthAI} />
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenRiskQuiz={() => setActiveTab('risk')}
        onOpenGoals={() => setActiveTab('goals')}
        onOpenLiteracy={() => setActiveTab('literacy')}
        onOpenArthAI={handleOpenArthAI}
      />

      {/* Floating Chat Button & ArthAI Modal */}
      {currentUser && <FloatingChatButton onClick={handleOpenArthAI} />}
      <ArthAIChatbot
        isOpen={isArthAIOpen}
        onClose={() => setIsArthAIOpen(false)}
      />

      {/* Auth Modal (Sign In / Register / Persona Selector) */}
      <AuthModal />

      {/* Multi-Step Onboarding Wizard */}
      <OnboardingWizard />

      {/* Edit Profile & Financial Parameters Anytime Modal */}
      <EditProfileModal />

    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <MainContent />
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
