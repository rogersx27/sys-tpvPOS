import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { TopProducts } from '../components/dashboard/TopProducts';
import { AlertsList } from '../components/dashboard/AlertsList';
import { useDashboardData } from '../hooks/useDashboardData';

export const Dashboard = () => {
  const {
    metrics,
    weekSales,
    topProducts,
    alerts: initialAlerts,
    isLoading,
    refreshData
  } = useDashboardData();

  const [alerts, setAlerts] = useState(initialAlerts);

  const handleDismissAlert = (id: string) => {
    setAlerts(current => current.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={refreshData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      <AlertsList
        alerts={alerts}
        onDismiss={handleDismissAlert}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={weekSales} />
        </div>
        <div>
          <TopProducts products={topProducts} />
        </div>
      </div>
    </div>
  );
};