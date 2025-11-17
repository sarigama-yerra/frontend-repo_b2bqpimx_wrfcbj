import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export const ReportsPage: React.FC = () => {
  const { sales } = useInventory();
  const data = sales.slice(0, 20).reverse().map(s => ({ date: format(new Date(s.createdAt), 'yyyy-MM-dd'), total: s.total }));

  return (
    <DashboardLayout>
      <Card className="p-4">
        <div className="font-bold mb-2">المبيعات اليومية</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#0f172a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardLayout>
  );
};
