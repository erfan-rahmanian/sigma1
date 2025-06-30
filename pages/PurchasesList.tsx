
import React, { useState, useEffect } from 'react';
import { getPurchases, getApiErrorMessage } from '../types';

const PurchasesList = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // TODO: Add state for pagination (totalPages, currentPage)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const data = await getPurchases(1); // Fetch first page for now
        setPurchases(data.List || []);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('fa-IR').format(amount);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">لیست خریدها</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          <input type="text" placeholder="جستجو در خریدها..." className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 p-2 border rounded-md text-black"/>
          <input type="text" placeholder="تاریخ شروع" className="p-2 border rounded-md text-black" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}/>
          <input type="text" placeholder="تاریخ پایان" className="p-2 border rounded-md text-black" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}/>
          <input type="text" placeholder="فیلتر بر اساس مشتری..." className="p-2 border rounded-md text-black"/>
          <select className="p-2 border rounded-md">
            <option>همه وضعیت‌ها</option>
            <option>تایید شده</option>
            <option>ابطال شده</option>
            <option>در جریان</option>
          </select>
          <button className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-primary-maroon text-white px-6 py-2 rounded-md hover:bg-primary-maroon-light">فیلتر</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[600px]">
          <thead className="bg-primary-maroon text-white">
            <tr>
              <th className="p-3 text-sm">وضعیت</th>
              <th className="p-3 text-sm">تاریخ</th>
              <th className="p-3 text-sm">شماره خرید</th>
              <th className="p-3 text-sm">نوع فروش</th>
              <th className="p-3 text-sm">مشتری</th>
              <th className="p-3 text-sm">مبلغ خالص</th>
              <th className="p-3 text-sm">چرخه فرم</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-12 text-center text-gray-500">در حال بارگذاری لیست خریدها...</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="p-12 text-center text-red-500 bg-red-50">خطا: {error}</td></tr>
            ) : purchases.length > 0 ? (
              purchases.map((p) => (
                <tr key={p.QU_id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{p.Status}</td>
                  <td className="p-3 text-sm">{new Date(p.QU_date).toLocaleDateString('fa-IR')}</td>
                  <td className="p-3 text-sm">{p.QU_no}</td>
                  <td className="p-3 text-sm">{p.TypeSale}</td>
                  <td className="p-3 text-sm">{p.Customer}</td>
                  <td className="p-3 text-sm ltr text-left">{formatCurrency(p.NetPrice)}</td>
                  <td className="p-3 text-sm">
                     <button className="border rounded-md p-1 bg-gray-100 text-xs text-gray-600 hover:bg-gray-200" disabled>
                        مشاهده چرخه
                     </button>
                  </td>
                </tr>
              ))
            ) : (
               <tr><td colSpan={7} className="p-12 text-center text-gray-500">هیچ خریدی یافت نشد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesList;
