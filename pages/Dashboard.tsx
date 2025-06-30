
import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { StatCardData, PieChartData } from '../types';
import { getDashboardData, getApiErrorMessage } from '../types';

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [salesChart, setSalesChart] = useState<PieChartData[]>([]);
  const [comparisonChart, setComparisonChart] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        
        setStats(data.Stats);
        
        const salesData = data.SalesChart.map((item: any) => ({ name: item.date, value: item.value }));
        setSalesChart(salesData);

        const comparisonData = data.ComparisonSalesChart.map((item: any) => ({ name: item.date, 'مقدار فروش': item.value }));
        setComparisonChart(comparisonData);

      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><div className="text-center p-10 text-lg font-semibold text-gray-600">در حال بارگذاری داده‌های داشبورد...</div></div>;
  if (error) return <div className="flex justify-center items-center h-full"><div className="text-center p-10 text-red-600 bg-red-100 rounded-lg">{error}</div></div>;
  if (!stats) return <div className="flex justify-center items-center h-full"><div className="text-center p-10 text-gray-500">داده ای برای نمایش وجود ندارد.</div></div>;

  const statCardsData: StatCardData[] = [
    { title: 'فاکتورهای ثبت شده', value: String(stats.invoice.total), description: 'تعداد فاکتورهای ثبت شده', borderColor: 'border-blue-500' },
    { title: 'فاکتورهای تایید شده', value: String(stats.invoice.approved), description: 'تعداد فاکتورهای تایید شده', borderColor: 'border-green-500' },
    { title: 'فاکتورهای ابطال شده', value: String(stats.invoice.cancelled), description: 'تعداد فاکتورهای ابطال شده', borderColor: 'border-red-500' },
    { title: 'فاکتورهای در جریان', value: String(stats.invoice.pending), description: 'تعداد فاکتورهای در جریان بررسی', borderColor: 'border-yellow-500' },
  ];

  const purchaseStatsData: StatCardData[] = [
    { title: 'خریدهای ثبت شده', value: String(stats.quotation.total), description: 'تعداد کل خریدها', borderColor: 'border-blue-500' },
    { title: 'خریدهای تایید شده', value: String(stats.quotation.approved), description: 'تبدیل شده به فاکتور', borderColor: 'border-green-500' },
    { title: 'خریدهای ابطال شده', value: String(stats.quotation.cancelled), description: 'عدم تایید توسط مشتری', borderColor: 'border-red-500' },
    { title: 'خریدهای در جریان', value: String(stats.quotation.pending), description: 'منتظر تایید مشتری', borderColor: 'border-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">داشبورد</h2>
        <p className="text-gray-500">آمار فاکتورها</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {statCardsData.map((data, index) => <StatCard key={index} data={data} />)}
        </div>
      </div>

      <div>
        <p className="text-gray-500">آمار خریدها</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {purchaseStatsData.map((data, index) => <StatCard key={index} data={data} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">گزارش مقایسه ای با ماه های گذشته</h3>
            <p className="text-sm text-gray-500 mb-4">نمودار میله ای فروش در شش ماه اخیر</p>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonChart} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Tooltip wrapperClassName="rounded-md border-gray-200 shadow-sm" cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                        <Legend />
                        <Bar dataKey="مقدار فروش" fill="#10B981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">نمودار فروش شش ماه اخیر</h3>
            <p className="text-sm text-gray-500 mb-4">نمایش تاریخ فروش در شش ماه اخیر</p>
            <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={salesChart}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {salesChart.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip wrapperClassName="rounded-md border-gray-200 shadow-sm" />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
