import { logger } from '../config/configLogger';
import { transporter } from '../config/configNodeMailer';

const sendResetPass = async (toEmail: string, newPassword: string) => {
  transporter.sendMail({
    from: 'Comunicação FAP-EVENTOS <richardsendemail@gmail.com',
    to: [`${toEmail}`],
    text: 'Texto do E-mail',
    subject: 'Recuperação de senha FAP-EVENTOS',
    html: `
        <html>
          <body>
            <strong>Sua nova senha é: ${newPassword}</strong>
          </body>
        </html>
        `,
  }).then(() => {
    logger.info('Email enviado com sucesso');
    const success = 'Email enviado com sucesso';
    return success;
  }).catch((error) => {
    logger.fatal(error);
    const fatal = 'Internal Server error';
    return fatal;
  });
};

export { sendResetPass };
