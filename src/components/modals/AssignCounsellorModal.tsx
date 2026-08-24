import React, { useState } from 'react';
import { X, UserCheck, Calendar, Clock, ShieldCheck, Check, Sparkles, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const AssignCounsellorModal: React.FC = () => {
  const { 
    isAssignModalOpen, 
    setIsAssignModalOpen, 
    selectedCase, 
    counsellors, 
    addInterventionToCase,
    showToast
  } = useApp();

  const [selectedCounsellorId, setSelectedCounsellorId] = useState(counsellors?.[0]?.id || '');
  const [interventionTitle, setInterventionTitle] = useState('Immediate Psychological First Aid & Trauma Support');
  const [priority, setPriority] = useState<'High Priority' | 'Medium Priority'>('High Priority');
  const [category, setCategory] = useState<'Counselling' | 'Protection' | 'Legal' | 'Financial'>('Counselling');
  const [scheduledTime, setScheduledTime] = useState('Today, 03:00 PM (Emergency Slot)');
  const [notifyPolice, setNotifyPolice] = useState(true);
  const [sendSmsVictim, setSendSmsVictim] = useState(true);

  if (!isAssignModalOpen) return null;

  const handleConfirmAssign = () => {
    const counsellor = counsellors.find((c) => c.id === selectedCounsellorId);
    
    addInterventionToCase(selectedCase.id, {
      id: `int-${Date.now()}`,
      title: interventionTitle,
      priority: priority,
      category: category,
      status: 'In Progress',
      assignedTo: counsellor?.name || 'Nodal Specialist',
      dueDate: scheduledTime
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsAssignModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-blue-900 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Assign Intervention & Counsellor</h3>
              <p className="text-[11px] text-blue-200">
                Case ID: {selectedCase.id} • {selectedCase.name} ({selectedCase.district})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAssignModalOpen(false)}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-5 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          
          {/* Intervention Title & Priority */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Intervention Action</label>
            <input
              type="text"
              value={interventionTitle}
              onChange={(e) => setInterventionTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-semibold"
              >
                <option value="High Priority">High Priority (Urgent)</option>
                <option value="Medium Priority">Medium Priority</option>
                <option value="Low Priority">Low Priority (Routine)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="Counselling">Psychosocial Counselling</option>
                <option value="Protection">Physical Protection & Escort</option>
                <option value="Legal">Free Legal Aid (DLSA)</option>
                <option value="Financial">Victim Compensation Scheme</option>
              </select>
            </div>
          </div>

          {/* Counsellor Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Select Certified Nodal Counsellor</label>
            <div className="grid grid-cols-1 gap-2">
              {counsellors.map((c) => {
                const isSelected = selectedCounsellorId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCounsellorId(c.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{c.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                            ★ {c.rating}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{c.specialty}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Active Cases: {c.activeCases} • Zone: {c.district}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.availability === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.availability}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schedule Time Slot */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Session / Dispatch Schedule</label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Notification toggles */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyPolice}
                onChange={(e) => setNotifyPolice(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">
                Dispatch Real-time Alert to Local Police Station (DSP Devendra Singh)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendSmsVictim}
                onChange={(e) => setSendSmsVictim(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">
                Send SMS & IVRS Confirmation to Victim ({selectedCase.phone})
              </span>
            </label>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            onClick={() => setIsAssignModalOpen(false)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAssign}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Dispatch</span>
          </button>
        </div>

      </div>
    </div>
  );
};
