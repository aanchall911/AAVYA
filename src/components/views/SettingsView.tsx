import React, { useState } from 'react';
import { Settings, Shield, Link2, Bell, Cpu, Save, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { setActiveNavTab, showToast } = useApp();
  const [nhaaEndpoint, setNhaaEndpoint] = useState('https://api.nhaa.gov.in/v2/integration/14566');
  const [highRiskThreshold, setHighRiskThreshold] = useState(70);
  const [moderateThreshold, setModerateThreshold] = useState(40);
  const [autoSosDispatch, setAutoSosDispatch] = useState(true);
  const [audioAcousticAnalysis, setAudioAcousticAnalysis] = useState(true);

  const handleSave = () => {
    showToast('System configuration & NHAA 14566 sync settings saved.');
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1200px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <span>System Settings & NHAA (14566) Gateway</span>
          </h2>
          <p className="text-xs text-slate-500">Configure AI distress algorithms, telephony gateways & data security rules</p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-5 text-xs">
        
        {/* Integration */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <Link2 className="w-4 h-4 text-blue-600" />
            <span>NHAA (14566) Central Integration Gateway</span>
          </div>
          <p className="text-slate-500">National Human Rights / Victim Assistance Helpline endpoint</p>
          <input
            type="text"
            value={nhaaEndpoint}
            onChange={(e) => setNhaaEndpoint(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800 text-xs"
          />
        </div>

        {/* AI Thresholds */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>AI Distress & Threat Scoring Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-lg">
              <label className="font-bold text-rose-900 block mb-1">High Risk Threshold (Current: {highRiskThreshold}/100)</label>
              <input
                type="range"
                min="50"
                max="90"
                value={highRiskThreshold}
                onChange={(e) => setHighRiskThreshold(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <span className="text-[10px] text-rose-700 mt-1 block">Scores above {highRiskThreshold} automatically notify District Nodal Officer.</span>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
              <label className="font-bold text-amber-900 block mb-1">Moderate Risk Threshold (Current: {moderateThreshold}/100)</label>
              <input
                type="range"
                min="20"
                max="60"
                value={moderateThreshold}
                onChange={(e) => setModerateThreshold(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <span className="text-[10px] text-amber-700 mt-1 block">Scores {moderateThreshold} - {highRiskThreshold - 1} trigger counsellor follow-up.</span>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSosDispatch}
              onChange={(e) => setAutoSosDispatch(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <span className="font-bold text-slate-800 block">Auto-Dispatch for Critical Severity (Score {'>'} 95)</span>
              <span className="text-slate-500">Automatically broadcast emergency alert to police control room on explicit threat detection.</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={audioAcousticAnalysis}
              onChange={(e) => setAudioAcousticAnalysis(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <span className="font-bold text-slate-800 block">IVRS Acoustic Vocal Biomarker Analysis</span>
              <span className="text-slate-500">Analyze vocal frequency jitter, tremor, and pitch variance during voice check-ins.</span>
            </div>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </div>

    </div>
  );
};
