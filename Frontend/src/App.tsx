/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FloatingChatbot } from './components/FloatingChatbot';
import { AuthModal } from './components/AuthModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzeFormulationPage } from './pages/AnalyzeFormulationPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';
import { DetailedAnalysisPage } from './pages/DetailedAnalysisPage';
import { AskAIPage } from './pages/AskAIPage';
import { EvidenceLibraryPage } from './pages/EvidenceLibraryPage';
import { MyAnalysesPage } from './pages/MyAnalysesPage';
import { ResearchPage } from './pages/ResearchPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isLoadingScreen, currentTab, theme } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Render the current view according to active tab
  const renderCurrentView = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'analyze':
        return <AnalyzeFormulationPage />;
      case 'processing':
        return <ProcessingPage />;
      case 'results':
        return <ResultsPage />;
      case 'detailed':
        return <DetailedAnalysisPage />;
      case 'ask-ai':
        return <AskAIPage />;
      case 'evidence':
        return <EvidenceLibraryPage />;
      case 'analyses':
        return <MyAnalysesPage />;
      case 'research':
        return <ResearchPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen relative font-sans selection:bg-[#8E241C] selection:text-[#FFF7EC] ${
      isDark 
        ? 'bg-[#1A0B07] text-[#F5E8D2]' 
        : 'bg-[#F9F4EB] text-[#2B1A14]'
    }`}>
      {/* 1. Full-screen Loading Sequence */}
      <LoadingScreen />

      {/* 2. Main Workspace Layout */}
      <div className="flex min-h-screen">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/50 md:hidden backdrop-blur-xs"
          />
        )}

        {/* Persistent Dark Wood Navigation Sidebar */}
        <Sidebar 
          mobileOpen={mobileSidebarOpen} 
          onCloseMobile={() => setMobileSidebarOpen(false)} 
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-parchment-pattern">
          {/* Top Header */}
          <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          {/* Main Active Page Body */}
          <main className="flex-1 overflow-x-hidden">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* 3. Persistent Floating AI Assistant */}
      <FloatingChatbot />

      {/* 4. Credentials & Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

