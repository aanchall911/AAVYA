import React from 'react';
import { Globe, RefreshCw, Smartphone, Phone, MessageSquare, Shield } from 'lucide-react';
import { ChatbotChannel } from './ChatbotChannel';
import { IvrsChannel } from './IvrsChannel';
import { SmsChannel } from './SmsChannel';
import { MobileAppChannel } from './MobileAppChannel';
import { useApp } from '../../context/AppContext';

export const VictimChannels: React.FC = () => {
  const { language, setLanguage, selectedCase } = useApp();

  return (
    <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 space-y-4">
      
      {/* Column Title matching screenshot */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-blue-900 tracking-tight flex items-center gap-1.5">
              <span>Victim Interaction (Multilingual)</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Multiple channels for periodic check-ins
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs font-semibold">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded transition ${
                language === 'hi'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded transition ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Eng
            </button>
          </div>
        </div>

        {/* Selected victim quick indicator */}
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Simulating for: <strong>{selectedCase.name}</strong> ({selectedCase.id})</span>
          </span>
          <span className="font-mono text-blue-700 font-medium">Distress: {selectedCase.currentDistressScore}/100</span>
        </div>
      </div>

      {/* 1. Chatbot (Mobile/Web) */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          1. Chatbot (Mobile/Web)
        </h3>
        <ChatbotChannel />
      </div>

      {/* 2. IVRS Call (Voice Interaction) */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          2. IVRS Call (Voice Interaction)
        </h3>
        <IvrsChannel />
      </div>

      {/* 3. SMS Check-in (Example) */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          3. SMS Check-in (Example)
        </h3>
        <SmsChannel />
      </div>

      {/* 4. Mobile App Home (Victim View) */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          4. Mobile App Home (Victim View)
        </h3>
        <MobileAppChannel />
      </div>

    </div>
  );
};
