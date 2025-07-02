import { FC, ReactNode } from 'react';
import { bem } from '@/css/bem';
import { AlertTriangle, CheckCircle2, Newspaper, Info, ArrowRight } from 'lucide-react';

const [, e] = bem('news-message');

type NewsMessageType = 'error' | 'no-news' | 'all-viewed' | 'offer-more';

interface NewsMessageProps {
  type: NewsMessageType;
  onSeeMore?: () => void;
  children?: ReactNode;
}

export const NewsMessage: FC<NewsMessageProps> = ({ type, onSeeMore, children }) => {
  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <AlertTriangle size={40} className={e('icon')} color="#e83a547e" />;
      case 'no-news':
        return <Newspaper size={40} className={e('icon')} color="#f0ad4e7e" />;
      case 'all-viewed':
        return <CheckCircle2 size={40} className={e('icon')} color="#52bf177e" />;
      case 'offer-more':
        return <Info size={40} className={e('icon')} color="#3b81e17e" />;
      default:
        return null;
    }
  };

  return (
    <div className={e('screen', type)}>
      {renderIcon()}
      {type === 'error' && (
        <>
          <div className={e('title')}>Something went wrong</div>
          <div className={e('desc')}>We couldn't load the news. Please try again later.</div>
        </>
      )}
      {type === 'no-news' && (
        <>
          <div className={e('title')}>No news available</div>
          <div className={e('desc')}>There are currently no news items in the system.</div>
        </>
      )}
      {type === 'all-viewed' && (
        <>
          <div className={e('title')}>You have read all the news</div>
          <div className={e('desc')}>Check back later for more updates.</div>
        </>
      )}
      {type === 'offer-more' && (
        <>
          <div className={e('title')}>Want to see more news?</div>
          <div className={e('desc')}>There are more news items you haven't read yet.</div>
          <button className={e('view-more-link')} onClick={onSeeMore}>
            See more news <ArrowRight size={16} />
          </button>
          {children}
        </>
      )}
    </div>
  );
};
