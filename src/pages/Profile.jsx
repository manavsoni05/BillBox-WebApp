import React from 'react';
import useUserStore from '../store/userStore';
import { 
  User, 
  Mail, 
  Shield, 
  CreditCard, 
  Bell, 
  ChevronRight, 
  Camera, 
  LogOut,
  Edit2,
  Trash2,
  Zap,
  Globe,
  Settings
} from 'lucide-react';
import { logout } from '../services/authService';

const Profile = () => {
  const { user } = useUserStore();

  const settingsGroups = [
    {
      title: 'Security & Access',
      items: [
        { name: 'Password & Authentication', icon: Shield, desc: 'Manage your login credentials' },
        { name: 'Devices & Sessions', icon: Globe, desc: 'View where you are signed in' },
      ]
    },
    {
      title: 'Subscription & Billing',
      items: [
        { name: 'Plan Management', icon: Zap, desc: 'Current: Professional Annual', color: 'text-primary' },
        { name: 'Payment Methods', icon: CreditCard, desc: 'Visa ending in 4242' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { name: 'Notification Center', icon: Bell, desc: 'Email, Push and Desktop alerts' },
        { name: 'Interface Theme', icon: Settings, desc: 'Custom light / dark configurations' },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden card bg-linear-to-br from-surface-container-highest to-surface-container-low p-0 border-none shadow-2xl group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-[2000ms] group-hover:scale-150" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-10 sm:p-14">
            <div className="relative group/avatar">
               <div className="w-44 h-44 rounded-[42px] overflow-hidden shadow-2xl ring-8 ring-white/50 bg-white transform transition-transform group-hover/avatar:scale-105 duration-500">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                       <User size={80} className="text-primary/30" />
                    </div>
                  )}
               </div>
               <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all ring-4 ring-white">
                  <Camera size={20} />
               </button>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
               <div>
                  <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter leading-none mb-3">
                     {user?.displayName || 'Financial Architect'}
                  </h1>
                  <p className="text-on-surface-variant font-bold text-xl flex items-center justify-center md:justify-start gap-4">
                     <Mail size={22} className="text-primary/60" /> {user?.email || 'user@billbox.com'}
                  </p>
               </div>
               
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <button className="btn-primary h-12 px-8 font-bold flex items-center gap-2 shadow-xl shadow-primary/20">
                     <Edit2 size={18} /> Update Profile
                  </button>
                  <button onClick={logout} className="h-12 px-8 bg-error/5 text-error rounded-xl font-bold flex items-center gap-2 hover:bg-error/10 transition-colors">
                     <LogOut size={18} /> Sign Out
                  </button>
               </div>
            </div>
            
            <div className="flex flex-col gap-4 min-w-64 bg-white/20 backdrop-blur-md p-8 rounded-[32px] border border-outline-variant/10 shadow-inner">
               <div className="space-y-1">
                  <p className="text-on-surface-variant/50 font-bold text-xs uppercase tracking-widest leading-none">Subscription Status</p>
                  <p className="text-2xl font-extrabold text-on-surface tracking-tight">Active Plan</p>
               </div>
               <div className="space-y-4">
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-2/3 shadow-sm rounded-full" />
                  </div>
                  <p className="text-sm font-medium text-on-surface-variant">25 / 100 receipts used this month</p>
                  <button className="text-primary font-bold text-sm hover:underline flex items-center gap-2 group">
                      Manage Plan <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {settingsGroups.map((group, idx) => (
           <div key={idx} className="card shadow-xl p-0 overflow-hidden border border-outline-variant/5 hover:shadow-2xl transition-shadow duration-500">
              <div className="px-10 py-8 bg-surface-container-low/50 border-b border-outline-variant/10">
                 <h2 className="text-2xl font-extrabold text-on-surface tracking-tight uppercase text-sm tracking-[0.2em] opacity-60">{group.title}</h2>
              </div>
              <div className="divide-y divide-outline-variant/10">
                 {group.items.map((item, i) => (
                   <button key={i} className="w-full text-left px-10 py-8 flex items-center justify-between group hover:bg-surface-container-low transition-colors duration-300">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 bg-surface rounded-2xl flex items-center justify-center ring-2 ring-outline-variant/5 group-hover:ring-primary/20 group-hover:bg-primary/5 transition-all shadow-sm ${item.color || ''}`}>
                            <item.icon size={26} />
                         </div>
                         <div>
                            <p className="text-lg font-extrabold text-on-surface tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{item.name}</p>
                            <p className="text-on-surface-variant font-medium text-sm">{item.desc}</p>
                         </div>
                      </div>
                      <ChevronRight size={20} className="text-on-surface-variant/30 group-hover:text-primary transition-all group-hover:translate-x-1" />
                   </button>
                 ))}
              </div>
           </div>
         ))}

         {/* Dangerous Actions */}
         <div className="card shadow-xl p-0 overflow-hidden border border-error/10 bg-error/5 hover:bg-error/10 transition-colors duration-500 cursor-default">
            <div className="px-10 py-8 border-b border-error/10">
               <h2 className="text-2xl font-extrabold text-error tracking-tight uppercase text-sm tracking-[0.2em]">Danger Zone</h2>
            </div>
            <div className="p-10 flex flex-col sm:flex-row items-center justify-between gap-8">
               <div className="space-y-2">
                  <p className="text-lg font-extrabold text-error tracking-tight leading-none">Delete Account Permanently</p>
                  <p className="text-error/60 font-medium text-sm">All receipt history and financial data will be permanently purged from our servers.</p>
               </div>
               <button className="flex items-center gap-3 px-8 py-3.5 bg-error text-white font-bold rounded-xl shadow-xl shadow-error/20 hover:scale-105 active:scale-95 transition-all">
                  <Trash2 size={20} /> Purge Records
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;
