import { FC } from 'react';
import { bem } from '@/css/bem';
import LogoImage from '@/images/logo.svg';

const [b, e] = bem('logo');

export const Logo: FC = () => {
  return (
    <div className={b()}>
      <img src={LogoImage} alt="Logo" className={e('image')} />
      <div className={e('text')}>BREAKING<br />NEWS</div>
    </div>
  );
};
