import React from 'react';
import { AlertTriangle, Siren, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Priority Distress Alerts</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Active alerts and distress escalations requiring officer attention ({alerts.length} total)
          </p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition self-start sm:self-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const isCritical = alert.riskTag === 'Critical SOS' || alert.riskTag === 'Just: HIGH';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                alert.unread
                  ? isCritical
                    ? 'bg-rose-50/60 border-rose-200 shadow-xs'
                    : 'bg-amber-50/60 border-amber-200 shadow-xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isCritical ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {isCritical ? <Siren className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">{alert.victimName}</span>
                      <span className="font-mono text-xs text-slate-500 font-normal">({alert.caseId})</span>
                      <span className="text-xs text-slate-500">• {alert.district}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Score: {alert.score}/100
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium mt-1">
                      Reason: {alert.triggerReason}
                    </p>

                    <div className="text-[11px] text-slate-400 mt-1">
                      Reported: {alert.timestamp}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'assign')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assign</span>
                  </button>

                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'sos')}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                  >
                    <Siren className="w-3.5 h-3.5" />
                    <span>Emergency SOS</span>
                  </button>

                  <button
                    onClick={() => handleAction(alert.id, alert.caseId, 'profile')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition"
                  >
                    Review Dossier
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
