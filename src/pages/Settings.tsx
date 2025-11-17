import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/ui';

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Card className="p-4">
        <div className="font-bold mb-2">الإعدادات</div>
        <div className="text-sm text-slate-600">إعدادات قادمة مثل تنسيق العملة والإشعارات عبر واتساب والطباعة.</div>
      </Card>
    </DashboardLayout>
  );
};
