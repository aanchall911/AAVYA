import React, { useState } from 'react';
import { 
  Bell, 
  Activity, 
  MessageSquare, 
  UserCheck, 
  ShieldAlert, 
  Home, 
  BellRing, 
  HelpCircle, 
  User, 
  PhoneCall,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileAppChannel: React.FC = () => {
  const { setIsSelfAssessmentOpen, setIsSosModalOpen, showToast, selectedCase } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'updates' | 'support' | 'profile'>('home');

  const handleActionClick = (actionName: string) => {
    if (actionName === 'status') {
      setIsSelfAssessmentOpen(true);
    } else if (actionName === 'talk') {
      showToast('Connecting you with 24x7 Helpline Counsellor (+91 14566)...');
    } else if (actionName === 'counsellor') {
      showToast('Dr. Priya Sharma (Clinical Psychologist) notified for callback.');
    } else if (actionName === 'help') {
      setIsSosModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between h-[360px]">
      
      {/* Mobile App Top Bar */}
      <div className="bg-blue-900 px-3.5 py-2.5 flex items-center justify-between text-white shadow-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-blue-700 flex items-center justify-center font-bold text-xs tracking-wider">
            A
          </div>
          <span className="font-bold text-xs tracking-wide">AAVYA</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => showToast('No new notifications for Seema')}
            className="p-1 rounded-full hover:bg-blue-800 text-blue-200 hover:text-white transition relative"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Main Screen Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between overflow-y-auto">
        
        {/* Personalized Welcome Banner */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 mb-2">
          <h5 className="text-xs font-bold text-blue-950">
            नमस्ते {selectedCase.name.split(' ')[0]},
          </h5>
          <p className="text-[11px] text-blue-800 font-medium mt-0.5">
            हम आपकी मदद के लिए यहाँ हैं।
          </p>
        </div>

        {/* 2x2 Quick Action Cards (Matches Screenshot) */}
        <div className="grid grid-cols-2 gap-2 my-auto">
          
          {/* Card 1: अपनी स्थिति बताएं */}
          <button
            onClick={() => handleActionClick('status')}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl flex flex-col items-center justify-center text-center transition group active:scale-95 cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-emerald-950 leading-tight">
              अपनी स्थिति बताएं
            </span>
          </button>

          {/* Card 2: मैं बात करना चाहता/चाहती हूँ */}
          <button
            onClick={() => handleActionClick('talk')}
            className="p-2.5 bg-purple-50 hover:bg-purple-100/80 border border-purple-200/80 rounded-xl flex flex-col items-center justify-center text-center transition group active:scale-95 cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-purple-950 leading-tight">
              मैं बात करना चाहता/चाहती हूँ
            </span>
          </button>

          {/* Card 3: परामर्श से जुड़ें */}
          <button
            onClick={() => handleActionClick('counsellor')}
            className="p-2.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl flex flex-col items-center justify-center text-center transition group active:scale-95 cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-blue-950 leading-tight">
              परामर्श से जुड़ें
            </span>
          </button>

          {/* Card 4: सहायता सेवाएं */}
          <button
            onClick={() => handleActionClick('help')}
            className="p-2.5 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 rounded-xl flex flex-col items-center justify-center text-center transition group active:scale-95 cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-teal-950 leading-tight">
              सहायता सेवाएं
            </span>
          </button>

        </div>

      </div>

      {/* Mobile App Bottom Tab Bar (Matches Screenshot) */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 grid grid-cols-4 text-center">
        
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-0.5 text-[10px] font-medium transition ${
            activeTab === 'home' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-3.5 h-3.5 mb-0.5" />
          <span>होम</span>
        </button>

        <button
          onClick={() => setActiveTab('updates')}
          className={`flex flex-col items-center justify-center py-0.5 text-[10px] font-medium transition ${
            activeTab === 'updates' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BellRing className="w-3.5 h-3.5 mb-0.5" />
          <span>अपडेट्स</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex flex-col items-center justify-center py-0.5 text-[10px] font-medium transition ${
            activeTab === 'support' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 mb-0.5" />
          <span>सहायता</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-0.5 text-[10px] font-medium transition ${
            activeTab === 'profile' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5 mb-0.5" />
          <span>प्रोफ़ाइल</span>
        </button>

      </div>

    </div>
  );
};
