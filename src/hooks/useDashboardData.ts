import { useState, useEffect } from 'react';
import { addDays, subDays, format } from 'date-fns';
import type { DashboardMetric, SalesData, CategorySales, TopProduct, DashboardAlert } from '../types/dashboard';

const generateMockSalesData = (days: number): SalesData[] => {
  const data: SalesData[] = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      amount: Math.random() * 1000 + 500
    });
  }

  return data;
};

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [weekSales, setWeekSales] = useState<SalesData[]>([]);
  const [categorySales, setCategorySales] = useState<CategorySales[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      setMetrics([
        {
          id: 'total-sales',
          title: 'Ventas Totales',
          value: '€2,345.67',
          change: '+12.5%',
          changeType: 'increase',
          route: '/historial'
        },
        {
          id: 'customers',
          title: 'Clientes Registrados',
          value: '156',
          change: '+5',
          changeType: 'increase'
        },
        {
          id: 'avg-sale',
          title: 'Venta Media',
          value: '€45.30',
          change: '+2.3%',
          changeType: 'increase'
        },
        {
          id: 'low-stock',
          title: 'Stock Bajo',
          value: '8',
          change: '+3',
          changeType: 'decrease',
          route: '/productos?filter=low-stock'
        }
      ]);

      setWeekSales(generateMockSalesData(7));

      setCategorySales([
        { category: 'Beverages', amount: 1234.56 },
        { category: 'Food', amount: 2345.67 },
        { category: 'Snacks', amount: 1456.78 },
        { category: 'Other', amount: 789.12 }
      ]);

      setTopProducts([
        { id: '1', name: 'Café Americano', quantity: 145, revenue: 362.50 },
        { id: '2', name: 'Croissant', quantity: 89, revenue: 173.55 },
        { id: '3', name: 'Sandwich', quantity: 76, revenue: 304.00 }
      ]);

      setAlerts([
        {
          id: '1',
          type: 'warning',
          message: 'Stock bajo en 3 productos',
          date: new Date(),
          read: false
        },
        {
          id: '2',
          type: 'info',
          message: 'Realizar cierre de caja',
          date: new Date(),
          read: false
        }
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Re-fetch data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    metrics,
    weekSales,
    categorySales,
    topProducts,
    alerts,
    isLoading,
    refreshData
  };
};