import React from 'react';
import { StatCards } from './StatCards';
import { OverallDistressGauge } from './OverallDistressGauge';
import { DistressTrendChart } from './DistressTrendChart';
import { HighRiskAlerts } from './HighRiskAlerts';
import { CaseDetailsView } from './CaseDetailsView';
import { ShieldCheck } from 'lucide-react';

export const DashboardMain: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* 1. Metric Overview Cards */}
      <StatCards />

      {/* 2. Middle Row: Distress Gauge, Trend Chart, Priority Alert Queue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <OverallDistressGauge />
        <DistressTrendChart />
        <HighRiskAlerts />
      </div>

      {/* 3. Selected Victim Case Dossier & Progression */}
      <CaseDetailsView />

      {/* 4. Simple, clean footer */}
      <footer className="py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>AAVYA National Helpline 14566 & 112 ERSS • All records encrypted and confidential</span>
      </footer>

    </div>
  );
};
