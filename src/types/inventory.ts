export type Currency = 'SAR' | 'AED' | 'USD';

export interface Store {
  id: string;
  name: string; // Arabic name
  location: string; // city/area
  phone?: string;
  createdAt: string; // ISO date
}

export interface User {
  id: string;
  name: string; // Arabic name
  role: 'admin' | 'seller' | 'manager';
  username: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string; // Arabic name e.g., "كيبل شاحن USB-C"
  sku: string; // barcode/sku
  category: 'cable' | 'charger' | 'accessory';
  price: number; // per unit
  currency: Currency;
  stockByStore: Record<string, number>; // storeId -> qty
  minStock: number; // low stock threshold
  unit: 'قطعة' | 'علبة' | 'باك';
  createdAt: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  storeId: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVERSTOCK';
  message: string; // Arabic message
  createdAt: string;
  resolved?: boolean;
}

export interface SaleItem {
  productId: string;
  qty: number;
  price: number; // snapshot of price at time of sale
}

export interface Sale {
  id: string;
  storeId: string;
  userId: string;
  items: SaleItem[];
  total: number;
  currency: Currency;
  createdAt: string;
  note?: string;
}
