import { Request, Response } from 'express';
import { getUsers, addUserIfNotExists } from '../services/user.service';

export const getAllUsers = (_req: Request, res: Response) => {
  try {
    const users = getUsers();
    res.json(users);
    return;
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении пользователей' });
    return;
  }
};

export const connectUser = (req: Request, res: Response) => {
  const { telegramId, ...rest } = req.body;
  if (!telegramId) {
    res.status(400).json({ error: 'Нужен telegramId' });
    return;
  }
  try {
    const added = addUserIfNotExists({ telegramId, ...rest });
    res.json({ success: true, added });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении пользователя' });
    return;
  }
};
