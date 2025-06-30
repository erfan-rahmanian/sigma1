
import React, { useState, useEffect } from 'react';
import { getCustomerInfo, getApiErrorMessage } from '../types';

const FormField = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

const NewPurchase = () => {
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCustomerInfo();
        setCustomerInfo(data);
      } catch (err) {
        console.error("Failed to fetch customer info:", err);
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b pb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">فرم خرید</h2>
        <div className="flex items-center justify-end gap-2">
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm md:text-base">انتخاب کالا</button>
          <button className="bg-primary-maroon text-white px-4 py-2 rounded-md hover:bg-primary-maroon-light text-sm md:text-base">ذخیره خرید</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-700 border-b pb-2">اطلاعات خرید</h3>
          <FormField label="شماره خرید:" value="new" />
          <FormField label="تاریخ صدور:" value={new Date().toLocaleDateString('fa-IR')} />
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-700 border-b pb-2">اطلاعات مشتری</h3>
          {loading ? (
            <p className="text-gray-500">در حال بارگذاری اطلاعات مشتری...</p>
          ) : error ? (
            <p className="text-red-500 bg-red-50 p-2 rounded-md">{error}</p>
          ) : customerInfo ? (
            <>
              <FormField label="نام کارشناس:" value={customerInfo.SalesExpert_FullName || '-'} />
              <FormField label="نام مشتری:" value={customerInfo.FullName || '-'} />
              <FormField label="کد مشتری:" value={customerInfo.Id || '-'} />
              <FormField label="آدرس مشتری:" value={customerInfo.Address || '-'} />
            </>
          ) : (
            <p className="text-gray-500">اطلاعات مشتری یافت نشد.</p>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-700 border-b pb-2">توضیحات اضافی</h3>
          <textarea className="w-full border rounded-md p-2 h-24 bg-gray-50 text-black" placeholder="توضیحات خود را وارد کنید..."></textarea>
          <h3 className="font-bold text-lg text-gray-700 border-b pb-2">محل تحویل</h3>
          <input className="w-full border rounded-md p-2 bg-gray-50 text-black" placeholder="محل تحویل را وارد کنید..." />
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-700 border-b pb-2">روش پرداخت</h3>
          <select className="w-full border rounded-md p-2 bg-gray-50">
            <option>نقدی</option>
            <option>چک</option>
            <option>کارت به کارت</option>
          </select>
        </div>
       </div>


      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[800px]">
          <thead className="bg-primary-maroon text-white">
            <tr>
              <th className="p-3 text-sm">ردیف</th>
              <th className="p-3 text-sm">کد کالا</th>
              <th className="p-3 text-sm">شرح کالا</th>
              <th className="p-3 text-sm">مقدار</th>
              <th className="p-3 text-sm">فی</th>
              <th className="p-3 text-sm">مبلغ کل</th>
              <th className="p-3 text-sm">درصد تخفیف</th>
              <th className="p-3 text-sm">مبلغ تخفیف</th>
              <th className="p-3 text-sm">درصد مالیات</th>
              <th className="p-3 text-sm">جمع خالص</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td colSpan={10} className="p-12 text-center text-gray-500">هیچ آیتمی یافت نشد. برای افزودن کالا از دکمه "انتخاب کالا" استفاده کنید.</td></tr>
            <tr className="border-b"><td colSpan={10} className="p-4 text-center text-gray-400">*</td></tr>
            <tr className="border-b"><td colSpan={10} className="p-4 text-center text-gray-400">*</td></tr>
            <tr className="border-b"><td colSpan={10} className="p-4 text-center text-gray-400">*</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewPurchase;
