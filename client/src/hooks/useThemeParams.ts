import { useSignal, themeParams } from '@telegram-apps/sdk-react';

export function useThemeParams() {
  const tp = useSignal(themeParams.state);

  const formattedThemeParams = Object.entries(tp).map(([title, value]) => ({
    title: title.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`).replace(/background/, 'bg'),
    value,
  }));

  return { themeParams: tp, formattedThemeParams };
} 