import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card } from '../components/ui';

export const StoresPage: React.FC = () => {
  const { stores, products } = useInventory();
  const storeTotals = (storeId: string) => products.reduce((sum,p)=> sum + (p.stockByStore[storeId]||0),0);
  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map(s => (
          <Card key={s.id} className="p-4">
            <div className="font-bold">{s.name}</div>
            <div className="text-xs text-slate-500">الموقع: {s.location} • الهاتف: {s.phone}</div>
            <div className="mt-2 text-sm">إجمالي القطع: <span className="font-bold">{storeTotals(s.id)}</span></div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};
