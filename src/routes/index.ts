import {Router} from 'express';
import imageRoutes from './images';

const routes = Router();
routes.use('/images', imageRoutes);

export default routes;
