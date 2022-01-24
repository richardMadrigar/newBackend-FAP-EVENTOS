import { Router } from 'express';
import multer from 'multer';

import { multerConfig } from '../../config/configImg/multer';

import {
  selectUserImg,
  deleteImg,
  updateImgUser,
} from '../../controllers/UploadArquivos.controller';

const router = Router();

router.put('/editImgUser/:id', multer(multerConfig).single('file'), updateImgUser);

router.put('/deleteImg/:id', deleteImg);

router.get('/getImgAll', selectUserImg);

export default router;
