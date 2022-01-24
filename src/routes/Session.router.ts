import { Router } from 'express';

import { sessionUser } from '../controllers/Session.Controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.post('/sessions', verifyToken, sessionUser);

export default router;
