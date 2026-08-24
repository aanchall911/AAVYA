import React, { useState } from 'react';
import { Search, Filter, Eye, UserPlus, AlertTriangle, ArrowUpDown, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ActiveCasesView: React.FC = () => {
  const { cases, setSelectedCaseById, setActiveNavTab, setIsProfileModalOpen, setIsAssignModalOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  const filtered = cases.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === 'All' || c.district.includes(districtFilter);
    const matchesRisk = riskFilter === 'All' || c.riskLevel === riskFilter;
    return matchesSearch && matchesDistrict && matchesRisk;
  });

  const handleSelectAndProfile = (id: string) => {
    setSelectedCaseById(id);
    setIsProfileModalOpen(true);
  };

  const handleSelectAndAssign = (id: string) => {
    setSelectedCaseById(id);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Active Victim Cases Directory</h2>
          <p className="text-xs text-slate-500">Live monitoring & risk assessment dossiers ({filtered.length} matching)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNavTab('Dashboard')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Victim Name or Case ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Districts (UP Statewide)</option>
            <option value="Kaushambi">Kaushambi</option>
            <option value="Prayagraj">Prayagraj</option>
            <option value="Varanasi">Varanasi</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Kanpur">Kanpur Nagar</option>
          </select>
        </div>

        <div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Risk Categories</option>
            <option value="High">High Risk (70-100)</option>
            <option value="Moderate">Moderate Risk (40-69)</option>
            <option value="Low">Low Risk (0-39)</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-4 py-3">Case ID</th>
                <th className="px-4 py-3">Victim Name</th>
                <th className="px-4 py-3">Age / Gender</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Distress Score</th>
                <th className="px-4 py-3">Escalation</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const isHigh = c.riskLevel === 'High';
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">{c.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="px-4 py-3 text-slate-600">{c.age} / {c.gender}</td>
                    <td className="px-4 py-3 text-slate-600">{c.district}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isHigh ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.currentDistressScore}/100 ({c.riskLevel})
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-rose-600">
                      {c.escalationTrend} ↗
                    </td>
                    <td className="px-4 py-3 text-right space-x-1.5">
                      <button
                        onClick={() => handleSelectAndProfile(c.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold transition"
                        title="View Full Profile"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleSelectAndAssign(c.id)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
                        title="Assign Counsellor"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
