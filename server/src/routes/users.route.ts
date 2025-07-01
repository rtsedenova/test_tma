import { Router } from 'express';
import { getAllUsers, connectUser, addViewedPost } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/connect', connectUser);
router.post('/:userId/viewedPosts', addViewedPost);

export default router;
