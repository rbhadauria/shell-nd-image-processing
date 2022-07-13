import {Router, Request, Response} from 'express';
import cache from '../middlewares/cacheMiddleware';
import {resizeImage} from '../services/imageService';

const imageRoutes = Router();

const resizeHandler = async (req: Request, res: Response) => {
  try {
    const {filename, height, width} = req.query;
    if (!filename) {
      return res.status(400).send('filename is required');
    }
    if (!height || !width) {
      return res.status(400).send('height and width are required');
    }

    const resizedImagePath = await resizeImage(
      filename as string,
      parseInt(height as string),
      parseInt(width as string)
    );

    return res.sendFile(resizedImagePath);
  } catch (err: unknown) {
    const typedErr = err as Error;
    console.log(`${typedErr.message}`);
    if (typedErr.message.includes('Input file is missing')) {
      return res.status(404).send(typedErr.message);
    } else {
      return res.status(500).send(typedErr.message);
    }
  }
};

imageRoutes.get('/', cache, resizeHandler);

export default imageRoutes;
