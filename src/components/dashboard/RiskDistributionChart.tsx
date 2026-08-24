import React from 'react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const RiskDistributionChart: React.FC = () => {
  const { low, moderate, high } = SYSTEM_METRICS.distressBreakdown;

  // SVG Donut Chart Calculation
  // Low: 49.5%, Moderate: 32.9%, High: 17.6%
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89

  const lowDash = (low.percentage / 100) * circumference;
  const modDash = (moderate.percentage / 100) * circumference;
  const highDash = (high.percentage / 100) * circumference;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[300px]">
      
      {/* Title */}
      <h3 className="text-xs font-bold text-slate-800 tracking-tight">
        Risk Distribution
      </h3>

      {/* SVG Donut Chart with Labels */}
      <div className="flex items-center justify-center gap-4 my-auto">
        
        {/* Donut Graphic */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Low slice (Green) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#10b981"
              strokeWidth="18"
              strokeDasharray={`${lowDash} ${circumference}`}
              strokeDashoffset="0"
            />
            {/* Moderate slice (Orange) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="18"
              strokeDasharray={`${modDash} ${circumference}`}
              strokeDashoffset={-lowDash}
            />
            {/* High slice (Red) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="18"
              strokeDasharray={`${highDash} ${circumference}`}
              strokeDashoffset={-(lowDash + modDash)}
            />
          </svg>

          {/* Percentage Labels Inside Donut Arc matching Screenshot */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xs font-bold text-slate-800">49.5%</span>
            <span className="text-[9px] text-slate-400 font-medium">Low</span>
          </div>
        </div>

        {/* Legend List with Counts matching Screenshot */}
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span>Low</span>
            </div>
            <div className="text-[11px] text-slate-500 pl-4 font-mono">
              {low.count} ({low.percentage}%)
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span>Moderate</span>
            </div>
            <div className="text-[11px] text-slate-500 pl-4 font-mono">
              {moderate.count} ({moderate.percentage}%)
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              <span>High</span>
            </div>
            <div className="text-[11px] text-slate-500 pl-4 font-mono">
              {high.count} ({high.percentage}%)
            </div>
          </div>
        </div>

      </div>

      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center font-medium">
        Calculated from 18,743 active victim dossiers
      </div>

    </div>
  );
};
