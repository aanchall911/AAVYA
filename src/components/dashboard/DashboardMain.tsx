import React from 'react';
import { Lock } from 'lucide-react';
import { StatCards } from './StatCards';
import { OverallDistressGauge } from './OverallDistressGauge';
import { DistressTrendChart } from './DistressTrendChart';
import { HighRiskAlerts } from './HighRiskAlerts';
import { RiskDistributionChart } from './RiskDistributionChart';
import { TopRiskFactors } from './TopRiskFactors';
import { RecommendedInterventions } from './RecommendedInterventions';
import { CaseDetailsView } from './CaseDetailsView';

export const DashboardMain: React.FC = () => {
  return (
    <div className="space-y-4 p-4 lg:p-5 max-w-[1600px] mx-auto">
      
      {/* 1. Top Metrics Cards Row */}
      <StatCards />

      {/* 2. Middle Row: Gauge, 30D Trend Chart, High Risk Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <OverallDistressGauge />
        <DistressTrendChart />
        <HighRiskAlerts />
      </div>

      {/* 3. Next Row: Risk Distribution Donut, Top Risk Factors Bars, Recommended Interventions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <RiskDistributionChart />
        <TopRiskFactors />
        <RecommendedInterventions />
      </div>

      {/* 4. Bottom Detailed Case View (Selected Case) */}
      <CaseDetailsView />

      {/* 5. Footer matching Screenshot */}
      <footer className="py-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-200 mt-6 font-medium">
        <Lock className="w-3.5 h-3.5 text-slate-400" />
        <span>All data encrypted and role-based access controlled | Privacy & confidentiality ensured</span>
      </footer>

    </div>
  );
};
