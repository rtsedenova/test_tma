import { FC } from 'react';
import { Forward } from 'lucide-react';
import { News } from '@/types/news';
import { bem } from '@/css/bem';
import { NewsCheckBtn } from './NewsCheckBtn';

const [b, e] = bem('news-preview');

type Props = {
  news: News;
  hasMoreUnread?: boolean;
  onSeeMore?: () => void;
  userId: string;
  onViewed?: (postId: string) => void;
};

export const NewsPreview: FC<Props> = ({ news, hasMoreUnread, onSeeMore, userId, onViewed }) => (
  <div className={b()}>
  <div className={e('image-wrapper')}>
    <img src={news.image} alt={news.title} className={e('image')} />
  </div>

  <div className={e('info-block')}>
    <div className={e('share')}>
      <Forward size={20} className={e('share-icon')} />
    </div>

    <h3 className={e('title')}>{news.title}</h3>
    {news.description && (
      <div className={e('description')}>{news.description}</div>
    )}

    <div className={e('check')}>
      <NewsCheckBtn postId={news.id} userId={userId} onViewed={onViewed} />
    </div>
  </div>
</div>
);
