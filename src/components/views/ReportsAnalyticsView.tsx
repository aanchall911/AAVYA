import React from 'react';
import { TrendingUp, MapPin, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsAnalyticsView: React.FC = () => {
  const { setActiveNavTab, showToast } = useApp();

  const districtData = [
    { name: 'Kaushambi', total: '3,420', high: '412', mod: '980', responseTime: '8 mins', satisfaction: '94%' },
    { name: 'Prayagraj', total: '4,890', high: '395', mod: '1,420', responseTime: '12 mins', satisfaction: '91%' },
    { name: 'Varanasi', total: '3,120', high: '230', mod: '840', responseTime: '9 mins', satisfaction: '96%' },
    { name: 'Lucknow', total: '4,100', high: '145', mod: '720', responseTime: '15 mins', satisfaction: '89%' },
    { name: 'Kanpur Nagar', total: '3,213', high: '102', mod: '712', responseTime: '11 mins', satisfaction: '93%' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Statewide Analytics & Performance Reports</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            District-level metrics, response benchmarks, and intervention recovery rates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting Report (AAVYA-Report-May2024.pdf)...')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Summary</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Average Response Time</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">9.4 Minutes</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Faster than standard helpline</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Check-in Completion Rate</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">91.8%</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Across IVRS, Chat & SMS</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">De-escalation Success</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">87.3%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Victims stabilized to Low Risk</div>
        </div>
      </div>

      {/* District Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">District-Level Case Density & Response Summary</h3>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
            <tr>
              <th className="px-4 py-3.5">District</th>
              <th className="px-4 py-3.5">Total Active</th>
              <th className="px-4 py-3.5">High Distress</th>
              <th className="px-4 py-3.5">Moderate</th>
              <th className="px-4 py-3.5">Response Time</th>
              <th className="px-4 py-3.5">Resolution Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {districtData.map((d) => (
              <tr key={d.name} className="hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{d.name}</span>
                </td>
                <td className="px-4 py-3 font-medium">{d.total}</td>
                <td className="px-4 py-3 font-bold text-rose-600">{d.high}</td>
                <td className="px-4 py-3 text-amber-700 font-medium">{d.mod}</td>
                <td className="px-4 py-3 font-semibold text-slate-700">{d.responseTime}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">{d.satisfaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
