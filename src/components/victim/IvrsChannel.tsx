import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, Volume2, Grid, VolumeX, ShieldAlert, PhoneCall, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IvrsChannel: React.FC = () => {
  const { updateCaseScore, triggerSosAlert, showToast, selectedCase } = useApp();
  const [callActive, setCallActive] = useState(true);
  const [callSeconds, setCallSeconds] = useState(74);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (digit: string) => {
    setLastKeyPressed(digit);
    if (digit === '1') {
      showToast('IVRS Option 1: Recorded "Safe / Situation Normal"');
      updateCaseScore(selectedCase.id, -2, 'IVRS: Victim pressed 1 (Safe/Normal)');
    } else if (digit === '2') {
      showToast('IVRS Option 2: Callback Requested from Assigned Counsellor');
      updateCaseScore(selectedCase.id, 4, 'IVRS: Victim pressed 2 (Request Counsellor)');
    } else if (digit === '3') {
      showToast('IVRS Option 3: Immediate Threat / High Distress Alert Flagged');
      updateCaseScore(selectedCase.id, 8, 'IVRS: Victim pressed 3 (High Distress Reported)');
    } else if (digit === '9') {
      triggerSosAlert(selectedCase.id, 'IVRS Emergency SOS key (9) pressed by victim');
    }
  };

  const handleVoiceTest = () => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance('आप अपनी वर्तमान स्थिति बताएं या 1 दबाएं');
      utterance.lang = 'hi-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('Playing IVRS audio prompt...');
    }
  };

  const handleToggleCall = () => {
    if (callActive) {
      setCallActive(false);
      showToast('IVRS Call ended.');
    } else {
      setCallActive(true);
      setCallSeconds(0);
      showToast('IVRS Call connected to 14566 Gateway.');
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-2xs p-4 flex flex-col justify-between h-[280px] relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between z-10 border-b border-slate-800 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold tracking-wide text-white uppercase flex items-center gap-1.5">
              <span>AAVYA IVRS Gateway</span>
            </h4>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
              14566-EPABX
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
            {callActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Call ({formatTime(callSeconds)})</span>
              </>
            ) : (
              <span className="text-slate-500">Call Idle</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleVoiceTest}
            title="Listen to IVRS prompt"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition border border-slate-700 cursor-pointer"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-400' : ''}`} />
          </button>
          
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            title="Toggle DTMF Keypad"
            className={`p-1.5 rounded-lg text-xs font-semibold transition border cursor-pointer ${
              showKeypad ? 'bg-blue-700 border-blue-600 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle Audio Waveform or Keypad */}
      {!showKeypad ? (
        <div className="my-auto py-2 flex flex-col items-center justify-center text-center z-10">
          
          {callActive ? (
            <div className="flex items-center justify-center gap-1 h-10 w-full px-4">
              {[8, 14, 22, 34, 18, 28, 38, 24, 14, 30, 42, 20, 12, 26, 36, 22, 10, 18, 30, 16, 8].map((height, i) => (
                <span
                  key={i}
                  className="w-1 bg-slate-400 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.max(4, (height + (isSpeaking ? 16 : 0)))}px`
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-4 text-xs text-slate-500">Call is disconnected</div>
          )}

          <div className="mt-2 text-center">
            <p className="text-xs font-semibold text-slate-200">
              "कृपया अपनी स्थिति बताएं या 1 दबाएं"
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Press 1 for Safe | Press 2 for Counsellor | Press 3 for Distress
            </p>
          </div>
        </div>
      ) : (
        /* Interactive DTMF Keypad */
        <div className="my-auto py-1 z-10">
          <div className="grid grid-cols-4 gap-1.5 max-w-[240px] mx-auto text-center">
            {[
              { k: '1', label: 'सुरक्षित' },
              { k: '2', label: 'परामर्श' },
              { k: '3', label: 'संकट' },
              { k: '9', label: 'SOS 🚨' }
            ].map((btn) => (
              <button
                key={btn.k}
                onClick={() => handleKeyPress(btn.k)}
                className={`py-1.5 px-1 rounded-lg border flex flex-col items-center justify-center transition active:scale-95 cursor-pointer ${
                  btn.k === '9'
                    ? 'bg-rose-950/80 border-rose-700 text-rose-300 hover:bg-rose-900'
                    : btn.k === '3'
                    ? 'bg-amber-950/80 border-amber-700 text-amber-300 hover:bg-amber-900'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span className="text-sm font-bold font-mono">{btn.k}</span>
                <span className="text-[9px] font-medium opacity-80">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between z-10">
        <button
          onClick={handleToggleCall}
          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            callActive
              ? 'bg-rose-800 hover:bg-rose-900 text-white'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
          }`}
        >
          {callActive ? <PhoneOff className="w-3.5 h-3.5" /> : <PhoneCall className="w-3.5 h-3.5" />}
          <span>{callActive ? 'Disconnect' : 'Connect 14566'}</span>
        </button>

        <span className="text-[10px] text-slate-400 font-mono">
          Gateway: UP-WEST-01
        </span>
      </div>

    </div>
  );
};
