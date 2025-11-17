import React from 'react';
import { AppSidebar } from '../partials/AppSidebar';
import { DashboardHeader } from '../partials/DashboardHeader';
import { Footer } from '../partials/Footer';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
