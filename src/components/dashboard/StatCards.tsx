import React from 'react';
import { 
  FolderKanban, 
  ShieldAlert, 
  AlertTriangle, 
  UserCheck, 
  Calendar,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      
      {/* 1. Total Active Cases */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">Total Active Cases</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            {SYSTEM_METRICS.totalActiveCases}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{SYSTEM_METRICS.totalActiveCasesDiff}</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center shrink-0">
          <FolderKanban className="w-5 h-5" />
        </div>
      </div>

      {/* 2. High Risk Cases */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">High Risk Cases</span>
          <div className="text-2xl font-bold text-rose-600 mt-1 tracking-tight">
            {SYSTEM_METRICS.highRiskCases}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 mt-1">
            <span>↑ 8% from last week</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Moderate Risk Cases */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">Moderate Risk Cases</span>
          <div className="text-2xl font-bold text-amber-600 mt-1 tracking-tight">
            {SYSTEM_METRICS.moderateRiskCases}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 mt-1">
            <span>↑ 5% from last week</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Counselling Sessions */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">Counselling Sessions</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tracking-tight">
            {SYSTEM_METRICS.counsellingSessions}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <span>↑ 15% from last week</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      {/* 5. Date Range Selector Card matching screenshot */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-slate-300 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Date Range:</span>
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-xs font-bold text-slate-800 mt-2">
          01 May 2024 - 07 May 2024
        </div>
        <div className="text-[10px] text-blue-600 font-medium mt-1">
          Last 7 Days (Customizable)
        </div>
      </div>

    </div>
  );
};
