import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { VictimChannels } from './components/victim/VictimChannels';
import { DashboardMain } from './components/dashboard/DashboardMain';
import { ActiveCasesView } from './components/views/ActiveCasesView';
import { RiskAlertsView } from './components/views/RiskAlertsView';
import { InterventionsView } from './components/views/InterventionsView';
import { ReportsAnalyticsView } from './components/views/ReportsAnalyticsView';
import { CounsellorPanelView } from './components/views/CounsellorPanelView';
import { UserManagementView } from './components/views/UserManagementView';
import { SettingsView } from './components/views/SettingsView';
import { AssignCounsellorModal } from './components/modals/AssignCounsellorModal';
import { CaseProfileModal } from './components/modals/CaseProfileModal';
import { SosEmergencyModal } from './components/modals/SosEmergencyModal';
import { SelfAssessmentModal } from './components/modals/SelfAssessmentModal';
import { CheckCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeNavTab, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (activeNavTab) {
      case 'Victim Check-ins':
        return <VictimChannels />;
      case 'Active Cases':
      case 'Case Management':
        return <ActiveCasesView />;
      case 'Risk Alerts':
        return <RiskAlertsView />;
      case 'Interventions':
        return <InterventionsView />;
      case 'Reports & Analytics':
        return <ReportsAnalyticsView />;
      case 'Counsellor Panel':
        return <CounsellorPanelView />;
      case 'User Management':
        return <UserManagementView />;
      case 'System Settings':
      case 'Help & Support':
        return <SettingsView />;
      case 'Dashboard':
      default:
        return <DashboardMain />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* 1. Clean, Unified Top Navigation Header */}
      <Header />

      {/* 2. Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {renderActiveView()}
      </main>

      {/* 3. Interactive Modals */}
      <AssignCounsellorModal />
      <CaseProfileModal />
      <SosEmergencyModal />
      <SelfAssessmentModal />

      {/* 4. Simple Clean Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm max-w-md border border-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}

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
