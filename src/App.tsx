import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { VictimChannels } from './components/victim/VictimChannels';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
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
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeNavTab, viewMode, toastMessage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeNavTab) {
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
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. Global Header with SAKSHAM Branding, AI Pills & NHAA Integration */}
      <Header />

      {/* 2. Main Content Body with Split View (Victim Channels + Nodal Dashboard) */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-3 lg:p-4">
        
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          
          {/* Left Column: Victim Interaction (Multilingual) - Multiple channels */}
          {(viewMode === 'full' || viewMode === 'victim') && (
            <div className={`w-full ${viewMode === 'victim' ? 'max-w-2xl mx-auto' : 'lg:w-[360px] xl:w-[380px]'} shrink-0`}>
              <VictimChannels />
            </div>
          )}

          {/* Right Main Dashboard / Administrative Console */}
          {(viewMode === 'full' || viewMode === 'dashboard') && (
            <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex min-h-[calc(100vh-120px)]">
              
              {/* Desktop Sidebar Navigation */}
              <div className="hidden md:flex">
                <Sidebar />
              </div>

              {/* Mobile Sidebar Drawer */}
              {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                  <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
                    onClick={() => setMobileSidebarOpen(false)} 
                  />
                  <div className="relative z-10 w-64 h-full bg-slate-900 shadow-2xl">
                    <Sidebar />
                  </div>
                </div>
              )}

              {/* Dashboard Content Container */}
              <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50/50">
                <DashboardHeader onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
                <div className="flex-1">
                  {renderActiveView()}
                </div>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Interactive Modals */}
      <AssignCounsellorModal />
      <CaseProfileModal />
      <SosEmergencyModal />
      <SelfAssessmentModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200 max-w-md">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium leading-tight flex-1">{toastMessage}</p>
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
