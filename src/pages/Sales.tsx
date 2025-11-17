import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useInventory } from '../context/InventoryContext';
import { Card, Button } from '../components/ui';

export const SalesPage: React.FC = () => {
  const { products, stores, recordSale } = useInventory();
  const [storeId, setStoreId] = useState(stores[0]?.id ?? '');
  const [productId, setProductId] = useState(products[0]?.id ?? '');
  const [qty, setQty] = useState(1);

  const selectedProduct = useMemo(()=> products.find(p=>p.id===productId), [products, productId]);

  const submit = () => {
    if (!storeId || !productId || !selectedProduct) return;
    const price = selectedProduct.price;
    const total = qty * price;
    recordSale({ storeId, userId: 'u-1', items: [{ productId, qty, price }], total, currency: selectedProduct.currency, note: '' });
  };

  return (
    <DashboardLayout>
      <Card className="p-4 space-y-3">
        <div className="font-bold">تسجيل عملية بيع</div>
        <div className="grid md:grid-cols-4 gap-3">
          <select value={storeId} onChange={e=>setStoreId(e.target.value)} className="rounded-md border px-3 py-2">
            {stores.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={productId} onChange={e=>setProductId(e.target.value)} className="rounded-md border px-3 py-2">
            {products.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="rounded-md border px-3 py-2"/>
          <Button onClick={submit}>حفظ العملية</Button>
        </div>
      </Card>
    </DashboardLayout>
  );
};
