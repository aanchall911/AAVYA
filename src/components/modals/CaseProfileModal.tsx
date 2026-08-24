import React from 'react';
import { 
  X, 
  User, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Activity, 
  Brain, 
  Scale, 
  Download,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaseProfileModal: React.FC = () => {
  const { isProfileModalOpen, setIsProfileModalOpen, selectedCase, setIsAssignModalOpen, setIsSosModalOpen } = useApp();

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              {selectedCase.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{selectedCase.name}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500 text-white animate-pulse">
                  Risk: {selectedCase.riskLevel} ({selectedCase.currentDistressScore}/100)
                </span>
              </div>
              <p className="text-xs text-blue-200 font-mono mt-0.5">
                Case ID: {selectedCase.id} • NHAA Ref: {selectedCase.nhaaReferenceId}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 text-xs overflow-y-auto flex-1">
          
          {/* Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium block">Age & Gender</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                {selectedCase.age} Years / {selectedCase.gender}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Location</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{selectedCase.district}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Registered On</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                {selectedCase.registeredDate}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Case Status</span>
              <span className="inline-block font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px] mt-0.5">
                {selectedCase.status}
              </span>
            </div>
          </div>

          {/* Assigned Officials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-[11px] font-bold text-blue-900 block mb-1">Assigned Police Nodal Officer</span>
              <div className="font-semibold text-slate-800">{selectedCase.assignedOfficer}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Contact: +91 94544 00100 (DSP Hotline)</div>
            </div>

            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
              <span className="text-[11px] font-bold text-purple-900 block mb-1">Lead Clinical Counsellor</span>
              <div className="font-semibold text-slate-800">{selectedCase.assignedCounsellor || 'Dr. Priya Sharma'}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Nodal Hospital Trauma Centre</div>
            </div>
          </div>

          {/* AI Threat & Acoustic Biomarker Report */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs">AI Early Warning & Psycho-Acoustic Analysis</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[10px] font-bold">
                Confidence: {selectedCase.aiAnalysis.threatConfidence}%
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              {selectedCase.aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block font-medium mb-1">Detected Emotional Vectors</span>
                <div className="space-y-1 font-mono text-cyan-300">
                  {selectedCase.aiAnalysis.primaryEmotions.map((em, i) => (
                    <div key={i}>• {em}</div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 block font-medium mb-1">Acoustic Biomarkers</span>
                <div className="space-y-1 font-mono text-amber-300">
                  {selectedCase.aiAnalysis.acousticBiomarkers.map((ac, i) => (
                    <div key={i}>• {ac}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Risk Factors breakdown */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs">Assessed Vulnerability & Threat Factors</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCase.topRiskFactors.map((rf, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-medium text-slate-700">{rf.factor}</span>
                  <span className="font-bold text-rose-600 font-mono">{rf.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              setIsProfileModalOpen(false);
              setIsSosModalOpen(true);
            }}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Police SOS</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsAssignModalOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Assign Counsellor</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
