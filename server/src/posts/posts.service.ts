import { db } from '../db/sqlite';

export const getAllPosts = () => {
  const stmt = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC');
  return stmt.all();
};

export const addPost = (post: { title: string; description: string; imageUrl: string; fullImageUrl?: string }) => {
  const stmt = db.prepare(
    'INSERT INTO posts (title, description, imageUrl, fullImageUrl, createdAt) VALUES (?, ?, ?, ?, ?)'
  );
  const createdAt = new Date().toISOString();
  const result = stmt.run(post.title, post.description, post.imageUrl, post.fullImageUrl || null, createdAt);
  return {
    id: result.lastInsertRowid,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    fullImageUrl: post.fullImageUrl,
    createdAt,
  };
};

export async function markNewsAsRead(id: string): Promise<void> {
  console.log(`News with ID ${id} marked as read.`);
}