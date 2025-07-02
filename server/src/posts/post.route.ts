import { Router } from 'express';
import { createPost, getPosts, getPostsCount, markNewsAsRead } from '../posts/post.controller';

const router = Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/count', getPostsCount);

export default router;
