import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Clock, ShieldCheck, Scale, HeartHandshake, UserPlus, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InterventionsView: React.FC = () => {
  const { cases, setIsAssignModalOpen, setSelectedCaseById, setActiveNavTab } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');

  const allInterventions = cases.flatMap((c) =>
    c.recommendedInterventions.map((int) => ({
      ...int,
      caseId: c.id,
      victimName: c.name,
      district: c.district
    }))
  );

  const filtered = filterCategory === 'All' 
    ? allInterventions 
    : allInterventions.filter((i) => i.category === filterCategory);

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Active Interventions & Rehabilitation Matrix</span>
          </h2>
          <p className="text-xs text-slate-500">Tracking assigned clinical, legal, physical protection & welfare interventions</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNavTab('Dashboard')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Counselling', 'Protection', 'Legal', 'Financial', 'Follow-up'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap cursor-pointer ${
              filterCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interventions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-blue-700">{item.caseId}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.priority === 'High Priority' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.priority}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Victim: <strong>{item.victimName}</strong> ({item.district})</p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned To:</span>
                <span className="font-semibold text-slate-800">{item.assignedTo || 'Nodal Team'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Schedule:</span>
                <span className="font-semibold text-slate-800">{item.dueDate || 'Immediate'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Status:</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  item.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCaseById(item.caseId);
                setIsAssignModalOpen(true);
              }}
              className="w-full py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-xs font-semibold text-slate-700 transition"
            >
              Reassign or Update
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
