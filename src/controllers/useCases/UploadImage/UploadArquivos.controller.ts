import { Request, Response } from 'express';

import path from 'path';
import fs from 'fs';

import { pool } from '../../../config/configDataBase/database';
import { logger } from '../../../config/configLogger';

export const selectUserImg = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query('SELECT * FROM img_perfil_usuarios ');

    if (!rowCount) res.status(400).json('imagens não existe ');

    return res.status(201).json({ rows });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};

export const deleteImg = async (req: Request, res: Response) => {
  const { id } = req.params;

  const filePath = path.join(__dirname, '../../tmp/uploads');

  try {
    fs.unlink(`${filePath}/${id}`, (error: any) => {
      if (error) logger.fatal(error);
    });

    const { rowCount } = await pool.query(`
    UPDATE img_perfil_usuarios SET img_perfil = $1 WHERE id_usuario = $2
    `, [null, id]);

    if (!rowCount) {
      return res.json(`Imagem não existe - ${id}`);
    }

    logger.info(`Imagem foi deletada com sucesso - ${id}`);
    return res.status(200).json(`Imagem foi deletada com sucesso - ${id}`);
  } catch (error) {
    logger.falta(error);
    return res.status(500).json('Internal Server error');
  }
};

export const updateImgUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = req.file;

  if (!result) {
    return res.status(400).json({ success: 'conteudo zerado', result });
  }

  const { filename } = result;

  try {
    const { rows, rowCount: CountUser } = await pool.query('SELECT file_path FROM  img_perfil_usuarios WHERE id_usuario = $1', [id]);

    const { rowCount } = await pool.query(
      ` UPDATE img_perfil_usuarios  SET 
      img_perfil = $1,
      file_path = $2
      WHERE id_usuario = $3`,
      [`http://localhost:3001/files/${filename}`, filename, id],
    );

    if (CountUser) {
      const [{ file_path }] = rows;
      if (await fs.promises.stat(`./tmp/uploads/${file_path}`)) {
        await fs.promises.unlink(`./tmp/uploads/${file_path}`);
      }
    }
    logger.info({ rows });

    if (!rowCount) {
      return res.json(`Usuario com ${id} não existe `);
    }

    logger.info(`foto foi atualizada com sucesso id: ${id} `);
    return res.status(200).json(`Usuário com ${id} foi editado `);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json(`Internal Server error: ${error}`);
  }
};
