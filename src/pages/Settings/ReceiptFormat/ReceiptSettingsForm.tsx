import React from 'react';
import type { ReceiptSettings } from '../../../types/settings';

interface ReceiptSettingsFormProps {
  settings: ReceiptSettings;
  onSubmit: (settings: ReceiptSettings) => void;
  isSubmitting?: boolean;
}

export const ReceiptSettingsForm: React.FC<ReceiptSettingsFormProps> = ({
  settings,
  onSubmit,
  isSubmitting = false
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newSettings: ReceiptSettings = {
      businessName: formData.get('businessName') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      taxId: formData.get('taxId') as string,
      footer: formData.get('footer') as string,
      showLogo: formData.get('showLogo') === 'true',
      logoUrl: formData.get('logoUrl') as string || undefined
    };

    onSubmit(newSettings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nombre del Negocio
        </label>
        <input
          type="text"
          name="businessName"
          defaultValue={settings.businessName}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Dirección
        </label>
        <textarea
          name="address"
          rows={2}
          defaultValue={settings.address}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={settings.phone}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            NIF/CIF
          </label>
          <input
            type="text"
            name="taxId"
            defaultValue={settings.taxId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Mensaje de Pie de Página
        </label>
        <input
          type="text"
          name="footer"
          defaultValue={settings.footer}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="showLogo"
            id="showLogo"
            value="true"
            defaultChecked={settings.showLogo}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="showLogo" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Mostrar Logo
          </label>
        </div>

        {settings.showLogo && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL del Logo
            </label>
            <input
              type="url"
              name="logoUrl"
              defaultValue={settings.logoUrl}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://ejemplo.com/logo.png"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
};