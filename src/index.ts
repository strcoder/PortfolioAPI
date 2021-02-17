import express from 'express';
import { config } from './config/index';
import routes from './routes/routes';

const app = express();

app.use(express.json());

routes(app);

app.listen(config.port, () => {
  console.log(`\nListening http://localhost:${config.port}\n`);
});