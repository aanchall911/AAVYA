import React from 'react';
import { User, ChevronRight, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HighRiskAlerts: React.FC = () => {
  const { cases, selectedCase, setSelectedCaseById, setActiveNavTab, setIsProfileModalOpen } = useApp();

  // High risk cases
  const highRiskList = cases.filter((c) => c.currentDistressScore >= 70).slice(0, 4);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>High Priority Attention</span>
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Victims reporting critical distress</p>
        </div>
        
        <button
          onClick={() => setActiveNavTab('Risk Alerts')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Real-time Alerts List */}
      <div className="space-y-2.5 my-4">
        {highRiskList.map((item) => {
          const isSelected = selectedCase.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedCaseById(item.id)}
              className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              {/* Left Profile icon & Details */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">({item.id})</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.district} • Escalation: <strong className="text-rose-600">{item.escalationTrend}</strong>
                  </div>
                </div>
              </div>

              {/* Right Distress Score & Action */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                  {item.currentDistressScore}/100
                </span>
                
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Click any victim above to review dossier below</span>
      </div>

    </div>
  );
};
