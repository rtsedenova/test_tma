import { FC, PropsWithChildren, useState } from 'react';
import { bem } from '@/css/bem';
import { News } from '@/types/news';
import { NewsMessage } from './NewsMessage';
import { NewsPreview } from './NewsPreview';
import { API_USER_MARK_VIEWED_POST, API_USER_NEXT_UNVIEWED } from '@/config/api';

const [b] = bem('news-block');

type Props = PropsWithChildren<{
  status?: 'none' | 'error' | 'allViewed' | 'news';
  newsList?: News[];
  viewedPosts: string[];
  setViewedPosts: (ids: string[]) => void;
  onSeeMore?: () => void;
  hasMoreUnread?: boolean;
  userId: string;
}>;

export const NewsBlock: FC<Props> = ({
  status,
  newsList = [],
  children,
  onSeeMore,
  hasMoreUnread,
  userId,
  viewedPosts,
  setViewedPosts,
}) => {
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [noMoreNews, setNoMoreNews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextNews, setNextNews] = useState<News | null>(null);

  const firstUnread = newsList.find((n) => !viewedPosts.includes(n.id));
  const allViewed = newsList.length > 0 && newsList.every((n) => viewedPosts.includes(n.id));

  const handleViewed = async (postId: string) => {
    setLoading(true);
    try {
      await fetch(API_USER_MARK_VIEWED_POST(userId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      setViewedPosts([...viewedPosts, postId]);
      const res = await fetch(API_USER_NEXT_UNVIEWED(userId));
      const data = await res.json();
      if (data.post) {
        setShowSeeMore(true);
        setNextNews(data.post);
        setNoMoreNews(false);
      } else {
        setShowSeeMore(false);
        setNoMoreNews(true);
      }
    } catch (e) {
      setNoMoreNews(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    setShowSeeMore(false);
    setNextNews(null);
  };

  let content;
  if (loading) {
    content = <NewsMessage type="no-news" />;
  } else if (noMoreNews) {
    content = <NewsMessage type="all-viewed" />;
  } else if (showSeeMore) {
    content = <NewsMessage type="offer-more" onSeeMore={handleSeeMore} />;
  } else if (nextNews) {
    content = (
      <NewsPreview
        news={nextNews}
        hasMoreUnread={hasMoreUnread}
        onSeeMore={onSeeMore}
        userId={userId}
        onViewed={handleViewed}
      />
    );
  } else if (newsList.length === 0) {
    content = <NewsMessage type="no-news" />;
  } else if (allViewed) {
    content = <NewsMessage type="all-viewed" />;
  } else if (firstUnread) {
    content = (
      <NewsPreview
        news={firstUnread}
        hasMoreUnread={hasMoreUnread}
        onSeeMore={onSeeMore}
        userId={userId}
        onViewed={handleViewed}
      />
    );
  }

  return <div className={b()}>{children}{content}</div>;
};
