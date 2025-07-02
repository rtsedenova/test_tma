import { useEffect, useState } from 'react';
import { API_POSTS_LIST } from '@/config/api';
import type { News } from '@/types/news';

export function usePosts() {
const [posts, setPosts] = useState<News[] | undefined>(undefined);

useEffect(() => {
    fetch(API_POSTS_LIST)
    .then((res) => res.text())
    .then((text) => {
        try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
            setPosts(
            data.map((post) => ({
                id: String(post.id),
                title: post.title,
                description: post.description,
                image: post.fullImageUrl || post.imageUrl,
                createdAt: post.createdAt,
            }))
            );
        } else {
            setPosts([]);
        }
        } catch {
        setPosts([]);
        }
    })
    .catch(() => {
        setPosts([]);
    });
}, []);

return posts;
}
