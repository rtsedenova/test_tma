import fs from 'fs';
import path from 'path';

const usersPath = path.join(__dirname, '../data/users.json');

// -- Get

export const getUsers = () => {
  try {
    const content = fs.readFileSync(usersPath, 'utf-8');
    if (!content.trim()) return [];
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
};

// -- Add

export const addUserIfNotExists = (user: { telegramId: string, [key: string]: any }) => {
  const users = getUsers();
  if (!users.find((u: any) => u.telegramId === user.telegramId)) {
    users.push(user);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    return true;
  }
  return false;
};

export async function addViewedPost(userId: string, postId: string) {
  console.log('addViewedPost service called');
  const usersPath = path.join(__dirname, '../data/users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  console.log('Users loaded');
  const user = users.find((u: any) => String(u.id) === String(userId));
  if (!user) {
    console.error('User not found:', userId);
    throw new Error('User not found');
  }
  if (!user.viewedPosts) user.viewedPosts = [];
  if (!user.viewedPosts.includes(postId)) {
    user.viewedPosts.push(postId);
    console.log('Writing updated users to file...');
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    console.log('File write complete');
  } else {
    console.log('Post already viewed:', postId);
  }
}


