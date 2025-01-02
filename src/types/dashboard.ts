export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  route?: string;
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface CategorySales {
  category: string;
  amount: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface DashboardAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  date: Date;
  read: boolean;
}