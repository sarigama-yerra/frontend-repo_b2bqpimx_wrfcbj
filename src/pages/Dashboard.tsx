import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card } from '../components/ui';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { products, sales, alerts } = useInventory();
  const revenue = sales.reduce((sum, s) => sum + s.total, 0);
  const low = alerts.length;

  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-slate-500">إجمالي المنتجات</div>
          <div className="text-3xl font-bold">{products.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-slate-500">الإيرادات</div>
          <div className="text-3xl font-bold">{revenue.toFixed(2)} ريال</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-slate-500">تنبيهات المخزون</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-3xl font-bold ${low>0? 'text-red-600': 'text-green-600'}`}>{low}</span>
            {low>0 ? <TrendingDown className="text-red-600"/> : <TrendingUp className="text-green-600"/>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
