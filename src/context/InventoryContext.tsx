import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product, Sale, Store, InventoryAlert } from '@types/inventory';
import { format } from 'date-fns';

interface InventoryContextState {
  stores: Store[];
  products: Product[];
  sales: Sale[];
  alerts: InventoryAlert[];
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  recordSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
  transferStock: (productId: string, from: string, to: string, qty: number) => void;
}

const InventoryContext = createContext<InventoryContextState | undefined>(undefined);
const LS_KEY = 'ims.inventory.state';

const defaultStores: Store[] = [
  { id: 's-1', name: 'الفرع الرئيسي', location: 'الرياض', phone: '0500000000', createdAt: new Date().toISOString() },
  { id: 's-2', name: 'فرع جدة', location: 'جدة', phone: '0500000001', createdAt: new Date().toISOString() },
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>(defaultStores);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setStores(parsed.stores || defaultStores);
      setProducts(parsed.products || []);
      setSales(parsed.sales || []);
      setAlerts(parsed.alerts || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ stores, products, sales, alerts }));
  }, [stores, products, sales, alerts]);

  const recomputeAlerts = (prods: Product[]) => {
    const a: InventoryAlert[] = [];
    prods.forEach(p => {
      Object.entries(p.stockByStore).forEach(([storeId, qty]) => {
        if (qty <= 0) {
          a.push({ id: `${p.id}-${storeId}-out`, productId: p.id, storeId, type: 'OUT_OF_STOCK', message: `المنتج "${p.name}" غير متوفر في المخزون`, createdAt: new Date().toISOString() });
        } else if (qty <= p.minStock) {
          a.push({ id: `${p.id}-${storeId}-low`, productId: p.id, storeId, type: 'LOW_STOCK', message: `المخزون منخفض للمنتج "${p.name}"`, createdAt: new Date().toISOString() });
        }
      });
    });
    setAlerts(a);
  };

  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newP: Product = { ...p, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const next = [...products, newP];
    setProducts(next);
    recomputeAlerts(next);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    const next = products.map(p => (p.id === id ? { ...p, ...data } : p));
    setProducts(next);
    recomputeAlerts(next);
  };

  const removeProduct = (id: string) => {
    const next = products.filter(p => p.id !== id);
    setProducts(next);
    recomputeAlerts(next);
  };

  const recordSale = (sale: Omit<Sale, 'id' | 'createdAt'>) => {
    const s: Sale = { ...sale, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    // deduct stock from store
    const updated = products.map(p => {
      const item = s.items.find(i => i.productId === p.id);
      if (!item) return p;
      return {
        ...p,
        stockByStore: {
          ...p.stockByStore,
          [s.storeId]: Math.max(0, (p.stockByStore[s.storeId] || 0) - item.qty),
        },
      };
    });
    setProducts(updated);
    setSales(prev => [s, ...prev]);
    recomputeAlerts(updated);
  };

  const transferStock = (productId: string, from: string, to: string, qty: number) => {
    const updated = products.map(p => {
      if (p.id !== productId) return p;
      const fromQty = Math.max(0, (p.stockByStore[from] || 0) - qty);
      const toQty = (p.stockByStore[to] || 0) + qty;
      return { ...p, stockByStore: { ...p.stockByStore, [from]: fromQty, [to]: toQty } };
    });
    setProducts(updated);
    recomputeAlerts(updated);
  };

  const value = useMemo(
    () => ({ stores, products, sales, alerts, addProduct, updateProduct, removeProduct, recordSale, transferStock }),
    [stores, products, sales, alerts]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
};
