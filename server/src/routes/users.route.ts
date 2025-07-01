import { Router } from 'express';
import { getAllUsers, connectUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/connect', connectUser);

export default router;
