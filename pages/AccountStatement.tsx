
import React, { useState, useEffect } from 'react';
import { getAccountStatement, getApiErrorMessage } from '../types';

const AccountStatement = () => {
  const [summary, setSummary] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAccountStatement();
        const { Turnovers, ...summaryData } = data;
        setSummary(summaryData);
        // API response for turnovers contains a nested list
        setTransactions(Turnovers?.List || []);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('fa-IR').format(amount);
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">صورت حساب مشتری</h2>
        <p className="text-gray-500">خلاصه وضعیت حساب مشتری</p>
        
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-right min-w-[700px]">
            <thead className="bg-primary-maroon text-white">
              <tr>
                <th className="p-3 text-sm">نام مشتری</th>
                <th className="p-3 text-sm">کد مشتری</th>
                <th className="p-3 text-sm">گردش بدهکار</th>
                <th className="p-3 text-sm">گردش بستانکار</th>
                <th className="p-3 text-sm">مانده بدهکار</th>
                <th className="p-3 text-sm">مانده بستانکار</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-12 text-center text-gray-500">در حال بارگذاری خلاصه حساب...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="p-12 text-center text-red-500 bg-red-50">خطا: {error}</td></tr>
              ) : summary ? (
                 <tr className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{summary.Title}</td>
                  <td className="p-3">{summary.Code}</td>
                  <td className="p-3 text-red-600 ltr text-left">{formatCurrency(summary.SumDebit)}</td>
                  <td className="p-3 text-green-600 ltr text-left">{formatCurrency(summary.SumCredit)}</td>
                  <td className="p-3 text-red-600 ltr text-left">{formatCurrency(summary.DebitBalance)}</td>
                  <td className="p-3 text-green-600 ltr text-left">{formatCurrency(summary.CreditBalance)}</td>
                </tr>
              ) : (
                <tr><td colSpan={6} className="p-12 text-center text-gray-500">اطلاعاتی یافت نشد.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">جزئیات تراکنش‌ها</h3>
            <p className="text-gray-500">لیست تراکنش‌های انجام شده</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
             <input type="text" placeholder="جستجو در تراکنش‌ها..." className="p-2 border rounded-md w-full sm:w-64 text-black"/>
             <div className="flex gap-2 justify-stretch">
                <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 space-x-reverse p-2 text-gray-700 hover:text-black bg-gray-100 rounded-md"><span>چاپ</span></button>
                <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 space-x-reverse p-2 text-gray-700 hover:text-black bg-gray-100 rounded-md"><span>دانلود PDF</span></button>
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[600px]">
            <thead className="bg-primary-maroon text-white">
              <tr>
                <th className="p-3 text-sm">تاریخ سند</th>
                <th className="p-3 text-sm">شرح سند</th>
                <th className="p-3 text-sm">بدهکار</th>
                <th className="p-3 text-sm">بستانکار</th>
                <th className="p-3 text-sm">مانده</th>
              </tr>
            </thead>
            <tbody>
             {loading && !summary ? (
                <tr><td colSpan={5} className="p-12 text-center text-gray-500">در حال بارگذاری تراکنش‌ها...</td></tr>
             ) : error ? (
                <tr><td colSpan={5} className="p-12 text-center text-red-500 bg-red-50">خطا: {error}</td></tr>
             ) : transactions.length > 0 ? (
                transactions.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-3">{new Date(row.Date).toLocaleDateString('fa-IR')}</td>
                    <td className="p-3">{row.Description}</td>
                    <td className="p-3 text-red-600 ltr text-left">{formatCurrency(row.Debit)}</td>
                    <td className="p-3 text-green-600 ltr text-left">{formatCurrency(row.Credit)}</td>
                    <td className="p-3 ltr text-left">{formatCurrency(row.Remaining)}</td>
                  </tr>
                ))
             ) : (
                <tr><td colSpan={5} className="p-12 text-center text-gray-500">هیچ تراکنشی یافت نشد.</td></tr>
             )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;
