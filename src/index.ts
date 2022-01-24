import app from './app';
import 'dotenv/config';

import logger from './config/configLogger';

const PORT = process.env.PORT_SERVER;

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta: ${PORT}`);
});
