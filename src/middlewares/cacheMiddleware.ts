import {Request, Response, NextFunction} from 'express';
import {promises as fsPromises} from 'fs';
import {THUMBS_DIR_PATH} from '../constants';

const cache = async (req: Request, res: Response, next: NextFunction) => {
  const filename = req.query.filename;
  try {
    const filePath = `${THUMBS_DIR_PATH}/${filename}.jpg`;
    //check if file exists in thumbs dir
    await fsPromises.stat(filePath);
    console.log(`returning from cache`);
    res.sendFile(filePath);
  } catch (err) {
    next();
  }
};

export default cache;
