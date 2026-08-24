import React from 'react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const OverallDistressGauge: React.FC = () => {
  const score = SYSTEM_METRICS.averageDistressScore;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">District Distress Index</h3>
          <span className="text-xs text-slate-500 font-medium">All Districts</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Aggregated district-wide vulnerability score</p>
      </div>

      {/* Clean Modern Score Display */}
      <div className="my-6 flex items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {score}
            <span className="text-lg font-normal text-slate-400">/100</span>
          </div>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            Moderate Average
          </span>
        </div>

        {/* Minimal Circle Indicator */}
        <div className="w-24 h-24 rounded-full border-8 border-slate-100 border-t-amber-500 border-r-amber-500 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-600">62% Avg</span>
        </div>
      </div>

      {/* Clear Breakdown Bars */}
      <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Low Risk (0 - 39)
          </span>
          <span className="font-semibold text-slate-900">{SYSTEM_METRICS.distressBreakdown.low.count} ({SYSTEM_METRICS.distressBreakdown.low.percentage}%)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Moderate (40 - 69)
          </span>
          <span className="font-semibold text-slate-900">{SYSTEM_METRICS.distressBreakdown.moderate.count} ({SYSTEM_METRICS.distressBreakdown.moderate.percentage}%)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            High Priority (70 - 100)
          </span>
          <span className="font-semibold text-slate-900">{SYSTEM_METRICS.distressBreakdown.high.count} ({SYSTEM_METRICS.distressBreakdown.high.percentage}%)</span>
        </div>
      </div>
    </div>
  );
};
