import { Request, Response } from 'express';

import path from 'path';
import fs from 'fs';

import { pool } from '../config/configDataBase/database';
import logger from '../config/configLogger';

export const uploadArquivos = async (req: Request, res: Response) => {
  const result = req.file;

  if (!result) {
    return res.status(400).json({ success: 'conteudo zerado', result });
  }

  const { filename, originalname } = result;

  try {
    await pool.query(`INSERT INTO uploads_doc (file_name, file_path, id_usuario, file_path_completed)
    VALUES ($1, $2, $3, $4) `, [filename, `files/${originalname}`, '400', `http://localhost:3001/files/${filename}`]);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    logger.fatal(error);
    return res.status(400).json({ success: false, result });
  }
};

export const selectUserImg = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM uploads_doc ');

    return res.status(201).json({
      rows,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};

export const deleteImg = async (req: Request, res: Response) => {
  const { id } = req.params;

  const filePath = path.join(__dirname, '../../tmp/uploads');

  try {
    fs.unlink(`${filePath}/${id}`, (err: any) => {
      if (err) {
        logger.error(err);
      }
    });
    const resultId = await pool.query('DELETE FROM uploads_doc WHERE file_name = $1', [id]);

    if (!resultId.rowCount) {
      return res.json(`Imagem não existe - ${id}`);
    }

    logger.info(`Imagem foi deletada com sucesso - ${id}`);
    return res.status(200).json(`Imagem foi deletada com sucesso - ${id}`);
  } catch (error) {
    logger.falta(error);
    return res.status(500).json('Internal Server error');
  }
};

export const updateImgUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = req.file;

  if (!result) {
    return res.status(400).json({ success: 'conteudo zerado', result });
  }

  const { filename } = result;

  try {
    const resultId = await pool.query(
      `
       UPDATE users SET img_perfil = $1  WHERE id = $2`,
      [`http://localhost:3001/files/${filename}`, id],
    );

    if (!resultId.rowCount) {
      return res.json(`Usuario com ${id} não existe `);
    }

    logger.info(`foto foi atualizada com sucesso id: ${id} `);
    return res.status(200).json(`Usuário com ${id} foi editado `);
  } catch (error) {
    logger.falta(error);
    return res.status(500).json(`Internal Server error: ${error}`);
  }
};
