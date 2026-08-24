import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Clock, Scale, UserPlus, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InterventionsView: React.FC = () => {
  const { cases, setIsAssignModalOpen, setSelectedCaseById, setActiveNavTab } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');

  const allInterventions = (cases || []).flatMap((c) =>
    (c?.recommendedInterventions || []).map((int) => ({
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-blue-600" />
            <span>Assigned Interventions & Care Plans</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Active clinical, legal aid, protection, and welfare assignments ({filtered.length} total)
          </p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition self-start sm:self-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Counselling', 'Protection', 'Legal', 'Financial', 'Follow-up'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              filterCategory === cat
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interventions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-500">{item.caseId}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  item.priority === 'High Priority' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.priority}
                </span>
              </div>

              <h4 className="font-bold text-base text-slate-900 mt-1.5">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Victim: <strong>{item.victimName}</strong> ({item.district})</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned To:</span>
                <span className="font-semibold text-slate-800">{item.assignedTo || 'Nodal Team'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Schedule:</span>
                <span className="font-semibold text-slate-800">{item.dueDate || 'Immediate'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
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
              className="w-full py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-xs font-semibold text-slate-700 transition border border-slate-200"
            >
              Reassign / Update Plan
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
