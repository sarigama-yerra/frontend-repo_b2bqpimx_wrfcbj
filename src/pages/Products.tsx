import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card, Button, Badge } from '../components/ui';
import type { Product } from '@types/inventory';

export const ProductsPage: React.FC = () => {
  const { products, addProduct, removeProduct, updateProduct, stores } = useInventory();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => products.filter(p => p.name.includes(q) || p.sku.includes(q)), [products, q]);

  const onAdd = () => {
    const p: Omit<Product, 'id' | 'createdAt'> = {
      name: 'كيبل USB-C 1م',
      sku: Math.random().toString().slice(2,10),
      category: 'cable',
      price: 25,
      currency: 'SAR',
      stockByStore: Object.fromEntries(stores.map(s => [s.id, 10])),
      minStock: 3,
      unit: 'قطعة',
    };
    addProduct(p);
  };

  const stockStatus = (qty: number, min: number) => qty <= 0 ? 'text-red-600 bg-red-50 border-red-200' : qty <= min ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-green-700 bg-green-50 border-green-200';

  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث برقم الصنف أو الاسم" className="flex-1 rounded-md border px-3 py-2"/>
        <Button onClick={onAdd}>إضافة منتج افتراضي</Button>
      </div>
      <div className="grid gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-xs text-slate-500">رقم الصنف: {p.sku} • الفئة: {p.category}</div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {Object.entries(p.stockByStore).map(([storeId, qty]) => {
                  const store = stores.find(s=>s.id===storeId);
                  return <Badge key={storeId} className={stockStatus(qty, p.minStock)}>{store?.name}: {qty}</Badge>
                })}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>updateProduct(p.id,{ price: p.price+1 })} className="rounded-md border px-3 py-1.5 hover:bg-slate-50">+ سعر</button>
                <button onClick={()=>removeProduct(p.id)} className="rounded-md border px-3 py-1.5 hover:bg-slate-50 text-red-600">حذف</button>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length===0 && <div className="text-center text-slate-500">لا توجد منتجات</div>}
      </div>
    </DashboardLayout>
  );
};
