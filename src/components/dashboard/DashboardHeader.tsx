import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  ChevronDown, 
  User, 
  Shield, 
  Globe, 
  Check,
  LogOut,
  Sliders,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
  const { 
    language, 
    setLanguage, 
    currentRole, 
    setCurrentRole, 
    unreadAlertsCount, 
    setActiveNavTab,
    activeNavTab
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const roles = [
    'District Nodal Officer',
    'Senior Clinical Counsellor',
    'Police Liaison SPOC',
    'State Crisis Coordinator'
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs">
      
      {/* Left: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition lg:hidden cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-base lg:text-lg font-bold text-slate-900 tracking-tight">
          {activeNavTab}
        </h2>
      </div>

      {/* Right Controls: Language, Notification Bell, User Profile */}
      <div className="flex items-center gap-3">
        
        {/* Language Dropdown (हिंदी ⌄ in screenshot) */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition cursor-pointer"
          >
            <span>{language === 'hi' ? 'हिंदी' : 'English'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs">
              <button
                onClick={() => { setLanguage('hi'); setIsLangOpen(false); }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center justify-between font-medium text-slate-700"
              >
                <span>हिंदी</span>
                {language === 'hi' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
              <button
                onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center justify-between font-medium text-slate-700"
              >
                <span>English</span>
                {language === 'en' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell with Badge '12' (Matches Screenshot) */}
        <div className="relative">
          <button
            onClick={() => setActiveNavTab('Risk Alerts')}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition relative cursor-pointer"
            title="View Real-Time Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
              12
            </span>
          </button>
        </div>

        {/* User Profile Dropdown ('District Nodal Officer ⌄' in screenshot) */}
        <div className="relative">
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-lg transition cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
              {currentRole}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isRoleOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <div className="font-bold text-slate-900">Dr. A. Verma, IAS</div>
                <div className="text-[11px] text-slate-500">Kaushambi & Prayagraj Zone</div>
              </div>

              <div className="py-1">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => { setCurrentRole(role); setIsRoleOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center justify-between text-slate-700 font-medium"
                  >
                    <span>{role}</span>
                    {currentRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
