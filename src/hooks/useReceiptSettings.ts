import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import type { ReceiptSettings } from '../types/settings';

const DEFAULT_SETTINGS: ReceiptSettings = {
  businessName: 'TPV System',
  address: '',
  phone: '',
  taxId: '',
  footer: 'Gracias por su compra',
  showLogo: false
};

export const useReceiptSettings = () => {
  const [settings, setSettings] = useState<ReceiptSettings>(() => {
    const saved = localStorage.getItem('receiptSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  
  const { showToast } = useToast();

  const updateSettings = useCallback((newSettings: ReceiptSettings) => {
    setSettings(newSettings);
    localStorage.setItem('receiptSettings', JSON.stringify(newSettings));
    showToast('Configuración de recibos actualizada', 'success');
  }, [showToast]);

  return {
    settings,
    updateSettings
  };
};