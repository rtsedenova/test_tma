import { db } from '../db/sqlite';

// -- Get

export const getUsers = () => {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all().map((user: any) => ({
    ...user,
    viewedPosts: JSON.parse(user.viewedPosts || '[]'),
    data: JSON.parse(user.data || '{}'),
  }));
};

// -- Add

export const addUserIfNotExists = (user: { telegramId: string, [key: string]: any }) => {
  const stmt = db.prepare('SELECT * FROM users WHERE telegramId = ?');
  const existing = stmt.get(user.telegramId);
  if (!existing) {
    const insert = db.prepare('INSERT INTO users (telegramId, data) VALUES (?, ?)');
    insert.run(user.telegramId, JSON.stringify(user));
    return true;
  }
  return false;
};

export async function addViewedPost(userId: string, postId: string) {
  const select = db.prepare('SELECT * FROM users WHERE id = ?');
  const user = select.get(userId) as { viewedPosts?: string } | undefined;
  if (!user) {
    throw new Error('User not found');
  }
  let viewedPosts = [];
  try {
    viewedPosts = JSON.parse(user.viewedPosts || '[]');
  } catch {
    viewedPosts = [];
  }
  if (!viewedPosts.includes(postId)) {
    viewedPosts.push(postId);
    const update = db.prepare('UPDATE users SET viewedPosts = ? WHERE id = ?');
    update.run(JSON.stringify(viewedPosts), userId);
  }
}

export function getNextUnviewedPost(userId: string) {
  const selectUser = db.prepare('SELECT * FROM users WHERE id = ?');
  const user = selectUser.get(userId) as { viewedPosts?: string } | undefined;
  if (!user) throw new Error('User not found');
  let viewedPosts: string[] = [];
  try {
    viewedPosts = JSON.parse(user.viewedPosts || '[]');
  } catch {
    viewedPosts = [];
  }
  const selectPosts = db.prepare('SELECT * FROM posts ORDER BY createdAt DESC');
  const posts = selectPosts.all();
  const next = posts.find((p: any) => !viewedPosts.includes(String(p.id)));
  return next || null;
}


