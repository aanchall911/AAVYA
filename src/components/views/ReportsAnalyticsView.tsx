import React from 'react';
import { TrendingUp, BarChart3, PieChart, MapPin, Download, CheckCircle2, Shield, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsAnalyticsView: React.FC = () => {
  const { setActiveNavTab, showToast } = useApp();

  const districtData = [
    { name: 'Kaushambi', total: 3420, high: 412, mod: 980, responseTime: '8 mins', satisfaction: '94%' },
    { name: 'Prayagraj', total: 4890, high: 395, mod: 1420, responseTime: '12 mins', satisfaction: '91%' },
    { name: 'Varanasi', total: 3120, high: 230, mod: 840, responseTime: '9 mins', satisfaction: '96%' },
    { name: 'Lucknow', total: 4100, high: 145, mod: 720, responseTime: '15 mins', satisfaction: '89%' },
    { name: 'Kanpur Nagar', total: 3213, high: 102, mod: 712, responseTime: '11 mins', satisfaction: '93%' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Statewide Analytics & AI Performance Reports</span>
          </h2>
          <p className="text-xs text-slate-500">Comprehensive district threat heatmaps, resolution benchmarks & AI accuracy</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting PDF Report (AAVYA-Distress-Report-May2024.pdf)...')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics Dossier</span>
          </button>
          <button
            onClick={() => setActiveNavTab('Dashboard')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Average SOS Dispatch Latency</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">9.4 Minutes</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">↓ 32% faster than standard helpline</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">AI Early Threat Prediction Accuracy</span>
          <div className="text-2xl font-bold text-indigo-700 mt-1">96.8%</div>
          <div className="text-xs text-indigo-600 font-semibold mt-1">Based on 14,200 multi-modal interactions</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Escalation De-escalation Success</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">87.3%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Victims transitioned from High ➔ Low risk</div>
        </div>
      </div>

      {/* District Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">District-Level Performance & Case Density</h3>
          <span className="text-xs text-slate-400 font-mono">Synced with NHAA (14566) Central Database</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Total Active Cases</th>
              <th className="px-4 py-3">High Risk Dossiers</th>
              <th className="px-4 py-3">Moderate</th>
              <th className="px-4 py-3">Avg Response ETA</th>
              <th className="px-4 py-3">Victim Safety Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {districtData.map((d) => (
              <tr key={d.name} className="hover:bg-slate-50/80 transition">
                <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{d.name}</span>
                </td>
                <td className="px-4 py-3 font-mono font-semibold">{d.total}</td>
                <td className="px-4 py-3 font-mono font-bold text-rose-600">{d.high}</td>
                <td className="px-4 py-3 font-mono text-amber-600">{d.mod}</td>
                <td className="px-4 py-3 font-semibold text-emerald-700">{d.responseTime}</td>
                <td className="px-4 py-3 font-bold text-blue-700">{d.satisfaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
