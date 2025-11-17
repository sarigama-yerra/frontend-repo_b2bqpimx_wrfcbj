import React from 'react';
import { cn } from '../lib/cn';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-white border rounded-lg shadow-sm', className)} {...props} />
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={cn('inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50', className)} {...props} />
);

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
  <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs', className)} {...props} />
);
