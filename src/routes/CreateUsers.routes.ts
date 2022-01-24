import { Router } from 'express';

import { createUser } from '../controllers/CreateUsers.controller';

const router = Router();

router.post('/createUser', createUser);

export default router;
