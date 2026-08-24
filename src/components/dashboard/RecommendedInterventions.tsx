import React from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  Scale, 
  CreditCard, 
  Clock, 
  ChevronRight,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecommendedInterventions: React.FC = () => {
  const { selectedCase, setIsAssignModalOpen } = useApp();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Counselling':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'Protection':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'Legal':
        return <Scale className="w-4 h-4 text-amber-600" />;
      case 'Financial':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'Follow-up':
      default:
        return <Clock className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[300px]">
      
      {/* Header with Case Info matching Screenshot */}
      <div>
        <h3 className="text-xs font-bold text-slate-800 tracking-tight">
          Recommended Interventions
        </h3>
        
        <div className="flex items-center justify-between text-[11px] mt-1">
          <div className="text-slate-600 font-medium">
            CASE ID: <span className="font-mono text-blue-700 font-bold">{selectedCase.id}</span> | <strong>{selectedCase.name}</strong>
          </div>
          <div className="text-rose-600 font-bold">
            Distress Score: {selectedCase.currentDistressScore} ({selectedCase.riskLevel})
          </div>
        </div>
      </div>

      {/* Recommended Items List (5 items) */}
      <div className="space-y-1.5 my-auto overflow-y-auto pr-1">
        {selectedCase.recommendedInterventions.slice(0, 5).map((item) => (
          <div
            key={item.id}
            onClick={() => setIsAssignModalOpen(true)}
            className="p-2 bg-slate-50 hover:bg-blue-50/60 border border-slate-150 rounded-lg flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0">
                {getIcon(item.category)}
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition leading-tight">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {item.priority}
                </div>
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
          </div>
        ))}
      </div>

      {/* CTA Button: Assign to Counsellor (Matches Screenshot) */}
      <button
        onClick={() => setIsAssignModalOpen(true)}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs active:scale-98 cursor-pointer"
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span>Assign to Counsellor</span>
      </button>

    </div>
  );
};
