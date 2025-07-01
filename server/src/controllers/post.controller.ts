import { RequestHandler } from 'express';
import { addPost, getAllPosts } from '../services/post.service';

const handleServerError = (res: Parameters<RequestHandler>[1], message: string, error?: unknown) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

// -- Create

export const createPost: RequestHandler = (req, res) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    res.status(400).json({ error: 'Both title and imageUrl are required.' });
    return;
  }

  try {
    const newPost = addPost({ title, imageUrl });
    res.status(201).json(newPost);
  } catch (error) {
    handleServerError(res, 'Failed to create post.', error);
  }
};

// -- Get

export const getPosts: RequestHandler = (_req, res) => {
  try {
    const posts = getAllPosts();
    res.json(posts);
  } catch (error) {
    handleServerError(res, 'Failed to retrieve posts.', error);
  }
};

// -- Get Count

export const getPostsCount: RequestHandler = (_req, res) => {
  try {
    const posts = getAllPosts();
    res.json({ count: posts.length });
  } catch (error) {
    handleServerError(res, 'Failed to count posts.', error);
  }
};
