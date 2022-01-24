import { Router } from 'express';
import { deleteUser } from '../../controllers/featuresUsers/deleteUser.controller';
import { getUserbyId } from '../../controllers/featuresUsers/getUserById.controller';
import { getUsersAll } from '../../controllers/featuresUsers/getUsersAll.controller';
import { resetPassword } from '../../controllers/featuresUsers/resetPassword.controller';
import { updateUser } from '../../controllers/featuresUsers/updateUser.controller';

import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router.get('/getUserAll', getUsersAll); // pegar usuarios

router.get('/getUser/:id_usuario', verifyToken, getUserbyId); // pegar user especifico

router.delete('/users/:id_usuario', verifyToken, deleteUser); // deletar users
router.put('/users/:id_usuario', verifyToken, updateUser); // editar users

router.put('/resetPassword/:id_usuario', verifyToken, resetPassword); // resetar senha

export default router;
