import { Request, Response } from 'express';

import { logger } from '../config/configLogger';
import { transporter } from '../config/configNodeMiler';

const newSenha = '123124';

const sendResetPass = async (request: Request, response: Response) => {
  const { toEmail } = request.body;

  transporter.sendMail({
    from: 'Comunicação FAP-EVENTOS <richardsendemail@gmail.com',
    to: [`${toEmail}`],
    text: 'Texto do E-mail',
    subject: 'Recuperação de senha FAP-EVENTOS',
    html: `
      <html>
        <body>
          <strong>Sua nova senha é: ${newSenha}</strong>
        </body>
      </html>
      `,
  }).then(() => {
    logger.info('Senha resetado com sucesso');

    return response.status(200).json('Senha resetado com sucesso');
  }).catch((error) => {
    logger.fatal(error);
    return response.status(500).json('Internal Server error');
  });
};

export { sendResetPass };
