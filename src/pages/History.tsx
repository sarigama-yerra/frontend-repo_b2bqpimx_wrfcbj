import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card } from '../components/ui';
import { format } from 'date-fns';

export const HistoryPage: React.FC = () => {
  const { sales, stores } = useInventory();
  return (
    <DashboardLayout>
      <Card className="p-4">
        <div className="font-bold mb-3">سجل المبيعات</div>
        <div className="space-y-2">
          {sales.map(s => (
            <div key={s.id} className="rounded-md border p-3 bg-white">
              <div className="text-sm text-slate-500">{format(new Date(s.createdAt), 'yyyy-MM-dd HH:mm')}</div>
              <div className="font-semibold">الفرع: {stores.find(st=>st.id===s.storeId)?.name}</div>
              <div className="text-sm">الإجمالي: {s.total.toFixed(2)} {s.currency}</div>
            </div>
          ))}
          {sales.length===0 && <div className="text-center text-slate-500">لا توجد عمليات بيع</div>}
        </div>
      </Card>
    </DashboardLayout>
  );
};
