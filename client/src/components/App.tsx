import { useMemo, useEffect } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { getRoutes } from '@/navigation/routes';
import { usePosts } from '@/hooks/usePosts';
import { useInitData } from '@/hooks/useInitData';

import { API_USERS } from '@/config/api';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);
  const posts = usePosts();
  const routes = getRoutes(posts);
  const { initDataState } = useInitData();

  useEffect(() => {
    if (initDataState && initDataState.user) {
      fetch(`${API_USERS}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: String(initDataState.user.id),
          ...initDataState.user
        })
      });
    }
  }, [initDataState]);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
