/* eslint-disable no-console */
import express from 'express';
// import bodyParser from 'body-parser';
import { config } from './config/index';
// import routes from './routes/routes';

const app = express();

app.use(express.json());

// routes(app);
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Homa mundo',
  });
});

app.listen(config.port, () => {
  console.log(`\nListening http://localhost:${config.port}\n`);
});