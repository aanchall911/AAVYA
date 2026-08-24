import React from 'react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const TopRiskFactors: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[300px]">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 tracking-tight">
          Top Risk Factors (Overall)
        </h3>
        <span className="text-[10px] text-slate-400 font-medium">Statewide Avg</span>
      </div>

      {/* 5 Risk Factors with Horizontal Progress Bars (Matches Screenshot) */}
      <div className="space-y-3 my-auto">
        {SYSTEM_METRICS.riskFactors.map((rf) => (
          <div key={rf.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">{rf.name}</span>
              <span className="font-bold text-slate-900 font-mono">{rf.percentage}%</span>
            </div>

            {/* Horizontal Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${rf.color}`}
                style={{ width: `${rf.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span>Dynamic NLP Threat Corpus</span>
        <span>Updated 5m ago</span>
      </div>

    </div>
  );
};
