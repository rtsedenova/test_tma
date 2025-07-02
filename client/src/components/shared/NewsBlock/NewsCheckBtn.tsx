import { FC, useState } from 'react';
import { Square, SquareCheckBig } from 'lucide-react';
import { bem } from '@/css/bem';

const [b] = bem('news-check-btn');

interface NewsCheckBtnProps {
  postId: string;
  userId: string;
  onViewed?: (postId: string) => void;
}

export const NewsCheckBtn: FC<NewsCheckBtnProps> = ({ postId, onViewed }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    if (onViewed) onViewed(postId);
  };

  return (
    <button
      className={b('', { clicked })}
      onClick={handleClick}
      disabled={clicked}
      aria-label="Mark post as viewed"
    >
      {clicked ? <SquareCheckBig size={22} /> : <Square size={22} />}
    </button>
  );
};
