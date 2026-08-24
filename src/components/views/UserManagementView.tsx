import React from 'react';
import { Users, UserPlus, Shield, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserManagementView: React.FC = () => {
  const { setActiveNavTab, showToast } = useApp();

  const users = [
    { name: 'Dr. Alok Verma, IAS', role: 'District Nodal Officer', district: 'Kaushambi & Prayagraj', email: 'nodal.kaushambi@up.gov.in', phone: '+91 94544 00001', status: 'Active' },
    { name: 'DSP Devendra Singh', role: 'Police Liaison Officer', district: 'Kaushambi District Police', email: 'dsp.crime.kaushambi@uppolice.gov.in', phone: '+91 94544 00100', status: 'Active' },
    { name: 'Dr. Priya Sharma', role: 'Lead Clinical Counsellor', district: 'Nodal Trauma Centre', email: 'priya.sharma@nhaa.org.in', phone: '+91 98765 00012', status: 'Active' },
    { name: 'Smt. Vandana Mishra', role: 'One-Stop Centre (Sakhi) Lead', district: 'Varanasi', email: 'sakhi.varanasi@wcd.gov.in', phone: '+91 97654 00034', status: 'Active' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-[1600px] mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Nodal Officers & Stakeholder Access Management</span>
          </h2>
          <p className="text-xs text-slate-500">Manage role-based access control (RBAC) across police, judiciary, medical and counselling teams</p>
        </div>

        <button
          onClick={() => setActiveNavTab('Dashboard')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Official Name</th>
              <th className="px-4 py-3">System Role</th>
              <th className="px-4 py-3">Jurisdiction / Unit</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-bold text-slate-900">{u.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-100 text-blue-800">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{u.district}</td>
                <td className="px-4 py-3 text-slate-500">
                  <div>{u.email}</div>
                  <div className="font-mono text-[10px] text-slate-400">{u.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{u.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
