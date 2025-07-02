import { FC } from 'react';
import { Settings, User } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { bem } from '@/css/bem';

const [b, e] = bem('top-panel');

export const TopPanel: FC = () => {
  return (
    <div className={e('top-bar')}>
      <div className={e('top-left')}>
        <Logo />
      </div>
      <div className={e('top-right')}>
        <div className={e('icon-wrapper')}>
          <button className={e('icon-button')}>
            <User size={20} />
          </button>
          <span className={e('badge')}>1</span>
        </div>
        <button className={e('icon-button')}>
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};
