import { useMemo } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

export function useLaunchParams() {
  const launchParams = useMemo(() => retrieveLaunchParams(), []);
  return { launchParams };
} 