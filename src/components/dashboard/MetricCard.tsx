import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { DashboardMetric } from '../../types/dashboard';

interface MetricCardProps {
  metric: DashboardMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (metric.route) {
      navigate(metric.route);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm
        ${metric.route ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {metric.title}
        </h3>
        {metric.route && (
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {metric.value}
        </p>
        {metric.change && (
          <span className={`
            ml-2 text-sm font-medium flex items-center
            ${metric.changeType === 'increase' ? 'text-green-600' :
              metric.changeType === 'decrease' ? 'text-red-600' :
              'text-gray-500'}
          `}>
            {metric.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4" /> :
             metric.changeType === 'decrease' ? <ArrowDownRight className="h-4 w-4" /> :
             <Minus className="h-4 w-4" />}
            {metric.change}
          </span>
        )}
      </div>
    </div>
  );
};