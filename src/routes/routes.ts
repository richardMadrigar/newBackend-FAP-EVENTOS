import { Router } from 'express';

import multer from 'multer';

import { sessionUser } from '../controllers/Session.Controller';
import { verifyToken } from '../middlewares/verifyToken';
import { createUser } from '../controllers/CreateUsers.controller';
import { Login } from '../controllers/Login.controller';
import { multerConfig } from '../config/configImg/multer';
import { deleteImg, selectUserImg, updateImgUser } from '../controllers/UploadArquivos.controller';
import { getUsersAll } from '../controllers/featuresUsers/getUsersAll.controller';
import { deleteUser } from '../controllers/featuresUsers/deleteUser.controller';
import { resetPassword } from '../controllers/featuresUsers/resetPassword.controller';
import { updateUser } from '../controllers/featuresUsers/updateUser.controller';
import { getUserbyId } from '../controllers/featuresUsers/getUserById.controller';
import { createEvent } from '../controllers/eventos/createEvents';
import { getGerenteByName } from '../controllers/eventos/getGerenteByName';

const router = Router();
// featuresImg
router.put('/editImgUser/:id', multer(multerConfig).single('file'), updateImgUser);
router.put('/deleteImg/:id', deleteImg);
router.get('/getImgAll', selectUserImg);

// featuresUsers
router.put('/resetPassword/:id_usuario', verifyToken, resetPassword); // resetar senha
router.get('/getUser/:id_usuario', verifyToken, getUserbyId); // pegar user especifico
router.delete('/users/:id_usuario', verifyToken, deleteUser); // deletar users
router.put('/users/:id_usuario', verifyToken, updateUser); // editar users
router.get('/getUserAll', getUsersAll); // pegar usuarios

router.post('/createUser', createUser);
router.post('/login', Login);
router.post('/sessions', verifyToken, sessionUser);

// events
router.get('/getGerente/:responsavel_evento', getGerenteByName);
router.post('/createEvent', createEvent);

export { router };
