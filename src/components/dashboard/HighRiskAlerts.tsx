import React from 'react';
import { User, ChevronRight, AlertCircle, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HighRiskAlerts: React.FC = () => {
  const { cases, selectedCase, setSelectedCaseById, setActiveNavTab } = useApp();

  // Filter high risk cases or take top 5
  const highRiskList = cases.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[280px]">
      
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Priority Distress Queue</span>
          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
        </h3>
        
        <button
          onClick={() => setActiveNavTab('Risk Alerts')}
          className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline transition cursor-pointer"
        >
          View All ({cases.length})
        </button>
      </div>

      {/* Real-time Alerts List */}
      <div className="space-y-1.5 my-auto overflow-y-auto pr-1">
        {highRiskList.map((item, idx) => {
          const isSelected = selectedCase.id === item.id;
          const isFirst = idx === 0;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedCaseById(item.id)}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-300 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 border-slate-150 hover:border-slate-300'
              }`}
            >
              {/* Left Profile icon & Details */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isSelected ? 'bg-rose-100 text-rose-800 font-bold border border-rose-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                </div>

                <div className="leading-tight">
                  <div className="text-[10px] text-slate-500 font-mono font-medium">
                    CASE REF: {item.id}
                  </div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      Score: <strong className="text-rose-700 font-bold">{item.currentDistressScore}/100</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Badge & Chevron */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isFirst
                      ? 'bg-rose-700 text-white font-semibold'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {isFirst ? 'CRITICAL' : 'HIGH RISK'}
                </span>
                
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
