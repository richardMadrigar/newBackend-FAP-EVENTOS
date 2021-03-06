import { Router } from 'express';

import multer from 'multer';

import { verifyToken } from '../middlewares/verifyToken';
import { createUser } from '../controllers/useCases/user/CreateUsers.controller';
import { multerConfig } from '../config/uploadImg/multer';
import { deleteImg, selectUserImg, updateImgUser } from '../controllers/useCases/UploadImage/UploadArquivos.controller';
import { getUsersAll } from '../controllers/useCases/user/Features/getUsersAll.controller';
import { deleteUser } from '../controllers/useCases/user/Features/deleteUser.controller';
import { resetPassword } from '../controllers/useCases/user/Features/resetPassword.controller';
import { updateUser } from '../controllers/useCases/user/Features/updateUser.controller';
import { getUserbyId } from '../controllers/useCases/user/Features/getUserById.controller';
import { getGerenteByName } from '../controllers/useCases/events/getGerenteByName';
import { getListEventSpecification } from '../controllers/useCases/events/ListEvent/getEventListSpecification';
import { CreateEvent } from '../controllers/useCases/events/CreateEvents';
import { getListEventDay } from '../controllers/useCases/events/ListEvent/getEventListDay';
import { getListEventAll } from '../controllers/useCases/events/ListEvent/getEventListAll';
import { deleteEvent } from '../controllers/useCases/events/DeleteEvent';
import { Login } from '../controllers/useCases/user/Login.controller';
import { sessionUser } from '../controllers/useCases/user/Session.Controller';
import { getEventById } from '../controllers/useCases/events/UpdateEvent/GetEventById';
import { UpdateEvent } from '../controllers/useCases/events/UpdateEvent/UpdateEvent';

const router = Router();

// FeaturesImg
router.put('/editImgUser/:id', multer(multerConfig).single('file'), updateImgUser);
router.put('/deleteImg/:id', deleteImg);
router.get('/getImgAll', selectUserImg);

// FeaturesUsers
router.put('/resetPassword/:id_usuario', verifyToken, resetPassword);
router.get('/getUser/:id_usuario', verifyToken, getUserbyId);
router.delete('/users/:id_usuario', verifyToken, deleteUser);
router.put('/users/:id_usuario', verifyToken, updateUser);
router.get('/getUserAll', getUsersAll);

// Home
router.post('/sessions', verifyToken, sessionUser);
router.post('/createUser', createUser);
router.post('/login', Login);

// Events
router.post('/createEvent', CreateEvent);
router.delete('/deleteEvent/:id_evento', deleteEvent);
router.get('/getGerente/:responsavel_evento', getGerenteByName);

router.post('/getListEvent', getListEventSpecification);
router.post('/getListEventDay', getListEventDay);
router.get('/getListEventAll', getListEventAll);
router.get('/getEventById/:id_evento', getEventById);

router.put('/updateEvent/:id_evento', UpdateEvent);

export { router };
