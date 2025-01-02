import React from 'react';
import { Settings as SettingsIcon, Users, CreditCard, Receipt, Database } from 'lucide-react';

const settingsSections = [
  {
    title: 'Usuarios',
    description: 'Gestionar usuarios y permisos',
    icon: Users,
    path: '/configuraciones/usuarios'
  },
  {
    title: 'Métodos de Pago',
    description: 'Configurar métodos de pago aceptados',
    icon: CreditCard,
    path: '/configuraciones/pagos'
  },
  {
    title: 'Formato de Recibos',
    description: 'Personalizar la información en los recibos',
    icon: Receipt,
    path: '/configuraciones/recibos'
  },
  {
    title: 'Backup',
    description: 'Configurar copias de seguridad',
    icon: Database,
    path: '/configuraciones/backup'
  }
];

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Configuraciones
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.path}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <section.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};