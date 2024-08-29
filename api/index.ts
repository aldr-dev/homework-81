import express from 'express';
import cors from 'cors';
import config from './config';
import * as mongoose from 'mongoose';
import linksRouter from './routers/links';

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/links', linksRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);