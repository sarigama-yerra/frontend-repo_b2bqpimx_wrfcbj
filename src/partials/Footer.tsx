import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="max-w-screen-2xl mx-auto p-4 text-xs text-slate-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} جميع الحقوق محفوظة.</span>
        <span>صنع بحب بواسطة Flames.Blue</span>
      </div>
    </footer>
  );
};
