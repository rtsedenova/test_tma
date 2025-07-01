import fs from 'fs';
import path from 'path';

const postsPath = path.join(__dirname, '../data/posts.json');

export const getAllPosts = () => {
  const raw = fs.readFileSync(postsPath, 'utf-8');
  return JSON.parse(raw);
};

export const addPost = (post: { title: string; imageUrl: string }) => {
  const posts = getAllPosts();
  const newPost = {
    id: Date.now(),
    title: post.title,
    imageUrl: post.imageUrl,
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  return newPost;
};
