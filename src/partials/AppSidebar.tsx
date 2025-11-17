import React from 'react';
import { NavLink } from 'react-router-dom';
import { Boxes, Home, LineChart, Package, Settings, Store, History } from 'lucide-react';
import { Badge } from '../components/ui';
import { useInventory } from '../context/InventoryContext';

export const AppSidebar: React.FC = () => {
  const { alerts } = useInventory();
  const lowCount = alerts.filter(a => a.type !== 'OVERSTOCK').length;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between gap-3 px-4 py-2 rounded-md hover:bg-slate-100 ${isActive ? 'bg-slate-100 font-semibold' : ''}`;

  return (
    <aside className="hidden md:block w-72 border-e bg-white p-4 space-y-2">
      <div className="px-2 py-3 font-extrabold text-xl">إدارة المخزون</div>
      <nav className="space-y-1">
        <NavLink to="/dashboard" className={linkClass}><span className="flex items-center gap-3"><Home size={18}/> لوحة التحكم</span></NavLink>
        <NavLink to="/products" className={linkClass}><span className="flex items-center gap-3"><Package size={18}/> المنتجات</span>{lowCount>0 && <Badge className="bg-red-50 text-red-700 border-red-200">{lowCount}</Badge>}</NavLink>
        <NavLink to="/stores" className={linkClass}><span className="flex items-center gap-3"><Store size={18}/> الفروع</span></NavLink>
        <NavLink to="/sales" className={linkClass}><span className="flex items-center gap-3"><Boxes size={18}/> المبيعات</span></NavLink>
        <NavLink to="/reports" className={linkClass}><span className="flex items-center gap-3"><LineChart size={18}/> التقارير</span></NavLink>
        <NavLink to="/settings" className={linkClass}><span className="flex items-center gap-3"><Settings size={18}/> الإعدادات</span></NavLink>
        <NavLink to="/history" className={linkClass}><span className="flex items-center gap-3"><History size={18}/> سجل المبيعات</span></NavLink>
      </nav>
    </aside>
  );
};
