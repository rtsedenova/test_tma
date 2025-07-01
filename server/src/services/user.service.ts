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


