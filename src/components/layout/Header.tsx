import React from 'react';
import { 
  Shield, 
  Link2,
  PhoneCall,
  LayoutDashboard,
  Smartphone,
  Layers,
  AlertTriangle,
  Radio,
  Building2,
  Lock,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { viewMode, setViewMode, setIsSosModalOpen, language, setLanguage } = useApp();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      
      {/* Top Official National Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 lg:px-6 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Government of India • Ministry of Women & Child Development</span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">Department of Justice & National Human Rights Authority</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span>National Helpline: <strong className="text-white font-mono">14566 / 112</strong></span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                language === 'hi' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                language === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Main Title & Institutional Insignia */}
          <div className="flex items-center gap-3">
            {/* National Insignia / Seal Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 text-white flex items-center justify-center font-serif text-lg font-black shadow-xs shrink-0 border border-blue-800">
              आ
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>AAVYA (आव्या)</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  National Victim Well-being Grid
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Live Telemetry</span>
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600">
                AI-Assisted Victim Well-being & Assessment • District Nodal Operations Console
              </p>
            </div>
          </div>

          {/* Institutional Status & Integration Grid */}
          <div className="hidden 2xl:flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Zone: <strong>Kaushambi & Prayagraj</strong></span>
            </div>
            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Security: <strong>AES-256 / Role-Based Access</strong></span>
            </div>
          </div>

          {/* Right Action & Portal Controls */}
          <div className="flex items-center gap-2.5 flex-wrap justify-between lg:justify-end">
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setViewMode('full')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'full' 
                    ? 'bg-white text-blue-900 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Show Multichannel Interactions + Nodal Dashboard side-by-side"
              >
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">Combined View</span>
              </button>

              <button
                onClick={() => setViewMode('dashboard')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'dashboard' 
                    ? 'bg-white text-blue-900 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Focus on District Nodal Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-700" />
                <span>Nodal Dashboard</span>
              </button>

              <button
                onClick={() => setViewMode('victim')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'victim' 
                    ? 'bg-white text-blue-900 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Focus on Multichannel Victim Check-ins"
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-700" />
                <span>Victim Channels</span>
              </button>
            </div>

            {/* Emergency SOS Dispatch */}
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-98"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Emergency SOS</span>
            </button>

            {/* NHAA 14566 Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs">
              <Link2 className="w-3.5 h-3.5 text-blue-800" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-500 font-medium">Gateway Sync</span>
                <span className="text-[11px] text-slate-900 font-bold">NHAA 14566</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
