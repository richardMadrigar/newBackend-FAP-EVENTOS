import { Request } from 'express';

import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export const multerConfig = {

  dest: path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'), // destino do upload

  storage: multer.diskStorage({

    destination: (req: Request, file: any, cb: any) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'));
    },
    filename: (req: Request, file: any, cb: any) => {
      crypto.randomBytes(16, (err: any, hash: any) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),

  limit: { // tamanho max por arq / qtd de arq
    fileSize: 4 * 1024 * 1024, // 2 MB
  },
  // fileFilter: (req: Request, file: any, cb: any) => { //tipos d arq permitidos
  //   const allowedMimes = [
  //     'image/jpeg',
  //     'image/pjpeg',
  //     'image/png',
  //     'image/gif',
  //     'PDF/pdf'
  //   ]

  //   if (allowedMimes.includes(file.mimetype)) {
  //     cb(null, true)
  //   } else {
  //     cb(new Error('Tipo de arquivo invalido !'))
  //   }
  // }
};
