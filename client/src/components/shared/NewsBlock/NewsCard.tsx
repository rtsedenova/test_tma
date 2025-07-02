import { FC } from 'react';
import { CheckCheck, Dot, ArrowRight } from 'lucide-react';
import { bem } from '@/css/bem';
import type { News } from '@/types/news';

const [b, e] = bem('news-card');

interface NewsCardProps {
  news: News;
  viewed: boolean;
}

export const NewsCard: FC<NewsCardProps> = ({ news, viewed }) => {
  const cardClass = viewed ? b('read') : b('not-read');

  return (
    <div className={cardClass}>
        <div className={e('plate', viewed ? 'read' : ['not-read', 'dot'])}>
            {viewed ? <CheckCheck size={16} /> : <Dot size={16} />}
        </div>

      <div className={e('image-wrapper')}>
        <img src={news.image} alt={news.title} className={e('image')} />
      </div>

      <div className={e('content')}>
        <div className={e('title-row')}>
          <h3 className={e('title')}>{news.title}</h3>
        </div>

        <div className={e('footer')}>
          <a className={e('view-more')} href={``}>
            View Details <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
