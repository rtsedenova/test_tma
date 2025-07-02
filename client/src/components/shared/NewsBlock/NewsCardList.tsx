import { FC } from 'react';
import type { News } from '@/types/news';
import { NewsCard } from './NewsCard';
import { bem } from '@/css/bem';
import { ArrowRight } from 'lucide-react';

const [b, e] = bem('news-cards-list');

interface NewsCardListProps {
  news: News[];
  viewedPosts: string[];
}

export const NewsCardList: FC<NewsCardListProps> = ({ news, viewedPosts }) => {
  const visibleNews = news.slice(0, 4);

  return (
    <div className={b()}>
      <div className={e('container')}>
        <div className={e('content')}>
          {visibleNews.map((item) => (
            <div key={item.id} className={e('item')}>
              <NewsCard news={item} viewed={viewedPosts.includes(item.id)} />
            </div>
          ))}
        </div>
        <div className={e('fade')} />
        <a href="#" className={e('more')}>
          Read more news <ArrowRight className={e('arrow')} size={16} />
        </a>
      </div>
    </div>
  );
};
