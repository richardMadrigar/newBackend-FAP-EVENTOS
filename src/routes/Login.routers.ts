import { Router } from 'express';

import { Login } from '../controllers/Login.controller';

const router = Router();

router.post('/login', Login);

export default router;
