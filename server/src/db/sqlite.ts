import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'posts.db');
export const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    imageUrl TEXT NOT NULL,
    fullImageUrl TEXT,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegramId TEXT UNIQUE NOT NULL,
    viewedPosts TEXT DEFAULT '[]',
    data TEXT DEFAULT '{}'
  );
`);

