import React, { useState } from 'react';
import { Settings, Shield, Link2, Bell, Cpu, Save, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { setActiveNavTab, showToast } = useApp();
  const [nhaaEndpoint, setNhaaEndpoint] = useState('https://api.nhaa.gov.in/v2/integration/14566');
  const [highRiskThreshold, setHighRiskThreshold] = useState(70);
  const [moderateThreshold, setModerateThreshold] = useState(40);
  const [autoSosDispatch, setAutoSosDispatch] = useState(true);

  const handleSave = () => {
    showToast('System configuration & helpline 14566 integration settings saved.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <span>System Settings & Gateway Parameters</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure risk thresholds, helpline dispatch protocols, and notification triggers
          </p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6 text-xs">
        
        {/* Integration */}
        <div className="space-y-2">
          <label className="font-bold text-sm text-slate-900 block">
            National Helpline (14566) Integration Endpoint
          </label>
          <input
            type="text"
            value={nhaaEndpoint}
            onChange={(e) => setNhaaEndpoint(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Thresholds */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">Distress Score Risk Thresholds</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-lg">
              <label className="font-bold text-rose-900 block mb-1">High Distress Cutoff: {highRiskThreshold} / 100</label>
              <input
                type="range"
                min="50"
                max="90"
                value={highRiskThreshold}
                onChange={(e) => setHighRiskThreshold(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <span className="text-[11px] text-rose-700 mt-1 block">Scores at or above {highRiskThreshold} create urgent alerts.</span>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg">
              <label className="font-bold text-amber-900 block mb-1">Moderate Distress Cutoff: {moderateThreshold} / 100</label>
              <input
                type="range"
                min="20"
                max="60"
                value={moderateThreshold}
                onChange={(e) => setModerateThreshold(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-[11px] text-amber-700 mt-1 block">Scores {moderateThreshold} to {highRiskThreshold - 1} schedule routine check-in.</span>
            </div>
          </div>
        </div>

        {/* Auto Dispatch */}
        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSosDispatch}
              onChange={(e) => setAutoSosDispatch(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <div>
              <span className="font-bold text-slate-800 block text-xs">Enable Automatic SOS Dispatch on Critical Threat Keypress (9)</span>
              <span className="text-slate-500 text-[11px]">Directly forward incident ticket to district emergency response.</span>
            </div>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </div>

    </div>
  );
};
