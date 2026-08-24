import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  CheckCircle, 
  Check, 
  Send,
  Siren
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SosEmergencyModal: React.FC = () => {
  const { isSosModalOpen, setIsSosModalOpen, selectedCase, triggerSosAlert, showToast } = useApp();
  const [selectedUnits, setSelectedUnits] = useState<string[]>(['pcr', '181', 'nhaa']);
  const [sosNote, setSosNote] = useState('Victim reported imminent threat / intimidation outside premises. Immediate escort required.');
  const [dispatched, setDispatched] = useState(false);

  if (!isSosModalOpen) return null;

  const toggleUnit = (id: string) => {
    if (selectedUnits.includes(id)) {
      setSelectedUnits(selectedUnits.filter(u => u !== id));
    } else {
      setSelectedUnits([...selectedUnits, id]);
    }
  };

  const handleDispatch = () => {
    triggerSosAlert(selectedCase.id, `Manual SOS Dispatch: ${sosNote}`);
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      setIsSosModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border-2 border-rose-500 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with authoritative emergency styling */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-700 border border-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                <span>EMERGENCY SOS DISPATCH</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-rose-900 text-rose-200 border border-rose-700 rounded font-mono">112 ERSS</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Target: {selectedCase.name} ({selectedCase.id}) • {selectedCase.district}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSosModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          
          {dispatched ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">SOS Units Dispatched Successfully!</h4>
              <p className="text-slate-600 text-xs max-w-sm mx-auto">
                Police Beat Officer & One-Stop Center team notified. Live GPS coordinates and case dossier transmitted to Emergency Response Vehicle.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-900">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Geo-Coordinates: Kaushambi Sector 4 (UP)</span>
                </div>
                <p className="text-[11px] text-rose-700">
                  Last verified victim contact: {selectedCase.phone}. Automated IVRS fallback protocol is engaged.
                </p>
              </div>

              {/* Units selection */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 block">Select Units for Immediate Broadcast</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'pcr', name: 'Local Police Station (112 Mobile Patrol Van)', time: 'ETA: 7-10 Mins', icon: ShieldAlert },
                    { id: '181', name: 'Women Helpline 181 Rapid Response Cell', time: 'Immediate Tele-Support', icon: PhoneCall },
                    { id: 'nhaa', name: 'NHAA National Helpline (14566) High Priority Queue', time: 'Live Coordination', icon: Radio },
                    { id: 'counsellor', name: 'Emergency On-Call Clinical Psychologist', time: 'Immediate Video/Audio', icon: Siren }
                  ].map((unit) => {
                    const isChecked = selectedUnits.includes(unit.id);
                    const Icon = unit.icon;
                    return (
                      <div
                        key={unit.id}
                        onClick={() => toggleUnit(unit.id)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                          isChecked ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-400' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isChecked ? 'text-rose-600' : 'text-slate-400'}`} />
                          <div>
                            <div className="font-bold text-slate-800">{unit.name}</div>
                            <div className="text-[10px] text-slate-500">{unit.time}</div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SOS Note */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Emergency Dispatch Brief</label>
                <textarea
                  value={sosNote}
                  onChange={(e) => setSosNote(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        {!dispatched && (
          <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setIsSosModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs shadow-md transition flex items-center gap-1.5 animate-pulse"
            >
              <Siren className="w-4 h-4" />
              <span>Broadcast SOS Now</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
