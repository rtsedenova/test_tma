import type { JSX } from 'react';
import { IndexPage } from '@/pages/IndexPage';
import  { News } from '@/types/news'

interface Route {
  path: string;
  element: JSX.Element;
  title?: string;
  icon?: JSX.Element;
}

export function getRoutes(posts?: News[]): Route[] {
  return [
    { path: '/', element: <IndexPage posts={posts} /> },
  ];
}
