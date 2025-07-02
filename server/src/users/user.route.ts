import { Router } from 'express';
import { getAllUsers, connectUser, addViewedPost, getNextUnviewedPost } from '../users/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/connect', connectUser);
router.post('/:userId/viewedPosts', addViewedPost);
router.get('/:userId/next-unviewed', getNextUnviewedPost);

export default router;
