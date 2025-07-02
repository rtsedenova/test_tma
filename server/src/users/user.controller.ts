import { Request, Response } from 'express';
import * as userService from './user.service';
import { getUsers, addUserIfNotExists } from './user.service';

export const getAllUsers = (_req: Request, res: Response) => {
  try {
    const users = getUsers();
    res.json(users);
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error reading user' });
    return;
  }
};

export const connectUser = (req: Request, res: Response) => {
  const { telegramId, ...rest } = req.body;
  if (!telegramId) {
    res.status(400).json({ error: 'Need telegramId' });
    return;
  }
  try {
    const added = addUserIfNotExists({ telegramId, ...rest });
    res.json({ success: true, added });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
    return;
  }
};

export const addViewedPost = async (req: Request, res: Response) => {
  console.log('addViewedPost controller called');
  const { userId } = req.params;
  const { postId } = req.body;
  console.log('Params:', { userId });
  console.log('Body:', { postId });
  try {
    console.log('Calling userService.addViewedPost...');
    await userService.addViewedPost(userId, postId);
    console.log('userService.addViewedPost finished');
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error in addViewedPost:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNextUnviewedPost = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const post = userService.getNextUnviewedPost(userId);
    if (post) {
      res.status(200).json({ post });
    } else {
      res.status(200).json({ post: null });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
