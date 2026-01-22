export const getApiLanguage = (locale: string): string => {
  return locale === 'en' ? 'en-US' : 'es-ES';
};

// Helper: Format runtime (120 -> 2h 0m)
export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return 'N/A';
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

// Helper: Format currency
export const formatCurrency = (amount: number, locale: string = 'en-US') => {
  if (!amount) return 'N/A';
  const lang = locale === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};
