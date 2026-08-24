import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  AlertTriangle, 
  FileText, 
  HeartHandshake, 
  TrendingUp, 
  UserCheck, 
  Users, 
  Settings, 
  HelpCircle, 
  Link2,
  ShieldCheck,
  Building,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const { activeNavTab, setActiveNavTab, unreadAlertsCount } = useApp();

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'Active Cases', label: 'Active Cases', icon: FolderKanban, badge: null },
    { id: 'Risk Alerts', label: 'Risk Alerts', icon: AlertTriangle, badge: '24', badgeColor: 'bg-rose-600 text-white' },
    { id: 'Case Management', label: 'Case Management', icon: FileText, badge: null },
    { id: 'Interventions', label: 'Interventions', icon: HeartHandshake, badge: null },
    { id: 'Reports & Analytics', label: 'Reports & Analytics', icon: TrendingUp, badge: null },
    { id: 'Counsellor Panel', label: 'Counsellor Panel', icon: UserCheck, badge: null },
    { id: 'User Management', label: 'User Management', icon: Users, badge: null },
    { id: 'System Settings', label: 'System Settings', icon: Settings, badge: null },
    { id: 'Help & Support', label: 'Help & Support', icon: HelpCircle, badge: null }
  ];

  return (
    <aside className="w-56 lg:w-60 bg-slate-900 text-slate-200 flex flex-col justify-between shrink-0 shadow-lg select-none border-r border-slate-800">
      
      {/* Top Brand Area */}
      <div>
        <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-xs border border-blue-600">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wider">AAVYA PORTAL</span>
              <span className="text-[10px] text-slate-400 font-medium">District Nodal Terminal</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNavTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.badgeColor || 'bg-blue-600 text-white'}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Integration Footer Card */}
      <div className="p-3 border-t border-slate-800">
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
          <div className="flex items-center gap-2 text-slate-300 mb-1">
            <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[10px] font-medium text-slate-400">Integrated Gateway</span>
          </div>
          <div className="font-semibold text-white text-xs leading-tight">
            NHAA 14566 / 112 ERSS
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Gateway Online</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
