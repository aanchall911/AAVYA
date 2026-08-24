import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink,
  User,
  HeartHandshake,
  Calendar,
  FileText,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaseDetailsView: React.FC = () => {
  const { selectedCase, setIsProfileModalOpen, setIsAssignModalOpen, setActiveNavTab } = useApp();
  const [activeTab, setActiveTab] = useState<'timeline' | 'interventions' | 'notes' | 'interactions'>('timeline');

  const tabs = [
    { id: 'timeline' as const, label: 'Well-being Progression' },
    { id: 'interventions' as const, label: 'Interventions & Action Plan' },
    { id: 'notes' as const, label: 'Counsellor Notes' },
    { id: 'interactions' as const, label: 'Check-in History' }
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
      
      {/* Top Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-900">
              Selected Victim Case: {selectedCase.name}
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                selectedCase.riskLevel === 'High'
                  ? 'bg-rose-100 text-rose-700'
                  : selectedCase.riskLevel === 'Moderate'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {selectedCase.riskLevel} Distress ({selectedCase.currentDistressScore}/100)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
            <span>Case ID: <strong className="font-mono text-slate-800">{selectedCase.id}</strong></span>
            <span>•</span>
            <span>Age/Gender: <strong>{selectedCase.age} Y / {selectedCase.gender}</strong></span>
            <span>•</span>
            <span>District: <strong>{selectedCase.district}</strong></span>
            <span>•</span>
            <span>Registered: <strong>{selectedCase.registeredDate}</strong></span>
            <span>•</span>
            <span>Status: <strong className="text-slate-800">{selectedCase.status}</strong></span>
          </div>
        </div>

        {/* View Profile & Test Channel Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNavTab('Victim Check-ins')}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition"
          >
            Open Live Check-in
          </button>

          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="px-3 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1"
          >
            <span>Full Profile</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-semibold border-b-2 transition ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content: Progression */}
      {activeTab === 'timeline' && (
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {(selectedCase?.distressTimeline || []).slice(-6).map((item, idx) => {
              const isHigh = item.level === 'High';
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-center ${
                    isHigh ? 'bg-rose-50/50 border-rose-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-[11px] text-slate-500 font-medium">{item.date}</div>
                  <div className={`text-base font-bold mt-0.5 ${isHigh ? 'text-rose-600' : 'text-slate-800'}`}>
                    {item.score} / 100
                  </div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${isHigh ? 'text-rose-700' : 'text-slate-600'}`}>
                    {item.level} Risk
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
            <span>Escalation Trend: <strong className="text-slate-900">{selectedCase.escalationTrend}</strong></span>
            <span>Last Note: <em>"{selectedCase?.distressTimeline?.[selectedCase.distressTimeline?.length - 1]?.note || 'Routine check-in conducted'}"</em></span>
          </div>
        </div>
      )}

      {/* Tab Content: Interventions */}
      {activeTab === 'interventions' && (
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Assigned Action Items</span>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Intervention</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(selectedCase?.recommendedInterventions || []).map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-slate-500 mt-0.5">
                    Assigned to: <strong>{item.assignedTo || 'Clinical Counsellor'}</strong> • Due: {item.dueDate || 'Immediate'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Notes */}
      {activeTab === 'notes' && (
        <div className="pt-2 space-y-2.5">
          {(selectedCase?.notes || []).map((n, i) => (
            <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>{n.author} ({n.role})</span>
                <span className="text-slate-400 font-normal">{n.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Interactions History */}
      {activeTab === 'interactions' && (
        <div className="pt-2 space-y-2">
          {(selectedCase?.interactions || []).map((ix) => (
            <div key={ix.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{ix.channel} Check-in</div>
                <p className="text-slate-600 mt-0.5">{ix.summary}</p>
                <div className="text-[10px] text-slate-400 mt-1">{ix.timestamp}</div>
              </div>
              <span className="px-2 py-1 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                Score: {ix.distressScore}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
