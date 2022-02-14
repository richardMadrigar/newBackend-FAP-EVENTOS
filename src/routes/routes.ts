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
import { getGerenteByName } from '../controllers/events/getGerenteByName';
import { getListEvent } from '../controllers/events/ListEvent/getEventList';
import { CreateEvent } from '../controllers/events/CreateEvents';
import { getListEventDay } from '../controllers/events/ListEvent/getEventListDay';
import { getListEventAll } from '../controllers/events/ListEvent/getEventListAll';
import { deleteEvent } from '../controllers/events/DeleteEvent';

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
router.post('/createEvent', CreateEvent);
router.delete('/deleteEvent', deleteEvent);
router.post('/getListEvent', getListEvent);
router.post('/getListEventDay', getListEventDay);
router.get('/getListEventAll', getListEventAll);

export { router };
