import {Router, Response} from 'express';
import {promises as fsPromises} from 'fs';
import getThumbsFilePath from '../helper';
import {resizeImage} from '../services/imageService';
import {ImageResizeRequest} from './types';

const imageRoutes = Router();

const doesThumbExists = async (filePath: string): Promise<boolean> => {
  try {
    //check if file exists in thumbs dir
    await fsPromises.stat(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

const resizeHandler = async (
  req: ImageResizeRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const {filename, height, width} = req.query;
    if (!filename) {
      return res.status(400).send('filename is required');
    }
    if (!height || !width) {
      return res.status(400).send('height and width are required');
    }

    const thumbsFilePath = getThumbsFilePath(filename, height, width);
    if (await doesThumbExists(thumbsFilePath)) {
      console.log(`returning from cache`);
      return res.sendFile(thumbsFilePath);
    } else {
      await resizeImage(
        filename,
        typeof height === 'string' ? parseInt(height) : height,
        typeof width === 'string' ? parseInt(width) : width,
        thumbsFilePath
      );
      return res.sendFile(thumbsFilePath);
    }
  } catch (err) {
    const typedErr = err as Error;
    if (typedErr.message.includes('Input file is missing')) {
      return res.status(404).send(typedErr.message);
    } else {
      return res.status(500).send(typedErr.message);
    }
  }
};

imageRoutes.get('/', resizeHandler);

export default imageRoutes;
