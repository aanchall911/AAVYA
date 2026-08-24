import React from 'react';
import { UserCheck, Star, PhoneCall, Calendar, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounsellorPanelView: React.FC = () => {
  const { counsellors, setActiveNavTab, setIsAssignModalOpen, showToast } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <span>Clinical Counsellors & Support Specialists</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Psychologists, trauma counselors, and legal aid officers available for tele-consultation ({counsellors.length} active)
          </p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition self-start sm:self-auto"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Counsellors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {counsellors.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold">
                      ★ {c.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{c.specialty}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Zone: {c.district}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                c.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {c.availability}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg">
              <div>
                <span className="text-slate-400 block text-[11px]">Languages</span>
                <span className="font-semibold text-slate-800">{c.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Active Cases</span>
                <span className="font-bold text-slate-900">{c.activeCases} Assigned</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => showToast(`Initiating tele-counselling session with ${c.name}...`)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Counsellor</span>
              </button>

              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                Assign Case
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
