import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  History, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Download,
  Mic,
  Brain,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaseDetailsView: React.FC = () => {
  const { selectedCase, setIsProfileModalOpen, setIsAssignModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'timeline' | 'ai' | 'interactions' | 'interventions' | 'documents'>('timeline');

  const tabs = [
    { id: 'timeline' as const, label: 'Distress Timeline' },
    { id: 'ai' as const, label: 'AI Analysis Summary' },
    { id: 'interactions' as const, label: 'Interactions History' },
    { id: 'interventions' as const, label: 'Interventions & Notes' },
    { id: 'documents' as const, label: 'Documents' }
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
      
      {/* Top Metadata Header Row matching Screenshot */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-xs font-bold text-slate-800 tracking-tight mb-1.5">
            Case Details (Selected Case)
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 font-medium">Case ID: </span>
              <strong className="font-mono text-blue-700">{selectedCase.id}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-medium">Name: </span>
              <strong>{selectedCase.name}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-medium">Age / Gender: </span>
              <strong>{selectedCase.age} / {selectedCase.gender}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-medium">District: </span>
              <strong>{selectedCase.district}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-medium">Case Registered On: </span>
              <strong>{selectedCase.registeredDate}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-medium">Case Status: </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {selectedCase.status}
              </span>
            </div>
          </div>
        </div>

        {/* View Full Profile CTA */}
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="px-3 py-1.5 border border-slate-300 hover:border-blue-500 hover:text-blue-700 rounded-lg text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 self-start lg:self-center shrink-0 cursor-pointer shadow-2xs"
        >
          <span>View Full Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Tab Navigation Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-t-lg font-semibold transition border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Distress Timeline (Matches Screenshot 6-Day progression) */}
      {activeTab === 'timeline' && (
        <div className="pt-2 space-y-4">
          
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2">
            {selectedCase.distressTimeline.slice(-6).map((item, idx, arr) => {
              const isHigh = item.level === 'High';
              const isLast = idx === arr.length - 1;

              return (
                <React.Fragment key={idx}>
                  <div
                    className={`flex-1 min-w-[120px] p-2.5 rounded-lg border text-center transition ${
                      isHigh
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    <div className="text-[11px] text-slate-500 font-medium">
                      {item.date}
                    </div>
                    <div
                      className={`text-sm font-extrabold mt-0.5 ${
                        isHigh ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      Score: {item.score}
                    </div>
                    <div
                      className={`text-[10px] font-semibold mt-0.5 ${
                        isHigh ? 'text-rose-700' : 'text-amber-700'
                      }`}
                    >
                      {item.level}
                    </div>
                  </div>

                  {!isLast && (
                    <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 mx-0.5" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Escalation Trend Label matching Screenshot */}
          <div className="text-center text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5">
            <span>Escalation Trend:</span>
            <span className="flex items-center gap-1">
              <span>{selectedCase.escalationTrend}</span>
              <span className="text-sm">↗</span>
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: AI Analysis Summary */}
      {activeTab === 'ai' && (
        <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>Multi-Modal NLP & Acoustic Engine</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {selectedCase.aiAnalysis.summary}
            </p>
            <div className="flex items-center gap-2 pt-1 font-semibold text-indigo-700">
              <span>Threat Confidence Index:</span>
              <span className="font-mono bg-indigo-100 px-2 py-0.5 rounded text-indigo-900">
                {selectedCase.aiAnalysis.threatConfidence}%
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-blue-600" />
              <span>Acoustic Voice Biomarkers</span>
            </div>
            <ul className="space-y-1 text-slate-600">
              {selectedCase.aiAnalysis.acousticBiomarkers.map((bio, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>{bio}</span>
                </li>
              ))}
            </ul>

            <div className="pt-1 flex flex-wrap gap-1">
              {selectedCase.aiAnalysis.keyFlags.map((flag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                  {flag}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Interactions History */}
      {activeTab === 'interactions' && (
        <div className="pt-2 space-y-2 text-xs">
          {selectedCase.interactions.length > 0 ? (
            selectedCase.interactions.map((ix) => (
              <div key={ix.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{ix.channel} Interaction</span>
                    <span className="text-slate-400 font-mono text-[10px]">{ix.timestamp}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                      {ix.sentiment} ({ix.distressScore}/100)
                    </span>
                  </div>
                  <p className="text-slate-600">{ix.summary}</p>
                </div>
                <div className="flex flex-wrap gap-1 shrink-0">
                  {ix.flaggedKeywords.map((kw, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-mono">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-slate-400 italic">
              No recent automated channel logs for this case file.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Interventions & Notes */}
      {activeTab === 'interventions' && (
        <div className="pt-2 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Assigned Interventions</span>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              + Add Intervention
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedCase.recommendedInterventions.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">{item.title}</div>
                  <div className="text-[10px] text-slate-500">
                    Assigned: {item.assignedTo || 'Unassigned'} • Due: {item.dueDate || 'ASAP'}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {selectedCase.notes.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Officer & Clinical Notes</span>
              {selectedCase.notes.map((n, i) => (
                <div key={i} className="p-2 bg-blue-50/50 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between font-medium text-slate-800 mb-0.5">
                    <span>{n.author} ({n.role})</span>
                    <span className="text-slate-400 text-[10px]">{n.date}</span>
                  </div>
                  <p className="text-slate-600">{n.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Documents */}
      {activeTab === 'documents' && (
        <div className="pt-2 space-y-2 text-xs">
          {selectedCase.documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCase.documents.map((doc) => (
                <div key={doc.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800 truncate max-w-[220px]">{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{doc.date} • {doc.size}</div>
                    </div>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-blue-600 rounded transition">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 italic">
              No attached FIR or court documents for this case record.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
