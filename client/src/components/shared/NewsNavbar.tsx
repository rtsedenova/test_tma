import { FC, useRef } from 'react';
import { Flame } from 'lucide-react';
import { bem } from '@/css/bem';

const [b, e] = bem('news-navbar');

const NAV_ITEMS = [
{ label: 'Trending', icon: <Flame size={16} />, active: true },
{ label: 'Weather' },
{ label: 'Politics' },
{ label: 'Finance' },
{ label: 'Celebrities' },
];

export const NewsNavbar: FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
    <div className={b()}>
        <div className={e('fade', 'left')} />
        <div className={e('fade', 'right')} />

        <div className={e('scroll')} ref={scrollRef}>
        {NAV_ITEMS.map((item, idx) => (
            <div
            key={item.label}
            className={e('item', idx === 0 ? 'active' : undefined)}
            >
            <span>{item.label}</span>
            {item.icon}
            </div>
        ))}
        </div>
    </div>
    );
};
