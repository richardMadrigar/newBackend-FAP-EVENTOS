import { Router } from 'express';
import multer from 'multer';

import { multerConfig } from '../../config/configImg/multer';
import {
  selectUserImg,
  uploadArquivos,
  deleteImg,
  updateImgUser,
} from '../../controllers/UploadArquivos.controller';

const router = Router();

router.post('/insertimg', multer(multerConfig).single('file'), uploadArquivos);

router.delete('/deleteImg/:id', deleteImg);

router.get('/selectImg', selectUserImg);

router.put('/editImgUser/:id', multer(multerConfig).single('file'), updateImgUser);

export default router;
