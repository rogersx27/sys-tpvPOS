import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReceiptSettingsForm } from './ReceiptSettingsForm';
import { ReceiptPreview } from './ReceiptPreview';
import { useReceiptSettings } from '../../../hooks/useReceiptSettings';

export const ReceiptFormat = () => {
  const { settings, updateSettings } = useReceiptSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (newSettings: typeof settings) => {
    setIsSubmitting(true);
    try {
      updateSettings(newSettings);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/configuraciones"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Configuración
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Configuración del Formato
          </h2>
          <ReceiptSettingsForm
            settings={settings}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Vista Previa
          </h2>
          <ReceiptPreview settings={settings} />
        </div>
      </div>
    </div>
  );
};