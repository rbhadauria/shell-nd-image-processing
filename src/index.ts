import express from 'express';
import {promises as fsPromises} from 'fs';
import {THUMBS_DIR_PATH} from './constants';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api', routes);

app.listen(PORT, async () => {
  console.log(`Server started listening on port ${PORT}`);
  // create thumbs dir if not exists
  try {
    await fsPromises.mkdir(THUMBS_DIR_PATH);
  } catch (error) {
    console.log(`Thumbs folder already exists`);
  }
});

export default app;
