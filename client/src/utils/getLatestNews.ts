import type { News } from '@/types/news';

export function getLatestNews(posts?: News[]): News | undefined {
  if (!posts || posts.length === 0) return undefined;

  return posts.reduce((latest, current) => {
    const latestDate = new Date(latest.createdAt).getTime();
    const currentDate = new Date(current.createdAt).getTime();
    return currentDate > latestDate ? current : latest;
  });
}