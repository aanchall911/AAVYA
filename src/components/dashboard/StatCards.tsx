import React from 'react';
import { 
  FolderKanban, 
  AlertTriangle, 
  UserCheck, 
  CheckCircle2,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { SYSTEM_METRICS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const StatCards: React.FC = () => {
  const { setActiveNavTab } = useApp();

  const stats = [
    {
      title: 'Total Active Cases',
      value: SYSTEM_METRICS.totalActiveCases,
      change: SYSTEM_METRICS.totalActiveCasesDiff,
      isPositive: true,
      icon: FolderKanban,
      color: 'bg-blue-50 text-blue-600',
      tab: 'Active Cases'
    },
    {
      title: 'High Distress Cases',
      value: SYSTEM_METRICS.highRiskCases,
      change: SYSTEM_METRICS.highRiskCasesDiff,
      isPositive: false,
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600',
      tab: 'Risk Alerts'
    },
    {
      title: 'Active Counselling Sessions',
      value: SYSTEM_METRICS.counsellingSessions,
      change: SYSTEM_METRICS.counsellingSessionsDiff,
      isPositive: true,
      icon: UserCheck,
      color: 'bg-indigo-50 text-indigo-600',
      tab: 'Counsellor Panel'
    },
    {
      title: 'Moderate Risk Cases',
      value: SYSTEM_METRICS.moderateRiskCases,
      change: SYSTEM_METRICS.moderateRiskCasesDiff,
      isPositive: true,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
      tab: 'Reports & Analytics'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            onClick={() => setActiveNavTab(stat.tab)}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </div>
              </div>

              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={stat.isPositive ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                {stat.change}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
