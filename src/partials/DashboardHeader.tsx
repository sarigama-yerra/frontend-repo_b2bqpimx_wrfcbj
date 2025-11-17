import React from 'react';
import { Bell, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { alerts } = useInventory();
  const unread = alerts.length;
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-3 p-3">
        <div className="flex-1">
          <div className="relative">
            <input className="w-full rounded-md border px-10 py-2 bg-slate-50 focus:bg-white outline-none" placeholder="ابحث عن منتج أو فرع"/>
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18}/>
          </div>
        </div>
        <button className="relative rounded-full p-2 hover:bg-slate-100" title="التنبيهات">
          <Bell size={20}/>
          {unread>0 && (<span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs px-1">{unread}</span>)}
        </button>
        <div className="text-sm text-slate-600">مرحباً، {user?.name}</div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 hover:bg-slate-50"><LogOut size={16}/> خروج</button>
      </div>
    </header>
  );
};
