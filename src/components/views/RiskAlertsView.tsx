import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Siren, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RiskAlertsView: React.FC = () => {
  const { alerts, markAlertRead, setSelectedCaseById, setIsSosModalOpen, setIsAssignModalOpen, setActiveNavTab } = useApp();

  const handleAction = (alertId: string, caseId: string, actionType: 'profile' | 'sos' | 'assign') => {
    markAlertRead(alertId);
    setSelectedCaseById(caseId);
    if (actionType === 'sos') {
      setIsSosModalOpen(true);
    } else if (actionType === 'assign') {
      setIsAssignModalOpen(true);
    } else {
      setActiveNavTab('Dashboard');
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Real-Time Distress & Threat Alerts Console</span>
          </h2>
          <p className="text-xs text-slate-500">Live AI audio/text telemetry stream from IVRS, Chatbot & SMS channels</p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Alerts Stream */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const isCritical = alert.riskTag === 'Critical SOS' || alert.riskTag === 'Just: HIGH';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                alert.unread
                  ? isCritical
                    ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-400'
                    : 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCritical ? 'bg-rose-600 text-white animate-bounce' : 'bg-amber-500 text-white'
                  }`}>
                    {isCritical ? <Siren className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-800">{alert.caseId}</span>
                      <span className="font-bold text-sm text-slate-900">{alert.victimName}</span>
                      <span className="text-xs text-slate-500">({alert.district})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isCritical ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {alert.riskTag} • Score: {alert.score}/100
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium mt-1">
                      {alert.triggerReason}
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Triggered: {alert.timestamp}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'assign')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assign</span>
                  </button>

                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'sos')}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <Siren className="w-3.5 h-3.5" />
                    <span>SOS Dispatch</span>
                  </button>

                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'profile')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
                  >
                    View Dossier
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
