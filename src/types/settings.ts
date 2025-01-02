export interface ReceiptSettings {
  businessName: string;
  address: string;
  phone: string;
  taxId: string;
  footer: string;
  showLogo: boolean;
  logoUrl?: string;
}

export interface ReceiptSettingsFormData extends ReceiptSettings {}