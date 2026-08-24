import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  PhoneCall, 
  Bell, 
  User, 
  ChevronDown, 
  Check, 
  Menu, 
  X,
  LayoutDashboard,
  MessageSquare,
  Users,
  HeartHandshake,
  TrendingUp,
  FolderKanban
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    activeNavTab, 
    setActiveNavTab, 
    language, 
    setLanguage, 
    unreadAlertsCount, 
    setIsSosModalOpen,
    currentRole,
    setCurrentRole
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Victim Check-ins', label: 'Victim Check-ins', icon: MessageSquare },
    { id: 'Active Cases', label: 'Cases', icon: FolderKanban },
    { id: 'Risk Alerts', label: 'Risk Alerts', icon: AlertTriangle, badge: unreadAlertsCount > 0 ? unreadAlertsCount : null },
    { id: 'Interventions', label: 'Interventions', icon: HeartHandshake },
    { id: 'Counsellor Panel', label: 'Counsellors', icon: Users },
    { id: 'Reports & Analytics', label: 'Reports', icon: TrendingUp },
  ];

  const roles = [
    'District Nodal Officer',
    'Senior Clinical Counsellor',
    'Police Liaison SPOC',
    'State Crisis Coordinator'
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => setActiveNavTab('Dashboard')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-slate-900 tracking-tight">AAVYA</span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    Helpline 14566
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-normal">
                  Victim Well-being & Support
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNavTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNavTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-rose-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-medium rounded transition cursor-pointer ${
                  language === 'hi' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium rounded transition cursor-pointer ${
                  language === 'en' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ENG
              </button>
            </div>

            {/* Emergency SOS Button */}
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Emergency SOS</span>
            </button>

            {/* Role Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition border border-slate-200 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                  N
                </div>
                <span>{currentRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Role
                  </div>
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role);
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700 font-medium"
                    >
                      <span>{role}</span>
                      {currentRole === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNavTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-rose-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
};
