import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import type { DashboardAlert } from '../../types/dashboard';

interface AlertsListProps {
  alerts: DashboardAlert[];
  onDismiss: (id: string) => void;
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts, onDismiss }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`
            flex items-start p-4 rounded-lg
            ${alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
              alert.type === 'error' ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'}
          `}
        >
          {alert.type === 'warning' ? (
            <AlertTriangle className="h-5 w-5 mr-3" />
          ) : (
            <Info className="h-5 w-5 mr-3" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs mt-1">
              {alert.date.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-sm font-medium hover:underline"
          >
            Descartar
          </button>
        </div>
      ))}
    </div>
  );
};