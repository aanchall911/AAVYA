import React from 'react';
import { UserCheck, Star, Calendar, PhoneCall, Clock, Check, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CounsellorPanelView: React.FC = () => {
  const { counsellors, setActiveNavTab, setIsAssignModalOpen, showToast } = useApp();

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <span>Nodal Clinical Counsellors & Tele-Therapy Panel</span>
          </h2>
          <p className="text-xs text-slate-500">Certified psychologists, trauma specialists & emergency psychosocial responders</p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counsellors.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-100 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      ★ {c.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{c.specialty}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Zone: {c.district}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                c.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {c.availability}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-150">
              <div>
                <span className="text-slate-400 block text-[10px]">Languages</span>
                <span className="font-semibold text-slate-800">{c.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Active Dossiers</span>
                <span className="font-bold text-blue-700">{c.activeCases} Victims</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => showToast(`Initiating secure tele-counselling session with ${c.name}...`)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Start Direct Call</span>
              </button>

              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
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
