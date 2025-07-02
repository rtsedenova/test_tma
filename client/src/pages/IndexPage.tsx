import { FC, useEffect, useState } from 'react';

import { Page } from '@/components/Page.tsx';
import { TopPanel } from '@/components/shared/TopPanel';
import { NewsBlock } from '@/components/shared/NewsBlock/NewsBlock';
import { NewsCardList } from '@/components/shared/NewsBlock/NewsCardList';
import { NewsNavbar } from '@/components/shared/NewsNavbar';

import { News } from '@/types/news';
import { bem } from '@/css/bem';
import { getLatestNews } from '@/utils/getLatestNews';
import { useInitData } from '@/hooks/useInitData';
import { API_USERS } from '@/config/api';

const [b, e] = bem('index_page');

export const IndexPage: FC<{ posts?: News[] }> = ({ posts = [] }) => {
  const latestNews = getLatestNews(posts);
  const restNews = posts.filter((n) => n.id !== latestNews?.id);

  const { initDataState } = useInitData();
  const telegramId = initDataState?.user?.id ? String(initDataState.user.id) : undefined;
  const [dbUserId, setDbUserId] = useState<string | undefined>(undefined);
  const [viewedPosts, setViewedPosts] = useState<string[]>([]);

  useEffect(() => {
    if (!telegramId) return;
    fetch(`${API_USERS}`)
      .then(res => res.json())
      .then(users => {
        const user = users.find((u: any) => String(u.telegramId) === telegramId);
        if (user) {
          setDbUserId(String(user.id));
          setViewedPosts(Array.isArray(user.viewedPosts) ? user.viewedPosts : []);
        }
      });
  }, [telegramId]);

  return (
    <Page back={false}>
      <TopPanel />
      <NewsNavbar />
      <div className={e('main-layout')}>
        <div className={e('main-news')}>
          {dbUserId && (
            <NewsBlock
              newsList={posts}
              userId={dbUserId}
              viewedPosts={viewedPosts}
              setViewedPosts={setViewedPosts}
            />
          )}
        </div>
        <div className={e('news-sheet')}>
        <h2 className={e('section-title')}>Recent News</h2>
          <NewsCardList news={restNews} viewedPosts={viewedPosts} />
        </div>
      </div>
    </Page>
  );
};
