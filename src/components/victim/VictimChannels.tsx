import React, { useState } from 'react';
import { 
  MessageSquare, 
  PhoneCall, 
  Smartphone, 
  MessageCircle, 
  User, 
  ShieldAlert, 
  HeartHandshake, 
  Calendar,
  AlertTriangle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ChatbotChannel } from './ChatbotChannel';
import { IvrsChannel } from './IvrsChannel';
import { SmsChannel } from './SmsChannel';
import { MobileAppChannel } from './MobileAppChannel';
import { useApp } from '../../context/AppContext';

export const VictimChannels: React.FC = () => {
  const { 
    selectedCase, 
    setSelectedCaseById, 
    cases, 
    language, 
    setIsAssignModalOpen,
    setIsSosModalOpen,
    setIsProfileModalOpen
  } = useApp();

  const [activeChannel, setActiveChannel] = useState<'chat' | 'ivrs' | 'sms' | 'app'>('chat');

  const channels = [
    { id: 'chat' as const, label: 'Web Chatbot', icon: MessageSquare, desc: 'Interactive chat check-in' },
    { id: 'ivrs' as const, label: 'Voice IVRS Call', icon: PhoneCall, desc: 'Automated 14566 voice prompt' },
    { id: 'sms' as const, label: 'SMS Check-in', icon: MessageCircle, desc: 'Quick number response gateway' },
    { id: 'app' as const, label: 'Mobile App', icon: Smartphone, desc: 'Victim self-service home' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Victim Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Victim Check-in & Outreach Channels
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Test and simulate interactive check-ins across multiple channels. Any victim responses update their well-being assessment in real time.
          </p>
        </div>

        {/* Victim Selection Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-500 shrink-0">Simulating For:</label>
          <select
            value={selectedCase.id}
            onChange={(e) => setSelectedCaseById(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id}) — Distress {c.currentDistressScore}/100
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Channel Navigation Segmented Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isActive = activeChannel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                isActive
                  ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900">{ch.label}</div>
                <div className="text-xs text-slate-500 truncate">{ch.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Channel Simulation Area (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Channel Interface */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-sm font-bold text-slate-800">
                Live Simulator: {channels.find((c) => c.id === activeChannel)?.label}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Language: {language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}
            </span>
          </div>

          <div className="max-w-lg mx-auto">
            {activeChannel === 'chat' && <ChatbotChannel />}
            {activeChannel === 'ivrs' && <IvrsChannel />}
            {activeChannel === 'sms' && <SmsChannel />}
            {activeChannel === 'app' && <MobileAppChannel />}
          </div>
        </div>

        {/* Right Column: Real-Time Victim Assessment Impact */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Victim Profile Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selectedCase.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{selectedCase.id} • {selectedCase.district}</p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedCase.riskLevel === 'High'
                    ? 'bg-rose-100 text-rose-700'
                    : selectedCase.riskLevel === 'Moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {selectedCase.riskLevel} Risk
              </span>
            </div>

            {/* Distress Score Progress */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-600">Current Distress Level</span>
                <span className="text-slate-900 font-bold font-mono">{selectedCase.currentDistressScore} / 100</span>
              </div>
              
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedCase.currentDistressScore >= 70
                      ? 'bg-rose-600'
                      : selectedCase.currentDistressScore >= 40
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedCase.currentDistressScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Trend: <strong className="text-slate-700">{selectedCase.escalationTrend}</strong> • Last interaction recorded today.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
              >
                Full Case Dossier
              </button>

              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
              >
                Assign Counsellor
              </button>
            </div>
          </div>

          {/* Key Risk Factors Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Identified Vulnerabilities & Factors
            </h4>
            
            <div className="space-y-2">
              {(selectedCase?.topRiskFactors || []).map((rf, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-medium text-slate-700">{rf.factor}</span>
                  <span className={`font-bold ${
                    rf.percentage >= 80 ? 'text-rose-600' : 'text-amber-600'
                  }`}>
                    {rf.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Emergency SOS Alert Card */}
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h5 className="text-xs font-bold text-rose-900">Need Immediate Police / Medical Assistance?</h5>
              <p className="text-[11px] text-rose-700 mt-0.5">Dispatch ERSS 112 directly to victim location</p>
            </div>
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shrink-0 transition"
            >
              Trigger SOS
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
