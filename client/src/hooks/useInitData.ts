import { useMemo } from 'react';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  type User,
  useSignal,
} from '@telegram-apps/sdk-react';

function getUserRows(user: User) {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export function useInitData() {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);

  const initDataRows = useMemo(() => {
    if (!initDataState || !initDataRaw) {
      return undefined;
    }
    return [
      { title: 'raw', value: initDataRaw },
      ...Object.entries(initDataState).reduce((acc, [title, value]) => {
        if (value instanceof Date) {
          acc.push({ title, value: value.toISOString() });
        } else if (!value || typeof value !== 'object') {
          acc.push({ title, value });
        }
        return acc;
      }, [] as { title: string; value: any }[]),
    ];
  }, [initDataState, initDataRaw]);

  const userRows = useMemo(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  const receiverRows = useMemo(() => {
    return initDataState && initDataState.receiver
      ? getUserRows(initDataState.receiver)
      : undefined;
  }, [initDataState]);

  const chatRows = useMemo(() => {
    return !initDataState?.chat
      ? undefined
      : Object.entries(initDataState.chat).map(([title, value]) => ({ title, value }));
  }, [initDataState]);

  return {
    initDataRaw,
    initDataState,
    initDataRows,
    userRows,
    receiverRows,
    chatRows,
  };
} 